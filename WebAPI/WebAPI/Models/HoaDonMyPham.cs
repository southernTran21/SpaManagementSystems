﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
	public class HoaDonMyPham
	{
		public string id { get; set; }
		public string idAccount { get; set; }
		public string NgayLap { get; set; }
		public int SoLuong { get; set; }
		public int TongTien { get; set; }
	}
}
