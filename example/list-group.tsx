import { Button, Flex, Input } from 'antd'
import { createForm, required } from 'sweety-form'
import React, { FC, useEffect } from 'react'
import { print } from './tools'

const rule = (list: any[]) => {
  if(list.length < 2) return '最少有两项'
}

export const useGroup = createForm()

export default () => {
  const [{ list, error }, { name, push, submit, remove }] = useGroup.formList({
    onError: err => print(err),
    onSuccess: res => print(res),
    rule
  })

  return <Flex vertical gap='large' style={{width: 500}} className='page'  >
    {
      list.map((_, index) => (
        <Flex gap='small' align='center' key={index}>
          <InputName {...name(index)} />
          <Button onClick={()=>remove(index)} size='small' style={{color: '#999'}} type='text' >删除</Button>
        </Flex>
      ))
    }
    <Button type="dashed" onClick={() => push()}>Add field</Button>
    <Button type="primary" onClick={() => submit()} data-err={error} >Submit</Button>
  </Flex>
}

interface InputNameProps {
  value: any,
  onChange: (value: any) => void
}

class FormModel {
  @required('first name must be filled')
  firstName: string

  @required('last name must be filled')
  lastName: string
}

export const InputName: FC<InputNameProps> = (props) => {

  const [{errors}, { name, setForm }] = useGroup.form<FormModel>({
    FormModel,
    onChange: (values) => props.onChange(values)
  })

  useEffect(() => {
    setForm(props.value)
  }, [props.value])

  return <Flex gap='small'>
    <div data-err={errors.firstName}>
      <Input {...name('firstName')} placeholder='first name' />
    </div>

    <div data-err={errors.lastName}>
      <Input {...name('lastName')} placeholder='last name'/>
    </div>
  </Flex>
}

