import { Link, useNavigate } from "@remix-run/react";
import MixName from "@/components/MixName";
import useFork from "@/hooks/useFork";
import useDelete from "@/hooks/useDelete";
// import useTogglePrivacy from "@/hooks/useTogglePrivacy";
import { GitFork, Trash, Lock, Unlock } from "lucide-react";
import { slugify, unSlugify } from "@/utils";

type Props = {
  user: User;
  userMixes: MainSettings[];
};

function UserMixes({ user, userMixes }: Props) {
  const navigate = useNavigate();
  const forkMix = useFork();
  const deleteMix = useDelete();
  // const { isPrivate, togglePrivacy } = useTogglePrivacy();

  function handleClick(e: React.FormEvent<HTMLSelectElement>) {
    console.log("e.currentTarget.id", e.currentTarget.id);
    const id = parseInt(e.currentTarget.id, 10);
    return navigate(
      `/${slugify(user.userName)}/${userMixes[id].songSlug}/${userMixes[id].id}`
    );
  }

  return (
    <div>
      {userMixes?.length > 0 && <h2>Your Mixes</h2>}
      <ol className="community-mix-list-container">
        {userMixes?.map((userMix: MainSettings, i: number) => {
          const mixName = unSlugify(userMix.mixName);
          return (
            <div key={userMix.id} className="card">
              <img src={`assets/${userMix.coverArt}.svg`} alt="ERROR!" />
              <h3>{mixName}</h3>
              <div className="focus-content">
                <footer
                  style={{
                    padding: "0 12px",
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  {/* <button
                    className="button"
                    id={i.toString()}
                    onClick={togglePrivacy}
                  >
                    {isPrivate[i] ? <Lock /> : <Unlock />}
                  </button> */}
                  <button className="button" id={userMix.id} onClick={forkMix}>
                    <GitFork />
                  </button>
                  <button
                    className="button"
                    id={i.toString()}
                    onClick={deleteMix}
                  >
                    <Trash />
                  </button>
                  <MixName
                    i={i}
                    user={user}
                    userMix={userMix}
                    userMixes={userMixes}
                  />
                  <Link
                    to={`/${slugify(user.userName)}/${userMix.songSlug}/${
                      userMix.id
                    }`}
                  >
                    {unSlugify(userMix.mixName)}
                  </Link>
                  <button id={i.toString()} onClick={handleClick}>
                    {unSlugify(userMix.mixName)}
                  </button>
                </footer>
              </div>
            </div>
          );
        })}
      </ol>
    </div>
  );
}

export default UserMixes;
