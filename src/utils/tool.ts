
type T = 'String' | 'Number' | 'Undefined' | 'Null' | 'Array' | 'Object' 

export function typeOf(target: any) {
  const str = Object.prototype.toString.call(target)
  return str.slice(8, str.length-1) as T
}

export function getFormItemValue(e: any, valueName='value') {
  if(!e) return e
  if(!e.target) return e
  return e.target[valueName]
}