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
    public class KhoController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public KhoController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select a.*, b.Ten, c.TenLoai, d.SLN as SLN 
                            from Kho as a, MyPham as b, LoaiMyPham as c, (select idMyPham, sum(SoLuongNhap) as SLN from PhieuNhap group by idMyPham) as d 
                            where a.idMyPham = b.id and b.idLoai = c.id and a.idMyPham = d.idMyPham";
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
        public JsonResult GetForID(string id)
        {
            string query = @"select a.*, b.Ten, c.TenLoai from Kho as a, MyPham as b, LoaiMyPham as c where a.idMyPham = b.id and b.idLoai = c.id and a.idMyPham = '"+id+"'";
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
        [HttpGet("laysoluong")]
        public JsonResult LaySoLuong()
        {
            string query = @"select SoLuong, idMyPham from Kho";
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
        [HttpGet("tongsoluongnhap")]
        public JsonResult TongSoLuongNhap()
        {
            string query = @"select Sum(SoLuongNhap) as TongSoLuongNhap from PhieuNhap";
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
        public JsonResult Post(Kho value)
        {
            string query = @"INSERT INTO [dbo].[Kho]([id],[idMyPham],[SoLuong]) VALUES( 
                            '" + value.id + @"'
                            ,'" + value.idMyPham + @"'
                            ,'" + value.SoLuong + @"'
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
        [HttpPut]
        public JsonResult Put(Kho value)
        {
            string query = @"UPDATE [dbo].[Kho] SET [SoLuong] = '" + value.SoLuong + @"' where idMyPham = '" + value.idMyPham + @"'";
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
            return new JsonResult("Updated Successfully");
        }//done
    }
}
