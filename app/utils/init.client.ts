import localforage from "localforage";

const ubu = () => {
  let initialSourceSong: SourceSong | unknown;
  let initialCurrentMix: MainSettings | unknown;
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
  return { initialSourceSong, initialCurrentMix, initialCurrentTracks };
};
const ebu = ubu();
export default ebu;
