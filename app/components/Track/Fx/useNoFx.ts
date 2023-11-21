import { useRef, useEffect } from "react";
import type { Volume } from "tone";
import * as Tone from "tone";

type Options = ConstructorParameters<typeof Volume>[0];

export default function useNoFx(options?: Options): Volume {
  const nofx = useRef<Volume | null>(null);

  useEffect(() => {
    nofx.current = new Tone.Volume(options).toDestination();

    return () => {
      nofx.current?.dispose();
    };
  }, [options]);

  return nofx.current!;
}
