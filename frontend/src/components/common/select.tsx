import type { ComponentProps, FC } from "react";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";

interface SelectProps {
  onChange: ComponentProps<typeof NativeSelect>["onChange"];
  value: ComponentProps<typeof NativeSelect>["value"];
  items: {
    value: ComponentProps<typeof NativeSelectOption>["value"];
    label: string;
  }[];
}

export const Select: FC<SelectProps> = ({ onChange, items, value }) => {
  return (
    <NativeSelect onChange={onChange} value={value}>
      {items.map(({ value, label }, index) => (
        <NativeSelectOption key={`${index}${value}`} value={value}>
          {label}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  );
};
