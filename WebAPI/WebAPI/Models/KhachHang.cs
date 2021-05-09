using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
	public class KhachHang
	{
		public string id { get; set; }
		public string Ten { get; set; }
		public string NgaySinh { get; set; }
		public string DienThoai { get; set; }
		public int GioiTinh { get; set; }
		public string DiaChi { get; set; }
		public string NgayTao { get; set; }
	}
}
