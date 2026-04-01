import {createContext, type Dispatch} from "react";

export enum PlayBackActionType {
    play = 'PLAY',
    pause = 'PAUSE',
    reset = 'RESET',
    nextStep = 'NEXT_STEP',
    nextSingleStep = 'NEXT_SINGLE_STEP',
    prevStep = 'PREV_STEP',
    setIntervalMs = 'SET_INTERVAL_MS'
}

export type CurrentPlaybackAction =
    | {type: PlayBackActionType.play}
    | {type: PlayBackActionType.pause}
    | {type: PlayBackActionType.reset}
    | {type: PlayBackActionType.nextStep; maxStep: number}
    | {type: PlayBackActionType.prevStep}
    | {type: PlayBackActionType.nextSingleStep; maxStep: number}
    | {type: PlayBackActionType.setIntervalMs; intervalMs: number};


export interface CurrentPlaybackState {
    currentStep: number;
    isPlaying: boolean;
    maxStep: number;
    intervalMs: number;
}

export interface CurrentPlaybackContextValue {
    state: CurrentPlaybackState;
    dispatch: Dispatch<CurrentPlaybackAction>;
}

const defaultState: CurrentPlaybackState = {
    currentStep: 0,
    isPlaying: false,
    maxStep: 0,
    intervalMs: 500,
};

const defaultContextValue: CurrentPlaybackContextValue = {
    state: defaultState,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dispatch: (_action: CurrentPlaybackAction) => undefined,
};

export const CurrentPlaybackContext = createContext<CurrentPlaybackContextValue>(defaultContextValue);
