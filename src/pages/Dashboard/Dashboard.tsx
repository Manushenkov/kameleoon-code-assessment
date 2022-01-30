import { useEffect, useMemo, useReducer } from 'react'
import axios from 'axios'
import filterCards from '../../helpers/filterCards/filterCards'
import TestsLegend from '../../components/TestsLegend/TestsLegend'
import parseSiteUrl from '../../helpers/parseSiteUrl/parseSiteUrl'
import SearchInput from '../../components/SearchInput/SearchInput'
import TestCards, { TestData } from '../../components/TestCards/TestCards'
import NoResult from '../../components/NoResult/NoResult'
import PageTitle from '../../components/PageTitle/PageTitle'
import { ACTION, SORT_ORDER, SORT_TYPE } from '../../types/enums'
import './Dashboard.scss'

const TESTS_LIST_URL = 'http://localhost:3100/tests'
const SITES_LIST_URL = 'http://localhost:3100/sites'

const newCorrespondingSortOrder = {
	[SORT_ORDER.NONE]: SORT_ORDER.ASC,
	[SORT_ORDER.ASC]: SORT_ORDER.DESC,
	[SORT_ORDER.DESC]: SORT_ORDER.NONE,
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

const Dashboard = () => {
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
		<>
			<PageTitle title={'Dashboard'} cls={'dashboard__title'} />
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
		</>
	)
}

export default Dashboard
