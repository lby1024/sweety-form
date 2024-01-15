export const required = (info?: string) => (prototype: any, attr: string) => {
  const cb = (v: any) => {
    if(!v) return info || '必填'
  }
  rule(cb)(prototype, attr)
}

export const min = (len: number, info?: string) => (prototype: any, attr: string) => {
  const cb = (v: string) => {
    if(v && v.length < len) return info || `不能小于${len}位`
  }
  rule(cb)(prototype, attr)
}

export const max = (len: number, info?: string) => (prototype: any, attr: string) => {
  const cb = (v: string) => {
    if(v && v.length > len) return info || `不能大于${len}位`
  }
  rule(cb)(prototype, attr)
}

export const nickName = (info?: string) => (prototype: any, attr: string) => {
  const cb = (v: string) => {
    const res = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(v)
    if (res === false) return info || '请填写中文或字母或数字或下划线'
    if (!v || v.length<3) return info || '昵称长度不小于3'
  }
  rule(cb)(prototype, attr)
}

export const password = (info?: string) => (prototype: any, attr: string) => {
  const cb = (v: string) => {
    const errInfo = info || '密码只能由数字或字母或符号组成'
    const res = /^(\w|[!@#$%^&*()?])+$/.test(v)
    if(res === false) return errInfo
    if(!v || v.length < 6) return errInfo
  }
  rule(cb)(prototype, attr)
}

export const email = (info?: string) => (prototype: any, attr: string) => {
  const cb = (v: string) => {
    const res = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(v)
    if(res === false) return info || '请输入email'
  }
  rule(cb)(prototype, attr)
}

export const rule = (cb: Function) => (prototype: any, attr: string) => {
  if (!prototype.rules) prototype.rules = {}
  if(!prototype.rules[attr]) prototype.rules[attr] = []
  prototype.rules[attr].unshift(cb)
}

export const label = (v: string) => (prototype: any, attr: string) => {
  if(!prototype.labels) prototype.labels = {}
  prototype.labels[attr] = v
}

export const formItem = (item: any, valueName='value') => (prototype: any, attr: string) => {
  if (!prototype.labels) prototype.formItems = {}
  prototype.formItems[attr] = {
    item,
    valueName
  }
}