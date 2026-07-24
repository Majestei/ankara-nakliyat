"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    
    // Smooth out the mouse movement using Framer Motion directly
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    
    const springConfig = { damping: 28, stiffness: 500, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);
    const [isPointerFine, setIsPointerFine] = useState(true);

    useEffect(() => {
        // Detect if the device has a fine pointer (mouse)
        const mediaQuery = window.matchMedia("(pointer: fine)");
        setIsPointerFine(mediaQuery.matches);
        
        // Disable on bots
        if (navigator.userAgent.includes('Googlebot')) setIsPointerFine(false);
        
        if (!mediaQuery.matches) return;

        const updateMousePosition = (e: MouseEvent) => {
            cursorX.set(e.clientX - 8);
            cursorY.set(e.clientY - 8);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if hovering over interactive elements including summary and role=button
            if (
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.tagName.toLowerCase() === "summary" ||
                target.getAttribute("role") === "button" ||
                target.closest("a") ||
                target.closest("button") ||
                target.closest("summary") ||
                target.closest("[role='button']") ||
                target.classList.contains("cursor-pointer")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    const variants = {
        default: {
            scale: 1,
            backgroundColor: "rgba(249, 115, 22, 0.5)",
            border: "1px solid rgba(249, 115, 22, 1)",
        },
        hover: {
            scale: 3, // Scales from 16px to 48px
            backgroundColor: "rgba(249, 115, 22, 0.1)",
            border: "1px solid rgba(249, 115, 22, 0.8)",
        }
    };

    if (!isPointerFine) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 z-[999999] rounded-full pointer-events-none hidden md:block w-4 h-4"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                mixBlendMode: "difference"
            }}
            variants={variants}
            animate={isHovering ? "hover" : "default"}
        />
    );
}
