import { AutoComplete } from "@/components/ext/autocomplete";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";

export default function AutoCompleteFormDemo() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      tech: [],
    },
  });
const options = [
  { value: "react", label: "React（前端框架）" },
  { value: "vue", label: "Vue（前端框架）" },
  { value: "angular", label: "Angular（前端框架）" },
  { value: "spring", label: "Spring（Java 框架）" },
  { value: "spring-boot", label: "Spring Boot（Java 框架）" },
  { value: "nestjs", label: "NestJS（Node 框架）" },
];
  return (
    <form
      onSubmit={handleSubmit(console.log)}
      className="space-y-4"
    >
      <Controller
        name="tech"
        control={control}
        render={({ field }) => (
          <AutoComplete
            {...field}
            multiple
            placeholder="选择技术栈 (Select tech)"
            options={options}
          />
        )}
      />

      <Button type="submit">提交 (Submit)</Button>
    </form>
  );
}
