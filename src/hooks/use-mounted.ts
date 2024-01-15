import { useEffect, useRef } from 'react';

export const useMounted = (cb: Function) => {
  const mounted = useRef(false); // 最新的react useEffect(()=>{},[]) 会执行两次
  let unmouted: Function

  useEffect(() => {
    // useEffect会执行两次, 这是第二次执行的内容
    if (mounted.current === true) {
      return () => {
        unmouted && unmouted()
      }
    }
    // useEffect会执行两次, 这是第一次执行的内容
    if (mounted.current === false) {
      mounted.current = true;
      unmouted = cb();
    }
  }, []);
};
