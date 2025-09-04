// src/layouts/DashboardLayout.jsx
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell } from 'lucide-react';
import { useState } from 'react';

const DashboardLayout = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const location = useLocation();

	// Navigation links config
	const navLinks = [
		{ to: '/products', label: 'Products', icon: '🏥' },
		{ to: '/news', label: 'News', icon: '📰' },
	];

	return (
		<div className="flex h-screen bg-gray-100">
			{/* Sidebar */}
			{/* Sidebar */}
			<aside
				className={`fixed top-0 left-0 h-full w-64 bg-rugero-secondary text-rugero-textOnPrimary shadow-lg shadow-rugero-textMuted z-20 transform transition-transform duration-300
    ${
		sidebarOpen ? 'translate-x-0' : '-translate-x-64'
	} md:translate-x-0`}
			>
				<div className="flex flex-col h-full justify-between">
					{/* Logo */}
					<div>
						<div className="p-6 text-xl font-bold border-b border-white/20 text-rugero-primary flex gap-1">
							RugeroMed
						</div>

						{/* Nav links */}
						<nav className="mt-6 flex flex-col space-y-2 px-4">
							{navLinks.map((link) => (
								<Link
									key={link.to}
									to={link.to}
									className={`px-3 py-2 rounded transition-colors ${
										location.pathname === link.to
											? 'bg-rugero-gray5 text-white'
											: 'hover:bg-rugero-gray3'
									}`}
								>
									<span className="mr-2">
										{link.icon}
									</span>
									{link.label}
								</Link>
							))}
						</nav>
					</div>

					{/* Bottom login link */}
					<div className="p-4 border-t border-white/20">
						<Link
							to="/login"
							className={`flex items-center px-3 py-2 rounded transition-colors ${
								location.pathname === '/login'
									? 'bg-rugero-gray5 text-white'
									: 'hover:bg-rugero-gray3'
							}`}
						>
							<span className="mr-2">🔑</span>
							Login
						</Link>
					</div>
				</div>
			</aside>

			{/* Main Content */}
			<div className="flex flex-col flex-1 ml-0 md:ml-64">
				{/* Top Navbar */}
				<header className="h-16 bg-rugero-secondary shadow-lg shadow-rugero-textMuted flex items-center justify-between px-4 md:px-6 z-10 relative">
					{/* Sidebar toggle for mobile */}
					<button
						className="md:hidden text-rugero-textOnPrimary"
						onClick={() => setSidebarOpen(!sidebarOpen)}
					>
						{sidebarOpen ? (
							<X size={24} />
						) : (
							<Menu size={24} />
						)}
					</button>

					<div className="text-lg font-semibold text-rugero-textOnPrimary">
						Admin Dashboard
					</div>

					<div className="flex items-center space-x-4">
						<button className="relative">
							<Bell
								size={20}
								className="text-rugero-textOnPrimary"
							/>
							<span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
						</button>
						<div className="w-8 h-8 bg-rugero-background rounded-full"></div>
					</div>
				</header>

				{/* Page Content */}
				<main className="flex-1 p-6 overflow-y-auto bg-rugero-secondary">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default DashboardLayout;
