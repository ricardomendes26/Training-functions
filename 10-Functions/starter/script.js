'use strict';
/* const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // numPassengers = numPassengers || 1;
  //price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
createBooking(`LH123`);
createBooking(`LH123`, 2, 800);
console.log(bookings); */

/* const flight = `LH123`;
const ricardo = {
  name: `Ricardo Mendes`,
  passport: `1234567`,
};

const checkIn = function (flightNum, passenger) {
  flightNum = `LH999`;
  passenger.name = `Mr.` + passenger.name;

  if (passenger.passport === `1234567`) {
    alert(`checked In`);
  } else {
    alert(`Wrong passport number`);
  }
};
/*checkIn(flight, ricardo);
console.log(flight);
console.log(ricardo); */
/*
const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000);
};

newPassport(ricardo);
checkIn(flight, ricardo); */

//higher order functions

const oneWord = function (str) {
  return str.replace(/ /g, ``).toLowerCase();
};
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(` `);
  return [first.toUpperCase(), ...others].join(` `);
};

// higher order function
const transformer = function (str, fn) {
  console.log(`Òriginal string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};
transformer(`Javascript is the best`, upperFirstWord);

// function returning another function
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet(`hey`);
greeterHey(`Ricardo`);
// it can also work like this:
greet(`Hello`)(`Jonas`);

// as an arrow function
const greet2 = greet => name => console.log(`${greet} ${name}`);

greet2(`SUP`)(`sHORTY`);

// The call and Apply method
const lufthansa = {
  airline: `Lufthansa`,
  iataCode: `LH`,
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};
lufthansa.book(239, `John Cena`);
console.log(lufthansa);

const eurowings = {
  airline: `Eurowings`,
  iataCode: `EW`,
  bookings: [],
};

const book = lufthansa.book;
// this next method does not work
// book(23, `Sarah Williams`);

// it only works with the CALL keyword
// the CALL method points out to what object the THIS keyword points to
book.call(eurowings, 23, `Sarah Williams`);
console.log(eurowings);

book.call(lufthansa, 239, `Sheila Mendes`);
console.log(lufthansa);

const swiss = {
  airline: `Swiss Air`,
  iataCode: `LX`,
  bookings: [],
};

book.call(swiss, 583, `Quica Mendes`);
console.log(swiss);

// Apply Method
const flightData = [583, `George Cooper`];

book.apply(swiss, flightData);
console.log(swiss);
//although the Apply mehtod is not used that much anymore due to the spread operagtor.
book.call(swiss, ...flightData);

// Bind method
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, `Steven Williamson`);
// we can also use bind and add arguments that were previosuly defined such as:
const bookEW23 = book.bind(eurowings, 23);
bookEW23(`Mr. Peter Parker`);

// bind with eventListeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  this.planes++;
  console.log(this);
  console.log(this.planes);
};
/* In this particular case, the THIS keyword refers to the element itself (because the THIS keyword is dynamic) which is the HTML button called .buy. In this case, we need to use the BIND method to specidy that the THIS keyword should point to the object Lufthansa instead of the ELement .buy. */
document
  .querySelector(`.buy`)
  .addEventListener(`click`, lufthansa.buyPlane.bind(lufthansa));

// Partial application with Bind
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
// this is the same as writting:
// const addVAT = value => value + value * 0.23;
console.log(addVAT(100));

// challenge

const addTax2 = function (rate) {
  return function addVAT2(value) {
    return value + value * rate;
  };
};
const addVAT2 = addTax2(0.23);
console.log(addVAT2(100));

// CODING CHALLENGE

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer = Number(
      prompt(
        ` ${this.question}\n${this.options[0]}\n${this.options[1]}\n${this.options[2]}\n${this.options[3]}\n(Write option number)`
      )
    );
    console.log(answer);
    // register the answer
    // check if it´s number
    typeof answer === `number` &&
      answer < this.answers.length &&
      this.answers[answer]++;

    this.displayResults();
    this.displayResults(`string`);
  },
  displayResults(type = `array`) {
    if (type === `array`) {
      console.log(this.answers);
    } else if (type === `string`) {
      console.log(`Poll results are: ${this.answers.join(`, `)}`);
    }
  },
};
// poll.registerNewAnswer();

document
  .querySelector(`.poll`)
  .addEventListener(`click`, poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, `string`);
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, `string`);

// Data 1: [5, 2, 3]
// Data 2: [1, 5, 3, 9, 6, 1]

// Immediately InvOked Functions expressions (IIFE)
(function () {
  console.log(`This will only run again`);
})();

// IIFE As an arrow function
(() => console.log(`This will only run again`))();

// closures
const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};
const booker = secureBooking();
booker();
booker();
booker();
// console.dir let´s us inspect the closure of a expression
// console.dir(booker);

// example 1
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};
g();
f();

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);
/* at this point, f has still the value of a. Only after calling h, f gets the value of b instead of a */
h();
f();
console.dir(f);

// Example2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);
  console.log(`Will start boarding in ${wait} seconds`);
};
boardPassengers(180, 3);

// coding challenge 2
(function () {
  const header = document.querySelector(`h1`);
  header.style.color = `red`;

  document.querySelector(`body`).addEventListener(`click`, function () {
    header.style.color = `blue`;
  });
})();
