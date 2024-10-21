import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef(); // Reference to the dialog
  const startTime = useRef(); // To store the time when the timer started

  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const [timeLeft, setTimeLeft] = useState(targetTime); // To store the time left

  function handleStart() {
    startTime.current = Date.now(); // Record the start time
    timer.current = setTimeout(() => {
      setTimerExpired(true);
      dialog.current.showModal(); // Show the dialog when time expires
      setTimeLeft(0); // No time left
    }, targetTime * 1000);

    setTimerStarted(true);
  }

  function handleStop() {
    const elapsedTime = (Date.now() - startTime.current) / 1000;
    const remainingTime = Math.max(0, targetTime - elapsedTime);
    setTimeLeft(remainingTime.toFixed(1)); // Update the time left with 1 decimal place

    clearTimeout(timer.current);
    setTimerStarted(false);
    setTimerExpired(false);
    dialog.current.showModal(); // Show the dialog with the remaining time
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        result="lost"
        timeLeft={timeLeft}
      />
      <section className="challenge">
        <h2>{title}</h2>

        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerStarted ? "active" : undefined}>
          {timerStarted ? "Time is running ..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
