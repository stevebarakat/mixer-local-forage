import * as Tone from "tone";
import { TransportButton } from "../Buttons";
import { rewIcon } from "@/assets/icons";

type Props = {
  song: SourceSong;
};

const t = Tone.Transport;
function Rewind({ song }: Props) {
  function rewind() {
    if (t.seconds < song.start!) {
      t.seconds = song.start || 0;
    } else {
      t.seconds = t.seconds - 10;
    }
  }

  return <TransportButton onClick={rewind}>{rewIcon}</TransportButton>;
}

export default Rewind;
