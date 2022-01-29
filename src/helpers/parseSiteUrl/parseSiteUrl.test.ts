// @ts-ignore
import parseSiteUrl from './parseSiteUrl'

describe('parse site url function', () => {
	const trimmedUrl = 'delivery.company.com'

	it('should trim url with www', () => {
		const mockUrl = 'https://www.delivery.company.com'

		expect(parseSiteUrl(mockUrl)).toEqual(trimmedUrl)
	})

	it('should trim url with http', () => {
		const mockUrl = 'http://delivery.company.com'

		expect(parseSiteUrl(mockUrl)).toEqual(trimmedUrl)
	})

	it('should trim url with https', () => {
		const mockUrl = 'https://delivery.company.com'

		expect(parseSiteUrl(mockUrl)).toEqual(trimmedUrl)
	})
})
