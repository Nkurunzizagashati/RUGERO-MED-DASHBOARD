// src/components/common/FormTextarea.jsx
const FormTextarea = ({
	label,
	name,
	value,
	onChange,
	required = false,
}) => {
	return (
		<div>
			<label className="block mb-1 font-semibold">{label}</label>
			<textarea
				name={name}
				value={value}
				onChange={onChange}
				required={required}
				className="w-full border px-3 py-2 rounded bg-rugero-gray1 text-rugero-muted"
			/>
		</div>
	);
};

export default FormTextarea;
