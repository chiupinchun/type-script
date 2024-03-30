import { useEffect, useState } from "react"

export const useFetch = <T = unknown>(
  fetcher: () => Promise<T>,
  deps: React.DependencyList = []
) => {
  const [data, setData] = useState<T | null>(null)
  const [pending, setPending] = useState(false)
  const [err, setErr] = useState<unknown>(null)

  const refresh = () => {
    setPending(true)
    fetcher().then(res => {
      setData(res)
    }).catch((err: unknown) => {
      setErr(err)
    }).finally(() => {
      setPending(false)
    })
  }

  // eslint-disable-next-line
  useEffect(refresh, deps)

  return {
    data,
    pending,
    refresh,
    err
  }
}
