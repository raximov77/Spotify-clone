import { useEffect, useState } from 'react'
import {useAxios} from "./useAxios"

function useAuth(code) {
  const [accsessToken, setAccsessToken] = useState(null)
  useEffect(() => {
    useAxios().post("/login", {code}).then(res => {
      setAccsessToken(res.data.accsessToken);
      window.history.pushState({}, null, "/")
    }).catch(err => window.location = "/")
  }, [code])
  return accsessToken
}

export default useAuth