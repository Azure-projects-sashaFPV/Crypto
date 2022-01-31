using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace Crypto.Models
{
    public class CryptoModel
    {
        public int Id { get; set; }
        public string CryptoName { get; set; }
        public string CryptoAbbreviation { get; set; }
        public double CurrentPrice { get; set; }
        public string CryptoIconPath { get; set; }
    }
}
