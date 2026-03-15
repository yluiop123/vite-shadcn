import DialogForm, { Field } from "@/components/dialog-form";
import axios from "@/lib/axios";
import { useEffect, useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useIntl } from "react-intl";
import { toast } from "sonner";
import { z } from "zod";

export default function Index(props: {setOpen: (open: boolean) => void, open: boolean, onSave: () => void, id: string }) {
    const {setOpen, onSave, open, id} = props;
    const intl = useIntl();
    const fields:Field[] = [
        {
            name: "name",
            label: "page.system.permission.header.name",
            defaultValue: "",
            validate: z.string().min(2)
        },
        {
            name: "id",
            label: "page.system.permission.header.id",
            defaultValue: "",
            validate: z.string().regex(/^[a-zA-Z0-9]{2,}$/)
        },
        {
            name: "path",
            label: "page.system.permission.header.path",
            defaultValue: "",
            validate: z.string().regex(/^[a-zA-Z0-9/]{2,}$/)
        },
        {
            name: "type",
            label: "page.system.permission.header.type",
            defaultValue: "",
            validate: z.string().optional(),
            type: "permissionType"
        },
        {
            name: "action",
            label: "page.system.permission.header.action",
            defaultValue: "",
            validate: z.string().optional(),
        },
        {
            name: "brotherId",
            label: "page.system.permission.header.brotherPermission",
            defaultValue: '',
            validate: z.string().optional(),
            type: "permission",
            disabled: true,
        },
    ]
    const [values, setValues] = useState<Record<string, unknown>>({});

    useEffect(() => {
        setValues ({brotherId:id});
    }, [id])

    const schemaShape = fields.reduce((acc, field) => {
        acc[field.name] = field.validate || z.string().optional();
        return acc;
    }, {} as Record<string, z.ZodTypeAny>);
    const formSchema = z.object(schemaShape);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formRef = useRef<UseFormReturn<any>>(null);
    function onSubmit(fieldValues: z.infer<typeof formSchema>) {
        axios.post("/system/permissions/addBrother", {
            ...fieldValues
        }).then(res => {
            if(res.data.code === 200) {
                setOpen(false);
                toast.success(res.data.message);
                onSave();
            }else {
                const data = res.data.data || {};
                Object.keys(data).forEach((field) => {
                    formRef.current?.setError(field, {
                        type: "server", // 标注这是服务器返回的错误
                        message: data[field]
                    });
                });
                // toast.error(res.data.message);
            }
        })
    }
    return (
        open && Object.keys(values).length > 0 &&<DialogForm
            ref={formRef}
            setOpen={setOpen}
            open={open}
            title={intl.formatMessage({ id: 'button.addChild' })}
            fields={fields}
            values={values}
            onSubmit={onSubmit}>
        </DialogForm>
    )
}
