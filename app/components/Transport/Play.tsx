import { useState } from "react";
import * as Tone from "tone";
import { TransportButton } from "../Buttons";
import { playIcon, pauseIcon } from "@/assets/icons";

type Props = {
  song: SourceSong;
};

const t = Tone.Transport;
function Play({ song }: Props) {
  const [state, setState] = useState("stopped");
  const [ready, setReady] = useState(false);

  function initializeAudioContext() {
    Tone.start();
    t.seconds = song.start || 0;
    t.start();
    setState("started");
    setReady(true);
  }

  function startSong() {
    if (state === "started") {
      setState("paused");
      t.pause();
    } else if (state === "stopped") {
      setState("started");
      t.start();
    } else if (state === "paused") {
      setState("started");
      t.start();
    }
  }

  const playerState = (() => {
    switch (t.state) {
      case "stopped":
        return playIcon;
      case "paused":
        return playIcon;
      case "started":
        return pauseIcon;
      default:
        return pauseIcon;
    }
  })();

  return (
    <div>
      {ready ? (
        <TransportButton onClick={startSong}>{playerState}</TransportButton>
      ) : (
        <TransportButton onClick={initializeAudioContext}>
          {playIcon}
        </TransportButton>
      )}
    </div>
  );
}

export default Play;
