export type Search<TData> = {
  filterFields: (keyof TData)[];
  placeholder: string;
};

export type Filter<TData> = {
  column: keyof TData;
  type: "select" | "date";
};

export type Filters<TData> = Filter<TData>[];

type ColumnVisibility<TData> = {
  [K in keyof TData]?: boolean;
} & Record<string, boolean>;

export type DataTableConfig<TData> = {
  search?: Search<TData>;
  filters?: Filters<TData>;
  columnVisibility?: ColumnVisibility<TData>;
};
