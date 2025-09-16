import GroupTreeSelect from "@/components/group-tree-select";
import RoleSelect from "@/components/role-select";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { z } from "zod";
type Field = {
    name: string;
    label: string;
    validate?: z.ZodTypeAny;
    defaultValue?: string|string[];
    type?: string;
};

export default function Index({open,setOpen,title,fields,values,onSubmit}: 
    {open: boolean,setOpen:(open:boolean)=>void,title:string,
        fields: Field[],values?: Record<string, unknown>, onSubmit:  (values: Record<string, unknown>) => void}) {
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
                                            <RoleSelect {...field}/>
                                            :
                                            f?.type === "group"?
                                            <GroupTreeSelect
                                                groupId="00"
                                                {...field}
                                            />
                                            :
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

