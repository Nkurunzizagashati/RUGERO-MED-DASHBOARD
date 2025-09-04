// src/pages/dashboard/DashboardHome.jsx
const DashboardHome = () => {
	return (
		<div className="text-rugero-textOnPrimary">
			<h1 className="text-2xl font-bold mb-6">Overview</h1>
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<div className="bg-white shadow rounded-lg p-6">
					<h2 className="text-sm text-gray-500">Clients</h2>
					<p className="text-2xl font-bold">1,245</p>
				</div>
				<div className="bg-white shadow rounded-lg p-6">
					<h2 className="text-sm text-gray-500">Projects</h2>
					<p className="text-2xl font-bold">32</p>
				</div>
				<div className="bg-white shadow rounded-lg p-6">
					<h2 className="text-sm text-gray-500">Products</h2>
					<p className="text-2xl font-bold">57</p>
				</div>
				<div className="bg-white shadow rounded-lg p-6">
					<h2 className="text-sm text-gray-500">
						News Posts
					</h2>
					<p className="text-2xl font-bold">12</p>
				</div>
			</div>

			<div className="mt-8 bg-white shadow rounded-lg p-6 h-64 flex items-center justify-center text-gray-400">
				📊 Chart Placeholder
			</div>
		</div>
	);
};

export default DashboardHome;
