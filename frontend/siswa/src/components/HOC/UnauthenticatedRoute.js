import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/userStore';

function UnauthenticatedRoute({ children }) {
	const { userData, loading } = useUserStore();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isEmpty(userData) && !loading) {
			navigate('/dashboard');
		}
	}, [userData]);
	return <>{children}</>;
}

export default UnauthenticatedRoute;
