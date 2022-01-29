import './App.scss'
import PageTitle from './components/PageTitle/PageTitle'
import SearchInput from './components/SearchInput/SearchInput'
import { TestStatus, TestType } from './components/TestCard/TestCard'
import TestsLegend, {
	SORT_ORDER,
	SORT_TYPE,
} from './components/TestsLegend/TestsLegend'
import { useEffect, useMemo, useReducer } from 'react'
import axios from 'axios'
import TestCards from './components/TestCards/TestCards'
import filterCards from './helpers/filterCards/filterCards'
import parseSiteUrl from './helpers/parseSiteUrl/parseSiteUrl'
import NoResult from './components/NoResult/NoResult'

const TESTS_LIST_URL = 'http://localhost:3100/tests'
const SITES_LIST_URL = 'http://localhost:3100/sites'

export enum ACTION {
	SAVE_TESTS = 'SAVE_TESTS',
	SAVE_SITES = 'SAVE_SITES',
	CHANGE_SORT = 'CHANGE_SORT',
	CHANGE_FILTER = 'CHANGE_FILTER',
}

const newCorrespondingSortOrder = {
	[SORT_ORDER.NONE]: SORT_ORDER.ASC,
	[SORT_ORDER.ASC]: SORT_ORDER.DESC,
	[SORT_ORDER.DESC]: SORT_ORDER.NONE,
}

export type TestData = {
	site: string
	id: number
	name: string
	type: TestType
	status: TestStatus
	siteId: number
}

export type SiteData = {
	id: number
	url: string
}

export type SiteDataParsed = {
	[id: number]: { url: string }
}

type SaveTests = { type: ACTION.SAVE_TESTS; data: TestData[] }
type SaveSites = { type: ACTION.SAVE_SITES; data: SiteData[] }
export type ChangeSort = {
	type: ACTION.CHANGE_SORT
	changedSortType: SORT_TYPE
}
export type ChangeFilter = { type: ACTION.CHANGE_FILTER; filterValue: string }

type ActionType = SaveTests | ChangeSort | ChangeFilter | SaveSites

type stateSchema = {
	sortType: SORT_TYPE
	sites: SiteDataParsed
	sortOrder: SORT_ORDER
	testCards: TestData[]
	filterValue: string
}

const initialState = {
	testCards: [],
	sites: [],
	sortType: SORT_TYPE.NONE,
	sortOrder: SORT_ORDER.NONE,
	filterValue: '',
}

const reducer = (state: stateSchema, action: ActionType) => {
	switch (action.type) {
		case ACTION.SAVE_TESTS:
			for (const i in action.data) {
				action.data[i].site = parseSiteUrl(
					state.sites[action.data[i].siteId].url
				)
			}

			return { ...state, testCards: action.data }

		case ACTION.SAVE_SITES:
			const sitesUrlObject: SiteDataParsed = {}

			action.data.forEach(({ id, url }) => {
				sitesUrlObject[id] = { url }
			})

			return { ...state, sites: sitesUrlObject }

		case ACTION.CHANGE_SORT:
			if (state.sortType === action.changedSortType) {
				return {
					...state,
					sortOrder: newCorrespondingSortOrder[state.sortOrder],
				}
			}

			return {
				...state,
				sortType: action.changedSortType,
				sortOrder: SORT_ORDER.ASC,
			}

		case ACTION.CHANGE_FILTER:
			return { ...state, filterValue: action.filterValue }
	}
	return state
}

function App() {
	const [state, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		axios
			.get(SITES_LIST_URL)
			.then(({ data }: { data: SiteData[] }) => {
				dispatch({ type: ACTION.SAVE_SITES, data })
			})
			.then(() =>
				axios
					.get(TESTS_LIST_URL)
					.then(({ data }: { data: TestData[] }) =>
						dispatch({ type: ACTION.SAVE_TESTS, data })
					)
			)
	}, [])

	const filteredCards = useMemo(
		() => filterCards(state.testCards, state.filterValue),
		[state.testCards, state.filterValue, state.sortOrder, state.sortType]
	)

	return (
		<div className='App'>
			<div
				style={{
					maxWidth: '957px',
					margin: 'auto',
					paddingTop: '40px',
				}}
			>
				<header className='App-header'>
					<PageTitle title={'Dashboard'} />
				</header>
				<SearchInput
					dispatch={dispatch}
					filterValue={state.filterValue}
					testAmount={filteredCards.length}
				/>
				{!state.testCards.length || filteredCards.length ? (
					<>
						<TestsLegend
							dispatch={dispatch}
							sortType={state.sortType}
							sortOrder={state.sortOrder}
						/>
						<TestCards
							filteredCards={filteredCards}
							sortType={state.sortType}
							sortOrder={state.sortOrder}
						/>
					</>
				) : (
					<NoResult dispatch={dispatch} />
				)}
			</div>
		</div>
	)
}

export default App
