import localforage from "localforage";
import { ClientOnly } from "remix-utils/client-only";

export default function InitClient() {
  return <ClientOnly>{() => <Init />}</ClientOnly>;
}

const Init = () => {
  let initialSourceSong: SourceSong | unknown;
  let initialCurrentMix: MixSettings | unknown;
  let initialCurrentTracks: TrackSettings[] | unknown;
  window.addEventListener("load", () => {
    localforage
      .getItem("sourceSong")
      .then(function (sourceSong) {
        console.log("sourceSong", sourceSong);
        initialSourceSong = sourceSong;
      })
      .catch(function (err) {
        console.log("err", err);
      });

    localforage
      .getItem("sourceSong")
      .then(function (currentMix) {
        console.log("currentMix", currentMix);
        initialCurrentMix = currentMix;
      })
      .catch(function (err) {
        console.log("err", err);
      });

    localforage
      .getItem("sourceSong")
      .then(function (currentTracks) {
        console.log("currentTracks", currentTracks);
        initialCurrentTracks = currentTracks;
      })
      .catch(function (err) {
        console.log("err", err);
      });
  });
  return (
    <>
      {JSON.stringify({
        initialSourceSong,
        initialCurrentMix,
        initialCurrentTracks,
      })}
    </>
  );
};
