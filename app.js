const btns = Array.from(document.querySelectorAll("button")); //convert to array
const billInput = document.getElementById("bill");
const customInput = document.getElementById("custom");
const numberOfPeopleInput = document.getElementById("people");
const tipDisplayElement = document.getElementById("tip-display");
const totalDispolayElement = document.getElementById("total-display");
const resetButton = btns.pop(); //removes last item and assigns to resetButton

console.log(tipDisplayElement);

// Utility function for currency formatting
const formatCurrency = (amount) => {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

class Tip {
  constructor(tipDisplayElement, totalDispolayElement) {
    this.tipDisplay = tipDisplayElement;
    this.totalDisplay = totalDispolayElement;
    this._totalBill = 0;
    this._numOfPeople = 0;
    this._tipPercentage = 0;
    this._tipPerPerson = 0;
    this._totalPerPerson = 0;
    this.reset();
  }

  reset() {
    this._totalBill = 0;
    this._numOfPeople = 0;
    this._tipPercentage = 0;
    this._tipPerPerson = 0;
    this._totalPerPerson = 0;
    billInput.value = "";
    customInput.value = "";
    numberOfPeopleInput.value = "";
    this.updateDisplay();
  }

  set totalBill(amount) {
    // Check if the amount is a valid positive number
    if (typeof amount !== "number" || amount <= 0) {
      return;
    }
    this._totalBill = amount;
    console.log(this._totalBill);
  }

  set numOfPeople(num) {
    // Check if the amount is a valid positive number
    if (!Number.isInteger(num) || num <= 0) {
      return;
    }
    this._numOfPeople = num;
    console.log(this._numOfPeople);
  }

  set tipPercentage(tip) {
    // Check if the amount is a valid positive number
    if (typeof tip !== "number" || tip < 0) {
      return;
    }
    this._tipPercentage = tip;
    console.log(this._tipPercentage);
  }

  calculate() {
    const bill = this._totalBill;
    const tipP = this._tipPercentage;
    const people = this._numOfPeople;

    const tip = (bill * tipP) / 100;
    const tipBill = tip + this._totalBill;
    this._totalPerPerson = tipBill / people;
    this._tipPerPerson = tip / people;

    this.updateDisplay();
  }

  updateDisplay() {
    if (isNaN(this._tipPerPerson) || !isFinite(this._tipPerPerson)) return;
    this.tipDisplay.innerText = formatCurrency(this._tipPerPerson);
    this.totalDisplay.innerText = formatCurrency(this._totalPerPerson);
  }
}
const app = new Tip(tipDisplayElement, totalDispolayElement);

function onReset() {
  app.reset();
}

function onChangeBill({ target }) {
  const total = +target.value;
  app.totalBill = total;
  app.calculate();
}
function onChangePeople({ target }) {
  const total = +target.value;
  app.numOfPeople = total;
  app.calculate();
}

function onChangeCustom({ target }) {
  const total = +target.value;
  app.tipPercentage = total;
  app.calculate();
}

function onClickTip({ target }) {
  const total = +target.innerText.slice(0, -1);
  app.tipPercentage = total;
  app.calculate();
}

billInput.addEventListener("input", onChangeBill);
numberOfPeopleInput.addEventListener("input", onChangePeople);
customInput.addEventListener("input", onChangeCustom);
resetButton.addEventListener("click", onReset);

btns.forEach((btn) => btn.addEventListener("click", onClickTip));
