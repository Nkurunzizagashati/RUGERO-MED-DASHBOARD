import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { EyeIcon, Pencil, Trash2 } from 'lucide-react';

import { deleteNews, fetchNews } from '../redux/actions';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmDialog from '../components/common/ConfirmDialog';

const NewsDashboard = () => {
	const dispatch = useDispatch();
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [selectedId, setSelectedId] = useState(null);

	const {
		data: news,
		pending,
		error,
	} = useSelector((state) => state.news);

	useEffect(() => {
		dispatch(fetchNews());
	}, [dispatch]);

	const handleDeleteClick = (id) => {
		setSelectedId(id);
		setConfirmOpen(true);
	};

	const confirmDelete = async () => {
		await dispatch(deleteNews(selectedId));
		setConfirmOpen(false);
		setSelectedId(null);
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-6 text-rugero-textOnPrimary">
				<h1 className="text-2xl font-bold">news</h1>
				<Link
					to="/news/create"
					className="bg-rugero-primary text-white px-4 py-2 rounded hover:bg-rugero-green3 transition duration-300"
				>
					+ Post News
				</Link>
			</div>

			{/* Error + Loading states */}
			{pending && <LoadingSpinner />}
			{error && (
				<p className="text-red-500 h-full text-center">
					{error}
				</p>
			)}

			{/* news Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{news && news.length > 0 ? (
					news.map((item) => (
						<div
							key={item._id}
							className="bg-rugero-gray2 shadow shadow-rugero-muted rounded-lg overflow-hidden flex flex-col hover:scale-105 transition duration-300"
						>
							{/* Image */}
							<img
								src={item.imageUrl}
								alt={item.title}
								className="h-48 w-full object-cover"
							/>

							{/* Content */}
							<div className="p-4 flex flex-col flex-1">
								<h2 className="text-lg font-bold text-rugero-textOnPrimary">
									{item.title}
								</h2>
								<p className="text-sm text-rugero-muted mb-2 line-clamp-2">
									{item.description}
								</p>

								<div className="mt-auto">
									<span className="inline-block bg-rugero-secondary text-rugero-textOnPrimary text-xs font-semibold px-2 py-1 rounded-full uppercase italic">
										{item.category}
									</span>
									{item.citation && (
										<p className="text-sm text-gray-500 mb-3 italic">
											{item.citation}
										</p>
									)}
								</div>
							</div>

							{/* Actions */}
							<div className="flex justify-between p-3 border-t">
								<Link
									to={`/news/${item._id}/details`}
									className="text-blue-600 hover:text-blue-800"
								>
									<EyeIcon size={18} />
								</Link>

								<div className="flex gap-4">
									<Link
										to={`/news/${item._id}/edit`}
										className="text-blue-600 hover:text-blue-800"
									>
										<Pencil size={18} />
									</Link>
									<button
										onClick={() =>
											handleDeleteClick(item._id)
										}
										className="text-red-600 hover:text-red-800"
									>
										<Trash2 size={18} />
									</button>

									{/* Overlay */}
									{confirmOpen && (
										<ConfirmDialog
											message="Are you sure you want to delete this news?"
											onConfirm={confirmDelete}
											onCancel={() =>
												setConfirmOpen(false)
											}
										/>
									)}
								</div>
							</div>
						</div>
					))
				) : (
					<p className="col-span-full text-center text-gray-500">
						No news found
					</p>
				)}
			</div>
		</div>
	);
};

export default NewsDashboard;
