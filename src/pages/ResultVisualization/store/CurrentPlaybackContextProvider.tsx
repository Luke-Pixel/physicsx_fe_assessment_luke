import {type ReactNode, useEffect, useReducer} from "react";
import {
    CurrentPlaybackContext,
    type CurrentPlaybackAction,
    type CurrentPlaybackState,
} from "./CurrentPlaybackContext.ts";

interface CurrentPlaybackContextProviderProps {
    children: ReactNode;
    maxStep: number;
}

const initialState: CurrentPlaybackState = {
    currentStep: 0,
    isPlaying: false,
};

const currentPlaybackReducer = (
    state: CurrentPlaybackState,
    action: CurrentPlaybackAction,
): CurrentPlaybackState => {
    switch (action.type) {
        case "PLAY":
            return {
                ...state,
                isPlaying: true,
            };
        case "PAUSE":
            return {
                ...state,
                isPlaying: false,
            };
        case "RESET":
            return {
                currentStep: 0,
                isPlaying: false,
            };
        case "NEXT_STEP":
            if (state.currentStep >= action.maxStep) {
                return {
                    currentStep: action.maxStep,
                    isPlaying: false,
                };
            }

            if (state.currentStep + 1 >= action.maxStep) {
                return {
                    currentStep: action.maxStep,
                    isPlaying: false,
                };
            }

            return {
                ...state,
                currentStep: state.currentStep + 1,
            };
        default:
            return state;
    }
};

const CurrentPlaybackContextProvider = ({children, maxStep}: CurrentPlaybackContextProviderProps) => {
    const [state, dispatch] = useReducer(currentPlaybackReducer, initialState);

    useEffect(() => {
        if (!state.isPlaying) {
            return;
        }

        const intervalId = window.setInterval(() => {
            dispatch({type: "NEXT_STEP", maxStep});
        }, 500);

        return () => window.clearInterval(intervalId);
    }, [maxStep, state.isPlaying]);

    return(
        <CurrentPlaybackContext.Provider value={{state, dispatch}}>
            {children}
        </CurrentPlaybackContext.Provider>
    )
}

export default CurrentPlaybackContextProvider;
