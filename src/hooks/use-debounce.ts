import { useRef } from "react"

export const useDebounce = <T>(cb: (...a: T[]) => void, delay=300) => {
  const timer = useRef<any>()

  return (...args: T[]) => {
    if(timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      cb.call(undefined, ...args)
    }, delay)
  }
}