'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790,  8500, -300],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
const accountVide = {
  movements : [0]
}

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');


const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);


 
// const Html =  '';
// containerMovements.insertAdjacentElement('beforeend',Html)
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

containerMovements.innerHTML = ''

function display (movementsTable){ 
  movementsTable.forEach((mov) => {
   const type = mov > 0 ? 'deposit' : 'withdrawal'
   const html1 = `<div class="movements__row">
   <div class="movements__type movements__type--${type}">2 ${type}</div>
   <div class="movements__date">3 days ago</div>
   <div class="movements__value">${mov}.00€</div>
 </div>`
 containerMovements.insertAdjacentHTML('beforeend' ,html1)
  })};

        // display(movements )


  function caclDisplaySummary (movementsTable){
    let incomes = 0 ; 
    movementsTable.forEach((mov) =>  mov > 0 ? incomes += mov  : incomes += 0)
     labelSumIn.textContent = `${incomes}.00€` ;
     
     let outcomes = 0 
     movementsTable.forEach((mov) => { mov < 0 ? outcomes += mov  : outcomes += 0})
      labelSumOut.textContent =`${outcomes *(-1)}.00€`  ;
      
  }

    // caclDisplaySummary(movements) 


  function caclBalance (acc){
     let balance =  acc.movements.reduce((acc,curr) => acc+curr);
     labelBalance.textContent = `${balance}.00€` ;
     acc.balance = balance ;
     
  } 
  

  function createUsernames (accounts){
    accounts.forEach(acc =>
      acc.username = acc.owner.toLowerCase().split(" ").map((str) => str[0]).join(''))
  }
 createUsernames(accounts)
 
 let currentAccount

// log in 
function updateUi (acount){
  display(acount.movements) ;
  caclBalance(acount);
  caclDisplaySummary(acount.movements)
}
const errorPin = document.querySelector('.h4'); 
 btnLogin.addEventListener('click', function(e){
e.preventDefault();
  let pin = inputLoginPin.value ;
  let user =  inputLoginUsername.value
  const verifAccount = accounts.find((acc) => acc.pin == pin && acc.username == user  )
   
   currentAccount = verifAccount
   inputLoginUsername.value = inputLoginPin.value = "";
   if (currentAccount == undefined ) {
    errorPin.textContent = 'error in Pin or Username'
     return ;
   }   
   errorPin.textContent = ''
   labelWelcome.textContent = `welcom back ${currentAccount.owner.split(' ')[0]}`
   document.querySelector(".app").style.opacity = 1
   updateUi (verifAccount) 
  
 })

// transfere mony 

 btnTransfer.addEventListener("click", function (e){
   e.preventDefault()
  const fromUser = inputTransferTo.value
  const  amount = inputTransferAmount.value
  inputTransferTo.value = inputTransferAmount.value = ""
  const transferVerif = accounts.find((acc) => acc.username == fromUser )
  if (transferVerif == undefined ) {
    return ;
  }
  if (amount >= currentAccount.balance ) 
    return ;
containerMovements.innerHTML = ''
labelBalance.textContent = ''
 
const int = parseInt(amount)
currentAccount.movements.unshift(-int);
// Add it to transferAccount's movement table
transferVerif.movements.unshift(int)
 
updateUi(currentAccount)  
})


 // to  close your profile
 btnClose.addEventListener('click', function(e){
   e.preventDefault()
    const pinClose = inputClosePin.value 
     
    const userClose = inputCloseUsername.value
   
    if (pinClose == currentAccount.pin && userClose == currentAccount.username) {
      console.log(accounts);
        const index = accounts.indexOf(currentAccount);
          accounts.splice(index,1)
          console.log(accounts);
          document.querySelector(".app").style.opacity = 0
    }; 
    inputClosePin.value = ''
    inputCloseUsername.value= ''
 })

 btnLoan.addEventListener('click', function(e){
   e.preventDefault()
   const intrg = inputLoanAmount.value ; 
   inputLoanAmount.value = ''
   const loan = parseInt(intrg); 
   containerMovements.innerHTML = ''
   labelBalance.textContent = ''
   currentAccount.movements.unshift(loan)
   updateUi(currentAccount)
   
 })

  // to back a your profile
 btnSort.addEventListener('click',function (){

  document.querySelector(".app").style.opacity = 0
  updateUi(accountVide)
  containerMovements.innerHTML = ''
  labelWelcome.textContent = 'Log in to get started';
 })
const labelSummry = document.querySelector('summary__label')
const darkMode = document.querySelector('.dark-mode');
const body = document.querySelector('body')
const labelTim = document.querySelector('logout-timer')
const label1 = document.querySelector('balance__label')

darkMode.onclick = function(){
  body.classList.toggle('bodyD')
  labelWelcome.classList.toggle('welcomeD');
  labelWelcome.classList.toggle('welcome');
  btnLogin.classList.toggle('login__btnD')
  btnLogin.classList.toggle('login__btn')
  labelBalance.classList.toggle('balance__value')
  labelBalance.classList.toggle('balance__valueD')
   labelTimer.classList.toggle('timerD')
  labelTimer.classList.toggle('timer')
  labelDate.classList.toggle('balance__date')
  labelDate.classList.toggle('balance__dateD')
  btnSort.classList.toggle('btn--sort')
  btnSort.classList.toggle('btn--sortD') 
  console.log('her');
}
