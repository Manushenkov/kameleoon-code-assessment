import './NoResult.scss'
import { Dispatch } from 'react'
import { ACTION } from '../../App'

interface NoResultProps {
	dispatch: Dispatch<any>
}

const NoResult = ({dispatch}: NoResultProps) => {
	const handleClick = () => {
		dispatch({
			type: ACTION.CHANGE_FILTER,
			filterValue: '',
		})
	}

	return (
		<div className={'no-result'}>
			<div className={'no-result__text'}>
				Your search did not match any results.
			</div>
			<button className={'no-result__button'} onClick={handleClick}>
				Reset
			</button>
		</div>
	)
}

export default NoResult
