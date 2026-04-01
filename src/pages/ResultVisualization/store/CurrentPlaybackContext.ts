import {createContext, type Dispatch} from "react";

export enum PlayBackActionType {
    play = 'PLAY',
    pause = 'PAUSE',
    reset = 'RESET',
    nextStep = 'NEXT_STEP',
    prevStep = 'PREV_STEP'
}

export type CurrentPlaybackAction =
    | {type: PlayBackActionType.play}
    | {type: PlayBackActionType.pause}
    | {type: PlayBackActionType.reset}
    | {type: PlayBackActionType.nextStep; maxStep: number}
    | {type: PlayBackActionType.prevStep};


export interface CurrentPlaybackState {
    currentStep: number;
    isPlaying: boolean;
    maxStep: number
}

export interface CurrentPlaybackContextValue {
    state: CurrentPlaybackState;
    dispatch: Dispatch<CurrentPlaybackAction>;
}

const defaultState: CurrentPlaybackState = {
    currentStep: 0,
    isPlaying: false,
    maxStep: 0
};

const defaultContextValue: CurrentPlaybackContextValue = {
    state: defaultState,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dispatch: (_action: CurrentPlaybackAction) => undefined,
};

export const CurrentPlaybackContext = createContext<CurrentPlaybackContextValue>(defaultContextValue);
