import './TestCard.scss'
import classNames from 'classnames'
import { memo } from 'react'

export enum TestType {
	CLASSIC = 'CLASSIC',
	SERVER_SIDE = 'SERVER_SIDE',
	MVT = 'MVT',
}

export enum TestStatus {
	DRAFT = 'DRAFT',
	ONLINE = 'ONLINE',
	PAUSED = 'PAUSED',
	STOPPED = 'STOPPED',
}

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
	name?: string
	type?: TestType
	status?: TestStatus
	site?: string
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

const getStatusCls = (status?: TestStatus) =>
	classNames('test-card__status', {
		'test-card__status_online': status === TestStatus.ONLINE,
		'test-card__status_paused': status === TestStatus.PAUSED,
		'test-card__status_stopped': status === TestStatus.STOPPED,
	})

const getButtonCls = (status?: TestStatus) =>
	classNames('test-card__button', {
		'test-card__button_finalize': status === TestStatus.DRAFT,
	})

const TestCard = memo(({ name, type, status, site }: TestsRowProps) => {
	return (
		<li className={getCardClassNames()}>
			<div className={'test-card__name'}>{name}</div>
			<div className={'test-card__type'}>{type && TYPES[type]}</div>
			<div className={getStatusCls(status)}>
				{status && STATUSES[status]}
			</div>
			<div className={'test-card__site'}>{site}</div>
			<button className={getButtonCls(status)}>Results</button>
		</li>
	)
})

export default TestCard
