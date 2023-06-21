using System;
using System.Security.Claims;

namespace Com.Gosol.KNTC.Ultilities
{
    public class IdentityHelper
    {
        public static int GetCoQuanID(ClaimsPrincipal claims)
        {
            int kq = 0;

            var claim = claims.FindFirst("CoQuanID");
            if (claim != null)
                kq = Utils.ConvertToInt32(claim.Value, 0);

            return kq;
        }

        public static int NguoiDungID(ClaimsPrincipal claims)
        {
            int kq = 0;

            var claim = claims.FindFirst("NguoiDungID");
            if (claim != null)
                kq = Utils.ConvertToInt32(claim.Value, 0);

            return kq;
        }
        public static int GetCanBoID(ClaimsPrincipal claims)
        {
            int kq = 0;

            var claim = claims.FindFirst("CanBoID");
            if (claim != null)
                kq = Utils.ConvertToInt32(claim.Value, 0);

            return kq;
        }

        public static int GetHuyenID(ClaimsPrincipal claims)
        {
            int kq = 0;

            var claim = claims.FindFirst("HuyenID");
            if (claim != null)
                kq = Utils.ConvertToInt32(claim.Value, 0);

            return kq;
        }
        public static int GetPhongBanID(ClaimsPrincipal claims)
        {
            int kq = 0;

            var claim = claims.FindFirst("PhongBanID");
            if (claim != null)
                kq = Utils.ConvertToInt32(claim.Value, 0);

            return kq;
        }
        public static int GetRoleID(ClaimsPrincipal claims)
        {
            int kq = 0;

            var claim = claims.FindFirst("RoleID");
            if (claim != null)
                kq = Utils.ConvertToInt32(claim.Value, 0);

            return kq;
        }

        public static bool GetSuDungQuyTrinh(ClaimsPrincipal claims)
        {
            var kq = false;

            var claim = claims.FindFirst("SuDungQuyTrinh");
            if (claim != null)
                kq = Utils.ConvertToBoolean(claim.Value, false);

            return kq;
        }

        public static bool GetQTVanThuTiepDan(ClaimsPrincipal claims)
        {
            var kq = false;

            var claim = claims.FindFirst("QTVanThuTiepDan");
            if (claim != null)
                kq = Utils.ConvertToBoolean(claim.Value, false);

            return kq;
        }

        
    }
}
