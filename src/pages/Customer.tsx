import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { loadToken, loadUsername } from "../utils/storage"
import axios from 'axios'

type UserRoleResp = {
	role: 'admin' | 'customer',
	username: string
}

const Customer = () => {
	const [username, setUsername] = useState('')
	const [money, setMoney] = useState<number | null>(null)
	const [loading, setLoading] = useState(true)
	const history = useHistory()

	useEffect(() => {
		const fn = async () => {
			const token = loadToken()

			try {
				const userRoleResp = await axios.get<UserRoleResp>('https://lab-09-finished-261207.herokuapp.com/user/role',
					{
						headers: { Authorization: `Bearer ${token}` }
					})
				if (userRoleResp.data.role !== 'customer')
					history.push('/')
			} catch (err) {
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

			//fetch money
			const moneyResp = await axios.get('https://lab-09-finished-261207.herokuapp.com/money',
				{
					headers: { Authorization: `Bearer ${token}` }
				})
			setMoney(moneyResp.data.money)
			setLoading(false)
		}

		fn()
	})

	const logout = () => {
		localStorage.removeItem('token')
		history.push('/')
	}

	return (
		<div className='text-center'>
			{
				loading ? <p> loading ... </p> :
					<>
						<p>Hi <span className="font-bold">{username}</span></p>
						<p>You have <span className="font-bold">{money?.toLocaleString()}</span> bath</p>
						<a onClick={logout}>Logout</a>
					</>
			}
		</div>
	)
}

export default Customer