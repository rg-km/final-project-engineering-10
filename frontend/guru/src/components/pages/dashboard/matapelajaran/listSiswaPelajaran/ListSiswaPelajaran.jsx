import { Table } from 'antd';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

const columns = [
	{
		title: 'No',
		dataIndex: 'no',
		key: 'no',
		render: (item, record, index) => <>{index + 1}</>,
	},
	{
		title: 'Nama Siswa',
		dataIndex: 'nama_siswa',
		key: 'nama_siswa',
		render: (_, record) => (
			<Link to={`${record.nama_siswa}`} className="h-full">
				<p className="text-black">{record.nama_siswa}</p>
			</Link>
		),
	},
	{
		title: 'Rata-rata',
		dataIndex: 'rata_rata',
		key: 'rata_rata',
	},
	{
		title: 'Action',
		key: 'action',
		render: (_, record) => (
			<div className="flex gap-4 items-center justify-center">
				<img src="/image/dashboard/edit.svg" alt="edit" />
				<img src="/image/dashboard/trash.svg" alt="edit" />
			</div>
		),
	},
];

const data = [
	{
		key: '1',
		nama_siswa: 'Frisca',
		rata_rata: 80,
	},
	{
		key: '2',
		nama_siswa: 'Farhan',
		rata_rata: 85,
	},
	{
		key: '3',
		nama_siswa: 'Hesi',
		rata_rata: 86,
	},
];

function ListSiswaPelajaran() {
	const { mapel } = useParams();
	return (
		<div>
			<div className="text-2xl font-bold mb-4">List Siswa Mapel {mapel}</div>
			<Table pagination={false} columns={columns} dataSource={data} />
		</div>
	);
}

export default ListSiswaPelajaran;
