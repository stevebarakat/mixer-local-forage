import { useRef, useEffect } from "react";
import type { PitchShift } from "tone";
import * as Tone from "tone";

type Options = ConstructorParameters<typeof PitchShift>[0];

export default function usePitchShift(options?: Options): PitchShift {
  const pitchShift = useRef<PitchShift | null>(null);

  useEffect(() => {
    pitchShift.current = new Tone.PitchShift(options).toDestination();

    return () => {
      pitchShift.current?.dispose();
    };
  }, [options]);

  return pitchShift.current!;
}
