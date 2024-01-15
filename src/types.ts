/**
 * type Data = {
 *  sex: boolen
 *  age: number
 * }
 * type Name = 'sex' | 'age'
 */
export type Name<Data> = keyof Data 
/**
 * @params: value=18
 * @params: data={sex: true,  age: 18}
 * @params: name='age'
 */
export type Validator<Data> = (value: any, data?: any, name?: Name<Data>) => string | undefined
/**
 * const rules = {
 *  age: (v, data, name) => '年龄能为空'
 *  sex: (v, data, name) => '请选择性别'
 * }
 */
export type Rules<Data> = {
  [name in Name<Data>]?: Validator<Data>
}
/**
 * const errs = {
 *  age: '年龄不能为空'
 *  sex: '请选择性别'
 * }
 */
export type Err<Data> = {
  [name in Name<Data>]?: string
}

export type CheckFn = () => { hasError: boolean, firstError: string, errors?: any }

export type FormListConfig = {
  onError?: (error: any) => void,
  onSuccess?: (data: any) => void,
  onChange?: (data: any) => void,
  initialData?: any[],
  itemRule?: (value: any) => string|undefined,
  rule?: (list: any[]) => string|undefined
}

export type FormConfig<Data> = {
  initialData?: Partial<Data>
  rules?: Rules<Data>
  onError?: (errors: Err<Data>) => void
  onSuccess?: (data: Data) => void
  onChange?: (data: Data) => void
}

export type FormDecoratorConfig = {
  initialData?: any
  FormModel: any
  onError?: (errors: any) => void
  onSuccess?: (data: any) => void
  onChange?: (data: any) => void
}