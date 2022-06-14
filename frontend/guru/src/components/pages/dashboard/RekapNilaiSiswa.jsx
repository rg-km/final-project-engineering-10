import { Table } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';

const columns = [
	{
		title: 'No',
		dataIndex: 'no',
		key: 'no',
		render: (item, record, index) => <>{index + 1}</>,
	},
	{
		title: 'Nama Tugas',
		dataIndex: 'nama_tugas',
		key: 'nama_tugas',
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
				<img src="/image/dashboard/edit.svg" alt="edit" />
				<img src="/image/dashboard/trash.svg" alt="edit" />
			</div>
		),
	},
];

const data = [
	{
		key: '1',
		nama_tugas: 'Aljabar',
		tipe: 'Ulangan',
		nilai: 80,
	},
	{
		key: '2',
		nama_tugas: 'Integral',
		tipe: 'Tufas',
		nilai: 85,
	},
	{
		key: '3',
		nama_tugas: 'L Hopital',
		tipe: 'Kuis',
		nilai: 86,
	},
];

function RekapNilaiSiswa() {
	const { mapel, nama } = useParams();
	return (
		<div>
			<div className="text-2xl font-bold mb-4">
				Rekap {nama} Mapel {mapel}
			</div>
			<Table pagination={false} columns={columns} dataSource={data} />
		</div>
	);
}

export default RekapNilaiSiswa;
