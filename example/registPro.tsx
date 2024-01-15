import React, { FC } from "react"
import { Flex, Input, Button, CascaderProps, Cascader, InputProps, Select, InputNumber } from 'antd'
import { email, nickName, password, required, rule, useForm } from 'sweety-form'

class FormModel {
  @email()
  email: string

  @password()
  password: string

  @rule(repassword)
  repassword: string

  @nickName()
  nickName: string

  @required()
  residence: string

  @required('请输入手机号码')
  phone: string

  prefix: string

  @required()
  donation: number

  suffix: string
}

type Name = keyof typeof FormModel.prototype

function repassword(v: string, formData: FormModel) {
  if(v !== formData.password) return '密码不一致'
}

export default () => {
  const [{values, errors}, api] = useForm<FormModel>({
    FormModel
  })
  console.log(values);
  

  const name = (key: Name) => ({
    ...api.name(key),
    error: errors[key],
    placeholder: key
  })

  const prefixSelector = (
    <Select {...api.name('prefix')} style={{ width: 70 }} defaultValue='86' >
      <Select.Option value="86">+86</Select.Option>
      <Select.Option value="87">+87</Select.Option>
    </Select>
  );

  const suffixSelector = (
    <Select {...api.name('suffix')} style={{ width: 70 }} defaultValue="CNY" >
      <Select.Option value="USD">$</Select.Option>
      <Select.Option value="CNY">¥</Select.Option>
    </Select>
  );

  return <Flex vertical gap='large' className="page">
    <MyInput     {...name('email')}      />
    <Password    {...name('password')}   />
    <Password    {...name('repassword')} />
    <MyInput     {...name('nickName')}   />
    <Cascader    {...name('residence')}  options={residences} data-err={errors.residence} />
    <MyInput     {...name('phone')}      addonBefore={prefixSelector} />
    <InputNumber {...name('donation')}   addonAfter={suffixSelector} style={{width: '100%'}} />

    <Button onClick={api.submit} type="primary" >registry</Button>
  </Flex>
}

interface ItemProps extends InputProps {
  error?: string | undefined
}

const MyInput: FC<ItemProps> = ({ error, ...attrs }) => (
  <div data-err={error} >
    <Input {...attrs} />
  </div>
)

const Password: FC<ItemProps> = ({ error, ...attrs }) => (
  <div data-err={error} >
    <Input.Password {...attrs} />
  </div>
)

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}

const residences: CascaderProps<DataNodeType>['options'] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];