"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableControls } from "@/dataTable/DataTableControls";
import { DataTablePagination } from "@/dataTable/pagination/DataTablePagination";
import { fuzzyFilterFn } from "@/lib/search";
import type { DataTableConfig } from "@/types/dataTable";
import { ChevronDown, ChevronRight } from "lucide-react";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  config?: DataTableConfig<TData>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  config,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    groupedColumnMode: false,
    paginateExpandedRows: false,
    globalFilterFn: fuzzyFilterFn(config?.search?.filterFields),
    autoResetPageIndex: false,
    enableMultiSort: false,
    initialState: {
      columnVisibility: config?.columnVisibility,
      ...(config?.groupBy && {
        grouping: [String(config.groupBy)],
        sorting: [{ id: String(config.groupBy), desc: false }],
      }),
    },
  });

  return (
    <div className="w-full">
      <DataTableControls
        filters={config?.filters}
        search={config?.search}
        table={table}
      />

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      colSpan={header.colSpan}
                      key={header.id}
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) =>
                row.getIsGrouped() ? (
                  <TableRow className="bg-muted/50" key={row.id}>
                    <TableCell
                      className="font-medium"
                      colSpan={row.getVisibleCells().length}
                    >
                      <div className="flex items-center gap-2">
                        <Button
                          className="size-5"
                          onClick={row.getToggleExpandedHandler()}
                          size="icon-sm"
                          variant="ghost"
                        >
                          {row.getIsExpanded() ? (
                            <ChevronDown className="size-3.5" />
                          ) : (
                            <ChevronRight className="size-3.5" />
                          )}
                        </Button>
                        {String(row.groupingValue)}
                        <Badge variant="outline">{row.subRows.length}</Badge>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                    key={row.id}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell className="truncate max-w-0" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ),
              )
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}
