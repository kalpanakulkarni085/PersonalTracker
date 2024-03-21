using Expenses_tracker.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Expenses_tracker
{
    public class ExpenseTrackerContext : DbContext
    {
        public ExpenseTrackerContext(DbContextOptions options)
           : base(options)
        {
        }

        public DbSet<Expense> Expenses { get; set; }
    }
}

