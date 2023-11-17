import { useFetcher, useMatches } from "@remix-run/react";

function useDelete() {
  const fetcher = useFetcher();
  const matches = useMatches();
  const userMixes = matches[1].data.userMixes;

  async function deleteMix(e: React.FormEvent<HTMLButtonElement>) {
    fetcher.submit(
      {
        actionName: "delete",
        id: userMixes[parseInt(e.currentTarget.id, 10)].id,
      },
      { method: "post", action: "/userActions" }
    );
  }
  return deleteMix;
}

export default useDelete;
