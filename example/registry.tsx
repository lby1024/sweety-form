import React from "react"
import { Flex, Input, Button } from 'antd'
import { min, required, rule, useForm } from 'sweety-form'
import { print } from './tools'
import './comon.css'

function repassword(v: string, formData: FormModel) {
  if(v !== formData.password) return '密码不一致'
}

class FormModel {
  @required()
  @min(6)
  username: string

  @required()
  @min(6)
  password: string

  @rule(repassword)
  repassword: string
}

const initialData: Partial<FormModel> = {
  username: 'Elon Musk',
}

export default () => {
  const [{ errors }, { name, submit }] = useForm<FormModel>({
    FormModel,
    initialData,
    onSuccess: res => print(res),
    onError: err => print(err)
  })

  return <Flex vertical gap='large' className="page">
    <div data-err={errors.username} >
      <Input {...name('username')} placeholder="请输入用户名" />
    </div>

    <div data-err={errors.password} >
      <Input.Password {...name('password')} placeholder="请输入密码" />
    </div>

    <div data-err={errors.repassword} >
      <Input.Password {...name('repassword')} placeholder="请再次输入密码" />
    </div>

    <Button onClick={submit} type="primary" >registry</Button>
  </Flex>  
}