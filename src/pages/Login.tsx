import { useState } from "react"
import { useHistory } from "react-router"
import axios, { AxiosError } from 'axios'
import { saveToken, saveUsername } from "../utils/storage"

type LoginResp = {
  role: 'admin' | 'customer',
  token: string,
  username: string
}

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const login = async () => {
    //Api has been improved from original lab-09
    try {
      const resp = await axios.get<LoginResp>('https://lab-09-finished-261207.herokuapp.com/user/login',
        {
          auth: {
            username, password
          }
        })
      console.log('resp', resp)
      const role = resp.data.role

      saveToken(resp.data.token)
      saveUsername(resp.data.username)

      if (role === 'admin')
        history.push('/admin')
      else if (role === 'customer')
        history.push('/customer')

    }
    catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data.message)
      }
    }
  }

  return (
      <div className='grid'>
        <span>Username </span>
        <input className=""
          onChange={e => setUsername(e.target.value)}
          value={username}
        />

        <span>Password </span>
        <input type='password'
          onChange={e => setPassword(e.target.value)}
          onKeyUp={e => e.key === 'Enter' ? login() : null}
          value={password}
        />
        <button className='mt-2' onClick={() => login()}>Login</button>
      </div>
  )
}

export default Login