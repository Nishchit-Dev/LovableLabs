"use client"

import { usePathname, useSearchParams } from "next/navigation";
import { frameworks, getDocCategories } from "../constants/navigation";
import { useEffect, useState } from "react";

const ActiveLink = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const framework = searchParams.get("framework") || "react";
    
    const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);
    
    useEffect(() => {
        const getBreadcrumbs = () => {
            // Always start with framework
            const crumbs = [frameworks.find(f => f.id === framework)?.name || "React"];
            
            // Extract slug from pathname (e.g. "/docs/backgrounds-dottedgrid" -> "backgrounds-dottedgrid")
            const slug = pathname.split("/").pop() || "";
            
            if (slug === "get-started") {
                crumbs.push("Get started");
                return crumbs;
            }
            
            // Find category and item
            const categories = getDocCategories(framework);
            for (const category of categories) {
                const item = category.items.find(item => {
                    const itemPath = item.path.split("?")[0];
                    return itemPath === `/docs/${slug}`;
                });
                
                if (item) {
                    crumbs.push(category.title);
                    crumbs.push(item.label);
                    break;
                }
            }
            
            return crumbs;
        };
        
        setBreadcrumbs(getBreadcrumbs());
    }, [pathname, framework]);
    
    return (
        <div className="md:hidden py-3 px-0 overflow-x-auto whitespace-nowrap text-sm border-b border-[rgba(255,255,255,0.1)]">
            {breadcrumbs.map((crumb, index) => (
                <span key={index}>
                    {index > 0 && <span className="mx-1 opacity-60 text-white"> &gt; </span>}
                    <span className={index === breadcrumbs.length - 1 ? "text-[var(--font-blue)] font-medium" : "opacity-80 text-white"}>
                        {crumb}
                    </span>
                </span>
            ))}
        </div>
    );
};

export default ActiveLink;