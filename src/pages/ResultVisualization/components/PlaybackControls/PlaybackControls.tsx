import {useContext} from "react";
import {CurrentPlaybackContext} from "../../store/CurrentPlaybackContext.ts";

const PlaybackControls = () => {
    const {state, dispatch} = useContext(CurrentPlaybackContext);

    return (
        <div>
            <div style={{display: "flex", gap: "12px"}}>
                <button type="button" onClick={() => dispatch({type: "PLAY"})}>
                    Play
                </button>
                <button type="button" onClick={() => dispatch({type: "PAUSE"})}>
                    Pause
                </button>
                <button type="button" onClick={() => dispatch({type: "RESET"})}>
                    Reset
                </button>
            </div>
            <p>Current Step: {state.currentStep}</p>
        </div>
    );
};

export default PlaybackControls;
