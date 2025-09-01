import DialogForm, { Field } from "@/components/dialog-form";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { toast } from "sonner";
import { z } from "zod";

export default function Index(props: {setOpen: (open: boolean) => void, open: boolean, onSave: () => void, id: string }) {
    const {setOpen, onSave, open, id} = props;
    const intl = useIntl();
    const fields:Field[] = [
        {
            name: "name",
            label: "page.system.user.header.name",
            defaultValue: "",
            validate: z.string().min(2, {
                message: intl.formatMessage({ id: 'validate.name' }),
            })
        },
        {
            name: "username",
            label: "page.system.user.header.userName",
            defaultValue: "",
            validate: z.string().min(2, {
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
            defaultValue: "all",
            validate: z.string(),
            type: "group"
        },
        // {
        //     name: "defaultRole",
        //     label: "page.system.user.header.defaultRole",
        //     defaultValue: "",
        //     validate: z.string(),
        //     type: "role"
        // },
    ]
    const [values, setValues] = useState<Record<string, unknown>>({});

    useEffect(() => {
        if(id === '') {
            return;
        }
        axios.get("/system/users/detail/" + id).then(res => {
            if (res.data.code === 200) {
                const user = res.data.data;
                setValues (user);     
            } 
        })
    }, [id])

    const schemaShape = fields.reduce((acc, field) => {
        acc[field.name] = field.validate || z.string().optional();
        return acc;
    }, {} as Record<string, z.ZodTypeAny>);
    const formSchema = z.object(schemaShape);
    // 2. Define a submit handler. 
    function onSubmit(fieldValues: z.infer<typeof formSchema>) {
        axios.post("/system/users/edit", {
            ...fieldValues,
            id:id
        }).then(res => {
            if(res.data.code === 200) {
                setOpen(false);
                toast.success(res.data.message);
                onSave();
            }else {
                toast.error(res.data.message);
            }
        })
    }
    return (
        open && Object.keys(values).length > 0 &&<DialogForm
            setOpen={setOpen}
            open={open}
            title={intl.formatMessage({ id: 'button.edit' })}
            fields={fields}
            values={values}
            onSubmit={onSubmit}>
        </DialogForm>
    )
}
