import { localStorageGet } from "./localStorage.client";

export function getSourceSong() {
  const sourceSong = localStorageGet("sourceSong");
  return sourceSong;
}
const sourceSong = getSourceSong();

export function getCurrentMix() {
  const currentMix = localStorageGet("currentMix");
  return currentMix;
}
const currentMix = getCurrentMix();

export function getCurrentTracks() {
  const currentTracks = localStorageGet("currentTracks");
  return currentTracks;
}
const currentTracks = getCurrentTracks();

export { sourceSong, currentMix, currentTracks };
