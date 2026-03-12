import {createContext, type Dispatch} from "react";

export type CurrentPlaybackAction =
    | {type: "PLAY"}
    | {type: "PAUSE"}
    | {type: "RESET"};

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
    dispatch: (_action: CurrentPlaybackAction) => undefined,
};

export const CurrentPlaybackContext = createContext<CurrentPlaybackContextValue>(defaultContextValue);
