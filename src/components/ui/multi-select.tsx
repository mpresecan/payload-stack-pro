import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

type SelectItem = Record<"value" | "label", string>;

interface MultiSelectProps {
  options: SelectItem[];
  placeholder?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
}

export function MultiSelect({
                              options,
                              placeholder = "Select options...",
                              value = [],
                              onChange,
                            }: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const selected = React.useMemo(
    () => value.map(v => options.find(opt => opt.value === v)).filter(Boolean) as SelectItem[],
    [value, options]
  );

  const selectables = React.useMemo(
    () => options.filter((item) => !value.includes(item.value)),
    [options, value]
  );

  const handleUnselect = React.useCallback((item: SelectItem) => {
    onChange?.(value.filter(v => v !== item.value));
  }, [onChange, value]);

  const handleSelect = React.useCallback((item: SelectItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange?.(value.concat(item.value));
    setInputValue("");
    setOpen(true); // Keep the dropdown open
    setTimeout(() => inputRef.current?.focus(), 0); // Ensure focus remains on the input stupid bug with Editor focus
  }, [onChange, value]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "" && selected.length > 0) {
            onChange?.(value.slice(0, -1));
          }
        }
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [onChange, selected.length, value]
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group bg-background rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((items) => {
            return (
              <Badge key={items.value} variant="secondary">
                {items.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(items);
                    }
                  }}
                  onClick={() => handleUnselect(items)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((item) => {
                  return (
                    <CommandItem
                      key={item.value}
                      onMouseDown={(e) => handleSelect(item, e)}
                      className={"cursor-pointer"}
                    >
                      {item.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}
