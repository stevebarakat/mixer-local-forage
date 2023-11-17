import { array, roundFourth, unSlugify } from "./helpers";
import { log, dbToPercent, scale } from "./scale";
import { formatMilliseconds } from "./time";
import { localStorageGet, localStorageSet } from "./localStorage.client";

export function getRandomNumber(min: number, max: number) {
  return (Math.random() * (max - min) + min).toFixed(0);
}

export {
  array,
  roundFourth,
  unSlugify,
  formatMilliseconds,
  log,
  scale,
  dbToPercent,
  localStorageGet,
  localStorageSet,
};
