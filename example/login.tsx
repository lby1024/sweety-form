import React from "react"
import { Flex, Input, Checkbox, Button } from 'antd'
import { min, required, useForm } from 'sweety-form'
import { print } from "./tools"
import './comon.css'

class FormModel {
  @required('用户名不能为空')
  @min(6)
  username: string

  @required('请填写密码')
  @min(6, '密码长度不能小于6')
  password: string

  remember: boolean
}

const initialData: Partial<FormModel> = {
  remember: true
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

    <Checkbox {...name('remember', 'checked')}>Remember me</Checkbox>

    <Button onClick={submit} type="primary" >login</Button>
  </Flex>  
}