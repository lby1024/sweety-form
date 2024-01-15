import { useDebounce } from "./use-debounce"
import { useMounted } from "./use-mounted"
import { FormListConfig } from "../types"
import useStatePro from "./useStatePro"
import { getFormItemValue } from "sweety-form/utils/tool"

export const useFormList = (config: FormListConfig={}) => {

  const {rule, itemRule, initialData=[], onError, onSuccess} = config
  const [list, setList, getList] = useStatePro<any[]>([])
  const [errorList, setErrList] = useStatePro<any[]>([])
  const [error, setErr] = useStatePro<string>('')
  
  const checkItem = (index: number, value: any) => {
    const err = itemRule && itemRule(value) 
    errorList[index] = err
    setErrList([...errorList])
  }
  const checkItemDebounce = useDebounce(checkItem)

  const name = (index: number) => {
    return {
      value: list[index],
      onChange: onChange(index)
    }
  }

  const submit = () => {
    const res = checkForm()
    if (res.hasError) {
      onError && onError(res)
    } else {
      onSuccess && onSuccess(list)
    }
  }

  const checkForm = () => {
    let list = getList()
    let hasError = false
    let error
    let errorList
    if (rule) {
      error = rule(list)
      if (error) hasError = true
      setErr(error as string)
    }
    if (itemRule) {
      errorList = list.map((item: any) => {
        const err = itemRule(item)
        if(err) hasError = true
        return err
      })
      setErrList(errorList)
    }
    return {
      hasError,
      error,
      errorList
    }
  }
  /**
   * ============= action -> data -> UI =============
   * ============= action -> data -> UI =============
   * ============= action -> data -> UI =============
   */
  useMounted(() => {
    setList(initialData)
    setErrList(initialData.map(() => undefined))
    config.onChange && config.onChange(getList())
  })

  const onChange = (index: number, valueName = 'value') => (e: any) => {
    const value = getFormItemValue(e, valueName)
    list[index] = value
    setList([...list])
    checkItemDebounce(index, value)
    config.onChange && config.onChange(getList())
  }

  const remove = (index: number) => {
    list.splice(index, 1)
    errorList.splice(index, 1)
    setList([...list])
    setErrList([...errorList])
    config.onChange && config.onChange(getList())
  }

  const push = (value?: any) => {
    setList([...list, value])
    setErrList([...errorList, undefined])
    config.onChange && config.onChange(getList())
  }

  const unshift = (value?: any) => {
    setList([value, ...list])
    setErrList([undefined, ...errorList])
    config.onChange && config.onChange(getList())
  }

  return [{list, error, errorList}, {name, push, unshift, remove, submit, checkForm, setList}] as const
}