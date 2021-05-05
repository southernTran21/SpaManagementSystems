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
    public class NhanVienController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public NhanVienController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select a.id, a.Ten,b.TenChucVu, a.DienThoai, a.NgayBatDau, a.TinhTrang 
                                from NhanVien a, ChucVu b 
                                    where a.idChucVu = b.id";
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
        public JsonResult Post(NhanVien a)
        {
            string query = @"INSERT INTO [dbo].[NhanVien] ([idAccount],[Ten],[idChucVu],[DienThoai],[NgayBatDau],[TinhTrang])VALUES( 
                            '" + a.idAccount + @"'
                            ,'" + a.Ten + @"'
                            ,'" + a.idChucVu + @"'
                            ,'" + a.DienThoai + @"'
                            ,'" + a.NgayBatDau + @"'
                            ,'" + a.TinhTrang + @"'
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
        }

    }
}
