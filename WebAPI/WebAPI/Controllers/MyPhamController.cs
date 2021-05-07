using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class MyPhamController : ControllerBase
	{
        private readonly IConfiguration _configuration;

        public MyPhamController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select a.*, b.TenLoai from MyPham as a, LoaiMyPham as b where a.idLoai = b.id";
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
        [HttpGet("{id}")]
        public JsonResult GetMyPhamTheoLoai(int id)
        {
            string query = @"select a.*, b.TenLoai from MyPham as a, LoaiMyPham as b where a.idLoai = b.id and a.idLoai = " + id;
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
    }
}
