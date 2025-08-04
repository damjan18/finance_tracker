
function runPage() {
    function fetchBalance() {
        fetch('http://localhost:8000/api/balance/')
            .then(response => response.json())
            .then(data => {
                document.getElementById('balance').textContent = data.balance.toFixed(2);
            })
    }


    function submitTransaction(isAddition) {
        const date = document.getElementById('date').value;
        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const category = document.getElementById('category').value;

        if (!date || !description || isNaN(amount) || !category) {
            alert('Please fill in all fields.');
            return;
        }

        const finalAmount = isAddition ? Math.abs(amount) : -Math.abs(amount);

        fetch('http://localhost:8000/api/transactions/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: date,
                description: description,
                amount: finalAmount,
                category: category,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                fetchBalance()
                document.getElementById('transaction-form').reset();

            } else{
                alert('Error:');
            }
        })


    }
    
    function deleteAllTransactions() {
        fetch('http://localhost:8000/api/delete_all/', {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                fetchBalance();
            } else {
                alert('Error deleting transactions');
            }
        })
    }

    document.addEventListener('DOMContentLoaded', fetchBalance)

    document.getElementById('add-btn').addEventListener('click', function() {
        submitTransaction(true);
    })
    document.getElementById('subtract-btn').addEventListener('click', function() {
        submitTransaction(false);
    })
    document.getElementById('delete-btn').addEventListener('click', function() {
        deleteAllTransactions();
    })  
}

runPage()