import './RedirectBack.scss'
import { useNavigate } from 'react-router-dom'
import icon from './redirectIcon.svg'

const RedirectBack = () => {
	const navigate = useNavigate()

	return (
		<div className={'redirect-back'} onClick={() => navigate(-1)}>
			<img className={'redirect-back__image'} src={icon} />
			<div className={'redirect-back__text'}>Back</div>
		</div>
	)
}

export default RedirectBack
