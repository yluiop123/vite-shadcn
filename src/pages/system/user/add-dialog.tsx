import DialogForm, { FormField } from "@/components/dialog-form";
import { useIntl } from "react-intl";
import { z } from "zod";

export default function Index() {
    const intl = useIntl();
    const fields:FormField[] = [
        {
            name: "user",
            label: "page.system.user.header.user",
            defaultValue: "",
            validate: z.string().min(2, {
                message: intl.formatMessage({ id: 'validate.user' }),
            })
        },
        {
            name: "username",
            label: "page.system.user.header.userName",
            defaultValue: "",
            validate: z.string().min(4, {
                message: intl.formatMessage({ id: 'validate.username' }),
            })
        },
        {
            name: "email",
            label: "page.system.user.header.email",
            defaultValue: "",
            validate: z.string().email({
                message: intl.formatMessage({ id: 'validate.email' }),
            })
        },
        {
            name: "phone",
            label: "page.system.user.header.phone",
            defaultValue: "",
            validate: z.string().regex(/^1[3-9]\d{9}$/, {
                message: intl.formatMessage({ id: 'validate.phone' }),
            })
        },
        {
            name: "group",
            label: "page.system.user.header.groupName",
            defaultValue: "",
            validate: z.string(),
        },
        {
            name: "defaultRole",
            label: "page.system.user.header.defaultRole",
            defaultValue: "",
            validate: z.string()
        },
    ]
    const schemaShape = fields.reduce((acc, field) => {
        acc[field.name] = field.validate || z.string().optional();
        return acc;
    }, {} as Record<string, z.ZodTypeAny>);
    const formSchema = z.object(schemaShape);
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <DialogForm
            title={intl.formatMessage({ id: 'button.add' })}
            fields={fields}
            onSubmit={onSubmit}>
        </DialogForm>
    )
}
