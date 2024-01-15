import { useMounted } from "./use-mounted"
import { FormCtx } from "./createForm"
import { useFormList } from ".."
import { FormListConfig } from "../types"

export const useFormListGroup = (ctx: FormCtx) => (config: FormListConfig={}) => {

  const [state, api] = useFormList(config)
  const {onError, onSuccess} = config

  useMounted(() => {
    const unsub = ctx.subscribe(api.checkForm)
    return () => {
      unsub()
    }
  })

  const submit = () => {
    const res = ctx.check()
    if (res.hasError) {
      onError && onError(res)
    } else {
      onSuccess && onSuccess(state.list)
    }
  }

  return [
    { ...state },
    {
      ...api,
      submit
    }
  ] as const
}