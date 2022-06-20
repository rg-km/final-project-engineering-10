import { isEmpty } from 'lodash';
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import useUserStore from '../../store/userStore';

function UnauthenticatedRoute({ element, ...rest }) {
	const { userData } = useUserStore();

	return (
		<Route
			{...rest}
			element={() =>
				isEmpty(userData)() ? (
					{ element }
				) : (
					<Navigate
						to={{
							pathname: '/dashboard',
						}}
					/>
				)
			}
		/>
	);
}

export default UnauthenticatedRoute;
