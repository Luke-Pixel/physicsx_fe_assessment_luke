import {act, fireEvent, render, screen} from "@testing-library/react";
import {afterEach, describe, expect, it, vi} from "vitest";
import CurrentPlaybackContextProvider from "./CurrentPlaybackContextProvider.tsx";
import {CurrentPlaybackContext, PlayBackActionType} from "./CurrentPlaybackContext.ts";

const CurrentPlaybackConsumer = () => (
    <CurrentPlaybackContext.Consumer>
        {({state, dispatch}) => (
            <div>
                <span>{`${state.currentStep}-${state.isPlaying}-${state.intervalMs}`}</span>
                <button type="button" onClick={() => dispatch({type: PlayBackActionType.play})}>
                    Play
                </button>
                <button type="button" onClick={() => dispatch({type: PlayBackActionType.reset})}>
                    Reset
                </button>
                <button type="button" onClick={() => dispatch({type: PlayBackActionType.setIntervalMs, intervalMs: 1000})}>
                    Set Interval
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

        expect(screen.getByText("0-false-500")).toBeTruthy();
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

        expect(screen.getByText("2-false-500")).toBeTruthy();
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

        expect(screen.getByText("0-false-500")).toBeTruthy();
    });

    it("uses the updated interval for playback timing", () => {
        vi.useFakeTimers();

        render(
            <CurrentPlaybackContextProvider maxStep={4}>
                <CurrentPlaybackConsumer/>
            </CurrentPlaybackContextProvider>,
        );

        fireEvent.click(screen.getByRole("button", {name: "Set Interval"}));
        fireEvent.click(screen.getByRole("button", {name: "Play"}));

        act(() => {
            vi.advanceTimersByTime(900);
        });

        expect(screen.getByText("0-true-1000")).toBeTruthy();

        act(() => {
            vi.advanceTimersByTime(100);
        });

        expect(screen.getByText("1-true-1000")).toBeTruthy();
    });
});
