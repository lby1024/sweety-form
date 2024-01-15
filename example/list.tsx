import React from 'react'
import { Flex, Input, Button } from 'antd'
import { useFormList } from 'sweety-form'
import { print } from './tools'

let n = 0

const initialData = ['a', 'b']

const rule = (list: string[]) => {
  if(list.length < 2) return '最少有两项'
}

const itemRule = (v: string) => {
  if(!v) return '请输入信息或者删除该项'
}

export default () => {
  const [formData, { name, push, unshift, submit, remove }] = useFormList({
    onError: err => print(err),
    onSuccess: res => print(res),
    initialData,
    itemRule,
    rule,
  })

  return <Flex vertical gap='large' className='page' >
    {
      formData.list.map((_, index) => (
        <Flex data-err={formData.errorList[index]} align='center' gap={3} key={index} >
          <Input {...name(index)} />
          <Button onClick={()=>remove(index)} size='small' style={{color: '#999'}} type='text' >删除</Button>
        </Flex>
      ))
    }
    
    <Button onClick={() => push(String(n++))} >push</Button>
    <Button onClick={() => unshift(String(n++))} >add at head</Button>
    <Button onClick={submit} type='primary' data-err={formData.error} >submit</Button>
  </Flex>
}