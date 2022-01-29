import { TestData } from '../../App'
import { SORT_ORDER, SORT_TYPE } from '../../components/TestsLegend/TestsLegend'
import { TestStatus } from '../../components/TestCard/TestCard'

const STATUS_TO_NUMBER = {
	[TestStatus.ONLINE]: 1,
	[TestStatus.PAUSED]: 2,
	[TestStatus.STOPPED]: 3,
	[TestStatus.DRAFT]: 4,
}

const sortHelper = (
	cards: TestData[],
	sortType: 'name' | 'type' | 'site',
	sortOrder: SORT_ORDER
) => {
	if (sortOrder === SORT_ORDER.ASC) {
		return cards.sort((a, b) => -a[sortType].localeCompare(b[sortType]))
	}

	if (sortOrder === SORT_ORDER.DESC) {
		return cards.sort((a, b) => a[sortType].localeCompare(b[sortType]))
	}

	return cards
}

const sortCards = (
	cards: TestData[],
	sortType: SORT_TYPE,
	sortOrder: SORT_ORDER
) => {
	if (sortType === SORT_TYPE.NONE || sortOrder === SORT_ORDER.NONE) {
		return cards
	}

	if (sortType === SORT_TYPE.STATUS) {
		if (sortOrder === SORT_ORDER.DESC) {
			return cards.sort(
				(a, b) =>
					STATUS_TO_NUMBER[a.status] - STATUS_TO_NUMBER[b.status]
			)
		}

		return cards.sort(
			(a, b) => STATUS_TO_NUMBER[b.status] - STATUS_TO_NUMBER[a.status]
		)
	}

	return sortHelper(cards, sortType, sortOrder)
}

export default sortCards
