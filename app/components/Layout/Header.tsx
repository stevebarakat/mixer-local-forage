import { Link, useMatches } from "@remix-run/react";
import { GitFork, Heart } from "lucide-react";

function Header() {
  const matches = useMatches();

  const sessionUser = matches[1].data?.sessionUser;
  const currentMix = matches[1].data?.currentMix;

  return (
    <nav className="top-nav">
      <Link to="/">remixer</Link>
      <ul>
        {sessionUser ? (
          <>
            <li>
              <Link to="/index?">Dashboard</Link>
            </li>
            <li>
              <form action="/logout" method="post">
                <button type="submit" className="link-btn">
                  Logout
                </button>
              </form>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;
