import invariant from "tiny-invariant";
import { useEffect } from "react";
import { extendPrototype } from "localforage-setitems";
import localforage from "localforage";
import Loader from "./Loader";
import Transport from "./Transport";
import useTracks from "~/hooks/useTracks";
import { dbToPercent, log } from "~/utils";
import Main from "./Main";
import { TrackChannel } from "./Track";
import * as Tone from "tone";

const { Destination } = Tone;
extendPrototype(localforage);

export type MixerContext = {
  sourceSong: SourceSong;
  currentMix: MixSettings;
  currentTracks: TrackSettings[];
};

type Props = {
  sourceSong: SourceSong;
  currentMix: MixSettings;
  currentTracks: TrackSettings[];
};

let initialContext;

export default function Mixer({
  sourceSong,
  currentMix,
  currentTracks,
}: Props) {
  const tracks = currentTracks.map((currentTrack) => ({
    ...currentTrack,
    soloMute: JSON.parse(currentTrack.soloMute),
    fxNames: JSON.parse(currentTrack.fxNames),
    delaySettings: JSON.parse(currentTrack.delaySettings),
    reverbSettings: JSON.parse(currentTrack.reverbSettings),
    pitchShiftSettings: JSON.parse(currentTrack.pitchShiftSettings),
    panelPosition: JSON.parse(currentTrack.panelPosition),
    panelSize: JSON.parse(currentTrack.panelSize),
  }));

  invariant(tracks, "no tracks found");
  const initialData = {
    sourceSong,
    currentMix,
    currentTracks: tracks,
  };
  const initialContextPromise = new Promise((resolve) => resolve(initialData));

  initialContextPromise.then((initialData) => (initialContext = initialData));

  const { channels, isLoading } = useTracks({ tracks });

  useEffect(() => {
    localforage
      .setItems({
        sourceSong,
        currentMix,
        currentTracks: tracks,
      })
      .catch(function (err) {
        console.log("err", err);
      });

    const volume = currentMix.volume;
    const scaled = dbToPercent(log(volume));
    Destination.volume.value = scaled;
  }, [sourceSong, currentMix, tracks]);

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
export { initialContext };
