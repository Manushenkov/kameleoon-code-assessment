import PageTitle from '../../components/PageTitle/PageTitle'
import { useParams } from 'react-router-dom'
import './Finalize.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'
import RedirectBack from '../../components/RedirectBack/RedirectBack'

const FINALIZE_URL = 'http://localhost:3100/tests/'

const Finalize = () => {
	const { testId } = useParams()
	const [name, setName] = useState('')

	useEffect(() => {
		axios.get(FINALIZE_URL + testId).then(({ data }) => setName(data.name))
	}, [])

	return (
		<div className={'finalize'}>
			<PageTitle title={'Finalize'} cls={'finalize__title'} />
			<div className={'finalize__name'}>{name}</div>
			<RedirectBack />
		</div>
	)
}

export default Finalize
