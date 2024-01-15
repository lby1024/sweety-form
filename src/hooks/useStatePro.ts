import { useRef, useState } from "react"

export default <T>(value: T) => {
  const [v, setV] = useState<T>(value)
  const vRef = useRef<T>()

  const getValue = (name?: string) => {
    if (!name) return vRef.current
    const data: any = vRef.current
    if(name && name in data) return data[name]
    return vRef.current
  }

  const setValue = (v: T) => {
    setV(v)
    vRef.current = v
  }

  return [v, setValue, getValue] as const
}