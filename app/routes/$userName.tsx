import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { getSessionUser } from "@/utils/session.server";
import UserMixes from "~/components/UserMixes";
import SongSelect from "@/components/SongSelect";
import { slugify } from "@/utils";
import { prisma as db } from "@/utils/db.server";
import { useLoaderData } from "@remix-run/react";
import { getAutomationData } from "~/utils/controls.server";

export const loader: LoaderFunction = async ({
  request,
  params: { userName },
}) => {
  const sessionUser = await getSessionUser(request);

  if (!sessionUser) {
    return redirect("/");
  } else if (slugify(sessionUser.userName) !== userName) {
    return redirect(`/${slugify(sessionUser.userName)}`);
  }

  const userMixes = await db.mixSettings.findMany({
    where: { userId: sessionUser.id },
    include: { trackSettings: true },
    orderBy: {
      createdAt: "asc",
    },
  });

  const automationData = await getAutomationData();

  const data = {
    sessionUser,
    userMixes,
    automationData,
  };
  return json(data);
};

export let action: ActionFunction = async ({ request }) => {
  const sessionUser = await getSessionUser(request);
  if (sessionUser === null) return;
  const form = await request.formData();
  const slug: FormDataEntryValue | null = form.get("slug");

  return redirect(`/${slugify(sessionUser?.userName)}/${slug}`);
};

export default function DashboardRoute() {
  const { sessionUser, userMixes, automationData } = useLoaderData();

  return (
    <>
      <UserMixes
        user={sessionUser}
        userMixes={userMixes}
        automationData={automationData}
      />
      <SongSelect />
    </>
  );
}
