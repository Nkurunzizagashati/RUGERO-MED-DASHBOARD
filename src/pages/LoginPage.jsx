// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, error } = useSelector((state) => state.auth);

	const [credentials, setCredentials] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCredentials((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(loginUser(credentials)).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				navigate('/dashboard');
			}
		});
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-rugero-secondary">
			<div className="bg-rugero-lightGray shadow-lg rounded-lg p-8 w-full max-w-md">
				<h2 className="text-2xl font-bold text-center mb-6">
					Admin Login
				</h2>

				{error && (
					<div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block mb-1 font-medium">
							Email
						</label>
						<input
							type="email"
							name="email"
							value={credentials.email}
							onChange={handleChange}
							required
							className="w-full border px-3 py-2 rounded"
						/>
					</div>

					<div>
						<label className="block mb-1 font-medium">
							Password
						</label>
						<input
							type="password"
							name="password"
							value={credentials.password}
							onChange={handleChange}
							required
							className="w-full border px-3 py-2 rounded"
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-rugero-primary text-white py-2 rounded hover:bg-rugero-accent disabled:opacity-50"
					>
						{loading ? 'Logging in...' : 'Login'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
