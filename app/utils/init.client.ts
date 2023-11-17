import { localStorageGet } from "./localStorage.client";

function getSourceSong() {
  const sourceSong = localStorageGet("sourceSong");
  return sourceSong;
}
const sourceSong = getSourceSong();

function getCurrentMix() {
  const currentMix = localStorageGet("currentMix");
  return currentMix;
}
const currentMix = getCurrentMix();

function getCurrentTracks() {
  const currentTracks = localStorageGet("currentTracks");
  return currentTracks;
}
const currentTracks = getCurrentTracks();

export { sourceSong, currentMix, currentTracks };
