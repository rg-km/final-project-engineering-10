import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useUserStore from '../../../../store/userStore';
import axiosConfig from '../../../../utils/axiosConfig';
import BASE_URL from '../../../../utils/config';
import { Toast } from '../../../reusable/Toast';
import { Tag } from 'antd';

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
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
		render: (_, record) => {
			let color;
			let caption;

			if (record.status === 'Belum') {
				color = '#F9B577';
				caption = 'Belum Mengumpulkan';
			} else if (record.status === 'dikirim') {
				color = '#2F71EB';
				caption = 'Bukti Telah dikirim';
			} else if (record.status === 'selesai') {
				color = '#A1FF80';
				caption = 'Selesai';
			}else{
				color = '#DC5944';
				caption = 'Gagal';

			}

			return (
				<div className="flex justify-center ">
					<Tag className="text-lg" color={color}>
						{caption}
					</Tag>
				</div>
			);
		},
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
				<Link to={`edit/${record.id}/${record.id_pengumpulan}`}>
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
			const response = await axiosConfig.get(`${BASE_URL}/Guru/${userData.id}/mapel/${mapelId}/tugas/${siswaId}/`);
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
