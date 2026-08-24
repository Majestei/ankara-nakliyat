"use client";

import { useEffect } from "react";
import { trackConversion } from "@/lib/gtag";

export default function ConversionTracker() {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest("a");
            if (!target) return;

            const href = target.getAttribute("href") || "";
            if (href.startsWith("tel:") || href.includes("wa.me") || href.includes("whatsapp.com")) {
                trackConversion();
            }
        };

        document.addEventListener("click", handleClick, { passive: true });
        return () => document.removeEventListener("click", handleClick);
    }, []);

    return null;
}
