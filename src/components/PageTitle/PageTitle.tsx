import './PageTitle.scss'
import { memo } from 'react'

interface PageTitleProps {
	title: string
	cls?: string
}

const PageTitle = memo(({ title, cls }: PageTitleProps) => (
	<h1 className={'page-title ' + cls}>{title}</h1>
))

export default PageTitle
