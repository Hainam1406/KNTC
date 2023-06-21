import { Popconfirm, Tooltip, message } from "antd";
import BoxTable from "../../../../../components/utility/boxTable";
import api, { apiUrl } from "../config";
import { useEffect, useState } from "react";
import { handleDate } from "../../../../../helpers/utility";
import { DownloadOutlined, DeleteOutlined } from "@ant-design/icons";

function TableFile({ data = [], ...props }) {
    const [dataSource, setDataSource] = useState([]);

    const [isLoadingDeleteFile, setIsLoadingDeleteFile] = useState(false);
    const columns = [
        {
            title: "STT",
            width: "10%",
            align: "center",
            render: (text, record, index) => <span>{index + 1}</span>,
        },
        {
            title: "Ngày cập nhật",
            width: "20%",
            align: "center",
            dataIndex: "NgayUp",
            render: (_, record) =>
                handleDate(record.NgayUp || record.NgayUps)?.format(
                    "DD/MM/YYYY"
                ),
        },
        {
            title: "Tên hồ sơ/tài liệu",
            width: "45%",
            align: "center",
            dataIndex: "TenFile",
        },
        {
            title: "File đính kèm",
            width: "15%",
            align: "center",
            dataIndex: "FileUrl",
            render: (_, record) => renderFileDinhKem(record),
        },
        {
            title: "Thao tác",
            width: "10%",
            align: "center",
            render: (_, record) => renderThaoTac(record),
        },
    ];

    useEffect(() => {
        setDataSource(data);
    }, [data]);

    const renderThaoTac = (record) => {
        return (
            <div className={"action-btn"}>
                {/* {role.delete ? */}
                <Tooltip title={"Xóa"}>
                    <Popconfirm
                        placement="top"
                        title={"Cảnh báo"}
                        description={
                            <div>
                                <span>Bạn có chắc chắn muốn xóa</span> <br />
                                <span>hồ sơ/tệp đính kèm này không?</span>
                            </div>
                        }
                        onConfirm={() => handleDeleteFile(record)}
                        okText="Có"
                        cancelText="Hủy"
                        okButtonProps={{
                            loading: isLoadingDeleteFile,
                        }}
                    >
                        <DeleteOutlined />
                    </Popconfirm>
                </Tooltip>
                {/* : ""} */}
            </div>
        );
    };

    const handleDownload = async (record) => {
        try {
            let regex = /([^\/\\&\?]+\.\w{3,4}(?=([\?&].*$|$)))/gm;
            let fileName =
                record?.FileURL?.split(regex)[1] ||
                record?.FileUrl?.split(regex)[1];
            let uri = `${apiUrl.dowloadFile}?FileName=${fileName}`;

            let link = document.createElement("a");
            new Promise((resolve, reject) => {
                link.download = fileName;
                link.href = uri;
                link.target = "_blank";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                resolve();
            }).then(() => {
                message.success("Tải tệp thành công!");
            });
        } catch (error) {
            message.error(error.message);
        }
    };

    const handleDeleteFile = async (record) => {
        setIsLoadingDeleteFile(true);
        let data = [
            {
                FileID: 0,
                NghiepVuID: 0,
                DMTenFileID: 0,
                TenFile: "string",
                TomTat: "string",
                TenFileGoc: "string",
                NgayCapNhat: "2023-05-19T04:09:56.210Z",
                XuLyDonID: 0,
                DonThuID: 0,
                NguoiCapNhat: 0,
                FileType: 0,
                TrangThai: 0,
                FolderPath: "string",
                FileUrl: "string",
                NoiDung: "string",
                IsBaoMat: true,
                IsMaHoa: true,
            },
        ];

        try {
            let regex = /([^\/\\&\?]+\.\w{3,4}(?=([\?&].*$|$)))/gm;
            let fileName =
                record?.FileURL?.split(regex)[1] ||
                record?.FileUrl?.split(regex)[1];

            data[0].TenFile = fileName;
            let res = await api.DeleteFile(data);

            let { Status, Message } = res.data;

            if (Status === 1) {
                setDataSource((pre) =>
                    pre.filter((item) => item.ID !== record.ID)
                );
                message.success(Message);
            } else {
                message.error(Message);
            }
        } catch (error) {
            message.error(error.message);
        } finally {
            setIsLoadingDeleteFile(false);
        }
    };

    const renderFileDinhKem = (record) => {
        return (
            <div className={"action-btn"}>
                {/* {role.delete ? */}
                <Tooltip title={"Tải xuống"}>
                    <DownloadOutlined
                        onClick={() => handleDownload(record)}
                        style={{ color: "blue" }}
                    />
                </Tooltip>
                {/* : ""} */}
            </div>
        );
    };
    return (
        <BoxTable
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            scroll={false}
            rowKey={(record) => record.ID || record.FileHoSoID}
        />
    );
}

export default TableFile;
