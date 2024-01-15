import { Button, Card, Flex, Input, Typography } from 'antd'
import { createForm, required } from 'sweety-form'
import React, { FC, useEffect } from 'react'

const useGroup = createForm()

const rule = (list: any[]) => {
  if(list.length<1) return '至少有一张卡片'
}

export default () => {

  const [{list, error}, {name, push, submit, remove}] = useGroup.formList({
    onError: err => console.log(err),
    onSuccess: res => console.log(res),
    rule
  })

  return <Flex vertical gap='small' style={{width: 500}} >
    {
      list.map((_, index) => (
        <NameCard
          {...name(index)}
          onClose={() => remove(index)}
          key={index}
        />)
      )
    }

    <Button onClick={() => push()} >+ add item</Button>
    <Button onClick={submit} type='primary' data-err={error} >submit</Button>

    <Typography>
      <pre>{JSON.stringify(list, null, 2)}</pre>
    </Typography>

  </Flex>
}


class CardModel {
  @required()
  title: string
  names: any[]
}

interface Props {
  value?: any,
  onChange?: (value: any) => void
}

interface NameCardProps extends Props {
  onClose?: ()=>void
}

export const NameCard:FC<NameCardProps> = (props) => {

  const [{ errors, values }, { name, setForm }] = useGroup.form<CardModel>({
    FormModel: CardModel,
    onChange: (v) => props.onChange && props.onChange(v)
  })

  useEffect(() => {
    if (props.value) {
      setForm(props.value)
    }
  }, [props.value])

  return (
    <Card title={values.title} extra={<Button type='link' onClick={props.onClose}  >X</Button>} >
      <Flex vertical gap='large' >
        <div data-err={errors.title} >
          <Input placeholder='title...' {...name('title')}  />
        </div>

        <NameList {...name('names')} />
      </Flex>
    </Card>
  )
}


const NameList:FC<Props> = (props) => {
  const [{ list }, { name, push, remove, setList }] = useGroup.formList({
    onChange: list => props.onChange && props.onChange(list),
    initialData: [{ firstName: undefined }]
  })

  useEffect(() => {
    if (props.value) {
      setList(props.value)
    }
  }, [props.value])

  return <Flex vertical gap='large'  >
    {
      list.map((_, index) => (
        <Flex gap='small' align='center' key={index}>
          <InputName {...name(index)} />
          <Button onClick={()=>remove(index)} size='small' style={{color: '#999'}} type='text' >删除</Button>
        </Flex>
      ))
    }
    <Button type="dashed" onClick={() => push()}>add name</Button>
  </Flex>
}

interface InputNameProps {
  value: any,
  onChange: (value: any) => void
}

class NameMode {
  @required('first name must be filled')
  firstName: string
  @required('last name must be filled')
  lastName: string
}

const InputName: FC<InputNameProps> = (props) => {

  const [{errors}, { name, setForm }] = useGroup.form<NameMode>({
    FormModel: NameMode,
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

