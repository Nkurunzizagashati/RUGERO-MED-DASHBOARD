// src/App.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import { Provider } from 'react-redux'; // Redux Provider
import { store } from './redux/store'; // Your Redux store

import MainLayout from './layouts/MainLayout';
import ProductsDashboard from './pages/ProductsDashboard';
import DashboardHome from './pages/DashboardHome';
import NewsDashboard from './pages/NewsDashboard';
import CreateProductPage from './pages/CreateProductPage';
import LoginPage from './pages/LoginPage';
import EditProductPage from './pages/EditProductPage';
import PostNewsPage from './pages/PostNewsPage';
import EditNewsPage from './pages/EditNewsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import NewsDetailsPage from './pages/NewsDetailsPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{ index: true, element: <DashboardHome /> },
			{ path: 'products', element: <ProductsDashboard /> },
			{ path: 'news', element: <NewsDashboard /> },
			{ path: 'news/create', element: <PostNewsPage /> },
			{ path: 'news/:id/edit', element: <EditNewsPage /> },
			{ path: 'news/:id/details', element: <NewsDetailsPage /> },
			{ path: 'products/create', element: <CreateProductPage /> },
			{
				path: 'products/:id/details',
				element: <ProductDetailsPage />,
			},
			{
				path: 'products/:id/edit',
				element: <EditProductPage />,
			},
			{ path: 'login', element: <LoginPage /> },
		],
	},
]);

function App() {
	return (
		<Provider store={store}>
			<ParallaxProvider>
				<RouterProvider router={router} />
			</ParallaxProvider>
		</Provider>
	);
}

export default App;
