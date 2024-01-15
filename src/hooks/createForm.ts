import { useFormGroup } from "./useFormGroup"
import { useFormListGroup } from './useFormListGroup'
import { CheckFn } from "../types"

export type FormCtx = {
  subscribe: Function,
  check: CheckFn,
}

export const createForm = () => {
  
  let checkList: CheckFn[] = []

  const subscribe = (checkFn: CheckFn) => {
    checkList.push(checkFn)  
    
    return () => {
      const index = checkList.indexOf(checkFn)
      checkList.splice(index, 1)
    }
  }

  const check = () => {
    let hasError = false
    let firstError = ''
    checkList.forEach(checkFn => {
      const res = checkFn()
      if (res.hasError) hasError = true
      if (res.firstError && !firstError) firstError = res.firstError
    })
    return {hasError, firstError}
  }

  const ctx:FormCtx = {
    subscribe,
    check
  }

  return {
    form: useFormGroup(ctx),
    formList: useFormListGroup(ctx)
  }
}
