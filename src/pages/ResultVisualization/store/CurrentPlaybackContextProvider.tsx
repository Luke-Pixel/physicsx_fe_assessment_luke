import {type ReactNode, useReducer} from "react";
import {
    CurrentPlaybackContext,
    type CurrentPlaybackAction,
    type CurrentPlaybackState,
} from "./CurrentPlaybackContext.ts";

interface CurrentPlaybackContextProviderProps {
    children: ReactNode;
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
        default:
            return state;
    }
};

const CurrentPlaybackContextProvider = ({children}: CurrentPlaybackContextProviderProps) => {
    const [state, dispatch] = useReducer(currentPlaybackReducer, initialState);

    return(
        <CurrentPlaybackContext.Provider value={{state, dispatch}}>
            {children}
        </CurrentPlaybackContext.Provider>
    )
}

export default CurrentPlaybackContextProvider;
