import MultipleSelector, { Option } from "@/components/ext/multiple-selector";
import { useUserStore } from "@/store";

export default function RoleSelect({...props}) {
  const { userInfo } = useUserStore();

  const options: Option[] =
    userInfo?.roles?.map((role) => ({
      label: role.name,
      value: role.role
    })) || [];

  return (
    <div className="w-[400px]">
      <MultipleSelector
        {...props}
        selectFirstItem={false}
        defaultOptions={options}
        placeholder=""
        emptyIndicator={
        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
          no results found.
        </p>
        }
      />

    </div>
  );
}
