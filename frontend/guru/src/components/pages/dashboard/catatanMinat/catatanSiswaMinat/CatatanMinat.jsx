import { MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';
import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useUserStore from '../../../../../store/userStore';
import axiosConfig from '../../../../../utils/axiosConfig';
import BASE_URL from '../../../../../utils/config';
import { Toast } from '../../../../reusable/Toast';

function CatatanMinat() {
	const columns = [
		{
			title: 'No',
			dataIndex: 'no',
			key: 'no',
			render: (item, record, index) => <>{index + 1}</>,
		},
		{
			title: 'Minat',
			dataIndex: 'minat',
			key: 'minat',
			render: (_, record) => <p className="text-black">{record.minat}</p>,
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<div className="flex gap-4 items-center">
					<Link to={`edit/${record.id}`}>
						<img src="/image/dashboard/edit.svg" alt="edit" />
					</Link>
					<div onClick={() => onDelete(record.id)}>
						<img src="/image/dashboard/trash.svg" alt="delete" />
					</div>
				</div>
			),
		},
	];
	const { siswaId } = useParams();
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const { userData, loading: loadingUser } = useUserStore();

	const fetchMinat = async () => {
		try {
			setLoading(true);
			const response = await axiosConfig.get(`${BASE_URL}/Guru/${userData.id}/minat/siswa/${siswaId}/`);
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

	const onDelete = async minatId => {
		try {
			const response = await axiosConfig.delete(`${BASE_URL}/Guru/${userData.id}/minat/${minatId}/`);
			Toast.fire({
				icon: 'success',
				title: 'Berhasil Menghapus Nilai',
			});
			fetchMinat();
		} catch (error) {
			console.log(error);
			Toast.fire({
				icon: 'error',
				title: 'Terdapat Kesalahan',
			});
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchMinat();
	}, []);

	return (
		<div>
			<div>
				<div className="text-2xl font-bold mb-4">List Catatan Minat</div>
				<div className="flex justify-end my-4">
					<Link
						to={`/dashboard/catatan-minat/${siswaId}/create`}
						className="p-4 bg-blue flex items-center gap-2 font-bold text-lg text-white rounded-2xl cursor-pointer"
					>
						<div>
							<img src="/image/dashboard/plus.svg" className="w-5" alt="" />
						</div>
						<p>Tambah Catatan Minat</p>
					</Link>
				</div>
			</div>
			<Table
				columns={columns}
				dataSource={data}
				rowKey="id"
				expandable={{
					expandedRowRender: record => (
						<div className="">
							<h1 className="text-xl font-bold">Deskripsi</h1>
							<p className="m-0 mx-4 mt-2">{record.deskripsi}</p>
						</div>
					),
					expandIcon: ({ expanded, onExpand, record }) =>
						expanded ? (
							<MinusCircleTwoTone onClick={e => onExpand(record, e)} />
						) : (
							<PlusCircleTwoTone onClick={e => onExpand(record, e)} />
						),
				}}
				pagination={false}
			/>
		</div>
	);
}

export default CatatanMinat;
