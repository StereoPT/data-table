import {
  type ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table, TableHeader } from "../components/ui/table";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      {/* TODO: Add Filters */}
      <div className="rounded-md border overflow-hidden bg-red-500">
        <Table>
          <TableHeader>
            Header Here
          </TableHeader>
          <pre>{JSON.stringify(table, null, 2)}</pre>
        </Table>
      </div>
      {/* TODO: Add Pagination */}
    </div>
  );
}