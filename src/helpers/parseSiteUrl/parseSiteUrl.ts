const parseSiteUrl = (url: string) => {
	let splittedUrl = url.split('//')

	if (splittedUrl[0] === 'https:' || splittedUrl[0] === 'http:') {
		splittedUrl.shift()
	}

	splittedUrl = splittedUrl.join('').split('.')

	if (splittedUrl[0] === 'www') {
		splittedUrl.shift()
	}

	return splittedUrl.join('.')
}

export default parseSiteUrl
