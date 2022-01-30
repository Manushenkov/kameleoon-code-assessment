import TestCard from '../TestCard/TestCard'
import sortCards from '../../helpers/sortCards/sortCards'
import { SORT_ORDER, SORT_TYPE, TestStatus, TestType } from '../../types/enums'

export type TestData = {
	site: string
	id: number
	name: string
	type: TestType
	status: TestStatus
	siteId: number
}

interface TestCardsProps {
	filteredCards: TestData[]
	sortType: SORT_TYPE
	sortOrder: SORT_ORDER
}

const TestCards = ({ filteredCards, sortType, sortOrder }: TestCardsProps) => {
	const sortedCards = sortCards(filteredCards, sortType, sortOrder)

	return (
		<ul>
			{sortedCards.map((data: TestData) => (
				<TestCard key={data.id} {...data} />
			))}
		</ul>
	)
}

export default TestCards
