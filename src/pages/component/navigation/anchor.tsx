import { cn } from "@/lib/utils"; // 如果你项目用了 shadcn，可以这样合并类名
import { useState } from "react";

export default function AnchorPage() {
    const [active, setActive] = useState<string>(window.location.hash || "#section1");
    return (
        <div className="flex gap-10">
            {/* 左侧导航栏 */}
            <nav className="w-48 space-y-2 sticky top-20">
                {['section1', 'section2', 'section3'].map((section) => (
                    <a
                        href={`#${section}`}
                        onClick={() => setActive(`#${section}`)}
                        className={cn(
                            "block transition-colors hover:text-blue-600 hover:underline",
                            active === "#section1" ? "text-blue-600 font-medium underline" : "text-gray-500"
                        )}
                    >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                    </a>
                ))}
            </nav>

            {/* 内容部分 */}
            <div className="flex-1">
                <section id="section1" className="pt-20 bg-red-300 h-200">
                    <h2 className="text-2xl font-bold mb-4">Section 1</h2>
                    <p>这里是 Section 1 的内容，随便加点文字撑开空间。</p>
                </section>

                <section id="section2" className="pt-20 bg-green-300 h-200">
                    <h2 className="text-2xl font-bold mb-4">Section 2</h2>
                    <p>这里是 Section 2 的内容。</p>
                </section>

                <section id="section3" className="pt-20 bg-blue-300 h-200">
                    <h2 className="text-2xl font-bold mb-4">Section 3</h2>
                    <p>这里是 Section 3 的内容。</p>
                </section>
            </div>
        </div>
    );
}
