export interface ServiceResult<TData> {
  status: number | undefined;
  data?: TData;
  errorMessage?: string;
}
