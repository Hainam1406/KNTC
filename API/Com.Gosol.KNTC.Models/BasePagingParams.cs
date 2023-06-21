//using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Com.Gosol.KNTC.Models
{
    public class BasePagingParams
    {
        public string Keyword { get; set; } = "";
        public string OrderByOption { get; set; } = "";
        public string OrderByName { get; set; } = "";
        public int PageSize { get; set; } = 10;
        public int PageNumber { get; set; } = 1;
        public int Offset { get { return (PageSize == 0 ? 10 : PageSize) * ((PageNumber == 0 ? 1 : PageNumber) - 1); } }
        public int Limit { get { return (PageSize == 0 ? 10 : PageSize); } }
        public int? TrangThai { get; set; }
        /// <summary>
        /// format dd/MM/yyyy
        /// </summary> 
        public DateTime? TuNgay { get; set; }
        /// <summary>
        /// format dd/MM/yyyy
        /// </summary>
        public DateTime? DenNgay { get; set; }
        public int? GioiTinh { get; set; }
        public bool? Status { get; set; }
    }

    // dùng cho hàm danh sách phân trang của các danh mục cơ bản
    public class ThamSoLocDanhMuc
    {
        public string Keyword { get; set; } = "";
        public int PageSize { get; set; } = 10;
        public int PageNumber { get; set; } = 1;
        //public int Offset { get { return (PageSize == 0 ? 10 : PageSize) * ((PageNumber == 0 ? 1 : PageNumber) - 1); } }
        //public int Limit { get { return (PageSize == 0 ? 10 : PageSize); } }
        public bool? Status { get; set; }

       
    }
     
     public class ThamSoLocDanhMuc1 /*: ThamSoLocDanhMuc*/
    {
        
        public int ID { get; set; }
        public int Cap { get; set; }
        public string Keyword { get; set; } = "";
    }
    
    public class BasePagingParamsOffset
    {
        public string Keyword { get; set; }
        public string OrderByOption { get; set; }
        public string OrderByName { get; set; }
        public int PageSize { get; set; }
        public int PageNumber { get; set; }
        public int Offset { get { return (PageSize == 0 ? 10 : PageSize) * ((PageNumber == 0 ? 1 : PageNumber) - 1); } }
        public int Limit { get { return (PageSize == 0 ? 10 : PageSize); } }

        /// <summary>
        /// format dd/MM/yyyy
        /// </summary> 
        public DateTime TuNgay { get; set; }
        /// <summary>
        /// format dd/MM/yyyy
        /// </summary>
        public DateTime DenNgay { get; set; }
        //public DateTime StartDate
        //{
        //    get
        //    {
        //        try
        //        {
        //            return DateTime.ParseExact(TuNgayStr, "dd/MM/yyyy", CultureInfo.InvariantCulture);
        //        }
        //        catch
        //        {
        //            return DateTime.MinValue;
        //        }
        //    }
        //}
        //public DateTime EndDate
        //{
        //    get
        //    {
        //        try
        //        {
        //            return DateTime.ParseExact(DenNgayStr, "dd/MM/yyyy", CultureInfo.InvariantCulture);
        //        }
        //        catch
        //        {
        //            return DateTime.MinValue;
        //        }
        //    }
        //}
    }
    public class BaseDeleteParams
    {
        public List<int> ListID { get; set; }
    }

    public class BasePheDuyetParams
    {
        public List<int> DanhSachDonTuID { get; set; }
        public int PheDuyet { get; set; }
    }

    public class BasePagingParamsForFilter : BasePagingParams
    {
        public int? CoQuanID { get; set; }
        public int? CanBoID { get; set; }
        public int? Nam { get; set; }
        public int? Thang { get; set; }
        public int? CaLamViecID { get; set; }
        public int? TrangThai { get; set; }
        public int? LoaiDonTuID { get; set; }
        public int? ApDungCho { get; set; }
        public int? GiaTri { get; set; }
        public int? NamKeKhai { get; set; }
        public int? ChucNangID { get; set; }
        public string NhomChucNang { get; set; }
        public TimeSpan? TuTime { get; set; }
        public TimeSpan? DenTime { get; set; }
        public int? CameraID { get; set; }
        public DateTime? Ngay { get; set; }
        public int? GetAllDonTu { get; set; }

    }
    public class NewParams
    {
        public int CanBoID { get; set; }
        public List<int?> DanhSachNhomTaiSanID { get; set; }
    }

    public class ThongKeParams
    {
        public int? NamKeKhai { get; set; }
        public int? CoQuanID { get; set; }
        public int? DotKekhaiID { get; set; }
        public int? TrangThai { get; set; }
        public int? CapQuanLy { get; set; }
        public int? LoaiKeKhai { get; set; }

    }
    public class BasePagingDeviceParams
    {
        public int PageSize { get; set; } = 10;
        public int PageNumber { get; set; } = 1;
        public int Offset { get { return (PageSize == 0 ? 10 : PageSize) * ((PageNumber == 0 ? 1 : PageNumber) - 1); } }
        public int Limit { get { return (PageSize == 0 ? 10 : PageSize); } }
        /// <summary>
        /// format dd/MM/yyyy
        /// </summary> 
        public DateTime? StartDate { get; set; }
        /// <summary>
        /// format dd/MM/yyyy
        /// </summary>
        public DateTime? EndDate { get; set; }
        public int? Startus { get; set; }
    }

    public class BaseReportParams
    {
        public int PageSize { get; set; } = 10;
        public int PageNumber { get; set; } = 1;
        public int Offset { get { return (PageSize == 0 ? 10 : PageSize) * ((PageNumber == 0 ? 1 : PageNumber) - 1); } }
        public int Limit { get { return (PageSize == 0 ? 10 : PageSize); } }
        public int? CanBoID { get; set; }
        public int? CoQuanID { get; set; }
        public DateTime? TuNgay { get; set; }   
        public DateTime? DenNgay { get; set; }
        public List<int> ListCapID { get; set; }
        public string ListCapIDStr { get; set; }
        public int? Index { get; set; }
        public int? XemTaiLieuMat { get; set; }
        public int? CapID { get; set; }
    }

    public class DashBoardParams
    {
        public int? CanBoID { get; set; }
        public int? CoQuanID { get; set; }
        public int? PhongBanID { get; set; }
        public int? RoleID { get; set; }
        public int? CapID { get; set; }
        public int? TinhID { get; set; }
        public int? HuyenID { get; set; }
        public string TuNgay { get; set; }
        public string DenNgay { get; set; }
        public string TuNgayCungKy { get; set; }
        public string DenNgayCungKy { get; set; }
        public string CapIDSelect { get; set; }
        public string CoQuanIDSelect { get; set; }

    }
}
