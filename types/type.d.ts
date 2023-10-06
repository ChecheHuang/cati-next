type AnyObject = Record<string | number, any>
type Override<T, K> = Omit<T, keyof K> & K
type CreateDocumentOptions<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>
type Callback = () => void
type Nullable<T> = T | null
