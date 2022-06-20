import { Spin } from 'antd';
import React from 'react';

function SubmitButton({ dirty, isValid, isSubmitting, className, children, ...others }) {
	const isDisabled = () => {
		return !(dirty && isValid) || isSubmitting;
	};

	return (
		<button
			type="submit"
			disabled={isDisabled()}
			className={`w-full font-bold border text-white rounded-xl text-center text-xl flex gap-4 justify-center items-center  ${className}
			${
				!isDisabled()
					? 'border-blue bg-blue text-white hover:bg-opacity-90 cursor-pointer'
					: 'border-gray-600 bg-gray-600 text-white hover:bg-opacity-90 cursor-not-allowed'
			}`}
			{...others}
		>
			{children ?? 'submit'}
			{isSubmitting && <Spin size="small" />}
		</button>
	);
}

export default SubmitButton;
