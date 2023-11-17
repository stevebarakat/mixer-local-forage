import type { LoaderFunction } from "@remix-run/node";
import Layout from "~/components/Layout";
import { getSessionUser } from "~/utils/session.server";
import { redirect } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getSessionUser(request);

  if (user) return redirect(`/${user.userName}`);
  return null;
};

export default function () {
  return <Layout>user</Layout>;
}
