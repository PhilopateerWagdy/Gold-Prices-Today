"use client";

import { useEffect, useState } from "react";

export default function DateTime({ locale }: { locale: "ar" | "en" }) {
  const [dateString, setDateString] = useState("");
  const language = locale === "ar" ? locale + "-EG" : locale + "-US";

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();

      const formatted = new Intl.DateTimeFormat(language, {
        timeZone: "Africa/Cairo",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(now);

      setDateString(formatted);
    };

    updateDate();
    const interval = setInterval(updateDate, 60000);

    return () => clearInterval(interval);
  }, [language]); // re-run effect if language changes

  return (
    <div>
      <h5 className="mt-1 text-lg">{dateString}</h5>
    </div>
  );
}
