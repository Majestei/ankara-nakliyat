import Link from "next/link";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    variant?: "light" | "dark";
}

export default function Breadcrumb({ items, variant = "dark" }: BreadcrumbProps) {
    const textColor = variant === "light" ? "text-slate-400" : "text-slate-500";
    const hoverColor = variant === "light" ? "hover:text-white" : "hover:text-primary-600";
    const activeColor = variant === "light" ? "text-primary-200" : "text-primary-600";

    return (
        <nav aria-label="Breadcrumb" className="mb-6">
            <ol className={`flex items-center justify-center gap-2 text-sm ${textColor} flex-wrap`}>
                {items.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                        {index > 0 && <span>/</span>}
                        {item.href && index < items.length - 1 ? (
                            <Link href={item.href} className={`${hoverColor} transition-colors`} title={item.label}>
                                {item.label}
                            </Link>
                        ) : (
                            <span className={index === items.length - 1 ? activeColor : ""}>
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
