import { Button, Input } from "antd"
import { Form, email, formItem, label, password } from "sweety-form"
import React from "react"


class FormModel {

  @label('邮箱')
  @formItem(<Input placeholder="e-mail" />)
  @email('请输入正确邮箱地址')
  email: string

  @label('密码')
  @formItem(<Input.Password placeholder="password"/>)
  @password('密码只能由数字或字母或符号组成')
  password: string
}

export default () => {

  return (
    <Form
      form={FormModel}
      subButton={<Button type="primary" >submit</Button>}
      onSuccess={res => console.log(res)}
      onError={err => console.log(err)}
    />
  )
}
