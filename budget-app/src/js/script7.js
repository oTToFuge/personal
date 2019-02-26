let starBtn = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    daybudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalexpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthsavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearsavingsValue = document.getElementsByClassName('yearsavings-value')[0],

    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalexpensesBtn = document.getElementsByTagName('button')[1],
    countBudgetBtn = document.getElementsByTagName('button')[2],

    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    incomeItem = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    dayValue = document.querySelector('.day-value'),
    monthValue = document.querySelector('.month-value'),
    yearValue = document.querySelector('.year-value');

let money, time;

starBtn.addEventListener('click', function () {
    money = +prompt("Ваш бюджет на месяц?");
    time = prompt("Введите дату в формате YYYY-MM-DD");

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?");
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();

    dayValue.value = new Date(Date.parse(time)).getDate();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    yearValue.value = new Date(Date.parse(time)).getFullYear();
});

expensesBtn.addEventListener('click', function () {
    let sum = 0;
    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;

        if ((typeof (a)) === 'string' && (typeof (a)) != null && (typeof (b)) != null && a != '' && b != '' && a.length < 50 && b.length < 20) {
            console.log("OK");
            appData.expenses[a] = b;
            sum += +b;
        } else {
            i = i - 1;
        }
    }
    expensesValue.textContent = sum;
});

optionalexpensesBtn.addEventListener('click', function () {
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        let Opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = Opt;
        optionalexpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
});

countBudgetBtn.addEventListener('click', function () {

    if (appData.budget != undefined) {
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        daybudgetValue.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay < 100) {
            levelValue.textContent = "Minimalniy uroven dostatka";
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 3000) {
            levelValue.textContent = "Sredniy uroven dostatka";
        } else if (appData.moneyPerDay > 3000) {
            levelValue.textContent = "Высокий уровень достатка";
        } else {
            levelValue.textContent = "Произошла ошибка";
        }
    } else {
        daybudgetValue.textContent = 'Произошла ошибка';
    }

});

incomeItem.addEventListener('change', function () {
    let items = incomeItem.value;
    appData.income = items.split(', ');

    incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function () {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }

});

sumValue.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.mothIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 12 * percent;

        monthsavingsValue.textContent = appData.mothIncome.toFixed(1);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percentValue.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.mothIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 12 * percent;

        monthsavingsValue.textContent = appData.mothIncome.toFixed(1);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});


let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};