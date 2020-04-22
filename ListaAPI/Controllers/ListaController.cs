using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ListaAPI.Data;
using ListaAPI.Models;

namespace ListaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ListasController : ControllerBase
    {
        private readonly ApiContext _context;   

        public ListasController(ApiContext context)
        {
            _context = context;
        }        // GET: api/Lista
        [HttpGet]

        public async Task<ActionResult<IEnumerable<Listas>>> GetLista()
        {
            return await _context.Lista.ToListAsync();
        }        // GET: api/Lista/5
        [HttpGet("{id}")]
        
        public async Task<ActionResult<Listas>> GetListas(long id)
        {
            var lista = await _context.Lista.FindAsync(id);            
            
            if (lista == null)
            {
                return NotFound();
            }            
                return lista;
        }        // PUT: api/Lista/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutListas(long id, Listas lista)
        {
            if (id != lista.Id)
            {
                return BadRequest();
            }            
            _context.Entry(lista).State = EntityState.Modified;            
            
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ListasExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }       
            
            return NoContent();
        }        // POST: api/Lista
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Listas>> PostListas(Listas lista)
        {
            _context.Lista.Add(lista);
            await _context.SaveChangesAsync();            
            
            return CreatedAtAction("GetListas", new { id = lista.Id }, lista);
        }        // DELETE: api/Lista/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Listas>> DeleteListas(long id)
        {
            var lista = await _context.Lista.FindAsync(id);
            if (lista == null)
            {
                return NotFound();
            } 

            _context.Lista.Remove(lista);
            await _context.SaveChangesAsync();    

            return lista;
        }        
        private bool ListasExists(long id)
        {
            return _context.Lista.Any(e => e.Id == id);
        }
    }
}