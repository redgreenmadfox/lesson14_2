'use strict';

//объявляем переменные
let start = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpenses = document.querySelector('.additional_expenses'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    incomeItems = document.querySelectorAll('.income-items');
let expensesAmount;
let targetMonth;

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let isString = function(s){
    return (typeof s) === 'string' && s !== '';
}

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    expensesMonth: 0,
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0, 
    start: function(){
        
        if(salaryAmount.value === ''){
            alert('error');
            return;
        }
        
        this.budget = +salaryAmount.value;
        
        this.getExpenses();
        this.getIncome();
        this.expensesMonth = this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();

        this.showResult();
    },
    showResult: function(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
    },
    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if(item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },
    addExpensesBlock: function(){
        
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            incomePlus.style.display = 'none';
        }
    },
    getIncome: function(){
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = cashIncome;
            }

            for(let key in appData.income){
                appData.incomeMonth += +appData.income[key];
            }
        });
    },
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function() {
        let sum = 0;
        let temp;
        
        for(let key in appData.expenses){
           sum += +appData.expenses[key];
        }
        
        return sum;
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget + (+appData.incomeMonth) - (+appData.getExpensesMonth());
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);

        return appData.budgetMonth;
    },
    getTargetMonth:  function(){
        return targetAmount.value / appData.budgetMonth;
    },
    getStatusIncome: function(){
        if(appData.budgetDay >= 1200){
            console.log('you have high level of income');
        } else if(appData.budgetDay < 1200 && appData.budgetDay >= 600){
            console.log('you have medium level of income');
        } else if(appData.budgetDay < 600){
            console.log('you have low level of income');
        } else if(thappDatais.budgetDay < 0){
            console.log('something went wrong');
        }
    },
    getInfoDeposit: function(){
        if(appData.deposit){
            do{
                appData.percentDeposit = prompt('Какой годовой процент депозита', '2');
            } while(!isNumber(appData.percentDeposit));
            
            do{
                appData.moneyDeposit = prompt('Какая сумма заложена?', '10000');
            } while(!isNumber(appData.moneyDeposit));
            
        }
    },
    updatePeriod: function(){
        periodAmount.innerHTML = periodSelect.value;
    },
    calcPeriod: function(){
        return appData.budgetMonth * periodSelect.value;
    },
};

start.addEventListener('click', appData.start.bind(appData));

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.updatePeriod);