import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { loadToken, loadUsername } from "../utils/storage"
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import Register from "../components/admin/Register"
import Topup from "../components/admin/Topup"

type UserRoleResp = {
  role: 'admin' | 'customer',
  username: string
}

const Admin = () => {
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fn = async () => {
      const token = loadToken()
      try {
        const resp = await axios.get<UserRoleResp>('https://lab-09-finished-261207.herokuapp.com/user/role',
          {
            headers: { Authorization: `Bearer ${token}` }
          })
        if (resp.data.role !== 'admin')
          history.push('/')
      }
      catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401)
            history.push('/')
          else
            console.log(err)
        }
      }

      //load username and show
      const loadedUsername = loadUsername()
      if (loadedUsername)
        setUsername(loadedUsername)

      setLoading(false)
    }

    fn()

  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    history.push('/')
  }

  if (loading)
    return <p className='text-center'> loading ...</p>
  else
    return (
      <div>
        <div className='text-center'>
          <p> Hello <span className="font-bold">{username}</span> </p>
          <a>
            <Link to='/admin/regis'>Register new account</Link>
          </a>
          &nbsp;|&nbsp;
          <a>
            <Link to='/admin/topup'>Topup</Link>
          </a>
          &nbsp;|&nbsp;
          <a onClick={logout}>Logout</a>
        </div>
        <Switch>
          <Route path='/admin/regis'>
            <Register />
          </Route>
          <Route path='/admin/topup'>
            <Topup />
          </Route>
        </Switch>
      </div>
    )
}

export default Admin