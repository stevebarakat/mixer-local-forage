import * as Tone from "tone";
import { TransportButton } from "../Buttons";
import { restartIcon } from "@/assets/icons";

type Props = {
  song: SourceSong;
};
const t = Tone.Transport;
export function Reset({ song }: Props) {
  function reStart() {
    t.stop();
    t.seconds = song.start || 0;
  }

  return <TransportButton onClick={reStart}>{restartIcon}</TransportButton>;
}
