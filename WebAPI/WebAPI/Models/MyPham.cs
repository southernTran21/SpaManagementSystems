using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
	public class MyPham
	{
		public int id { get; set; }
		public string Ten { get; set; }
		public string MoTa { get; set; }
		public int Gia { get; set; }
		public int idLoai { get; set; }
		public int status { get; set; }
	}
}
