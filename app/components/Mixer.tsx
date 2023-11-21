import invariant from "tiny-invariant";
import { useEffect } from "react";
import localforage from "localforage";

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

  useEffect(() => {
    localforage
      .setItem("sourceSong", sourceSong)
      .then(function () {
        return localforage.getItem("sourceSong");
      })
      .then(function (value) {
        console.log("value", value);
      })
      .catch(function (err) {
        console.log("err", err);
      });
    localforage
      .setItem("currentMix", currentMix)
      .then(function () {
        return localforage.getItem("sourceSong");
      })
      .then(function (value) {
        console.log("value", value);
      })
      .catch(function (err) {
        console.log("err", err);
      });
    localforage
      .setItem("currentTracks", currentTracks)
      .then(function () {
        return localforage.getItem("sourceSong");
      })
      .then(function (value) {
        console.log("value", value);
      })
      .catch(function (err) {
        console.log("err", err);
      });
  }, [sourceSong, currentMix, currentTracks]);

  return null;
}
