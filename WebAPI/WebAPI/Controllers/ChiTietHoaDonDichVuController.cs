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
    public class ChiTietHoaDonDichVuController : Controller
	{
        private readonly IConfiguration _configuration;

        public ChiTietHoaDonDichVuController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT * FROM ChiTietHoaDonDichVu";
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

        [HttpPost("add")]
        public JsonResult Post(ChiTietHoaDonDichVu b)
        {
			string query = @"INSERT INTO [dbo].[ChiTietHoaDonDichVu] ([idHoaDon],[idDichVu],[SoLuong]) values( 
                            '" + b.idHoaDon + @"'
                            ,'" + b.idDichVu + @"'
                            ,'" + b.SoLuong + @"'
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
