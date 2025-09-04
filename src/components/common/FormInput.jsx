// src/components/common/FormInput.jsx
const FormInput = ({
	label,
	name,
	value,
	onChange,
	type = 'text',
	required = false,
}) => {
	return (
		<div>
			<label className="block mb-1 font-semibold">{label}</label>
			<input
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				required={required}
				className="w-full border px-3 py-2 rounded bg-rugero-gray1 text-rugero-muted"
			/>
		</div>
	);
};

export default FormInput;
