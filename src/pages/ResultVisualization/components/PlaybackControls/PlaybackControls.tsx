import {useContext} from "react";
import {CurrentPlaybackContext, PlayBackActionType} from "../../store/CurrentPlaybackContext.ts";

const PlaybackControls = () => {
    const {state, dispatch} = useContext(CurrentPlaybackContext);

    return (
        <div>
            <div style={{display: "flex", gap: "12px"}}>
                <button disabled={state.currentStep === 0} onClick={() => dispatch({type: PlayBackActionType.prevStep})}>Prev Step</button>
                <button type="button" onClick={() => dispatch({type: PlayBackActionType.play})}>
                    Play
                </button>
                <button type="button" onClick={() => dispatch({type: PlayBackActionType.pause})}>
                    Pause
                </button>
                <button disabled={state.currentStep === state.maxStep} onClick={() => dispatch({type: PlayBackActionType.nextStep, maxStep: state.maxStep})}>Next Step</button>
                <button type="button" onClick={() => dispatch({type: PlayBackActionType.reset})}>
                    Reset
                </button>
            </div>
            <p>Current Step: {state.currentStep}</p>
        </div>
    );
};

export default PlaybackControls;
