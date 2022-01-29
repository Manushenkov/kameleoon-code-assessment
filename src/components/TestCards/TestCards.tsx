import TestCard from '../TestCard/TestCard'
import { TestData } from '../../App'
import { SORT_ORDER, SORT_TYPE } from '../TestsLegend/TestsLegend'
import sortCards from '../../helpers/sortCards/sortCards'

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
