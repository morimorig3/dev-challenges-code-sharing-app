import type { ComponentProps, FC } from "react";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";

interface SelectProps {
  onChange: ComponentProps<typeof NativeSelect>["onChange"];
  items: {
    value: ComponentProps<typeof NativeSelectOption>["value"];
    label: string;
  }[];
}

export const Select: FC<SelectProps> = ({ onChange, items }) => {
  return (
    <NativeSelect onChange={onChange}>
      {items.map(({ value, label }, index) => (
        <NativeSelectOption key={`${index}${value}`} value={value}>
          {label}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  );
};
