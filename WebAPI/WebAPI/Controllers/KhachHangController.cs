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
	public class KhachHangController : ControllerBase
	{
		private readonly IConfiguration _configuration;

		public KhachHangController(IConfiguration configuration)
		{
			_configuration = configuration;
		}

		[HttpGet]
		public JsonResult Get()
		{
			string query = @"select * from KhachHang";
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
		public JsonResult Post(KhachHang value)
		{
			string query = @"INSERT INTO [dbo].[KhachHang] ([id],[Ten],[NgaySinh],[DienThoai],[GioiTinh],[DiaChi],[NgayTao]) VALUES( 
                            '" + value.id + @"'
                            ,'" + value.Ten + @"'
                            ,'" + value.NgaySinh + @"'
                            ,'" + value.DienThoai + @"'
                            ,'" + value.GioiTinh + @"'
							,'" + value.DiaChi + @"'
							,'" + value.NgayTao + @"'
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
	}
}
