import {useContext} from "react";
import {CurrentPlaybackContext, PlayBackActionType} from "../../store/CurrentPlaybackContext.ts";

const PlaybackControls = () => {
    const {state, dispatch} = useContext(CurrentPlaybackContext);

    return (
        <div>
            <div style={{display: "flex", gap: "12px"}}>
                <button disabled={state.currentStep === 0} onClick={() => dispatch({type: PlayBackActionType.prevStep})}>Prev Step</button>
                <button type="button" disabled={state.isPlaying} onClick={() => dispatch({type: PlayBackActionType.play})}>
                    Play
                </button>
                <button type="button" disabled={!state.isPlaying} onClick={() => dispatch({type: PlayBackActionType.pause})}>
                    Pause
                </button>
                <button disabled={state.currentStep === state.maxStep} onClick={() => dispatch({type: PlayBackActionType.nextSingleStep, maxStep: state.maxStep})}>Next Step</button>
                <button type="button" onClick={() => dispatch({type: PlayBackActionType.reset})}>
                    Reset
                </button>
            </div>
            <div className='playback-control-container'>
                <label htmlFor="playback-range">Playback Speed:</label>
                <input
                    id='playback-range'
                    type="range"
                    min={100}
                    max={5000}
                    step={100}
                    value={state.intervalMs}
                    className="playback-control"
                    onChange={(event) =>
                        dispatch({
                            type: PlayBackActionType.setIntervalMs,
                            intervalMs: Number(event.target.value),
                        })}
                />
                <span>{state.intervalMs}ms</span>
            </div>
            <p>Current Step: {state.currentStep}</p>
        </div>
    );
};

export default PlaybackControls;
