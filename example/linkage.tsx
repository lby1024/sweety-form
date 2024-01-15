import React, { FC, useEffect } from "react"
import { Flex, Input, Select, Button } from "antd"
import { required, rule, useForm } from "sweety-form"
import { print } from './tools'

class FormModel {
  @required()
  node: string

  @required()
  gender: 'female'|'male'|'other'

  @rule(otherGender)
  otherGender: string
}

function otherGender(v: string, formData: FormModel) {
  if(formData.gender === 'other' && !v) return '请填写otherGender'
}

const initialData: Partial<FormModel> = {
  node: 'hellow world'
}

export default () => {

  const [{values, errors}, {name, reset, submit, removeName, setForm, checkItem}] = useForm<FormModel>({
    FormModel,
    initialData,
    onSuccess: res => print(res),
    onError: err => print(err)
  })

  const fill = () => {
    setForm({
      'node': 'happy form',
      "gender": 'other'
    })
    checkItem('node')
    checkItem('gender')
  }

  useEffect(() => {
    if (values.gender === 'other') return
    removeName('otherGender')
  }, [values.gender])

  useEffect(() => {
    if(values.gender === 'female') setForm({node: 'hi, laddy!👩🏻'})
    if(values.gender === 'male') setForm({node: 'hi, man!👨🏻'})
    if(values.gender === 'other') setForm({node: 'h1, there!😅'})
  }, [values.gender])
  
  return <Flex vertical gap='large' className="page" >
    <div data-err={errors.node}>
      <Input {...name('node')} placeholder="node" />
    </div>

    <Gender
      {...name('gender')}
      data-err={errors.gender}
    />

    {
      values.gender === 'other' &&
      <div data-err={errors.otherGender} >
        <Input {...name('otherGender')} placeholder="other gender" />
      </div>
    }

    <Flex gap='small'>
      <Button onClick={submit} type='primary' >submit</Button>
      <Button onClick={reset} >reset</Button>
      <Button onClick={fill} type='link' >fill</Button>
    </Flex>
  </Flex>
}

const Gender:FC = (props) => {

  return <Select
    {...props}
    style={{width: 300}}
    placeholder="Select a option and change input text above"
    allowClear
  >
    <Select.Option value="male">male</Select.Option>
    <Select.Option value="female">female</Select.Option>
    <Select.Option value="other">other</Select.Option>
  </Select>
}