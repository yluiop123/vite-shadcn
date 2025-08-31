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
            label: "page.system.role.header.name",
            defaultValue: "",
            validate: z.string().min(2, {
                message: intl.formatMessage({ id: 'validate.roleName' }),
            })
        },
        {
            name: "role",
            label: "page.system.role.header.role",
            defaultValue: "",
            validate: z.string().regex(/^[a-zA-Z]{2,}$/, {
                message: intl.formatMessage({ id: 'validate.role' }),
            })
        },
    ]
    const schemaShape = fields.reduce((acc, field) => {
        acc[field.name] = field.validate || z.string().optional();
        return acc;
    }, {} as Record<string, z.ZodTypeAny>);
    const formSchema = z.object(schemaShape);
    // 2. Define a submit handler. 
    function onSubmit(values: z.infer<typeof formSchema>) {
        axios.post("/system/users/add", {
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
