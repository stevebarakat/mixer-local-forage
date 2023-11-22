import { createMachine, assign } from "xstate";
import { produce } from "immer";
import { type Reverb, type FeedbackDelay, type PitchShift } from "tone";
import { dbToPercent, localStorageGet, localStorageSet, log } from "@/utils";
import localforage from "localforage";
import { extendPrototype } from "localforage-getitems";

extendPrototype(localforage);

const initialContext: any = {
  sourceSong: { title: "" },
  currentMix: { volume: -32 },
  currentTracks: [
    { volume: -32, fxNames: [], soloMute: { solo: false, mute: false } },
    { volume: -32, fxNames: [], soloMute: { solo: false, mute: false } },
    { volume: -32, fxNames: [], soloMute: { solo: false, mute: false } },
    { volume: -32, fxNames: [], soloMute: { solo: false, mute: false } },
  ],
};

console.log("initialContext", initialContext);

// const initialContextt = localforage.getItems().then(function (results) {
//   console.log("results", results);
// });

export const mixerMachine = createMachine(
  {
    id: "mixer",
    context: initialContext,
    on: {
      SET_MAIN_VOLUME: { actions: "setMainVolume" },
      SET_TRACK_VOLUME: { actions: "setTrackVolume" },
      SET_TRACK_PAN: { actions: "setPan" },
      SET_TRACK_SOLOMUTE: { actions: "toggleSoloMute" },
      SET_TRACK_FX_NAMES: { actions: "setTrackFxNames" },
      SET_ACTIVE_TRACK_PANELS: { actions: "setActiveTrackPanels" },
      SET_TRACK_REVERB_BYPASS: { actions: "setTrackReverbBypass" },
      SET_TRACK_REVERB_MIX: { actions: "setTrackReverbMix" },
      SET_TRACK_REVERB_PREDELAY: { actions: "setTrackReverbPreDelay" },
      SET_TRACK_REVERB_DECAY: { actions: "setTrackReverbDecay" },
      SET_TRACK_DELAY_BYPASS: { actions: "setTrackDelayBypass" },
      SET_TRACK_DELAY_MIX: { actions: "setTrackDelayMix" },
      SET_TRACK_DELAY_TIME: { actions: "setTrackDelayTime" },
      SET_TRACK_DELAY_FEEDBACK: { actions: "setTrackDelayFeedback" },
      SET_TRACK_PITCHSHIFT_BYPASS: {
        actions: "setTrackPitchShiftBypass",
      },
      SET_TRACK_PITCHSHIFT_MIX: { actions: "setTrackPitchShiftMix" },
      SET_TRACK_PITCHSHIFT_PITCH: { actions: "setTrackPitchShiftPitch" },
      SET_TRACK_PANEL_SIZE: { actions: "setTrackPanelSize" },
      SET_TRACK_PANEL_POSITON: { actions: "setTrackPanelPosition" },
      SET_PLAYBACK_MODE: { actions: "setPlaybackMode" },
      SET_FX_PLAYBACK_MODE: { actions: "setFxPlaybackMode" },
    },
    states: {},
    tsTypes: {} as import("./mixerMachine.typegen").Typegen0,
    schema: {
      context: {} as typeof initialContext,
      events: {} as
        | { type: "LOAD_SONG" }
        | { type: "SET_MAIN_VOLUME"; value: number }
        | {
            type: "SET_TRACK_VOLUME";
            value: number;
            channels: Channel[];
            trackId: number;
          }
        | {
            type: "SET_TRACK_PAN";
            value: number;
            channels: Channel[];
            trackId: number;
          }
        | {
            type: "SET_TRACK_SOLOMUTE";
            value: SoloMuteType;
            channel: Channel;
            trackId: number;
          }
        | {
            type: "SET_TRACK_FX_NAMES";
            trackId: number;
            fxId: number;
            action: string;
            channels: Channel[];
            value: string;
          }
        | {
            type: "SET_TRACK_REVERB_BYPASS";
            checked: boolean;
            reverb: Reverb;
            trackId: number;
          }
        | {
            type: "SET_TRACK_REVERB_MIX";
            value: number;
            reverb: Reverb;
            trackId: number;
          }
        | {
            type: "SET_TRACK_REVERB_PREDELAY";
            value: number;
            reverb: Reverb;
            trackId: number;
          }
        | {
            type: "SET_TRACK_REVERB_DECAY";
            value: number;
            reverb: Reverb;
            trackId: number;
          }
        | {
            type: "SET_TRACK_DELAY_BYPASS";
            checked: boolean;
            delay: FeedbackDelay;
            trackId: number;
          }
        | {
            type: "SET_TRACK_DELAY_MIX";
            value: number;
            delay: FeedbackDelay;
            trackId: number;
          }
        | {
            type: "SET_TRACK_DELAY_TIME";
            value: number;
            delay: FeedbackDelay;
            trackId: number;
          }
        | {
            type: "SET_TRACK_DELAY_FEEDBACK";
            value: number;
            delay: FeedbackDelay;
            trackId: number;
          }
        | {
            type: "SET_TRACK_PITCHSHIFT_BYPASS";
            checked: boolean;
            pitchShift: PitchShift;
            trackId: number;
          }
        | {
            type: "SET_TRACK_PITCHSHIFT_MIX";
            value: number;
            pitchShift: PitchShift;
            trackId: number;
          }
        | {
            type: "SET_TRACK_PITCHSHIFT_PITCH";
            value: number;
            pitchShift: PitchShift;
            trackId: number;
          }
        | { type: "SET_ACTIVE_TRACK_PANELS"; trackId: number }
        | {
            type: "SET_TRACK_PANEL_SIZE";
            trackId: number;
            width: string;
          }
        | {
            type: "SET_TRACK_PANEL_POSITON";
            trackId: number;
            x: number;
            y: number;
          }
        | {
            type: "SET_PLAYBACK_MODE";
            value: string;
            param: "volume" | "pan" | "soloMute";
            trackId: number;
          }
        | {
            type: "SET_FX_PLAYBACK_MODE";
            value: string;
            param: "delay" | "reverb" | "pitchShift";
            trackId: number;
          },
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
  },

  {
    actions: {
      setMainVolume: assign((context, { value }) => {
        return produce(context, (draft) => {
          draft.currentMix.volume = value;
        });
      }),

      setTrackVolume: assign((context, { value, channels, trackId }) => {
        const scaled = dbToPercent(log(value));
        channels[trackId].volume.value = scaled;
        return produce(context, (draft) => {
          draft.currentTracks[trackId].volume = value;
        });
      }),

      setPan: assign((context, { value, channels, trackId }) => {
        channels[trackId].pan.value = value;
        return produce(context, (draft) => {
          draft.currentTracks[trackId].pan = value;
        });
      }),

      toggleSoloMute: assign((context, { value, channel, trackId }) => {
        channel.mute = value.mute;
        channel.solo = value.solo;
        const currentTracks = localStorageGet("currentTracks");
        currentTracks[trackId].soloMute = value;
        localStorageSet("currentTracks", currentTracks);
        return produce(context, (draft) => {
          draft.currentTracks[trackId].soloMute = value;
        });
      }),

      setTrackFxNames: assign(
        (context, { trackId, fxId, action, channels, value }: any): any => {
          if (action === "remove") {
            channels[trackId].disconnect();

            const currentTracks = localStorageGet("currentTracks");
            currentTracks[trackId].fxNames.splice(fxId, 1);
            localStorageSet("currentTracks", currentTracks);

            return produce(context, (draft) => {
              draft.currentTracks[trackId].fxNames.splice(fxId, 1);
            });
          } else {
            const currentTracks = localStorageGet("currentTracks");
            currentTracks[trackId].fxNames[fxId] = value;
            localStorageSet("currentTracks", currentTracks);

            return produce(context, (draft) => {
              draft.currentTracks[trackId].fxNames[fxId] = value;
            });
          }
        }
      ),

      setTrackReverbBypass: assign((context, { checked, reverb, trackId }) => {
        if (checked) {
          reverb?.disconnect();
        } else {
          reverb?.toDestination();
        }

        return produce(context, (draft) => {
          draft.currentTracks[trackId].reverbSettings.bypassed = checked;
        });
      }),

      setTrackReverbMix: assign((context, { value, reverb, trackId }) => {
        if (reverb) reverb.wet.value = value;
        return produce(context, (draft) => {
          draft.currentTracks[trackId].reverbSettings.mix = value;
        });
      }),

      setTrackReverbPreDelay: assign((context, { value, reverb, trackId }) => {
        if (reverb) reverb.preDelay = value;
        return produce(context, (draft) => {
          draft.currentTracks[trackId].reverbSettings.preDelay = value;
        });
      }),

      setTrackReverbDecay: assign((context, { value, reverb, trackId }) => {
        if (reverb) reverb.decay = value;
        return produce(context, (draft) => {
          draft.currentTracks[trackId].reverbSettings.decay = value;
        });
      }),

      setTrackDelayBypass: assign((context, { checked, delay, trackId }) => {
        if (checked) {
          delay.disconnect();
        } else {
          delay.toDestination();
        }
        return produce(context, (draft) => {
          draft.currentTracks[trackId].delaySettings.bypassed = checked;
        });
      }),

      setTrackDelayMix: assign((context, { value, delay, trackId }) => {
        if (delay) delay.wet.value = value;
        return produce(context, (draft) => {
          draft.currentTracks[trackId].delaySettings.mix = value;
        });
      }),

      setTrackDelayTime: assign((context, { value, delay, trackId }) => {
        if (delay) delay.delayTime.value = value;
        return produce(context, (draft) => {
          draft.currentTracks[trackId].delaySettings.delayTime = value;
        });
      }),

      setTrackDelayFeedback: assign((context, { value, delay, trackId }) => {
        if (delay) delay.feedback.value = value;
        return produce(context, (draft) => {
          draft.currentTracks[trackId].delaySettings.feedback = value;
        });
      }),

      setTrackPitchShiftBypass: assign(
        (context, { checked, pitchShift, trackId }) => {
          if (checked) {
            pitchShift?.disconnect();
          } else {
            pitchShift?.toDestination();
          }
          return produce(context, (draft) => {
            draft.currentTracks[trackId].pitchShiftSettings.bypassed = checked;
          });
        }
      ),

      setTrackPitchShiftMix: assign(
        (context, { value, pitchShift, trackId }) => {
          if (pitchShift) pitchShift.wet.value = value;
          return produce(context, (draft) => {
            draft.currentTracks[trackId].pitchShiftSettings.mix = value;
          });
        }
      ),

      setTrackPitchShiftPitch: assign(
        (context, { value, pitchShift, trackId }) => {
          if (pitchShift) pitchShift.pitch = value;
          return produce(context, (draft) => {
            draft.currentTracks[trackId].pitchShiftSettings.pitch = value;
          });
        }
      ),

      setActiveTrackPanels: assign((context, { trackId }) => {
        const currentTracks = localStorageGet("currentTracks");
        currentTracks[trackId].panelActive =
          !currentTracks[trackId].panelActive;
        localStorageSet("currentTracks", currentTracks);
        return produce(context, (draft) => {
          draft.currentTracks[trackId].panelActive =
            !draft.currentTracks[trackId].panelActive;
        });
      }),

      setTrackPanelSize: assign((context, { width, trackId }) => {
        return produce(context, (draft) => {
          draft.currentTracks[trackId].panelSize.width = width;
        });
      }),

      setTrackPanelPosition: assign((context, { x, y, trackId }) => {
        return produce(context, (draft) => {
          draft.currentTracks[trackId].panelPosition = { x, y };
        });
      }),

      setPlaybackMode: assign(
        (context, { value, param, trackId }: any): any => {
          const currentTracks = localStorageGet("currentTracks");
          currentTracks[trackId][`${param}Mode`] = value;
          localStorageSet("currentTracks", currentTracks);
          return produce(context, (draft) => {
            draft.currentTracks[trackId][`${param}Mode`] = value;
          });
        }
      ),

      // setFxPlaybackMode: assign(async (context, { value, param, trackId }) => {
      //   await db.currentTracks
      //     .where("id")
      //     .equals(trackId + 1)
      //     .modify({
      //       [`${param}Settings`]: {
      //         ...currentTracks[`${param}Settings`],
      //         playbackMode: value,
      //       },
      //     });

      //   return produce(context, (draft) => {
      //     draft.currentTracks[trackId][`${param}Settings`].playbackMode = value;
      //   });
      // }),
    },
  }
);
