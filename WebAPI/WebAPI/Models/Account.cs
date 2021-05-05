using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Account
    {
        public string id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public int idQuyen { get; set; }
        public string accountName { get; set; }
        public int status { get; set; }
    }
}
