import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useThemeStore } from "@/store/index"

const colors = ["default", "blue", "green", "orange", "red", "rose", "violet", "yellow"] as const

export function ColorSwitcher() {
    const { color, setColor } = useThemeStore()

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">选择主题色</Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit p-2">
                <div className="grid grid-cols-3 gap-2">
                    {colors.map((t) => (
                        <Button
                            key={t}
                            variant={t === color ? "default" : "outline"}
                            
                            className={cn( `bg-blue-500 text-blue-600 hover:bg-blue-600`)}
                            // className={cn(
                                
                            // )}
                            onClick={() => setColor(t)}
                        >
                            {t}
                        </Button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}
