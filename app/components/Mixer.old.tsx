import invariant from "tiny-invariant";
import { useEffect } from "react";
import Loader from "./Loader";
import Transport from "./Transport";
import useTracks from "~/hooks/useTracks";
import { dbToPercent, log } from "~/utils";
import Main from "./Main";
import { TrackChannel } from "./Track";
import localforage from "localforage";
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

  useEffect(() => {
    localforage
      .setItem("key", "value")
      .then(function () {
        return localforage.getItem("key");
      })
      .then(function (value) {
        // we got our value
        console.log("value", value);
      })
      .catch(function (err) {
        // we got an error
        console.log("err", err);
      });

    const volume = currentMix.volume;
    const scaled = dbToPercent(log(volume));
    Destination.volume.value = scaled;
  }, [currentMix]);

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
