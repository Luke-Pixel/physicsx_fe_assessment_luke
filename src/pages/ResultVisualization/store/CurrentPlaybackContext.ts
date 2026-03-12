import {createContext, type Dispatch} from "react";

export type CurrentPlaybackAction =
    | {type: "PLAY"}
    | {type: "PAUSE"}
    | {type: "RESET"}
    | {type: "NEXT_STEP"; maxStep: number}
    | {type: "END"; maxStep: number};

export interface CurrentPlaybackState {
    currentStep: number;
    isPlaying: boolean;
}

export interface CurrentPlaybackContextValue {
    state: CurrentPlaybackState;
    dispatch: Dispatch<CurrentPlaybackAction>;
}

const defaultState: CurrentPlaybackState = {
    currentStep: 0,
    isPlaying: false,
};

const defaultContextValue: CurrentPlaybackContextValue = {
    state: defaultState,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dispatch: (_action: CurrentPlaybackAction) => undefined,
};

export const CurrentPlaybackContext = createContext<CurrentPlaybackContextValue>(defaultContextValue);
