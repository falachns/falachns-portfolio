"use client";

import { useState, useEffect } from "react";

const GREETINGS = ["Good day!", "Ni Hao!", "Bonjour!"];

export default function GreetingSwitcher() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="greeting-rotator" key={GREETINGS[index]}>
      {GREETINGS[index]}
    </span>
  );
}
