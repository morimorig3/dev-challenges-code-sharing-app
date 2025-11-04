import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function NativeSelect({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <div
      className="group/native-select relative w-fit has-[select:disabled]:opacity-50 h-6"
      data-slot="native-select-wrapper"
    >
      <select
        data-slot="native-select"
        className={cn(
          "border-input placeholder:text-[#364153] selection:bg-primary selection:text-primary-foreground dark:bg-input/30 dark:hover:bg-input/50 h-full w-full min-w-0 appearance-none rounded-full border bg-[#CED6E1] text-sm shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "font-[Outfit] px-2 pr-6 text-xs",
          className
        )}
        {...props}
      />
      <ChevronDownIcon
        className="text-[#364153] pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2 select-none"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  );
}

function NativeSelectOption({ ...props }: React.ComponentProps<"option">) {
  return <option data-slot="native-select-option" {...props} />;
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn(className)}
      {...props}
    />
  );
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
