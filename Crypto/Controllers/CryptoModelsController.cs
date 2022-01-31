using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Crypto.Data;
using Crypto.Models;

namespace Crypto.Controllers
{
    public class CryptoModelsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CryptoModelsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: CryptoModels
        public async Task<IActionResult> Index()
        {
            return View(await _context.CryptoModels.ToListAsync());
        }

        // GET: CryptoModels/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var cryptoModel = await _context.CryptoModels
                .FirstOrDefaultAsync(m => m.Id == id);
            if (cryptoModel == null)
            {
                return NotFound();
            }

            return View(cryptoModel);
        }

        // GET: CryptoModels/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: CryptoModels/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,CryptoName,CryptoAbbreviation,CurrentPrice,CryptoIconPath")] CryptoModel cryptoModel)
        {
            if (ModelState.IsValid)
            {
                _context.Add(cryptoModel);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(cryptoModel);
        }

        // GET: CryptoModels/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var cryptoModel = await _context.CryptoModels.FindAsync(id);
            if (cryptoModel == null)
            {
                return NotFound();
            }
            return View(cryptoModel);
        }

        // POST: CryptoModels/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,CryptoName,CryptoAbbreviation,CurrentPrice,CryptoIconPath")] CryptoModel cryptoModel)
        {
            if (id != cryptoModel.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(cryptoModel);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CryptoModelExists(cryptoModel.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(cryptoModel);
        }

        // GET: CryptoModels/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var cryptoModel = await _context.CryptoModels
                .FirstOrDefaultAsync(m => m.Id == id);
            if (cryptoModel == null)
            {
                return NotFound();
            }

            return View(cryptoModel);
        }

        // POST: CryptoModels/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var cryptoModel = await _context.CryptoModels.FindAsync(id);
            _context.CryptoModels.Remove(cryptoModel);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool CryptoModelExists(int id)
        {
            return _context.CryptoModels.Any(e => e.Id == id);
        }
    }
}
