import { useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import Mixer from "@/components/Mixer";
import {
  getSourceSong,
  getCurrentMix,
  getCurrentTracks,
} from "@/utils/controls.server";
import invariant from "tiny-invariant";
import { MixerMachineContext } from "@/context/MixerMachineContext";
// import slugify from "react-slugify";
import { getSessionUser } from "~/utils/session.server";
import { useEffect } from "react";

export const loader: LoaderFunction = async ({
  request,
  params: { userName, slug, mixId },
}) => {
  if (typeof mixId !== "string") return redirect(`/${userName}`);

  invariant(slug, "slug not found");
  const currentTracks = await getCurrentTracks(mixId);
  const currentMix = await getCurrentMix(mixId);
  const sourceSong = await getSourceSong(slug);
  const sessionUser = await getSessionUser(request);

  // if (currentMix?.id !== mixId) return redirect("/");

  const data = {
    currentTracks,
    currentMix,
    sourceSong,
    sessionUser,
  };
  return json(data);
};

export default function MixNameRoute() {
  const { sourceSong, currentMix, currentTracks } = useLoaderData();
  return (
    <MixerMachineContext.Provider>
      <Mixer
        sourceSong={sourceSong}
        currentMix={currentMix}
        currentTracks={currentTracks}
      />
    </MixerMachineContext.Provider>
  );
}
