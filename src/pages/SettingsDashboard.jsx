// src/pages/dashboard/SettingsDashboard.jsx
const SettingsDashboard = () => {
	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">Settings</h1>
			<div className="bg-white shadow rounded-lg p-6">
				<h2 className="font-semibold mb-4">Profile</h2>
				<form className="space-y-4">
					<div>
						<label className="block text-sm text-gray-600">
							Name
						</label>
						<input
							type="text"
							className="w-full border px-3 py-2 rounded"
							defaultValue="Admin User"
						/>
					</div>
					<div>
						<label className="block text-sm text-gray-600">
							Email
						</label>
						<input
							type="email"
							className="w-full border px-3 py-2 rounded"
							defaultValue="admin@example.com"
						/>
					</div>
					<button className="bg-rugero-primary text-white px-4 py-2 rounded hover:bg-rugero-accent">
						Save Changes
					</button>
				</form>
			</div>
		</div>
	);
};

export default SettingsDashboard;
