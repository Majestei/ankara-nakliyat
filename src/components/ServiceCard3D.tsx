"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import Link from "next/link";
import { IconArrow } from "./Icons";

interface ServiceCard3DProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    href: string;
    index: number;
}

export default function ServiceCard3D({ title, description, icon, href, index }: ServiceCard3DProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className="perspective-1000"
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="group relative h-[420px] w-full rounded-[2.5rem] bg-white border border-slate-200/60 shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_40px_100px_rgba(249,115,22,0.15)] overflow-hidden"
            >
                {/* Glossy Overlay */}
                <motion.div
                    style={{
                        transform: "translateZ(100px)",
                    }}
                    className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/40 via-transparent to-transparent"
                />

                <div className="relative z-20 p-10 h-full flex flex-col items-start" style={{ transform: "translateZ(50px)" }}>
                    {/* Icon Container with Parallax */}
                    <motion.div 
                        style={{ transform: "translateZ(80px)" }}
                        className="w-16 h-16 rounded-2xl bg-primary-50 text-primary-500 flex items-center justify-center mb-8 group-hover:bg-primary-500 group-hover:text-white transition-all duration-700 shadow-lg shadow-primary-500/10 group-hover:shadow-primary-500/30 group-hover:rotate-[12deg]"
                    >
                        {icon}
                    </motion.div>

                    {/* Title with Parallax */}
                    <motion.h3 
                        style={{ transform: "translateZ(60px)" }}
                        className="text-2xl font-black text-slate-950 mb-4 group-hover:text-primary-600 transition-colors tracking-tight"
                    >
                        {title}
                    </motion.h3>

                    {/* Description with Parallax */}
                    <motion.p 
                        style={{ transform: "translateZ(40px)" }}
                        className="text-slate-500 leading-relaxed mb-10 text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity line-clamp-3"
                    >
                        {description}
                    </motion.p>

                    {/* CTA Button with Parallax */}
                    <div className="mt-auto" style={{ transform: "translateZ(100px)" }}>
                        <Link 
                            href={href} 
                            className="group/btn flex items-center gap-3 px-6 py-3 bg-slate-950 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-primary-500 transition-all duration-300 hover:scale-110 shadow-xl shadow-slate-900/10 hover:shadow-primary-500/30"
                        >
                            Detayları İncele
                            <IconArrow className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Animated Background Decor */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary-500/5 rounded-full blur-3xl group-hover:bg-primary-500/20 transition-all duration-700" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.03)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
        </motion.div>
    );
}
