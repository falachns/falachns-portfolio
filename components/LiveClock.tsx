"use client";

import { useEffect, useState } from "react";

export default function LiveClock() {
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Jakarta",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);
      setTimeString(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="footer-clock" aria-label="Current time in Bandung, Indonesia (UTC+7)">
      <span>Bandung, Indonesia (UTC+7)</span>
      {timeString && <span className="footer-clock-time">{timeString}</span>}
    </span>
  );
}
