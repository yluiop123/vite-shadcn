
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { permissionTypeEnum } from "@/lib/dict";
import { useIntl } from "react-intl";
export default function PermissionType({...props}) {
    const { formatMessage } = useIntl();
    return (
    <Select {...props} >
        <SelectTrigger>
            <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
            {Array.from(permissionTypeEnum).map(([key, value]) => {
                    return (
                        <SelectItem key={key} value={key}>{formatMessage({ id: `dict.permissionType.${key}`, defaultMessage: value })}</SelectItem>
                    )
                })}
        </SelectContent>
    </Select>
)}