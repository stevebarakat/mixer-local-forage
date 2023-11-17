import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { getSessionUser } from "@/utils/session.server";
import { useLoaderData, useNavigate } from "@remix-run/react";
import UserMixes from "~/components/UserMixes";
import { prisma } from "~/utils/db.server";
import { slugify } from "~/utils";

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

  console.log("userName", userName);

  console.log("sessionUser.userName", sessionUser.userName);

  const userMixes = await prisma.mixSettings.findMany({
    where: { userId: sessionUser.id },
    include: { trackSettings: true },
    orderBy: {
      createdAt: "asc",
    },
  });

  const data = {
    sessionUser,
    userMixes,
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
  const { sessionUser, userMixes } = useLoaderData();
  const navigate = useNavigate();

  function onChange(e: React.FormEvent<HTMLSelectElement>): void {
    const selectSong = {
      ninteenOne: () => navigate("./ninteenOne"),
      roxanne: () => navigate("./roxanne"),
      aDayInTheLife: () => navigate("./aDayInTheLife"),
      blueMonday: () => navigate("./blueMonday"),
      justDance: () => navigate("./justDance"),
    };
    selectSong[e.currentTarget.value as keyof typeof selectSong]();
  }

  return (
    <>
      <UserMixes user={sessionUser} userMixes={userMixes} />
      <select name="songs" id="song-select" onChange={onChange}>
        <option value="">Choose a song:</option>
        <option value="ninteenOne">Phoenix - 1901</option>
        <option value="roxanne">The Police - Roxanne</option>
        <option value="aDayInTheLife">The Beatles - A Day In The Life</option>
        <option value="blueMonday">New Order - Blue Monday</option>
        <option value="justDance">Lady Gaga - Just Dance</option>
      </select>
    </>
  );
}
