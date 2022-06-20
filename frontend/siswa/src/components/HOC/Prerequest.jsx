import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import useUserStore from '../../store/userStore';

function Prerequest({ children }) {
	const { userData, loading, status, setUser } = useUserStore();

	useEffect(() => {
		if (isEmpty(userData)) {
			setUser();
		}
	}, []);
	return <div>{children}</div>;
}

export default Prerequest;
