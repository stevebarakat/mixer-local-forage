import invariant from "tiny-invariant";
import { useEffect } from "react";
import localforage from "localforage";
import Loader from "./Loader";
import Transport from "./Transport";
import useTracks from "~/hooks/useTracks";
import { dbToPercent, log } from "~/utils";
import Main from "./Main";
import { TrackChannel } from "./Track";
import * as Tone from "tone";
const { Destination } = Tone;

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
  const { channels, isLoading } = useTracks({ tracks });

  // console.log("sourceSong", sourceSong);
  // console.log("currentMix", currentMix);
  // console.log("currentTracks", currentTracks);

  useEffect(() => {
    localforage
      .setItem("sourceSong", sourceSong)
      .then(function () {
        return localforage.getItem("sourceSong");
      })
      .then(function (sourceSong) {
        console.log("sourceSong", sourceSong);
      })
      .catch(function (err) {
        console.log("err", err);
      });
    localforage
      .setItem("currentMix", currentMix)
      .then(function () {
        return localforage.getItem("currentMix");
      })
      .then(function (currentMix) {
        console.log("currentMix", currentMix);
      })
      .catch(function (err) {
        console.log("err", err);
      });
    localforage
      .setItem("currentTracks", currentTracks)
      .then(function () {
        return localforage.getItem("currentTracks");
      })
      .then(function (currentTracks) {
        console.log("currentTracks", currentTracks);
      })
      .catch(function (err) {
        console.log("err", err);
      });

    const volume = currentMix.volume;
    const scaled = dbToPercent(log(volume));
    Destination.volume.value = scaled;
  }, [sourceSong, currentMix, currentTracks]);

  if (isLoading) {
    return <Loader song={sourceSong} />;
  } else {
    return (
      <div className="mixer">
        <div className="channels">
          {tracks.map((track: TrackSettings, i: number) => (
            <TrackChannel
              key={track.id}
              track={track}
              trackId={i}
              channels={channels}
              currentTracks={currentTracks}
            />
          ))}
          <Main />
        </div>
        <div className="flex gap24">
          <Transport song={sourceSong} />
          {/* <Export currentMix={currentMix} /> */}
        </div>
      </div>
    );
  }
}
