import PageTitle from '../../components/PageTitle/PageTitle'
import { useParams } from 'react-router-dom'
import './Results.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'
import RedirectBack from '../../components/RedirectBack/RedirectBack'

const RESULTS_URL = 'http://localhost:3100/tests/'

const Results = () => {
	const { testId } = useParams()
	const [name, setName] = useState('')

	useEffect(() => {
		axios.get(RESULTS_URL + testId).then(({ data }) => setName(data.name))
	}, [])

	return (
		<div className={'results'}>
			<PageTitle title={'Results'} cls={'results__title'} />
			<div className={'results__name'}>{name}</div>
			<RedirectBack />
		</div>
	)
}

export default Results
