import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import useUserStore from '../../store/userStore';
import Loading from '../reusable/Loading';

function Prerequest({ children }) {
	const { userData, loading, status, setUser } = useUserStore();

	useEffect(() => {
		if (isEmpty(userData)) {
			setUser();
		}
	}, []);
	return loading ? <Loading className="h-screen w-full" /> : <div>{children}</div>;
}

export default Prerequest;
