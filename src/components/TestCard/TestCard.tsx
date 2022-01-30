import './TestCard.scss'
import classNames from 'classnames'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import { TestStatus, TestType } from '../../types/enums'

const STATUSES = {
	[TestStatus.ONLINE]: 'Online',
	[TestStatus.PAUSED]: 'Paused',
	[TestStatus.STOPPED]: 'Stopped',
	[TestStatus.DRAFT]: 'Draft',
}
const TYPES = {
	[TestType.CLASSIC]: 'Classic',
	[TestType.MVT]: 'MVT',
	[TestType.SERVER_SIDE]: 'Server-side',
}

interface TestsRowProps {
	name: string
	type: TestType
	status: TestStatus
	site: string
	id: number
}

const getCardClassNames = () => {
	const randomNumber = Math.random()

	return classNames('test-card', {
		'test-card_border-purple': randomNumber < 0.3,
		'test-card_border-light-purple':
			randomNumber >= 0.3 && randomNumber < 0.7,
		'test-card_border-red': randomNumber >= 0.7,
	})
}

const getStatusCls = (status: TestStatus) =>
	classNames('test-card__status', {
		'test-card__status_online': status === TestStatus.ONLINE,
		'test-card__status_paused': status === TestStatus.PAUSED,
		'test-card__status_stopped': status === TestStatus.STOPPED,
	})

const getButtonCls = (status: TestStatus) =>
	classNames('test-card__button', {
		'test-card__button_finalize': status === TestStatus.DRAFT,
	})

const getButtonRoute = (status: TestStatus, testId: number) => {
	if (status === TestStatus.DRAFT) {
		return `/finalize/${testId}`
	}

	return `/results/${testId}`
}

const getButtonText = (status: TestStatus) => {
	return status === TestStatus.DRAFT ? 'Finalize' : 'Results'
}

const TestCard = memo(({ name, type, status, site, id }: TestsRowProps) => {
	return (
		<li className={getCardClassNames()}>
			<div className={'test-card__name'}>{name}</div>
			<div className={'test-card__type'}>{type && TYPES[type]}</div>
			<div className={getStatusCls(status)}>
				{status && STATUSES[status]}
			</div>
			<div className={'test-card__site'}>{site}</div>
			<Link to={getButtonRoute(status, id)}>
				<button className={getButtonCls(status)}>
					{getButtonText(status)}
				</button>
			</Link>
		</li>
	)
})

export default TestCard
