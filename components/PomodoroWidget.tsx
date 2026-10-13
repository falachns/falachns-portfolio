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
    <div className="pomodoro-widget" aria-label="Interactive Focus Pomodoro Timer">
      <div className="pomodoro-tabs">
        <button
          type="button"
          className={`pomo-tab ${mode === "focus" ? "active" : ""}`}
          onClick={() => switchMode("focus")}
        >
          Focus (25m)
        </button>
        <button
          type="button"
          className={`pomo-tab ${mode === "short" ? "active" : ""}`}
          onClick={() => switchMode("short")}
        >
          Short Break (5m)
        </button>
        <button
          type="button"
          className={`pomo-tab ${mode === "long" ? "active" : ""}`}
          onClick={() => switchMode("long")}
        >
          Long Break (15m)
        </button>
      </div>

      <div className="pomodoro-display">
        <div className="timer-badge">
          <HugeiconsIcon icon={TimeQuarterPassIcon} size={15} strokeWidth={2} aria-hidden="true" />
          <span>{mode === "focus" ? "Stay in the flow" : "Recharge"}</span>
        </div>
        <div className="timer-time" role="timer" aria-live="off">
          {formattedTime}
        </div>
      </div>

      <div className="pomodoro-controls">
        <button
          type="button"
          onClick={toggleRun}
          className={`pomo-btn pomo-primary ${isRunning ? "running" : ""}`}
          aria-label={isRunning ? "Pause timer" : "Start timer"}
        >
          <HugeiconsIcon icon={isRunning ? PauseIcon : PlayIcon} size={16} strokeWidth={2} aria-hidden="true" />
          <span>{isRunning ? "Pause" : "Start Focus"}</span>
        </button>

        <button
          type="button"
          onClick={resetTimer}
          className="pomo-btn pomo-secondary"
          aria-label="Reset timer"
        >
          <HugeiconsIcon icon={RefreshIcon} size={16} strokeWidth={2} aria-hidden="true" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}
