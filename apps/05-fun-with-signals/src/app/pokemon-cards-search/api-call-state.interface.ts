export interface ApiCallState<TResult, TError = string> {
  status: 'loading' | 'loaded' | 'error';
  result?: TResult;
  error?: TError;
}
