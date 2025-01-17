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
    this.billInput = billInput;
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
    numberOfPeopleInput.value = "";
    this.updateDisplay();
  }

  set totalBill(amount) {
    // Check if the amount is a valid positive number
    typeof amount === "number" && amount > 0 ? (this._totalBill = amount) : (this._totalBill = "");
  }

  set numOfPeople(num) {
    typeof num === "number" && num > 0 ? (this._numOfPeople = num) : new Error("Must be number greater than 0");
    console.log(this._numOfPeople);
  }

  set tipPercentage(tip) {
    typeof tip === "number" && tip > 0 ? (this._tipPercentage = tip) : (this._tipPercentage = 0);
    console.log(this._tipPercentage);
  }

  calculate() {
    if (this._totalBill && this._numOfPeople && this._tipPercentage) {
      const tip = (this._totalBill * this._tipPercentage) / 100;

      console.log(tip);

      this._tipPerPerson = tip / this._numOfPeople;

      this._totalPerPerson = this._totalBill / this._numOfPeople;
      this.updateDisplay();
    }
    return;
  }

  updateDisplay() {
    this.tipDisplay.innerText = formatCurrency(this._tipPerPerson);
    this.totalDisplay.innerText = formatCurrency(this._totalPerPerson);
  }
}
const app = new Tip(tipDisplayElement, totalDispolayElement);

function onChangeBill(e) {
  const amount = +e.target.value;
  app.totalBill = amount;
  app.calculate();
}

function onChangePeople(e) {
  const people = +e.target.value;
  app.numOfPeople = people;
  app.calculate();
}

function onChangeCustom(e) {
  const tipPercent = +e.target.value;
  app.tipPercentage = tipPercent;
}

function onClickTip(e) {
  const tipPercent = +e.target.innerHTML.slice(0, -1);
  app.tipPercentage = tipPercent;
}

function onReset() {
  app.reset();
}

billInput.addEventListener("input", onChangeBill);
numberOfPeopleInput.addEventListener("input", onChangePeople);
customInput.addEventListener("input", onChangeCustom);
resetButton.addEventListener("click", onReset);

btns.forEach((btn) => btn.addEventListener("click", onClickTip));
