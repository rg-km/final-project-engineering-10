import create from 'zustand';
import { Toast } from '../components/reusable/Toast';
import axiosConfig from '../utils/axiosConfig';
import BASE_URL from '../utils/config';

const useUserStore = create((set, get) => ({
	userData: {},
	loading: true,
	status: 200,
	setUser: async () => {
		try {
			set(state => ({ ...state, loading: true }));
			const response = await axiosConfig.get(`${BASE_URL}/Guru/get-profile/`);
			set(state => ({ ...state, userData: response.data.message, status: response.status }));
		} catch (error) {
			if (error.response.status !== 400) {
				Toast.fire({
					icon: 'error',
					title: 'Terdapat Kesalahan Saat mengambil profile',
				});
			}
			set(state => ({ ...state, status: error.response.status }));
		} finally {
			return set(state => ({ ...state, loading: false }));
		}
	},
}));

export default useUserStore;
