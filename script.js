$(document).ready(function() {
            // Initialize expenses from localStorage or empty array
            let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

            // Function to update the table and total
            function updateExpenses() {
                $('#expense-table-body').empty();
                let total = 0;
                expenses.forEach((expense, index) => {
                    // Ensure amount is a number
                    const amount = parseFloat(expense.amount);
                    if (!isNaN(amount)) {
                        total += amount;
                    }
                    $('#expense-table-body').append(`
                        <tr>
                            <td>${expense.date}</td>
                            <td>${expense.category}</td>
                            <td>$${amount.toFixed(2)}</td>
                            <td>${expense.description || ''}</td>
                            <td>
                                <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Delete</button>
                            </td>
                        </tr>
                    `);
                });
                $('#total-amount').text(`Rs. ${total.toFixed(2)}`);
                // Save to localStorage
                localStorage.setItem('expenses', JSON.stringify(expenses));
            }

            // Initial update
            updateExpenses();

            // Add expense
            $('#expense-form').on('submit', function(e) {
                e.preventDefault();
                
                // Validate inputs
                const date = $('#date').val();
                const category = $('#category').val();
                const amount = parseFloat($('#amount').val());
                const description = $('#description').val();

                if (!date || !category || isNaN(amount) || amount <= 0) {
                    alert('Please fill in all required fields with valid values.');
                    return;
                }

                // Add new expense
                const newExpense = {
                    date: date,
                    category: category,
                    amount: amount,
                    description: description || ''
                };
                
                expenses.push(newExpense);
                updateExpenses();

                // Clear form
                $('#expense-form')[0].reset();
            });

            // Delete expense
            $(document).on('click', '.delete-btn', function() {
                const index = $(this).data('index');
                expenses.splice(index, 1);
                updateExpenses();
            });
        });