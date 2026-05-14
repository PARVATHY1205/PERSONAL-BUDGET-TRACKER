// script.js

let income = localStorage.getItem("income") || 0;

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

displayData();

// Save Income

function saveIncome() {

    let incomeInput = document.getElementById("income").value;

    if (incomeInput == "") {

        alert("Please enter income");

        return;
    }

    income = Number(incomeInput);

    localStorage.setItem("income", income);

    displayData();

    document.getElementById("income").value = "";
}

// Add Expense

function addExpense() {

    let expenseName =
        document.getElementById("expenseName").value;

    let expenseAmount =
        document.getElementById("expenseAmount").value;

    let category =
        document.getElementById("category").value;

    if (expenseName == "" || expenseAmount == "") {

        alert("Please fill all fields");

        return;
    }

    let expense = {

        name: expenseName,
        amount: Number(expenseAmount),
        category: category

    };

    expenses.push(expense);

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    displayData();

    document.getElementById("expenseName").value = "";

    document.getElementById("expenseAmount").value = "";
}

// Display Data

function displayData() {

    document.getElementById("totalIncome").innerHTML =
        "₹" + income;

    let totalExpense = 0;

    let expenseList =
        document.getElementById("expenseList");

    expenseList.innerHTML = "";

    for (let i = 0; i < expenses.length; i++) {

        totalExpense += expenses[i].amount;

        let row = `
        
        <tr>

            <td>${expenses[i].name}</td>

            <td>${expenses[i].category}</td>

            <td>₹${expenses[i].amount}</td>

            <td>
            
                <button class="delete-btn"
                onclick="deleteExpense(${i})">
                Delete
                </button>
            
            </td>

        </tr>
        
        `;

        expenseList.innerHTML += row;
    }

    document.getElementById("totalExpense").innerHTML =
        "₹" + totalExpense;

    let balance = income - totalExpense;

    document.getElementById("balance").innerHTML =
        "₹" + balance;

    updateSavingStatus(balance);
    updateChart(income,totalExpense,balance);
}

// Delete Expense

function deleteExpense(index) {

    expenses.splice(index, 1);

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    displayData();
}

// Saving Status

function updateSavingStatus(balance) {

    let percentage = 0;

    if (income > 0) {

        percentage = (balance / income) * 100;
    }

    document.getElementById("progress").style.width =
        percentage + "%";

    document.getElementById("savingText").innerHTML =
        "You saved " + percentage.toFixed(0) + "% of your income";
}