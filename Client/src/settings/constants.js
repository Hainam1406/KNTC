module.exports = Object.freeze({
  TINH: "1",
  HUYEN: "2",
  XA: "3",
  MODAL_LARGE: 900,
  MODAL_NORMAL: 600,
  MODAL_SMALL: 416,
  ITEM_LAYOUT: {
    labelAlign: "left",
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  },
  ITEM_LAYOUT2: {
    labelAlign: "left",
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  },
  ITEM_LAYOUT3: {
    labelAlign: "left",
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  },
  ITEM_LAYOUT_SMALL: {
    labelAlign: "left",
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  },
  ITEM_LAYOUT_SMALL_2: {
    labelAlign: "left",
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
  },
  ITEM_LAYOUT_HALF: {
    labelAlign: "left",
    labelCol: { lg: 10, xs: 5 },
    wrapperCol: { lg: 12, xs: 19 },
  },
  COL_ITEM_LAYOUT_HALF: {
    xs: { span: 24 },
    lg: { span: 12 },
  },
  COL_COL_ITEM_LAYOUT_RIGHT: {
    xs: { span: 24 },
    lg: { span: 24 },
  },
  COL_ITEM_LAYOUT_FULL: {
    xs: { span: 24 },
    lg: { span: 24 },
  },
  REQUIRED: {
    required: true,
    message: "Thông tin bắt buộc",
  },

  API_ERROR: {
    title: "Không thể cập nhật",
    content: "Đã có lỗi xảy ra ...",
  },

  fileUploadLimit: 10, //MB

  NhomTaiSan: {
    NhaO: 1,
    CongTrinhXayDung: 11,
    NhaOCongTrinhXayDung: 4,
    DatO: 12,
    DatKhac: 13,
    Tien: 6,
    PhuongTien: 3,
    KimLoai: 2,
    NuocNgoai: 10,
    TaiSanKhac: 8,
    KhoanNo: 7,
    TongThuNhap: 9,
    GanLienVoiDat: 14,
    CoPhieu: 15,
    TaiKhoanNuocNgoai: 16,
  },

  LoaiTaiSan: {
    NhaO: {
      CanHo: 18,
      NhaORiengLe: 19,
      BietThu: 20,
    },
    CongTrinhXayDung: {
      CongTrinhDanDung: 21,
      CongTrinhCongNghiep: 22,
    },
    Tien: {
      TienMat: 8,
      TienChoVay: 9,
      TienTraTruoc: 10,
      TienGuiCaNhan: 11,
    },
    KimLoai: {
      Vang: 4,
      KimCuong: 5,
      BachKim: 6,
      KimLoaiKhac: 7,
    },
    TaiSanKhac: {
      TaiSanDangKy: 16,
      TaiSanKhac: 17,
    },
    GanLienVoiDat: {
      CayLauNam: 1,
      RungSanXuat: 2,
      VatKienTruc: 3,
    },
    CoPhieu: {
      CoPhieu: 12,
      TraiPhieu: 13,
      VonGop: 14,
      GiayToKhac: 15,
    },
  },

  CanBoNghiHuu: 2,

  STYLE: {
    tableToXls: {
      border: "none",
      fontSize: "14pt",
      fontFamily: "Times New Roman",
    },
    tableToXls_td: { border: "none" },
    tableToXls_tableTd: { border: "1px solid #333" },
    tableToXls_provincial: {
      verticalAlign: "top",
      display: "inline-block",
      float: "left",
      textAlign: "center",
    },
    tableToXls_country: {
      display: "inline-block",
      float: "right",
      textAlign: "center",
    },
    tableToXls_title: { textAlign: "center" },
    tableToXls_sign: {
      display: "inline-block",
      float: "right",
      textAlign: "center",
      width: 300,
      paddingBottom: 40,
    },

    tableData: {
      border: "1px solid #333",
      fontSize: "13pt",
      fontFamily: "Times New Roman",
    },
    tableData_td: { border: "1px solid #333" },
    tableData_th: { border: "1px solid #333" },
  },
  STYLE2: {
    tableToXls: { border: "none" },
    tableToXls_td: { border: "none" },
    tableToXls_tableTd: { border: "none" },
    tableToXls_provincial: {
      verticalAlign: "top",
      display: "inline-block",
      float: "left",
      textAlign: "center",
    },
    tableToXls_country: {
      display: "inline-block",
      float: "right",
      textAlign: "center",
    },
    tableToXls_title: { textAlign: "center" },
    tableToXls_sign: {
      display: "inline-block",
      float: "right",
      textAlign: "center",
      width: 300,
      paddingBottom: 40,
    },

    tableData: {},
    tableData_td: {},
    tableData_th: { textAlign: "center" },
  },
  DangLamViec: 1,

  FORMLAYOUTV4: {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
    labelAlign: "left",
  },
  ITEMLAYOUT4: {
    labelCol: { lg: 3, xs: 6 },
    wrapperCol: { lg: 20, xs: 16 },
    labelAlign: "left",
  },
  ITEMLAYOUTHALF4: {
    labelCol: { lg: 3, xs: 6 },
    wrapperCol: { lg: 8, xs: 16 },
    labelAlign: "left",
  },
  IMAGECROP: {
    grid: true,
    rotate: true,
    modalOk: "Cắt ảnh",
    modalCancel: "Hủy",
    modalTitle: "Chỉnh sửa hình ảnh",
    shape: "round",
    maxZoom: 5,
    minZoom: 1,
  },
  MODALCONFIRM: {
    title: "Thông báo",
    okText: "Có",
    cancelText: "Không",
  },
});
