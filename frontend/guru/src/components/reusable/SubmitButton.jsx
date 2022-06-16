import React from 'react';

function SubmitButton({ dirty, isValid, isSubmitting, className, children, ...others }) {
	return (
		<button
			type="submit"
			className={`w-full font-bold border text-white  rounded-xl text-center text-xl flex gap-4 justify-center  ${className} border-vlue bg-blue text-white hover:bg-opacity-90 cursor-pointer`}
			{...others}
		>
			{children ?? 'submit'}
		</button>
	);
}

export default SubmitButton;
