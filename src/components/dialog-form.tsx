import { GroupTreeSelectPopover } from "@/components/group-tree-select-popver";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { useUserStore } from '@/store';
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { z } from "zod";
type Field = {
    name: string;
    label: string;
    validate?: z.ZodTypeAny;
    defaultValue?: string;
    type?: string;
};

export default function Index({open,setOpen,title,fields,values,onSubmit}: 
    {open: boolean,setOpen:(open:boolean)=>void,title:string,
        fields: Field[],values?: Record<string, unknown>, onSubmit:  (values: Record<string, unknown>) => void}) {
    const {userInfo} = useUserStore();
    const schemaShape = fields.reduce((acc, field) => {
        acc[field.name] = field.validate || z.string().optional();
        return acc;
    }, {} as Record<string, z.ZodTypeAny>);
    const formSchema = z.object(schemaShape);
    const intl = useIntl();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: Object.fromEntries(fields.map(item => [item.name, item.defaultValue || ""])),
    });
    useEffect(() => {
        if (open) {
            if (values) {
                form.reset(values);
            }
        }else{
            form.reset();
        }
    }, [values,form,open]);
    return (
        <Dialog open={open} 
        onOpenChange={setOpen}> 
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <DialogHeader>
                            <DialogTitle>{title}</DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>
                        {fields.map((f) => (                            
                            <FormField
                                key={f.name}
                                control={form.control}
                                name={f.name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{intl.formatMessage({ id: f.label })}</FormLabel>
                                        <FormControl>
                                            {
                                            f?.type === "role"?
                                            <Select   onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder={intl.formatMessage({ id: f.label })} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup >
                                                {/* <SelectLabel>{intl.formatMessage({ id: f.label })}</SelectLabel> */}
                                                <SelectItem  value="all">{intl.formatMessage({ id: 'sidebar.user.all' })}</SelectItem>
                                                {userInfo?.roles?.map((role) => (
                                                    <SelectItem key={role.role} value={role.role}>{role.name}</SelectItem>
                                                ))}
                                                </SelectGroup>
                                            </SelectContent>
                                            </Select>:
                                            f?.type === "group"?
                                            <GroupTreeSelectPopover
                                                defaultValue={field.value}
                                                onChange={(node) => {
                                                    if (node.length > 0) {
                                                        field.onChange(node[0].id);
                                                    }
                                                }}
                                            />:
                                            <Input placeholder="" {...field} />                                            
                                        }
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                        <DialogFooter>
                            <Button type="submit">{intl.formatMessage({ id: 'button.save' })}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    )
}
export type { Field };

