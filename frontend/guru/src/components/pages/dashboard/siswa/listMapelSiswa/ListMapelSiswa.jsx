import { Table } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useUserStore from "../../../../../store/userStore";
import axiosConfig from "../../../../../utils/axiosConfig";
import BASE_URL from "../../../../../utils/config";
import { Toast } from "../../../../reusable/Toast";

const columns = [
  {
    title: "No",
    dataIndex: "no",
    key: "no",
    render: (item, record, index) => <>{index + 1}</>,
  },
  {
    title: "Nama Pelajaran",
    dataIndex: "nama_kelas",
    key: "nama_kelas",
    render: (_, record) => (
      <Link to={`${record.kode_kelas}`} className="h-full">
        <p className="text-black">{record.nama_kelas}</p>
      </Link>
    ),
  },
  // {
  //   title: "Action",
  //   key: "action",
  //   render: (_, record) => (
  //     <div
  //       to="/dashboard/pelajaran/edit"
  //       className="flex gap-4 items-center justify-center"
  //     >
  //       <img src="/image/dashboard/trash.svg" alt="delete" />
  //     </div>
  //   ),
  // },
];

function ListMapelSiswa() {
  const { siswaId } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { userData, loading: loadingUser, status, setUser } = useUserStore();

  const fetchSiswaMapel = async () => {
    try {
      setLoading(true);
      const response = await axiosConfig.get(
        `${BASE_URL}/Guru/${userData.id}/mapel/siswa/${siswaId}/`
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
      Toast.fire({
        icon: "error",
        title: "Terdapat Kesalahan",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSiswaMapel();
  }, []);

  return (
    <div>
      <div className="text-2xl font-bold mb-4">
        List Mata Pelajaran yang diambil {siswaId}
      </div>
      {/* <div className="flex justify-end my-4">
				<Link
					to="/dashboard/pelajaran/create"
					className="p-4 bg-blue flex items-center gap-2 font-bold text-lg text-white rounded-2xl"
				>
					<div>
						<img src="/image/dashboard/plus.svg" className="w-5" alt="" />
					</div>
					<label>Tambah Mata Pelajaran</label>
				</Link>
			</div> */}
      <Table pagination={false} columns={columns} dataSource={data} />
    </div>
  );
}

export default ListMapelSiswa;
