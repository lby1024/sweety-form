import { Button, Cascader, Checkbox, Input, Select } from "antd"
import { Form, email, formItem, label, max, min, nickName, password, required, rule } from "sweety-form"
import React, { useState } from "react"
import { print, residences } from "./tools"
import TextArea from "antd/es/input/TextArea"

const Gender = (
  <Select
    style={{width: 250}}
    placeholder="Select a option and change input text above"
    allowClear
  >
    <Select.Option value="male">male</Select.Option>
    <Select.Option value="female">female</Select.Option>
    <Select.Option value="other">other</Select.Option>
  </Select>
)

class FormModel {

  @label('邮箱')
  @formItem(<Input placeholder="e-mail" />)
  @email()
  email: string

  @label('密码')
  @formItem(<Input.Password placeholder="password"/>)
  @password()
  password: string

  @label('密码确认')
  @formItem(<Input.Password placeholder="confirm password"/>)
  @rule(repassword)
  repassword: string

  @label('昵称')
  @formItem(<Input placeholder="nick name" />)
  @nickName()
  nickName: string

  @label('地址')
  @formItem(<Cascader options={residences} placeholder='Habitual Residence' style={{width: 250}}/>)
  @required()
  residence: string

  @label('简介')
  @formItem(<TextArea placeholder="20~120字" />)
  @min(20)
  @max(120)
  intr: string

  @label('性别')
  @formItem(Gender)
  @required()
  gender: string

  @formItem(<Checkbox>记住</Checkbox>, 'checked')
  remember: boolean

}

function repassword(v: string, formData: FormModel) {
  if(v !== formData.password) return '密码不一致'
}

const initialData:Partial<FormModel> = {
  remember: true,
  nickName: 'Elon Reeve Musk'
}

export default () => {
  const [data, setData] = useState({})

  return (
    <Form
      form={FormModel}
      subButton={<Button type="primary" >submit</Button>}
      initialData={initialData}
      onChange={data => setData(data)}
      onSuccess={res => print(res)}
      onError={err => print(err)}
    />
  )
}
