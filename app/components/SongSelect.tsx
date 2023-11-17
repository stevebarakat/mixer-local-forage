import { useState } from "react";
import { useFetcher } from "@remix-run/react";

function SongSelect() {
  const fetcher = useFetcher();
  const [isDisabled, setIsDisabled] = useState(true);
  const [slug, setSlug] = useState("");

  const handleChange = (e: React.FormEvent<HTMLSelectElement>): void => {
    if (e.currentTarget.value === "") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
      setSlug(e.currentTarget.value);
    }
  };

  return (
    <>
      <fetcher.Form
        method="post"
        style={{ display: "flex", justifyContent: "center" }}
        action={`/${slug}`}
      >
        <select
          onChange={handleChange}
          className="song-select"
          name="slug"
          id="song-select"
        >
          <option value="">Choose a song:</option>
          <option value="roxanne">The Police - Roxanne</option>
          <option value="aDayInTheLife">The Beatles - A Day In The Life</option>
          <option value="everlong">Foo Fighters - Everlong</option>
        </select>
        <button disabled={isDisabled} className="submit-btn">
          {isDisabled ? (
            <>
              <span style={{ position: "relative", top: 2 }}>⬅</span>Choose Mix
            </>
          ) : (
            "Create Mix"
          )}
        </button>
      </fetcher.Form>
    </>
  );
}

export default SongSelect;
