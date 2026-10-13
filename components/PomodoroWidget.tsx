"use client";

import { useState, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlayIcon, PauseIcon, RefreshIcon, TimeQuarterPassIcon } from "@hugeicons/core-free-icons";

export default function PomodoroWidget() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"focus" | "short" | "long">("focus");

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsLeft]);

  const switchMode = (newMode: "focus" | "short" | "long") => {
    setMode(newMode);
    setIsRunning(false);
    if (newMode === "focus") setSecondsLeft(25 * 60);
    else if (newMode === "short") setSecondsLeft(5 * 60);
    else setSecondsLeft(15 * 60);
  };

  const toggleRun = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    if (mode === "focus") setSecondsLeft(25 * 60);
    else if (mode === "short") setSecondsLeft(5 * 60);
    else setSecondsLeft(15 * 60);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="pomo-clean-widget" aria-label="Interactive Focus Pomodoro Timer">
      <div className="pomo-clean-tabs">
        <button
          type="button"
          className={`pomo-clean-tab ${mode === "focus" ? "active" : ""}`}
          onClick={() => switchMode("focus")}
        >
          Focus (25m)
        </button>
        <button
          type="button"
          className={`pomo-clean-tab ${mode === "short" ? "active" : ""}`}
          onClick={() => switchMode("short")}
        >
          Short (5m)
        </button>
        <button
          type="button"
          className={`pomo-clean-tab ${mode === "long" ? "active" : ""}`}
          onClick={() => switchMode("long")}
        >
          Long (15m)
        </button>
      </div>

      <div className="pomo-clean-display" role="timer" aria-live="off">
        {formattedTime}
      </div>

      <div className="pomo-clean-actions">
        <button
          type="button"
          onClick={toggleRun}
          className="pomo-btn-clean"
          aria-label={isRunning ? "Pause timer" : "Start timer"}
        >
          <HugeiconsIcon icon={isRunning ? PauseIcon : PlayIcon} size={14} strokeWidth={2} aria-hidden="true" className="inline mr-1.5 align-middle" />
          <span>{isRunning ? "Pause" : "Start"}</span>
        </button>

        <button
          type="button"
          onClick={resetTimer}
          className="pomo-btn-clean btn-secondary"
          aria-label="Reset timer"
        >
          <HugeiconsIcon icon={RefreshIcon} size={14} strokeWidth={2} aria-hidden="true" className="inline mr-1.5 align-middle" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}
