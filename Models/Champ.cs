using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiLolNew.Models
{
    public class Champ
    {
        // Champs Info
        public int Id { get; set; }
        public string Name { get; set; }

        public string Lane { get; set; }

        // Skills
        public string SkillQ { get; set; }
        public string SkillW { get; set; }
        public string SkillE { get; set; }
        public string SkillR { get; set; }

        //Skill Passiva
        public string Passive { get; set;}

        //Imagem
        public string ImageChamp { get; set; }
    }
}