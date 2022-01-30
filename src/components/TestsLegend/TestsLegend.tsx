import './TestsLegend.scss'
import { Dispatch } from 'react'
import { ChangeSort } from '../../pages/Dashboard/Dashboard'
import sortIcon from './sortIcon.svg'
import classNames from 'classnames'
import { ACTION, SORT_ORDER, SORT_TYPE } from '../../types/enums'

const titles = [
	{ type: SORT_TYPE.NAME, className: 'tests-legend__name' },
	{ type: SORT_TYPE.TYPE, className: 'tests-legend__type' },
	{ type: SORT_TYPE.STATUS, className: 'tests-legend__status' },
	{ type: SORT_TYPE.SITE, className: 'tests-legend__site' },
]

const getSortIconCls = (sortOrder: SORT_ORDER) =>
	classNames('tests-legend__icon', {
		'tests-legend__icon_ascending': sortOrder === SORT_ORDER.ASC,
		'tests-legend__icon_descending': sortOrder === SORT_ORDER.DESC,
	})

interface TestsLegendProps {
	dispatch: Dispatch<ChangeSort>
	sortType: SORT_TYPE
	sortOrder: SORT_ORDER
}

const TestsLegend = ({ dispatch, sortType, sortOrder }: TestsLegendProps) => {
	const handleChange = (changedSortType: SORT_TYPE) => () => {
		dispatch({ type: ACTION.CHANGE_SORT, changedSortType })
	}

	return (
		<div className={'tests-legend'}>
			{titles.map(({ type, className }) => (
				<div
					key={type}
					onClick={handleChange(type)}
					className={className}
				>
					{type}
					{sortType === type && (
						<img
							src={sortIcon}
							className={getSortIconCls(sortOrder)}
						/>
					)}
				</div>
			))}
		</div>
	)
}

export default TestsLegend
