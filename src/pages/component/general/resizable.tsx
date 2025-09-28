import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function ResizablePage() {
    return (
        <div>
            <h1>Horizontal-Vertical 横向-纵向组合</h1>
            <ResizablePanelGroup
                direction="horizontal"
                className="rounded-lg border w-full"
            >
                <ResizablePanel defaultSize={50}>
                    <div className="flex h-[200px] items-center justify-center p-6">
                        <span className="font-semibold">One</span>
                    </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={50}>
                    <ResizablePanelGroup direction="vertical">
                        <ResizablePanel defaultSize={25}>
                            <div className="flex h-full items-center justify-center p-6">
                                <span className="font-semibold">Two</span>
                            </div>
                        </ResizablePanel>
                        <ResizableHandle />
                        <ResizablePanel defaultSize={75}>
                            <div className="flex h-full items-center justify-center p-6">
                                <span className="font-semibold">Three</span>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
            <h1>Vertical 纵向</h1>
            <ResizablePanelGroup
                direction="vertical"
                className="min-h-[200px] rounded-lg border w-full"
            >
                <ResizablePanel defaultSize={25}>
                    <div className="flex h-full items-center justify-center p-6">
                        <span className="font-semibold">Header</span>
                    </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={75}>
                    <div className="flex h-full items-center justify-center p-6">
                        <span className="font-semibold">Content</span>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
            <h1>Horizontal 横向</h1>
            <ResizablePanelGroup
                direction="horizontal"
                className="min-h-[200px] rounded-lg border w-full"
            >
                <ResizablePanel defaultSize={25}>
                    <div className="flex h-full items-center justify-center p-6">
                        <span className="font-semibold">Sidebar</span>
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={75}>
                    <div className="flex h-full items-center justify-center p-6">
                        <span className="font-semibold">Content</span>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>

    )
}
