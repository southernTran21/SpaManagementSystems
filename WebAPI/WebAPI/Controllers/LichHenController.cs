using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LichHenController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public LichHenController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("{id}")]
        public JsonResult Get(string id)
        {
            string query = @"select a.id, NgayDieuTri, KhungGio, NoiDung, a.Status, b.Ten, c.TenDichVu from LichHen as a, NhanVien as b, DichVu as c where a.idDichVu = c.id and a.idNhanVien = b.id and a.Status = 0 and a.idKhachHang = '" + id + @"'";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DBConnection");
            SqlDataReader myreader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myreader = myCommand.ExecuteReader();
                    table.Load(myreader);
                    myreader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }//done
        [HttpGet("getLichSuDieuTri/{id}")]
        public JsonResult getLichSuDieuTri(string id)
        {
            string query = @"select a.id, NgayDieuTri, KhungGio, NoiDung, a.Status, b.Ten, c.TenDichVu from LichHen as a, NhanVien as b, DichVu as c where a.idDichVu = c.id and a.idNhanVien = b.id and a.Status != 0 and a.idKhachHang = '" + id + @"'";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DBConnection");
            SqlDataReader myreader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myreader = myCommand.ExecuteReader();
                    table.Load(myreader);
                    myreader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }//done
        [HttpGet("getDieuTriXong/{id}")]
        public JsonResult getDieuTriXong(string id)
        {
            string query = @"select a.id, NgayDieuTri, a.Status, b.Ten, c.TenDichVu, c.Gia, c.id as idDichVu from LichHen as a, NhanVien as b, DichVu as c where a.idDichVu = c.id and a.idNhanVien = b.id and a.Status = 1 and a.idKhachHang = '" + id + @"'";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DBConnection");
            SqlDataReader myreader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myreader = myCommand.ExecuteReader();
                    table.Load(myreader);
                    myreader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }//done


        [HttpPost]
        public JsonResult Post(LichHen a)
        {
            string query = @"INSERT INTO [dbo].[LichHen]([id],[idNhanVien],[idKhachHang],[NgayDieuTri],[KhungGio],[NoiDung],[Status],[idDichVu]) VALUES( 
                            '" + a.id + @"'
                            ,'" + a.idNhanVien + @"'
                            ,'" + a.idKhachHang + @"'
                            ,'" + a.NgayDieuTri + @"'
                            ,'" + a.KhungGio + @"'
                            ,'" + a.NoiDung + @"'
                            ,'0'
                            ,'" + a.idDichVu + @"'
                            )";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DBConnection");
            SqlDataReader myreader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myreader = myCommand.ExecuteReader();
                    table.Load(myreader);
                    myreader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");
        }//done
        [Route("updatetrangthai")]
        [HttpPut]
        public JsonResult UpdateTrangThaiLichHen(LichHen a)
        {
            string query = @"UPDATE [dbo].[LichHen] set [Status] = '" + a.Status + @"' where id = '" + a.id + @"'";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DBConnection");
            SqlDataReader myreader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myreader = myCommand.ExecuteReader();
                    table.Load(myreader);
                    myreader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Update Successfully");
        }//done
    }
}
