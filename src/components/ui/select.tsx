import * as React from "react";
import { cn } from "@/lib/utils";
import { Select as RadixSelect } from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

export interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({
  value,
  onValueChange,
  options,
}) => {
  return (
    <RadixSelect value={value} onValueChange={onValueChange}>
      <RadixSelect.Trigger className="flex items-center justify-between w-40 px-3 py-2 border rounded-md shadow-sm bg-white text-sm">
        <RadixSelect.Value>
          {options.find((opt) => opt.value === value)?.label || "Select"}
        </RadixSelect.Value>
        <ChevronDown className="w-4 h-4 ml-2" />
      </RadixSelect.Trigger>
      <RadixSelect.Content className="border rounded-md shadow-md bg-white text-sm">
        {options.map((option) => (
          <RadixSelect.Item
            key={option.value}
            value={option.value}
            className={cn(
              "px-3 py-2 cursor-pointer flex items-center justify-between hover:bg-gray-100",
              value === option.value ? "bg-gray-200" : ""
            )}
          >
            {option.label}
            {value === option.value && (
              <Check className="w-4 h-4 ml-2 text-green-500" />
            )}
          </RadixSelect.Item>
        ))}
      </RadixSelect.Content>
    </RadixSelect>
  );
};
