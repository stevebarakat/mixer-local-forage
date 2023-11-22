import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getSessionUser } from "@/utils/session.server";
import { generateRandomNumber, slugify } from "@/utils";
import { prisma } from "@/utils/db.server";
import { defaultTrackData } from "@/assets/songs/defaultData";
import { generateSlug } from "random-word-slugs";
import { getSourceSong } from "~/utils/controls.server";

export const loader: LoaderFunction = async ({
  request,
  params: { userName, slug },
}) => {
  const sessionUser = await getSessionUser(request);

  if (!sessionUser) {
    return redirect("/");
  } else if (slugify(sessionUser.userName) !== userName) {
    return redirect(`/${slugify(sessionUser.userName)}`);
  }

  const sourceSong = await getSourceSong(slug);

  const mixSettings = await prisma.mixSettings.create({
    data: {
      songSlug: slug as string,
      userId: sessionUser.id,
      userName: sessionUser.userName,
      volume: -32,
      coverArt: generateRandomNumber(1, 9).toString(),
      mixName: generateSlug(),
    },
  });

  sourceSong?.tracks.forEach(async (track) => {
    await prisma.trackSettings.create({
      data: {
        mixSettingsId: mixSettings.id,
        songSlug: slug as string,
        name: track.name,
        mixName: mixSettings.mixName,
        path: track.path,
        ...defaultTrackData,
      },
    });
  });

  return redirect(
    `/${slugify(sessionUser.userName)}/${slug}/${mixSettings.id}`
  );
};
