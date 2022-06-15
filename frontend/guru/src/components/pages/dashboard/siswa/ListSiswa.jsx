import { Table } from 'antd';
import React from 'react';

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

function ListSiswa() {
	return (
		<div>
			<div className="text-2xl font-bold mb-4">List Siswa</div>
			<Table pagination={false} columns={columns} dataSource={data} />
		</div>
	);
}

export default ListSiswa;
