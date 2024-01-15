import { useRef } from "react";
import { Err, FormDecoratorConfig } from "../types";
import useStatePro from "./useStatePro";
import { useDebounce } from "./use-debounce";
import { getFormItemValue } from "sweety-form/utils/tool";

export const useForm = <F>(config: FormDecoratorConfig) => {
  const { initialData = {}, FormModel, onError, onSuccess } = config
  type N = keyof F // 表单属性: 'username' | 'password' | 'age'
  type D = Partial<F>
  type E = Err<F>
  const { current: form } = useRef(new FormModel())
  const [values, setValue, getValues] = useStatePro<D>(initialData || {})
  const [errors, setError, getErrors] = useStatePro<E>({})

  const setForm = (data: D) => {
    setValue({
      ...values,
      ...data
    })
  }

  const addName = (name: N) => {
    const values = getValues()||{}
    if (name in values) return
    setForm({[name]: undefined} as any)
  }

  const name = (name: N, valueName = 'value') => {
    addName(name)
    if (valueName === 'value') return regist(name)
    else return registPro(name, valueName)
  }

  const regist = (name: N) => {
    return {
      name,
      value: values[name] as any,
      onChange: onChange(name)
    }
  }

  const registPro = (name: N, valueName = 'value') => {
    return {
      name,
      [valueName]: values[name] as any,
      onChange: onChange(name, valueName)
    }
  }

  const submit = () => {
    const res = checkForm()
    if (res.hasError) {
      onError && onError(res.errors)
    } else {
      onSuccess && onSuccess(getValues())
    }
  }
  
  const checkForm = () => {
    let hasError = false
    let errors: any = {}
    let firstError: string = ''
    let rules = form.rules
    for (let name in rules) {
      errors[name] = checkItem(name as N)
      if (errors[name]) hasError = true
      if (errors[name] && !firstError) firstError = errors[name]
    }
    return { hasError, errors, firstError }    
  }
  
  const checkItem = (name: N) => {
    const formData = getValues()
    let rules = form.rules || {}
    const validators = rules[name] || []
    for (let check of validators) {
      const errInfo = check(formData[name], formData, name)
      if (errInfo) {
        setError({...getErrors(), [name]: errInfo})
        return errInfo
      }
    }
    setError({...getErrors(), [name]: undefined})
  }
  const checkItemDebounce = useDebounce(checkItem)

  /**
   * ============= action -> data -> UI =============
   * ============= action -> data -> UI =============
   * ============= action -> data -> UI =============
   */
  const reset = () => {
    setValue({ ...initialData })
    setError({})
    config.onChange && config.onChange(getValues())
  }

  const onChange = (name: N, valueName = 'value') => (e: any) => {
    const value = getFormItemValue(e, valueName)
    setForm({ [name]: value } as any)
    config.onChange && config.onChange(getValues())
    checkItemDebounce(name)
  }

  const removeName = (name: N) => {
    const formData = getValues()
    const errors = getErrors()
    if (formData && name in formData) delete formData[name]
    if (errors && name in errors) delete errors[name]
    setValue({...formData})
    setError({ ...errors })
    config.onChange && config.onChange(getValues())
  }

  return [{ values, errors }, {
    name,
    reset,
    submit,
    setForm,
    setValue,
    setError,
    getValues,
    removeName,
    checkForm,
    checkItem,
  }] as const
}