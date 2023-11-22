import { Link, useMatches } from "@remix-run/react";
import Logo from "../Logo";

function Header() {
  const matches = useMatches();

  const sessionUser = matches[1].data?.sessionUser;
  const currentMix = matches[1].data?.currentMix;

  return (
    <nav className="top-nav">
      <Logo />
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
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/login">login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;
