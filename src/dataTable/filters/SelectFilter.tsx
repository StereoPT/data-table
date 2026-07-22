import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Table } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

type SelectFilterProps<TData> = {
  column: keyof TData;
  table: Table<TData>;
  options?: {
    label: string;
    value: string;
  }[];
};

export const SelectFilter = <TData,>({
  column,
  table,
  options,
}: SelectFilterProps<TData>) => {
  const columnDef = table.getColumn(column as string);
  const columnHeader = columnDef?.columnDef.header;
  const headerText =
    typeof columnHeader === "string" ? columnHeader : column.toString();
  const facetedValues = columnDef?.getFacetedUniqueValues();
  const facetedOptions = Array.from(facetedValues?.keys() || []).map(
    (value) => ({ label: value, value }) as { label: string; value: string },
  );
  const possibleValues = options ?? facetedOptions;

  const filterValue = columnDef?.getFilterValue() as string | undefined;
  const selectedOption = possibleValues.find(
    (option) => option.value === filterValue,
  );
  const filterText = selectedOption
    ? selectedOption.label.toLowerCase()
    : headerText;

  const handleOnChange = (option: string) => {
    if (columnDef?.getFilterValue() === option) {
      columnDef?.setFilterValue(undefined);
      return;
    }

    columnDef?.setFilterValue(option);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="capitalize" variant="outline">
          {filterText}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="px-2 py-1.5 text-xs text-muted-foreground capitalize">
          {headerText}
        </DropdownMenuLabel>
        {possibleValues.map((option) => {
          return (
            <DropdownMenuCheckboxItem
              checked={columnDef?.getFilterValue() === option.value}
              className="capitalize"
              key={option.value}
              onCheckedChange={() => handleOnChange(option.value)}
            >
              {option.label.toLowerCase()}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
