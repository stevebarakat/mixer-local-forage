import { useRef, useEffect } from "react";
import type { Reverb } from "tone";
import * as Tone from "tone";

type Options = ConstructorParameters<typeof Reverb>[0];

export default function useReverb(options?: Options): Reverb {
  const reverb = useRef<Reverb | null>(null);

  useEffect(() => {
    reverb.current = new Tone.Reverb(options).toDestination();

    return () => {
      reverb.current?.dispose();
    };
  }, [options]);

  return reverb.current!;
}
