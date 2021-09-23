import { useEffect } from "react"
import { useHistory } from "react-router"
import api from "../utils/api"
import { loadToken } from "../utils/token"

type UserRoleResp = {
  role: 'admin' | 'customer',
  username: string
}

const Admin = () => {
  const history = useHistory()
  useEffect(()=>{
    const token = loadToken()
    if (!token)
      history.push('/')

    api.get<UserRoleResp>('https://lab-09-finished-261207.herokuapp.com/user/role',
    {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(resp => {
      if (resp.data.role !== 'admin')
        history.push('/')
    })

  }, [])
  return (
    <div>
      admin dashboard
    </div>
  )
}

export default Admin