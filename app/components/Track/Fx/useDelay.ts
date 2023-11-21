import { useRef, useEffect } from "react";
import type { FeedbackDelay } from "tone";
import * as Tone from "tone";

type Options = ConstructorParameters<typeof Tone.FeedbackDelay>[0];

export default function useDelay(options?: Options): FeedbackDelay {
  const delay = useRef<FeedbackDelay | null>(null);

  useEffect(() => {
    delay.current = new Tone.FeedbackDelay(options).toDestination();

    return () => {
      delay.current?.dispose();
    };
  }, [options]);

  return delay.current!;
}
