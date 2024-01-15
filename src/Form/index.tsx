import React, { FC, useEffect, useRef } from "react";
import './index.css'
import { useForm } from "sweety-form/hooks/useForm";

interface Props {
  form?: any
  subButton?: any
  initialData?: any
  onError?: (errors: any) => void
  onSuccess?: (data: any) => void
  onChange?: (data: any) => void
}

export const Form: FC<Props> = (props) => {
  const { subButton, initialData, onChange, onError, onSuccess } = props
  const {current: form} = useRef(new props.form())
  const labels = form.labels || {}
  const formItems = form.formItems || {}
  const [{values, errors}, {name, submit}] = useForm<any>({
    FormModel: props.form,
    initialData,
    onError,
    onSuccess,
  })

  useEffect(() => {
    onChange && onChange(values)
  }, [values])

  const getItem = (key: string) => {
    const {valueName, item} = formItems[key]
    
    return React.cloneElement(item, {
      ...name(key, valueName)
    })
  } 

  const SubButton = React.cloneElement(subButton, {
    onClick: () => submit()
  })

  return <div className="form">
    {
      Object.keys(formItems).map(key => (
        <FormItem label={ labels[key] } error={errors[key]} key={key} >
          { getItem(key) }
        </FormItem>
      ))
    }

    <FormItem>{ SubButton }</FormItem>
  </div>
}

interface FormItemProps {
  children?: any
  label?: string
  error?: string
}

const FormItem: FC<FormItemProps> = ({ children, label, error }) => (
  <div className="form-item">
    <div className="label">{label}</div>
    <div className="input" data-err={error} >{children}</div>
  </div>
)
