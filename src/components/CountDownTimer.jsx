import { useState, useEffect } from "react";
import Header from "./Header";
import Confetti from "react-confetti";

const CountDownTimer = () => {
  let targetedTime = new Date("2025-03-30T00:00:00");

  // Calculate the time left for the event
  let calculateTimeLeft = () => {
    let now = new Date();
    let remainingTime = targetedTime - now;

    if (remainingTime <= 0) {
      return { days: 0, hours: 0, min: 0, sec: 0 };
    }

    let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    let hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    let min = Math.floor((remainingTime / (1000 * 60)) % 60);
    let sec = Math.floor((remainingTime / 1000) % 60);

    return { days, hours, min, sec };
  };

  let [timeleft, setTimeLeft] = useState(calculateTimeLeft());
  let [showConfetti, setShowConfetti] = useState(false);
  let [isNewFest, setIsNewFest] = useState(false);

  useEffect(() => {
    if (
      timeleft.days === 0 &&
      timeleft.hours === 0 &&
      timeleft.min === 0 &&
      timeleft.sec === 0
    ) {
      setShowConfetti(true);
      setIsNewFest(true);

      let confettiRemoval = setTimeout(() => {
        setShowConfetti(false);
      }, 10 * 60 * 1000);

      return () => clearTimeout(confettiRemoval);
    }

    let timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeleft]);

  return (
    <div className="countdown-timer">
      <Header isNewFest={isNewFest} timeleft={timeleft} />
      {showConfetti && <Confetti />} 
    </div>
  );
};

export default CountDownTimer;
