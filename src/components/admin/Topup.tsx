import axios from "axios"
import { useState } from "react"
import { useHistory } from "react-router"
import { loadToken } from "../../utils/storage"

const Topup = () => {
	const history = useHistory()
	const [username, setUsername] = useState('')
	const [amount, setAmount] = useState('')

	const topup = async () => {
		const token = loadToken()
		try {
			const resp = axios.put('https://lab-09-finished-261207.herokuapp.com/money/topup',
			{
			   username, amount: parseInt(amount)
			},
			{
			   headers: { Authorization: `Bearer ${token}` }
			})
			alert('Topup successfully')
		}
		catch(err){
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
			<span>Customer Username</span>
			<input
				onChange={e => setUsername(e.target.value)}
				value={username}>
			</input>
			<span>Topup Amount</span>
			<input type='number'
				onChange={e => setAmount(e.target.value)}
				value={amount}
			></input>
			<button className='mt-3' onClick={()=>topup()}>Topup</button>
		</div>
	)
}

export default Topup