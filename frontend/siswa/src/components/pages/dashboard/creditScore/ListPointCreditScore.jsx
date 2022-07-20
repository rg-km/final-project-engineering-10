import { Progress, Table, Tag } from "antd";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useUserStore from "../../../../store/userStore";
import axiosConfig from "../../../../utils/axiosConfig";
import BASE_URL from "../../../../utils/config";
import Loading from "../../../reusable/Loading";
import { Toast } from "../../../reusable/Toast";

const columns = [
  {
    title: "No",
    dataIndex: "no",
    key: "no",
    render: (item, record, index) => <>{index + 1}</>,
  },
  {
    title: "Deskripsi Poin",
    dataIndex: "deskripsi",
    key: "deskripsi",
  },
  {
    title: "Tipe",
    dataIndex: "tipe",
    key: "tipe",
    render: (tipe) => {
      let color;
      let caption;

      if (tipe === "tugas") {
        color = "#2F71EB";
        caption = "Tugas";
      } else if (tipe === "pelanggaran") {
        color = "#FC3E32";
        caption = "Pelanggaran";
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
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      let color;
      let caption;

      if (status === "belum") {
        color = "#F9B577";
        caption = "Belum Mengumpulkan";
      } else if (status === "dikirim") {
        color = "#2F71EB";
        caption = "Bukti Telah dikirim";
      } else if (status === "berhasil") {
        color = "#A1FF80";
        caption = "Selesai";
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
    title: "Poin",
    dataIndex: "point",
    key: "point",
    render: (_, record) => (
      <p>{record.tipe === "tugas" ? record.point : -1 * record.point}</p>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Link
        to={`edit/${record.id}`}
        className="flex gap-4 items-center justify-center"
      >
        <img src="/image/dashboard/edit.svg" alt="edit" />
      </Link>
    ),
  },
];

function ListPointCreditScore() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { userData } = useUserStore();

  const fetchCreditScore = async () => {
    try {
      setLoading(true);
      const response = await axiosConfig.get(
        `${BASE_URL}/siswa/${userData.id}/credit/`
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
    if (!isEmpty(userData)) {
      fetchCreditScore();
    }
  }, [userData]);

  return loading ? (
    <Loading />
  ) : (
    <div>
      <div className="text-2xl font-bold mb-4">Total Credit Score Siswa</div>
      <div className="flex justify-center my-8">
        <Progress
          type="circle"
          strokeColor={{
            "0%": "#2F71EB",
            "70%": "#A1FF80",
          }}
          format={(percent) => `${percent}.0`}
          percent={userData.credit_score}
          width={200}
        />
      </div>
      <div className="text-2xl font-bold mb-4">List Credit Score Siswa</div>
      <Table pagination={false} columns={columns} dataSource={data} />
    </div>
  );
}

export default ListPointCreditScore;
