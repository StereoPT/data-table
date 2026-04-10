import { Input } from "@/components/ui/input";
import {
  DataTableFilter,
  type Filter,
} from "@/dataTable/filters/DataTableFilter";
import type { Table } from "@tanstack/react-table";

interface DataTableFiltersProps<TData> {
  table: Table<TData>;
  search?: {
    filterFields: (keyof TData)[];
    placeholder: string;
  };
  filters?: Filter<TData>[];
}

export const DataTableControls = <TData,>({
  table,
  search,
  filters,
}: DataTableFiltersProps<TData>) => {
  const value = table.getState().globalFilter ?? "";
  const setValue = table.setGlobalFilter;

  if (!filters && !search) return null;

  return (
    <div className="flex items-center gap-4 pb-4">
      {search && (
        <Input
          className="max-w-sm"
          onChange={(event) => setValue(() => event.target.value)}
          placeholder={search?.placeholder}
          value={value}
        />
      )}

      {filters?.map((filter) => {
        return (
          <DataTableFilter
            filter={filter}
            key={filter.column.toString()}
            table={table}
          />
        );
      })}
    </div>
  );
};
