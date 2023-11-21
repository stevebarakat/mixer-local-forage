import * as Tone from "tone";
import { TransportButton } from "../Buttons";
import { ffwdIcon } from "@/assets/icons";

type Props = {
  song: SourceSong;
};

const t = Tone.Transport;
export function FastFwd({ song }: Props) {
  function fastForward() {
    if (t.seconds > song.end! - 10) {
      t.seconds = song.end || 0;
    } else {
      t.seconds = t.seconds + 10;
    }
  }
  return <TransportButton onClick={fastForward}>{ffwdIcon}</TransportButton>;
}
