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
	public class HoaDonDichVuController : ControllerBase
	{
        private readonly IConfiguration _configuration;

        public HoaDonDichVuController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT * FROM HoaDonDichVu";
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
        public JsonResult Post(HoaDonDichVu a)
        {
            string query = @"INSERT INTO [dbo].[HoaDonDichVu] ([id],[idAccount],[idKhachHang],[NgayLap],[SoLuong],[TongTien]) values( 
                            '" + a.id + @"'
                            ,'" + a.idAccount + @"'
                            ,'" + a.idKhachHang + @"'
                            ,'" + a.NgayLap + @"'
                            ,'" + a.SoLuong + @"'
                            ,'" + a.TongTien + @"'
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
