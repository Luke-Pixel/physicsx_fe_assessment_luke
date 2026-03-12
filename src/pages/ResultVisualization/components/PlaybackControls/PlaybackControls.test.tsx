import {fireEvent, render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import PlaybackControls from "./PlaybackControls.tsx";
import {CurrentPlaybackContext, type CurrentPlaybackContextValue} from "../../store/CurrentPlaybackContext.ts";

describe("PlaybackControls", () => {
    it("shows the current step", () => {
        const contextValue: CurrentPlaybackContextValue = {
            state: {currentStep: 3, isPlaying: false},
            dispatch: vi.fn(),
        };

        render(
            <CurrentPlaybackContext.Provider value={contextValue}>
                <PlaybackControls/>
            </CurrentPlaybackContext.Provider>,
        );

        expect(screen.getByText("Current Step: 3")).toBeTruthy();
    });

    it("dispatches playback actions when buttons are clicked", () => {
        const dispatch = vi.fn();
        const contextValue: CurrentPlaybackContextValue = {
            state: {currentStep: 0, isPlaying: false},
            dispatch,
        };

        render(
            <CurrentPlaybackContext.Provider value={contextValue}>
                <PlaybackControls/>
            </CurrentPlaybackContext.Provider>,
        );

        fireEvent.click(screen.getByRole("button", {name: "Play"}));
        fireEvent.click(screen.getByRole("button", {name: "Pause"}));
        fireEvent.click(screen.getByRole("button", {name: "Reset"}));

        expect(dispatch).toHaveBeenNthCalledWith(1, {type: "PLAY"});
        expect(dispatch).toHaveBeenNthCalledWith(2, {type: "PAUSE"});
        expect(dispatch).toHaveBeenNthCalledWith(3, {type: "RESET"});
    });
});
