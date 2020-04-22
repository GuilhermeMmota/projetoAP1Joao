using System;

namespace ListaAPI.Models
{
    public class Listas
    {
        public long Id { get; set; } 

        public string Title { get; set; }  

        public string CreationDate { get; set; }  

        public bool Done { get; set; }     
           
        public string Priority { get; set; } 
    }
}