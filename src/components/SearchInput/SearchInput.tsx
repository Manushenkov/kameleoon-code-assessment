import './SearchInput.scss'
import searchIcon from './searchIcon.svg'
import { ChangeEvent, Dispatch, memo } from 'react'
import { ChangeFilter } from '../../pages/Dashboard/Dashboard'
import { ACTION } from '../../types/enums'

interface SearchInputProps {
	filterValue?: string
	testAmount?: number
	dispatch: Dispatch<ChangeFilter>
}

const PLACEHOLDER_TEXT = 'What test are you looking for?'

const SearchInput = memo(
	({ filterValue, testAmount = 0, dispatch }: SearchInputProps) => {
		const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
			dispatch({
				type: ACTION.CHANGE_FILTER,
				filterValue: e.target.value,
			})
		}

		return (
			<div className={'search'}>
				<img
					alt={'search icon'}
					src={searchIcon}
					className={'search__image'}
				/>
				<input
					type='search'
					className='search__input'
					placeholder={PLACEHOLDER_TEXT}
					onChange={handleInputChange}
					value={filterValue}
				/>
				<p className={'search__tests'}>{testAmount} tests</p>
			</div>
		)
	}
)

export default SearchInput
