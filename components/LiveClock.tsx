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

    const rafUpdate = () => {
      requestAnimationFrame(updateTime);
    };

    const handle = requestAnimationFrame(updateTime);
    const interval = setInterval(rafUpdate, 1000);
    return () => {
      cancelAnimationFrame(handle);
      clearInterval(interval);
    };
  }, []);

  return (
    <span className="footer-clock" aria-label="Current time in Bandung, Indonesia (UTC+7)" suppressHydrationWarning>
      <span>Bandung, Indonesia (UTC+7)</span>
      {timeString && (
        <span className="footer-clock-time" suppressHydrationWarning>
          {timeString}
        </span>
      )}
    </span>
  );
}
