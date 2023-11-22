import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import CommunityMixes from "~/components/CommunityMixes";
import { getSessionUser } from "~/utils/session.server";
import { prisma as db } from "~/utils/db.server";
import { json, redirect } from "@remix-run/node";
import { slugify } from "~/utils";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getSessionUser(request);

  if (user) return redirect(`/${slugify(user.userName)}`);

  const publicMixesData = await db.mixSettings.findMany({
    include: { user: true },
  });

  return json(publicMixesData);
};

export default function () {
  const publicMixesData = useLoaderData();

  return <CommunityMixes communityMixes={publicMixesData as MixSettings[]} />;
}
