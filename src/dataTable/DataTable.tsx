export interface DataTableProps<TData, TValue> {
  data: TData[];
}

export function DataTable<TData, TValue>({ data }: DataTableProps<TData, TValue>) {
  return (
    <div>
      <h1>Data Table</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}