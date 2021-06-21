using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
	public class DichVu
	{
		public int id { get; set; }
		public string TenDichVu { get; set; }
		public string MoTa { get; set; }
		public int Gia { get; set; }
		public int status { get; set; }
	}
}
