import invariant from "tiny-invariant";
import { useEffect } from "react";

type Props = {
  sourceSong: SourceSong;
  currentMix: MainSettings;
  currentTracks: TrackSettings[];
};

export default function Mixer({
  sourceSong,
  currentMix,
  currentTracks,
}: Props) {
  const tracks = currentTracks;

  invariant(tracks, "no tracks found");

  console.log("sourceSong", sourceSong);
  console.log("currentMix", currentMix);
  console.log("currentTracks", currentTracks);

  return null;
}
