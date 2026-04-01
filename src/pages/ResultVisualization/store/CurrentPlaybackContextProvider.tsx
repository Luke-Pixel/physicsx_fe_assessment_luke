import {type ReactNode, useEffect, useReducer} from "react";
import {
    type CurrentPlaybackAction,
    CurrentPlaybackContext,
    type CurrentPlaybackState,
    PlayBackActionType,
} from "./CurrentPlaybackContext.ts";

interface CurrentPlaybackContextProviderProps {
    children: ReactNode;
    maxStep: number;
}

const currentPlaybackReducer = (
    state: CurrentPlaybackState,
    action: CurrentPlaybackAction,
): CurrentPlaybackState => {
    switch (action.type) {
        case PlayBackActionType.play:
            return {
                ...state,
                isPlaying: true,
            };
        case PlayBackActionType.pause:
            return {
                ...state,
                isPlaying: false,
            };
        case PlayBackActionType.reset:
            return {
                ...state,
                currentStep: 0,
                isPlaying: false,
            };
        case PlayBackActionType.setIntervalMs:
            return {
                ...state,
                intervalMs: action.intervalMs,
            };
        case PlayBackActionType.nextStep:
            if (state.currentStep >= action.maxStep) {
                return {
                    ...state,
                    currentStep: action.maxStep,
                    isPlaying: false,
                };
            }

            if (state.currentStep + 1 >= action.maxStep) {
                return {
                    ...state,
                    currentStep: action.maxStep,
                    isPlaying: false,
                };
            }

            return {
                ...state,
                currentStep: state.currentStep + 1,
            };
        case PlayBackActionType.nextSingleStep:
            if (state.currentStep >= action.maxStep) {
                return {
                    ...state,
                    currentStep: action.maxStep,
                    isPlaying: false,
                };
            }


            return {
                ...state,
                currentStep: state.currentStep + 1,
                isPlaying: false,
            };
        case PlayBackActionType.prevStep:
            return {
                ...state,
                currentStep:  Math.max(0, state.currentStep - 1),
                isPlaying: false
            }

        default:
            return state;
    }
};

const CurrentPlaybackContextProvider = ({children, maxStep}: CurrentPlaybackContextProviderProps) => {

    const initialState: CurrentPlaybackState = {
        currentStep: 0,
        isPlaying: false,
        maxStep,
        intervalMs: 500,
    };

    const [state, dispatch] = useReducer(currentPlaybackReducer, initialState);

    useEffect(() => {
        if (!state.isPlaying) {
            return;
        }

        const intervalId = window.setInterval(() => {
            dispatch({type: PlayBackActionType.nextStep, maxStep});
        }, state.intervalMs);

        return () => window.clearInterval(intervalId);
    }, [maxStep, state.intervalMs, state.isPlaying]);

    return(
        <CurrentPlaybackContext.Provider value={{state, dispatch}}>
            {children}
        </CurrentPlaybackContext.Provider>
    )
}

export default CurrentPlaybackContextProvider;
