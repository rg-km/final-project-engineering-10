import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useUserStore from '../../../../store/userStore';
import axiosConfig from '../../../../utils/axiosConfig';
import BASE_URL from '../../../../utils/config';
import Loading from '../../../reusable/Loading';
import { Toast } from '../../../reusable/Toast';

const columns = [
	{
		title: 'No',
		dataIndex: 'no',
		key: 'no',
		render: (item, record, index) => <>{index + 1}</>,
	},
	{
		title: 'Nama Pelajaran',
		dataIndex: 'nama_kelas',
		key: 'nama_kelas',
		render: (_, record) => (
			<Link to={`/dashboard/pelajaran/${record.nama_kelas}`} className="h-full">
				<p className="text-black">{record.nama_kelas}</p>
			</Link>
		),
	},
	{
		title: 'Action',
		key: 'action',
		render: (_, record) => (
			<Link
				to={`${record.kode_kelas}`}
				className="px-8 py-4 bg-primary text-black cursor-pointer font-bold rounded-xl hover:text-white"
			>
				Pilih
			</Link>
		),
	},
];


function SelectPelajaran() {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const { userData, loading: loadingUser } = useUserStore();

	const fetchPelajaran = async () => {
		try {
			setLoading(true);
			const response = await axiosConfig.get(`${BASE_URL}/Guru/${userData.id}/mapel/`);
			setData(response.data.data);
		} catch (error) {
			console.log(error);
			Toast.fire({
				icon: 'error',
				title: 'Terdapat Kesalahan',
			});
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchPelajaran();
	}, []);

	return loading && loadingUser ? (
		<Loading />
	) : (
		<div>
			<div className="text-2xl font-bold mb-4">Pilih Mata Pelajaran</div>

			<Table rowKey="kode_kelas" pagination={false} columns={columns} dataSource={data} />
		</div>
	);
}

export default SelectPelajaran;
