import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useUserStore from '../../../../store/userStore';
import axiosConfig from '../../../../utils/axiosConfig';
import BASE_URL from '../../../../utils/config';
import { Toast } from '../../../reusable/Toast';

const columns = [
	{
		title: 'No',
		dataIndex: 'no',
		key: 'no',
		render: (item, record, index) => <>{index + 1}</>,
	},
	{
		title: 'Nama Tugas',
		dataIndex: 'judul',
		key: 'judul',
	},
	{
		title: 'Tipe',
		dataIndex: 'tipe',
		key: 'tipe',
	},
	{
		title: 'Nilai',
		dataIndex: 'nilai',
		key: 'nilai',
	},
	{
		title: 'Action',
		key: 'action',
		render: (_, record) => (
			<div className="flex gap-4 items-center justify-center">
				<Link to={`edit/${record.nama_tugas}`}>
					<img src="/image/dashboard/edit.svg" alt="edit" />
				</Link>
				<img src="/image/dashboard/trash.svg" alt="edit" />
			</div>
		),
	},
];


function RekapNilaiSiswa() {
	const { mapelId, siswaId } = useParams();
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const { userData, loading: loadingUser } = useUserStore();

	const fetchRekap = async () => {
		try {
			setLoading(true);
			const response = await axiosConfig.get(`${BASE_URL}/siswa/${siswaId}/mapel/${mapelId}/tugas/`);
			setData(response.data.message);
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
		fetchRekap();
	}, []);

	return (
		<div>
			<div className="text-2xl font-bold mb-4">
				Rekap {siswaId} Mapel {mapelId}
			</div>
			<Table pagination={false} columns={columns} dataSource={data} />
		</div>
	);
}

export default RekapNilaiSiswa;
