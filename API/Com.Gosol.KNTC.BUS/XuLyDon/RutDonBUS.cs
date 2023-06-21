using Com.Gosol.KNTC.DAL.XuLyDon;
using Com.Gosol.KNTC.Models.XuLyDon;
using Com.Gosol.KNTC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;
using Com.Gosol.KNTC.Models.KNTC;
using Com.Gosol.KNTC.DAL.KNTC;
using Workflow;
using Workflow.Model;
using Com.Gosol.KNTC.Ultilities;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Math;
using Com.Gosol.KNTC.Security;

namespace Com.Gosol.KNTC.BUS.XuLyDon
{
    public class RutDonBUS
    {
        private readonly DSRutDonDAL _DSRutDonDAL = new DSRutDonDAL();
        private readonly RutDonDAL _RutDonDAL = new();
        public RutDonBUS()
        {
        }


        public BaseResultModel DanhSach(RutDonParams thamSo, RutDonClaims Info)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = _DSRutDonDAL.DanhSach(thamSo, Info);
            }
            catch (Exception ex)
            {

                Result.Status = -1;
                Result.Message = ex.Message;
                Result.Data = null;
            }

            return Result;
        }

        public BaseResultModel RutDon(RutDonInfo Info, RutDonClaims claims)
        {
            var Result = new BaseResultModel();
            string commandCode = "RutDon";
            try
            {
                int val = _DSRutDonDAL.InsertRutDon(Info);

                if (val > 0)
                {
                    Result.Status = 1;
                    Result.Message = "Rút đơn thành công";

                    WorkflowInstance.Instance.ExecuteCommand(Info.XuLyDonID, claims.CanBoID, commandCode, DateTime.Now, Info.LyDo);
                }
                else
                {
                    Result.Status = -1;
                    Result.Message = "Rút đơn không thành công";
                }
            }
            catch (Exception ex)
            {

                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }

            return Result;
        }

        public BaseResultModel HuyRutDon(RutDonInfo Info, RutDonClaims claims)
        {
            var Result = new BaseResultModel();

            try
            {
                _RutDonDAL.UpdateHuyRutDon(Info.XuLyDonID, Constant.Ket_Thuc, Constant.RutDon);

                int result = _RutDonDAL.Delete(Info.RutDonID);

                if (result > 0)
                {

                    Result.Status = 1;
                    Result.Message = "Rút đơn thành công";

                }
                else
                {
                    Result.Status = -1;
                    Result.Message = "Rút đơn không thành công";
                }
            }
            catch (Exception ex)
            {

                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }

            return Result;
        }
    }
}
