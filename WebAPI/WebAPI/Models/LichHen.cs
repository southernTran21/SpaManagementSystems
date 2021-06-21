using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
	public class LichHen
	{
		public string id { get; set; }
		public int idNhanVien { get; set; }
		public string idKhachHang { get; set; }
		public string NgayDieuTri { get; set; }
		public string KhungGio { get; set; }
		public string NoiDung { get; set; }
		public int Status { get; set; }
		public int idDichVu { get; set; }
	}
}
