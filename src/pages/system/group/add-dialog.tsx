import DialogForm, { Field } from "@/components/dialog-form";
import axios from "@/lib/axios";
import { useIntl } from "react-intl";
import { toast } from "sonner";
import { z } from "zod";
export default function Index(props: {open: boolean,setOpen:(open:boolean)=>void,onSave: () => void }) {
    const {open,setOpen,onSave}=props;
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
            defaultValue: [],
            validate: z.array(z.string()),
            type: "group"
        },
    ]
    const schemaShape = fields.reduce((acc, field) => {
        acc[field.name] = field.validate || z.string().optional();
        return acc;
    }, {} as Record<string, z.ZodTypeAny>);
    const formSchema = z.object(schemaShape);
    // 2. Define a submit handler. 
    function onSubmit(values: z.infer<typeof formSchema>) {
        values.parentId = values.parentId[0] || "";
        axios.post("/system/groups/add", {
            ...values
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
        <DialogForm
            open={open}
            setOpen={setOpen}
            title={intl.formatMessage({ id: 'button.add' })}
            fields={fields}
            onSubmit={onSubmit}>
        </DialogForm>
    )
}
