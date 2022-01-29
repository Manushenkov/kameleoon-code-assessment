import './PageTitle.scss'
import { memo } from 'react'

interface PageTitleProps {
	title: String
}

const PageTitle = memo(({ title }: PageTitleProps) => (
	<h1 className='page-title'>{title}</h1>
))

export default PageTitle
