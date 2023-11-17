import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { getSessionUser } from "@/utils/session.server";
import { useLoaderData, useNavigate } from "@remix-run/react";

export const loader: LoaderFunction = async ({
  request,
  params: { userName },
}) => {
  const sessionUser = await getSessionUser(request);

  if (!sessionUser) {
    return redirect("/");
  } else if (sessionUser.userName !== userName) {
    return redirect(`/${sessionUser.userName}`);
  }

  const data = {
    sessionUser,
  };
  return json(data);
};

export let action: ActionFunction = async ({ request }) => {
  const sessionUser = await getSessionUser(request);
  if (sessionUser === null) return;
  const form = await request.formData();
  const slug: FormDataEntryValue | null = form.get("slug");

  return redirect(`/${sessionUser?.userName}/${slug}`);
};

export default function DashboardRoute() {
  const { sessionUser } = useLoaderData();
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
    <select name="songs" id="song-select" onChange={onChange}>
      <option value="">Choose a song:</option>
      <option value="ninteenOne">Phoenix - 1901</option>
      <option value="roxanne">The Police - Roxanne</option>
      <option value="aDayInTheLife">The Beatles - A Day In The Life</option>
      <option value="blueMonday">New Order - Blue Monday</option>
      <option value="justDance">Lady Gaga - Just Dance</option>
    </select>
  );
}
