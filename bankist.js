const inputuser = document.querySelector('.login__input--user');
const inputpin = document.querySelector('.login__input--pin');
const loginbtn = document.querySelector('.login__btn');
const loggedinUI = document.querySelector('.app');
const loggedoutUI = document.querySelector('nav');
const welcome = document.querySelector('.welcome');
const transferbtn = document.querySelector('.form__btn--transfer');
const loanbtn = document.querySelector('.form__btn--loan');
const move = document.querySelector('.movements');
const balance = document.querySelector('.balance__value');
const depo = document.querySelector('.summary__value--in');
const withd = document.querySelector('.summary__value--out');
const intr = document.querySelector('.summary__value--interest');
const to = document.querySelector('.form__input--to');
const trnsframount = document.querySelector('.form__input--amount');
const loanamt = document.querySelector('.form__input--loan-amount');
const sortbtn = document.querySelector('.btn--sort');
const row = document.querySelector('.movements__row');
const asof = document.querySelector('.date');
const timersec = document.querySelector('.timer');
const logout = document.querySelector('.form__btn--close');
const logoutuser = document.querySelector('.form__input--user');
const logoutpin = document.querySelector('.form__input--pin');
let totbalance;
const movement = [200, 450, -400, 3000, -650, -130, 70, 1300];
let len = movement.length + 1;
let withdra = 0;
let dep = 0;
let x = 0;
const interest = 10;
const options = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  weekday: 'long',
};

//Logged IN
loginbtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (inputuser.value === 'rr' && Number(inputpin.value) === 1111) {
    loggedinUI.style.opacity = 1;
    welcome.textContent = 'Welcome Back Rishabh!';
    inputuser.value = '';
    inputpin.value = '';
    trans(movement);
    const totamount = amount(movement);
    console.log(totamount);
    balance.textContent = UK(totamount) + '₹';
    console.log(add(movement));
    depo.textContent = UK(add(movement)[0]) + '₹';
    withd.textContent = UK(add(movement)[1]) + '₹';
    intr.textContent = UK(calcinterest(totamount)) + '₹';
    asof.innerHTML = '';
    nowdate();
    timeer();
  }
});

//Transactions
function trans(arr) {
  arr.forEach((mov, ind) => {
    if (mov > 0) {
      const html = ` <div class="movements__row">
    <div class="movements__type movements__type--deposit">${
      ind + 1
    } deposit</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${UK(mov)}₹</div>
  </div>`;
      move.insertAdjacentHTML('afterbegin', html);
    } else {
      const html = ` <div class="movements__row">
    <div class="movements__type movements__type--withdrawal">${
      ind + 1
    } withdrawal</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${UK(mov)}₹</div>
  </div>`;
      move.insertAdjacentHTML('afterbegin', html);
    }
  });
}

//Total Amount
function amount(arr) {
  totbalance = arr.reduce((acc, cur) => acc + cur, 0);
  return totbalance;
}

//Deposits & Withdrawal

function add(arr) {
  let deposum = 0;
  let withsum = 0;
  for (item of arr) {
    if (item > 0) deposum = deposum + item;
    else withsum = withsum + item;
  }
  withdra = withsum;
  dep = deposum;
  return [deposum, withsum];
}

//UK Number Format
function UK(num) {
  return String(new Intl.NumberFormat('en-UK').format(num));
}

//Interest
function calcinterest(total) {
  /*const html = ` <div class="movements__row">
  <div class="movements__type movements__type--deposit">${len} deposit</div>
  <div class="movements__date">today</div>
  <div class="movements__value">${UK((total * interest) / 100)}₹</div>
</div>`;
  move.insertAdjacentHTML('afterbegin', html);
  len = len + 1;*/
  return String((total * interest) / 100);
}

//Transfer
function transfer(amt) {
  const html = `<div class="movements__row">
  <div class="movements__type movements__type--withdrawal">${len} withdrawal</div>
  <div class="movements__date">today</div>
  <div class="movements__value">${UK(amt)}₹</div>
</div>`;
  move.insertAdjacentHTML('afterbegin', html);
  len = len + 1;
}

//Transfer Button
transferbtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (to.value === '2222') {
    transfer(Number(trnsframount.value));
    totbalance = totbalance - Number(trnsframount.value);
    //console.log(withdra, Number(trnsframount.value));
    withdra = withdra - Number(trnsframount.value);
    //console.log(withdra);
    balance.textContent = UK(totbalance) + '₹';
    withd.textContent = UK(withdra) + '₹';
    trnsframount.value = '';
    to.value = '';
  } else alert('Account doesnt exist !');
});

//LOAN
function calcloan(amt) {
  const deposits = movement.filter(mov => mov > 0);
  let z = 0;
  for (item of deposits) {
    if (amt > 0 && item > 0.1 * amt) z = z + 1;
  }
  if (z != 0) {
    const html = ` <div class="movements__row">
    <div class="movements__type movements__type--deposit">${len} deposit</div>
    <div class="movements__date">today</div>
    <div class="movements__value">${UK(amt)}₹</div>
  </div>`;
    move.insertAdjacentHTML('afterbegin', html);
    totbalance = totbalance + Number(loanamt.value);
    dep = dep + Number(loanamt.value);
    balance.textContent = UK(totbalance) + '₹';
    depo.textContent = UK(dep) + '₹';
    len = len + 1;
  } else alert(' Sorry !Cant grant this much LOAN !');
}

//LOAN Button
loanbtn.addEventListener('click', function (e) {
  e.preventDefault();
  calcloan(loanamt.value);
  loanamt.value = '';
});

//Sorting
function arrsort(arr) {
  arr.sort((a, b) => a - b);
  return arr;
}

//sort button
let sorted = false;
sortbtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (!sorted) {
    move.innerHTML = '';
    //console.log(arrsort(movement));
    trans(arrsort(movement));
    sorted = true;
  } else {
    move.innerHTML = '';
    trans(movement);
  }
});

//Date
const now = new Date();
function nowdate() {
  const html = `${new Intl.DateTimeFormat('en-UK', options).format(now)}`;
  console.log(new Intl.DateTimeFormat('en-UK', options).format(now));
  asof.innerHTML = html;
}


//Timer
function timeer() {
  var after = Date.now() + 1000 * 60 * 5;
  var x = setInterval(function () {
    var now = Date.now();
    var dist = after - now;
    var min = Math.floor(dist / (1000 * 60));
    var sec = Math.floor((dist % (1000 * 60)) / 1000);
    timersec.innerHTML = `${min}:${sec}`;

    if (dist < 0) {
      clearInterval(x);
      loggedinUI.style.opacity = 0;
    }
  }, 1000);
}

// Log out

logout.addEventListener('click', function (e) {
  e.preventDefault();
  if (logoutuser.value === 'rr' && Number(logoutpin.value) === 1111) {
    loggedinUI.style.opacity = 0;
    logoutuser.value = '';
    logoutpin.value = '';
    clearInterval(x);
  } else alert('Invalid Input');
});
