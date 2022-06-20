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

const data = [
	{
		key: '1',
		nama_tugas: 'Aljabar',
		tipe: 'Ulangan',
	},
	{
		key: '2',
		nama_tugas: 'Integral',
		tipe: 'Tugas',
		nilai: 85,
	},
	{
		key: '3',
		nama_tugas: 'L Hopital',
		tipe: 'Kuis',
	},
];

function ListTugasPelajaran() {
	const { mapel } = useParams();
	return (
		<div>
			<div className="text-2xl font-bold mb-4">List Tugas Mapel {mapel}</div>
			<div className="flex justify-end my-4">
				<Link
					to="create"
					className="p-4 bg-blue flex items-center gap-2 font-bold text-lg text-white rounded-2xl"
				>
					<div>
						<img src="/image/dashboard/plus.svg" className="w-5" alt="" />
					</div>
					<label>Tambah Mata Pelajaran</label>
				</Link>
			</div>
			<Table pagination={false} columns={columns} dataSource={data} />
		</div>
	);
}

export default ListTugasPelajaran;
