// src/pages/dashboard/CreateProductPage.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postProduct } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/common/FormInput';
import FormTextarea from '../components/common/FormTextarea';

const categories = [
	'CSSD',
	'Hospital Design',
	'Plastic Surgery',
	'Neurosurgery',
	'Theatre',
	'Home Care',
];

const CreateProductPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		title: '',
		description: '',
		category: '',
		price: '',
		image: null,
	});

	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		if (name === 'image') {
			setFormData((prev) => ({ ...prev, image: files[0] }));
		} else {
			setFormData((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const data = new FormData();
			data.append('title', formData.title);
			data.append('description', formData.description);
			data.append('category', formData.category);
			data.append('price', formData.price);
			if (formData.image) {
				data.append('image', formData.image);
			}

			await dispatch(postProduct(data));
			navigate('/products');
		} catch (error) {
			console.error('Error creating product:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bg-rugero-secondary p-6 rounded-lg shadow text-rugero-muted">
			<h1 className="text-2xl font-bold mb-4">Create Product</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<FormInput
					label="Title"
					name="title"
					value={formData.title}
					onChange={handleChange}
					required
				/>

				<FormTextarea
					label="Description"
					name="description"
					value={formData.description}
					onChange={handleChange}
					required
				/>

				{/* Category Dropdown */}
				<div>
					<label className="block mb-1 font-semibold">
						Category
					</label>
					<select
						name="category"
						value={formData.category}
						onChange={handleChange}
						required
						className="w-full border px-3 py-2 rounded bg-rugero-gray1 text-rugero-muted"
					>
						<option value="">Select a category</option>
						{categories.map((cat) => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</select>
				</div>

				<FormInput
					label="Price"
					name="price"
					type="number"
					value={formData.price}
					onChange={handleChange}
				/>

				{/* File input for image */}
				<div>
					<label className="block mb-1 font-semibold">
						Image
					</label>
					<input
						type="file"
						name="image"
						accept="image/*"
						onChange={handleChange}
						required
						className="w-full border px-3 py-2 rounded"
					/>
				</div>

				<button
					type="submit"
					disabled={loading}
					className="bg-rugero-primary text-white px-6 py-2 rounded hover:bg-rugero-green3 transition duration-300 disabled:opacity-50"
				>
					{loading ? 'Saving...' : 'Create Product'}
				</button>
			</form>
		</div>
	);
};

export default CreateProductPage;
