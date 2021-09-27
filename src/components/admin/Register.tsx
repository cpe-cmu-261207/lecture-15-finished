import { useState } from "react"
import { loadToken } from "../../utils/storage"
import axios from 'axios'
import { useHistory } from "react-router"

type Role = 'admin' | 'customer'

const Register = () => {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [role, setRole] = useState<Role>('admin')
	const [money, setMoney] = useState('')

	const history = useHistory()

	const register = async () => {
		if (password !== confirmPassword) {
			alert('Please recheck your password')
			return
		}
		try {
			const token = loadToken()
			const resp = await axios.post('https://lab-09-finished-261207.herokuapp.com/user/regis',
				{
					username, password, role, money: parseInt(money)
				},
				{
					headers: { Authorization: `Bearer ${token}` }
				})
			alert("Registered successfully")

			setUsername('')
			setPassword('')
			setConfirmPassword('')
			setMoney('')
			setRole('admin')
		}
		catch (err) {
			if (axios.isAxiosError(err)) {
				if (err.response?.status === 401)
					history.push('/')
				else 
					alert(err.response?.data.message)
			}
		}
	}

	return (
		<div className='grid'>
			<span>Username</span>
			<input onChange={e => setUsername(e.target.value)} value={username}></input>
			<span>Password</span>
			<input type='password' onChange={e => setPassword(e.target.value)} value={password}></input>
			<span>Confirm Password</span>
			<input type='password' onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword}></input>

			<div className='flex my-2 space-x-2'>
				<span>Role</span>
				<div>
					<input type='radio' name='role' value='admin'
						onChange={e => setRole(e.target.value as Role)}
						checked={role === 'admin'}></input>
					<span>Admin</span>
				</div>
				<div>
					<input type='radio' name='role' value='customer'
						onChange={e => setRole(e.target.value as Role)}
						checked={role === 'customer'}></input>
					<span>Customer</span>
				</div>
			</div>

			{role === 'customer' ?
				<>
					<span>Starting Money</span>
					<input type='number' onChange={e => setMoney(e.target.value)} value={money}></input>
				</>
				:
				null
			}


			<button className='mt-2' onClick={()=>register()}>Register</button>
		</div>
	)
}

export default Register