// src/pages/dashboard/EditProductPage.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProducts, updateProduct } from '../redux/actions';
import FormInput from '../components/common/FormInput';
import FormTextarea from '../components/common/FormTextarea';

const EditProductPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { data: products, pending } = useSelector(
		(state) => state.products
	);

	const [formData, setFormData] = useState({
		title: '',
		description: '',
		category: '',
		price: '',
		image: null, // file upload
	});
	const [loading, setLoading] = useState(false);

	// Load product from store (or fetch if missing)
	useEffect(() => {
		if (!products || products.length === 0) {
			dispatch(fetchProducts());
		} else {
			const product = products.find((p) => p._id === id);
			if (product) {
				setFormData({
					title: product.title,
					description: product.description,
					category: product.category,
					price: product.price || '',
					image: null,
				});
			}
		}
	}, [products, id, dispatch]);

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

			console.log('ID: ', id);

			await dispatch(updateProduct(id, formData));
			navigate('/products');
		} catch (error) {
			console.error('Error updating product:', error);
		} finally {
			setLoading(false);
		}
	};

	if (pending) {
		return <p className="text-center mt-6">Loading product...</p>;
	}

	return (
		<div className="bg-rugero-secondary p-6 rounded-lg shadow text-rugero-muted">
			<h1 className="text-2xl font-bold mb-4">Edit Product</h1>
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

				{/* Category dropdown */}
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
						<option value="">Select Category</option>
						<option value="Radiology">Radiology</option>
						<option value="CSSD">CSSD</option>
						<option value="Neurosurgery">
							Neurosurgery
						</option>
						<option value="Plastic Surgery">
							Plastic Surgery
						</option>
					</select>
				</div>

				<FormInput
					label="Price"
					name="price"
					type="number"
					value={formData.price}
					onChange={handleChange}
				/>

				<div>
					<label className="block mb-1 font-semibold">
						Image
					</label>
					<input
						type="file"
						name="image"
						accept="image/*"
						onChange={handleChange}
						className="w-full border px-3 py-2 rounded"
					/>
					<p className="text-sm text-gray-500 mt-1">
						Leave empty to keep current image
					</p>
				</div>

				<button
					type="submit"
					disabled={loading}
					className="bg-rugero-primary text-white px-6 py-2 rounded hover:bg-rugero-green3 transition duration-300 disabled:opacity-50"
				>
					{loading ? 'Updating...' : 'Save Changes'}
				</button>
			</form>
		</div>
	);
};

export default EditProductPage;
