using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
	public class PhieuNhap
	{
		public string id { get; set; }
		public int idMyPham { get; set; }
		public int SoLuong { get; set; }
		public string NgayNhap { get; set; }
	}
}
