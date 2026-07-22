export type SelectFilter<TData> = {
  column: keyof TData;
  type: "select";
  options?: {
    label: string;
    value: string;
  }[];
};

export type DateFilter<TData> = {
  column: keyof TData;
  type: "date";
};

export type Filter<TData> = SelectFilter<TData> | DateFilter<TData>;

export type Search<TData> = {
  filterFields: (keyof TData)[];
  placeholder: string;
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
