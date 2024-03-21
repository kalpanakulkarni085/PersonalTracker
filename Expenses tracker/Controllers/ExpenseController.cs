using Expenses_tracker.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace Expenses_tracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        private readonly ExpenseTrackerContext _context;

        public ExpenseController(ExpenseTrackerContext context)
        {
            _context = context;
        }

        // GET: api/Expenses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Expense>>> GetExpenses()
        {
            return await _context.Expenses.ToListAsync();
        }

       


        // GET: api/Expenses/5
        [HttpGet("{id}")]

        public async Task<ActionResult<Expense>> GetExpense(int id)
        {
            var expense = await _context.Expenses.FirstOrDefaultAsync(e => e.ExpenseID == id);

            if (expense == null)
            {
                return NotFound();
            }

            return expense;
        }

        [HttpGet("category")]
        public async Task<ActionResult<IEnumerable<Expense>>> GetExpensesByCategory([FromQuery] string category)
        {
            var expenses = await _context.Expenses.Where(e => e.Category.ToLower() == category.ToLower()).ToListAsync();

            if (expenses == null || expenses.Count == 0)
            {
                return NotFound();
            }

            return expenses;
        }
        [HttpGet("current-month")]
        public async Task<ActionResult<IEnumerable<Expense>>> GetExpensesForCurrentMonth()
        {
            // Get the current month and year
            var currentMonth = DateTime.Now.Month;
            var currentYear = DateTime.Now.Year;

            // Fetch expenses data for the current month
            var expenses = await _context.Expenses
                .Where(e => e.ExpenseDate.Month == currentMonth && e.ExpenseDate.Year == currentYear)
                .ToListAsync();

            return expenses;
        }


        [HttpGet("Report")]
        public IActionResult GetExpenseReport(int year)
        {
            try
            {
                var expenses = _context.Expenses
                    .Where(e => e.ExpenseDate.Year == year)
                    .ToList();

                return Ok(expenses);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while fetching the expense report.");
            }
        }
        // POST: api/Expenses
        [HttpPost]
        public async Task<ActionResult<Expense>> AddExpense([FromBody] Expense expense)
        {


            

            // Handle invalid date format



            _context.Expenses.Add(expense);
            AppContext.SetSwitch("Switch.Microsoft.Data.SqlClient.DisableCertificateValidation", true);


            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExpense", new { id = expense.ExpenseID }, expense);
        }
        // PUT: api/Expenses/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExpense(int id, Expense expense)
        {
            var existingExpense = await _context.Expenses.FirstOrDefaultAsync(e => e.ExpenseID == id);

            //if (id != expenseid)
            //{
            //    return BadRequest();
            //}

            existingExpense.Category = expense.Category;
            existingExpense.Amount = expense.Amount;
            existingExpense.ExpenseDate = expense.ExpenseDate;
            existingExpense.Description = expense.Description;

            _context.Entry(existingExpense).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExpenseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Expenses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense(int id)
        {
            var expense = await _context.Expenses.FindAsync(id);
            if (expense == null)
            {
                return NotFound();
            }

            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ExpenseExists(int id)
        {
            return _context.Expenses.Any(e => e.ExpenseID == id);
        }
    }
}
