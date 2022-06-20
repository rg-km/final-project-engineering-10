import { isEmpty } from 'lodash';
import { Navigate, Route } from 'react-router-dom';
import useUserStore from '../../store/userStore';

function AuthenticatedRoute({ children, ...rest }) {
	const { userData } = useUserStore();

	return (
		<Route
			exact
			{...rest}
			render={({ location }) =>
				!isEmpty(userData) ? (
					children
				) : (
					<Navigate
						to={{
							pathname: '/login',
						}}
					/>
				)
			}
		/>
	);
}

export default AuthenticatedRoute;
