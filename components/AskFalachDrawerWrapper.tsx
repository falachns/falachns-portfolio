"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const AskFalachDrawer = dynamic(
  () => import("@/components/AskFalachDrawer"),
  { ssr: false }
);

export default function AskFalachDrawerWrapper() {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpened(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        setIsOpened(true);
      }
    };

    window.addEventListener("open-ask-falach", handleOpen);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-ask-falach", handleOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!isOpened) return null;

  return <AskFalachDrawer initialOpen={true} />;
}
