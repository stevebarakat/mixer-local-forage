import Clock from "./Clock";
import { Reset } from "./Reset";
import Rewind from "./Rewind";
import { FastFwd as FF } from "./FastForward";
import Play from "./Play";

type Props = {
  song: SourceSong;
};

const Transport = ({ song }: Props) => (
  <div className="flex gap12">
    <div className="flex gap4">
      <Reset song={song} />
      <Rewind song={song} />
      <Play song={song} />
      <FF song={song} />
    </div>
    <Clock song={song} />
  </div>
);

export default Transport;
