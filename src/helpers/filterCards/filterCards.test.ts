import filterCards from './filterCards'
import { TestData } from '../../components/TestCards/TestCards'

describe('parse site url function', () => {
	const mockCards = [
		{
			name: 'Prototype of the new map',
		},
		{
			name: 'Dark Theme test',
		},
		{
			name: "New Year's Sale",
		},
		{
			name: 'Some Name',
		},
	] as TestData[]

	it('should not filter anyting with no filters', () => {
		const filterBy = ''

		expect(filterCards(mockCards, filterBy)).toEqual(mockCards)
	})

	it('should correctly filter names', () => {
		const filterBy = 'theme'

		expect(filterCards(mockCards, filterBy)).toEqual([
			{ name: 'Dark Theme test' },
		])
	})
})
