import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";

export default function ContextMenuPage() {
    const handleSelect = (label: string) => {
        alert(`你选择了 / You selected: ${label}`);
    };
    return (
        <>
            <h2 className="text-lg font-semibold">🖱️右键菜单 / Context Menu</h2>
            <ContextMenu>
                <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
                    Right click here
                </ContextMenuTrigger>
                <ContextMenuContent className="w-52">
                    <ContextMenuItem inset onSelect={() => handleSelect("返回 / Back")}>
                        🔙 返回 / Back
                        <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem inset onSelect={() => handleSelect("前进 / Forward")} disabled>
                        🔜 前进 / Forward
                        <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem inset onSelect={() => handleSelect("重新加载 / Reload")}>
                        🔄 重新加载 / Reload
                        <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuSub>
                        <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
                        <ContextMenuSubContent className="w-44">
                            <ContextMenuItem onSelect={() => handleSelect("复制 / Copy")}>
                                📋 复制 / Copy
                            </ContextMenuItem>
                            <ContextMenuItem onSelect={() => handleSelect("粘贴 / Paste")}>
                                📄 粘贴 / Paste
                            </ContextMenuItem>
                            <ContextMenuItem onSelect={() => handleSelect("重命名 / Rename")}>
                                ✏️ 重命名 / Rename
                            </ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuItem>Developer Tools</ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuItem variant="destructive" onSelect={() => handleSelect("删除 / Delete")}>
                                ❌ 删除 / Delete
                            </ContextMenuItem>
                        </ContextMenuSubContent>
                    </ContextMenuSub>
                    <ContextMenuSeparator />
                    <ContextMenuCheckboxItem onSelect={() => handleSelect("显示书签 / Show Bookmarks")} checked>
                        🔖 显示书签 / Show Bookmarks
                    </ContextMenuCheckboxItem>
                    <ContextMenuCheckboxItem onSelect={() => handleSelect("显示完整URL / Show Full URLs")}>
                        🔗 显示完整URL / Show Full URLs
                    </ContextMenuCheckboxItem>
                    <ContextMenuSeparator />
                    <ContextMenuRadioGroup value="pedro">
                        <ContextMenuLabel  inset>People</ContextMenuLabel>
                        <ContextMenuRadioItem  onSelect={() => handleSelect("Pedro Duarte")} value="pedro">
                            Pedro Duarte
                        </ContextMenuRadioItem>
                        <ContextMenuRadioItem onSelect={() => handleSelect("Colm Tuite")} value="colm">
                            Colm Tuite
                        </ContextMenuRadioItem>
                    </ContextMenuRadioGroup>
                </ContextMenuContent>
            </ContextMenu>
        </>
    )
}
