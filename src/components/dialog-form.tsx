import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
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
import { useForm } from "react-hook-form";

import { useIntl } from "react-intl";
import { z } from "zod";
type FormField = {
    name: string;
    label: string;
    validate?: z.ZodTypeAny;
    defaultValue?: string;
};

export default function Index({title,description,fields,onSubmit}: {title: string,description?: string,fields: FormField[], onSubmit:  (values: Record<string, unknown>) => void}) {

    const schemaShape = fields.reduce((acc, field) => {
        acc[field.name] = field.validate || z.string().optional();
        return acc;
    }, {} as Record<string, z.ZodTypeAny>);
    const formSchema = z.object(schemaShape);
    const intl = useIntl();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: Object.fromEntries(fields.map(item => [item.name, item.defaultValue || ""])),
    })

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>{intl.formatMessage({ id: title })}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <DialogHeader>
                            <DialogTitle>{title}</DialogTitle>
                            <DialogDescription>
                                {description}
                            </DialogDescription>
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
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">{intl.formatMessage({ id: 'button.cancel' })}</Button>
                            </DialogClose>
                            <Button type="submit">{intl.formatMessage({ id: 'button.save' })}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    )
}
export type { FormField };

