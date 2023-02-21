import { useEffect, useState } from 'react';
import { saveToken } from './store/saveToken/actions';
import { meRequestAsync } from './store/me/actions';
import { useDispatch } from 'react-redux';
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { Content } from './components/Content';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NotFound } from './components/NotFound';
import { CardsList } from './components/CardsList';
import './main.global.css';

function App() {
	const [mounted, setMounted] = useState(false)
  const dispatch = useDispatch();

	useEffect(() => {
		setMounted(true)
	}, []);
  
  useEffect(() => {
		dispatch(saveToken());
		
		dispatch(meRequestAsync());      
  }, [])

	return (
		<>
		{mounted && (
			<Layout>
			<Header />
				<Content>
					<Routes>
						<Route path='/auth' element={<Navigate replace to='/posts'/> } />
						<Route path='/' element={<Navigate replace to='/posts'/> } />
						<Route path='/posts/*' element={<CardsList />} />
						<Route path='*' element={<NotFound /> } />
					</Routes>
				</Content>
			</Layout>
		)}
	</>
	)
}

export default App;