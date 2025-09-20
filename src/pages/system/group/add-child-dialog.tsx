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
            label: "page.system.group.header.name",
            defaultValue: "",
            validate: z.string().min(2, {
                message: intl.formatMessage({ id: 'validate.groupName' }),
            })
        },
        {
            name: "id",
            label: "page.system.group.header.id",
            defaultValue: "",
            validate: z.string().regex(/^[a-zA-Z0-9]{2,}$/, {
                message: intl.formatMessage({ id: 'validate.groupId' }),
            })
        },
        {
            name: "parentId",
            label: "page.system.group.header.parentGroup",
            defaultValue: id,
            validate: z.string(),
            type: "group"
        },
    ]
    const [values, setValues] = useState<Record<string, unknown>>({});

    useEffect(() => {
        setValues ({parentId:id});
    }, [id])

    const schemaShape = fields.reduce((acc, field) => {
        acc[field.name] = field.validate || z.string().optional();
        return acc;
    }, {} as Record<string, z.ZodTypeAny>);
    const formSchema = z.object(schemaShape);
    // 2. Define a submit handler. 
    function onSubmit(fieldValues: z.infer<typeof formSchema>) {
        axios.post("/system/groups/addChild", {
            ...fieldValues
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
            title={intl.formatMessage({ id: 'button.addChild' })}
            fields={fields}
            values={values}
            onSubmit={onSubmit}>
        </DialogForm>
    )
}
