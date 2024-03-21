using Microsoft.VisualBasic;

namespace Expenses_tracker.Models
{
    public class Expense
    {
        public int ExpenseID { get; set; }
        public string Category { get; set; }
        public decimal Amount { get; set; }
        public DateTime ExpenseDate { get; set; }
        public string Description { get; set; }
    }
}




