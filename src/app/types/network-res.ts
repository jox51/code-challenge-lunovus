export interface ApiResult<T = string | number | boolean | Record<string, unknown>> {
    success: boolean
    errorMessage?: string
    rawErrorMessage?: string
    data: T
}