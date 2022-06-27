import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/userStore';

function AuthenticatedRoute({ children }) {
	const { userData, loading } = useUserStore();
	const navigate = useNavigate();

	useEffect(() => {
		if (isEmpty(userData) && !loading) {
			navigate('/login');
		}
	}, [userData]);

	return <>{children}</>;
}

export default AuthenticatedRoute;
