import create from 'zustand';

const useUserStore = create((set, get) => ({
	userData: {},
	loading: false,
	status: '',
	setUser: () => {
		return set();
	},
}));

export default useUserStore;
