import { Link } from "@remix-run/react";
import { slugify, unSlugify } from "@/utils";
import useFork from "@/hooks/useFork";
import { GitFork, User } from "lucide-react";
import type { MixSettings } from "@prisma/client";

type Props = {
  communityMixes: MixSettings[];
};

function CommunityMixes({ communityMixes }: Props) {
  const user = communityMixes?.map((communityMix) => communityMix.userName);
  const forkMix = useFork();

  return (
    <div>
      {communityMixes?.length > 0 && <h2>Community Mixes</h2>}
      <ol className="community-mix-list-container">
        {communityMixes?.map((communityMix: MixSettings, i: number) => {
          const defaultValue = `${communityMix.mixName} `;
          return (
            <li key={communityMix.songSlug}>
              {/* <h4>{unSlugify(defaultValue)}</h4> */}
              <div
                className="community-mix-list hover-img"
                style={{
                  backgroundImage: `url('images/${communityMix.coverArt}.svg')`,
                }}
              >
                <figcaption>
                  <header style={{ top: "100px", textAlign: "center" }}>
                    <Link
                      key={communityMix.id}
                      title="Go to mix"
                      to={`/${slugify(user[0])}/${communityMix.songSlug}/${
                        communityMix.id
                      }`}
                    >
                      {unSlugify(defaultValue)}
                    </Link>
                  </header>
                </figcaption>
                <div className="vertical-space-between">
                  <Link
                    to={`/${slugify(user[i])}/${communityMix.songSlug}/${
                      communityMix.id
                    }`}
                  >
                    {`${unSlugify(defaultValue)}`}
                  </Link>
                  {user[i]}
                </div>
              </div>
              <footer
                style={{
                  padding: "0 12px",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <button
                  className="button"
                  id={communityMix.id}
                  onClick={forkMix}
                >
                  <GitFork />
                </button>
                <Link className="button" to={`/${user[i]}/profile`}>
                  <User />
                </Link>
              </footer>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default CommunityMixes;
