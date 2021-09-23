import { useState } from "react"
import { useHistory } from "react-router"
import api from '../utils/api'
import {AxiosError} from 'axios'
import { saveToken } from "../utils/token"

type LoginResp = {
  role: 'admin' | 'customer',
  token: string
}

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const onClickLogin = () => {
    api.get<LoginResp>('https://lab-09-finished-261207.herokuapp.com/user/login',
      {
        auth: {
          username, password
        }
      }
    ).then(resp => {
      console.log('resp', resp)
      const role = resp.data.role
      saveToken(resp.data.token)
      if (role === 'admin') 
        history.push('/admin')
      else if (role === 'customer')
        history.push('/customer')
    })
    .catch((err: Error | AxiosError) => {
      if (api.isAxiosError(err)) {
        alert(err.response?.data.message)
      }
    })
  }

  return (
    <div className='mx-auto w-64'>
      <span>Username </span>
      <input className=""
        onChange={e => setUsername(e.target.value)} />
      <br></br>
      <span>Password </span>
      <input type='password'
        onChange={e => setPassword(e.target.value)}
      />
      <br></br>
      <button onClick={() => onClickLogin()}>Login</button>
    </div>
  )
}

export default Login