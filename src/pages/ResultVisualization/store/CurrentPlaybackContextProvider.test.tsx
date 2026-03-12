import {act, fireEvent, render, screen} from "@testing-library/react";
import {describe, expect, it, vi, afterEach} from "vitest";
import CurrentPlaybackContextProvider from "./CurrentPlaybackContextProvider.tsx";
import {CurrentPlaybackContext} from "./CurrentPlaybackContext.ts";

const CurrentPlaybackConsumer = () => (
    <CurrentPlaybackContext.Consumer>
        {({state, dispatch}) => (
            <div>
                <span>{`${state.currentStep}-${state.isPlaying}`}</span>
                <button type="button" onClick={() => dispatch({type: "PLAY"})}>
                    Play
                </button>
                <button type="button" onClick={() => dispatch({type: "RESET"})}>
                    Reset
                </button>
            </div>
        )}
    </CurrentPlaybackContext.Consumer>
);

describe("CurrentPlaybackContextProvider", () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it("provides the default playback state", () => {
        render(
            <CurrentPlaybackContextProvider maxStep={4}>
                <CurrentPlaybackConsumer/>
            </CurrentPlaybackContextProvider>,
        );

        expect(screen.getByText("0-false")).toBeTruthy();
    });

    it("increments the current step while playing and stops at the end", () => {
        vi.useFakeTimers();

        render(
            <CurrentPlaybackContextProvider maxStep={2}>
                <CurrentPlaybackConsumer/>
            </CurrentPlaybackContextProvider>,
        );

        fireEvent.click(screen.getByRole("button", {name: "Play"}));

        act(() => {
            vi.advanceTimersByTime(1500);
        });

        expect(screen.getByText("2-false")).toBeTruthy();
    });

    it("resets playback back to step zero", () => {
        vi.useFakeTimers();

        render(
            <CurrentPlaybackContextProvider maxStep={4}>
                <CurrentPlaybackConsumer/>
            </CurrentPlaybackContextProvider>,
        );

        fireEvent.click(screen.getByRole("button", {name: "Play"}));

        act(() => {
            vi.advanceTimersByTime(500);
        });

        fireEvent.click(screen.getByRole("button", {name: "Reset"}));

        expect(screen.getByText("0-false")).toBeTruthy();
    });
});
