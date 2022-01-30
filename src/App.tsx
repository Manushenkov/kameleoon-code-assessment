import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Results from './pages/Results/Results'
import Finalize from './pages/Finalize/Finalize'

function App() {
	return (
		<div className='app'>
			<div className={'app__container'}>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Dashboard />} />
						<Route path='/results/:testId' element={<Results />} />
						<Route
							path='/finalize/:testId'
							element={<Finalize />}
						/>
					</Routes>
				</BrowserRouter>
			</div>
		</div>
	)
}

export default App
