import { FormCtx } from "./createForm"
import { useMounted } from "./use-mounted"
import { FormDecoratorConfig } from "../types"
import { useForm } from './useForm';

export const useFormGroup = (ctx: FormCtx) => <Data>(config: FormDecoratorConfig) => {

  const [state, api] = useForm<Data>(config)
  const { onError, onSuccess} = config

  useMounted(() => {
    const unsub = ctx.subscribe(api.checkForm)
    return () => {
      unsub()
    }
  })

  const submit = () => {
    const res = ctx.check()
    if (res.hasError) {
      onError && onError(res as any)
    } else {
      onSuccess && onSuccess(api.getValues())
    }
  }

  return [state, {
    ...api,
    submit
  }] as const
}