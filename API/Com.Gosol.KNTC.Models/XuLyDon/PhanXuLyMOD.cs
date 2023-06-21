using Com.Gosol.KNTC.Models.HeThong;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Com.Gosol.KNTC.Models.XuLyDon
{
    public class PhanXuLyMOD
    {
    }
    public class paramPhanXuLy
    {
        public int CoQuanID { get; set; }
        public string? KeyWord { get; set; }

        public int? LoaiKhieuToID { get; set; }
        public DateTime? TuNgay { get; set; }

        public DateTime? DenNgay { get; set; }

        public int? Start { get; set; } = 0;

        public int? End { get; set; } = 10;
        public int? PhongBanID { get; set; }
    }

    public class FileHoSo
    {

        public string TenFile { get; set; }

        public string TomTat { get; set; }

        public DateTime? NgayUp { get; set; }

        public int NguoiUp { get; set; }

        public string FileURL { get; set; }

        public int XuLyDonID { get; set; }

        public int? FileID { get; set; }

        public List<FileDinhKemModel> FileMau { get; set; }

    }
    public class FilePhanXuLy
    {
        public string FileURL { get; set; }

        public int XuLyDonID { get; set; }

        public int? FileID { get; set; }
    }

    public class PhanXuLyClaims
    {
        public int? CoQuanID { get; set; } = -1;
        public int RoleID { get; set; } = -1;
        public int CanBoID { get; set; }
    }
}
