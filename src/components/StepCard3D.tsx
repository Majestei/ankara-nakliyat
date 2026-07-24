"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

interface StepCard3DProps {
    num: string;
    title: string;
    desc: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
    index: number;
}

export default function StepCard3D({ num, title, desc, icon, isActive, onClick, index }: StepCard3DProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.8, type: "spring", bounce: 0.4 }}
            className="perspective-1000 w-full"
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={onClick}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className={`relative group cursor-pointer h-[320px] rounded-[2.5rem] p-8 transition-all duration-700 ${
                    isActive 
                        ? "bg-slate-950 border-primary-500/50 shadow-[0_40px_100px_rgba(249,115,22,0.2)]" 
                        : "bg-white border-slate-200/60 shadow-xl hover:border-primary-300 hover:shadow-2xl"
                } border-2 overflow-hidden`}
            >
                {/* Holographic Number (Background) */}
                <motion.div 
                    style={{ transform: "translateZ(-50px)" }}
                    className={`absolute -top-10 -right-6 text-[10rem] font-black leading-none pointer-events-none select-none transition-colors duration-700 ${
                        isActive ? "text-primary-500/10" : "text-slate-100"
                    }`}
                >
                    {num}
                </motion.div>

                {/* Active Glow Effect */}
                {isActive && (
                    <motion.div 
                        layoutId="activeGlow"
                        className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-transparent to-transparent z-0"
                    />
                )}

                <div className="relative z-10 h-full flex flex-col items-center text-center" style={{ transform: "translateZ(50px)" }}>
                    {/* Icon Container */}
                    <motion.div 
                        style={{ transform: "translateZ(80px)" }}
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-700 ${
                            isActive 
                                ? "bg-primary-500 text-white shadow-[0_0_30px_rgba(249,115,22,0.5)] rotate-[360deg]" 
                                : "bg-primary-50 text-primary-500 group-hover:bg-primary-100 group-hover:scale-110 group-hover:rotate-12"
                        }`}
                    >
                        <div className="w-8 h-8">{icon}</div>
                    </motion.div>

                    {/* Step Info */}
                    <motion.div 
                        style={{ transform: "translateZ(30px)" }}
                        className={`text-[10px] font-black uppercase tracking-[0.4em] mb-3 transition-colors ${
                            isActive ? "text-primary-400" : "text-slate-400"
                        }`}
                    >
                        Adım {num}
                    </motion.div>

                    <motion.h3 
                        style={{ transform: "translateZ(60px)" }}
                        className={`text-2xl font-black mb-4 transition-colors ${
                            isActive ? "text-white" : "text-slate-900"
                        }`}
                    >
                        {title}
                    </motion.h3>

                    <motion.p 
                        style={{ transform: "translateZ(40px)" }}
                        className={`text-sm leading-relaxed transition-colors ${
                            isActive ? "text-white/70" : "text-slate-500"
                        }`}
                    >
                        {desc}
                    </motion.p>
                </div>

                {/* Reflection Sweep */}
                <div className="absolute top-0 left-[-150%] w-[100%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-35deg] group-hover:left-[250%] transition-all duration-[1500ms] ease-in-out pointer-events-none" />
            </motion.div>
        </motion.div>
    );
}
