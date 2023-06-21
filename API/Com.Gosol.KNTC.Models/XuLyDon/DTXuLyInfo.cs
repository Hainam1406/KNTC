using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Com.Gosol.KNTC.Models.XuLyDon
{
    public class DTXuLyInfo
    {
        public int SoLan { get; set; }
        public DateTime NgayQuaHan { get; set; }
        public int CQChuyenDonID { get; set; }
        public string SoCongVan { get; set; }
        public DateTime NgayChuyenDon { get; set; }
        public bool ThuocThamQuyen { get; set; }
        public bool DuDieuKien { get; set; }
        public int? HuongGiaiQuyetID { get; set; }
        public string NoiDungHuongDan { get; set; }
        public int CQTiepNhanID { get; set; }
        public int CanBoXuLyID { get; set; }
        public int? CanBoKyID { get; set; }
        public int CQDaGiaiQuyetID { get; set; }
        public int CQGiaiQuyetTiepID { get; set; }
        public int TrangThaiDonID { get; set; }
        public int PhanTichKQID { get; set; }
        public int CanBoTiepNhanID { get; set; }
        public int CoQuanID { get; set; }
        public string TenCoQuan { get; set; }
        public DateTime NgayThuLy { get; set; }
        public string LyDo { get; set; }
        public int DuAnID { get; set; }
        public string TenHuongXuLy { get; set; }
        public string TenNguonDonDen { get; set; }
        public string NgayQuaHanStr { get; set; }
        public int NgayXuLyConLai { get; set; }
        public DateTime NgayLDDuyetXL { get; set; }
        public string TenCQChuyenDonDen { get; set; }

        //public DonThuInfo DonThu { get; set; }
        // xu ly don
        public int XuLyDonID { get; set; }
        public int DonThuID { get; set; }
        public string SoDonThu { get; set; }
        public int NguonDonDen { get; set; }
        public string TenChuDon { get; set; }
        public string NoiDungDon { get; set; }
        public DateTime NgayNhapDon { get; set; }
        public string NgayNhapDonStr { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        // don thu can phan xu ly
        public string TenCBTiepNhan { get; set; }
        public string NgayNhapDons { get; set; }
        // don thu can xu ly
        public string NgayGiao { get; set; }
        public string HanXuLy { get; set; }
        public string NguoiGiao { get; set; }
        public string TenLoaiKhieuTo { get; set; }
        public int NgayXLConLai { get; set; }
        // don thu can duyet xu ly
        public string HuongXuLy { get; set; }
        public string TenCBXuLy { get; set; }
        public DateTime NgayGui { get; set; }
        public int PhongBanID { get; set; }
        public int CanBoID { get; set; }
        // don thu da tiep nhan
        public string DiaChi { get; set; }
        public string NgayTiepNhan { get; set; }
        public string TrangThai { get; set; }
        public string StateName { get; set; }
        public int StateID { get; set; }
        public int CanBoPhanXLID { get; set; }
        public int NextStateID { get; set; }
        public int CBDuocChonXL { get; set; }
        public int QTTiepNhanDon { get; set; }

        public string TenTinh { get; set; }
        public string TenHuyen { get; set; }
        public string TenXa { get; set; }
        public string DiaChiCT { get; set; }
        public string NguonDonDens { get; set; }
        public string NgayGuis { get; set; }

        public DateTime NgayXuLy { get; set; }

        public string MaHoSoMotCua { get; set; }
        public string SoBienNhanMotCua { get; set; }
        public string NgayHenTraMotCuaStr { get; set; }

        public int TransitionID { get; set; }
        public string HoTenStr { get; set; }

        public int DoiTuongBiKNID { get; set; }
        public int NhomKNID { get; set; }

        // anhnt
        public string SoDon { get; set; }
        public DateTime NgayTiep { get; set; }
        public string NgayTiepStr { get; set; }
        public string HoTen { get; set; }
        // File
        public List<DTXuLyInfo> listFileDonThuDaTiepNhan { get; set; }
        public string TenFile { get; set; }
        public string FileUrl { get; set; }
        public bool IsBaoMat { get; set; }
        public int NguoiUp { get; set; }

        public int KetQuaID { get; set; }
        public int HuongXuLyID { get; set; }
        public string KetQuaID_Str { get; set; }
        public string TenHuongGiaiQuyet { get; set; }

        public int NgayGQConLai { get; set; }
        public int Count { get; set; }
    }

    public class DTXulyMOD
    {
        public int HuongGiaiQuyetID { get; set; }
        public int CanBoTiepNhanID { get; set; }
        public int XuLyDonID { get; set; }
        public int DonThuID { get; set; }
        public int DoiTuongBiKNID { get; set; }
        public int NhomKNID { get; set; }
        public string SoDonThu { get; set; }
        public int NguonDonDen { get; set; }
        public string TenChuDon { get; set; }
        public string NoiDungDon { get; set; }
        public DateTime NgayNhapDon { get; set; }
        public string NgayNhapDons { get; set; }
        public string TenLoaiKhieuTo { get; set; }
        public string HuongXuLy { get; set; }
        public string StateName { get; set; }
        public int CBDuocChonXL { get; set; }
        public int QTTiepNhanDon { get; set; }
        public string DiaChiCT { get; set; }
        public string NguonDonDens { get; set; }
        public string MaHoSoMotCua { get; set; }
        public string SoBienNhanMotCua { get; set; }
        //public bool SuDungQuyTrinh { get; set; }
    }

    public class DTXuLyParam : ThamSoLocDanhMuc
    {
        public int CoQuanID { get; set; }
        public int CanBoID { get; set; }
        public int? LoaiKhieuToID { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
    }

    public class ParamXoa
    {
        public int XuLyDonID { get; set; }
        public int DonThuID { get; set; }
        public int? pDoiTuongBiKNID { get; set; }
        public int pNhomKNID { get; set; }
    }

    public class DTXuLyClaims
    {
        public bool QTVanThuTiepNhanDon { get; set; }
        public bool SuDungQuyTrinh { get; set; }
        public bool QTVanThuTiepDan { get; set; }
        public int QuyTrinhGianTiep { get; set; }
        public int CanBoID { get; set; }
        public int CoQuanID { get; set; }
    }

    public class DTXyLyID
    {
        public int XuLyDonID { get; set; }
        public int NguonDonDen { get; set; }
        public int HuongGiaiQuyetID { get; set; }
    }
}
