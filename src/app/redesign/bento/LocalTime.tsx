"use client";

import { useEffect, useState } from "react";

/** Live Munich clock. Renders a placeholder on the server to avoid hydration mismatch. */
export default function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Berlin",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span suppressHydrationWarning>
      {time ?? "--:--"}
      <span className="text-[#6E6A5F]"> CET</span>
    </span>
  );
}
