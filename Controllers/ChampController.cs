using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ApiLolNew.Context;
using ApiLolNew.Models;
using Microsoft.AspNetCore.Mvc;

namespace ApiLolNew.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChampController : ControllerBase
    {
        private readonly MeuDbContext _context;

        public ChampController(MeuDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromForm] Champ champ, IFormFile file)
        {
            try
            {
                champ.Id = 0;

                if (file != null && file.Length > 0)
                {
                    var uploadsPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
                    if (!Directory.Exists(uploadsPath))
                        Directory.CreateDirectory(uploadsPath);

                    var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                    var filePath = Path.Combine(uploadsPath, uniqueFileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    champ.ImageChamp = "/images/" + uniqueFileName;
                }

                _context.Champs.Add(champ);
                _context.SaveChanges();

                return CreatedAtAction(nameof(ObterPorId), new { id = champ.Id }, champ);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult ObterPorId(int id)
        {
            var champ = _context.Champs.Find(id);

            if (champ == null)
            {
                return NotFound();
            }

            return Ok(champ);
        }

        [HttpGet("ObterPorNome/{nome}")]
        public IActionResult ObterPorNome(string nome)
        {
            var champs = _context.Champs
                .Where(x => x.Name.Contains(nome))
                .ToList();

            if (champs == null || champs.Count == 0)
            {
                return NotFound();
            }

            return Ok(champs);
        }

        [HttpGet("listarTodos")]
        public IActionResult ObterTodos()
        {
            var champs = _context.Champs.ToList();

            if (champs.Count == 0)
            {
                return NotFound("Nenhum Campeão encontrado");
            }

            return Ok(champs);
        }

        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, Champ champ)
        {
            var champBanco = _context.Champs.Find(id);

            if (champBanco == null)
            {
                return NotFound("Nenhum campeão encontrado");
            }

            champBanco.Name = champ.Name;
            champBanco.Lane = champ.Lane;
            champBanco.SkillQ = champ.SkillQ;
            champBanco.SkillW = champ.SkillW;
            champBanco.SkillE = champ.SkillE;
            champBanco.SkillR = champ.SkillR;

            // 🔹 Atualiza também a Passiva
            champBanco.Passive = champ.Passive;

            _context.Champs.Update(champBanco);
            _context.SaveChanges();

            return Ok(champBanco);
        }

        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            var champBanco = _context.Champs.Find(id);

            if (champBanco == null)
            {
                return NotFound("Nenhum campeão encontrado");
            }

            _context.Champs.Remove(champBanco);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
