// const BASE_URL =
//   "https://v6.exchangerate-api.com/v6/e45b1d3fae0c4993e08b2427/latest/USD";
const API_KEY = "e45b1d3fae0c4993e08b2427";

const dropdown = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

window.addEventListener("load", () => {
  updateExchangeRate();
});

for (let select of dropdown) {
  for (currCode in countryList) {
    let newOption = document.createElement("option"); //creating a new element
    newOption.innerText = currCode; //currency code ko options k andar convert kar rhe hai aur select mein add kar rhe hai
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected"; //If both conditions are true, this line sets the selected attribute of the newOption object to "selected"
    }

    if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target); //evt.target gives us where the change has occured
  });
}

//flag changes with the country code
//whenever the select changes flag gets updated

const updateFlag = (element) => {
  //in element we are getting select to get the img we need to go to its parent element
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

//now to get the exchange rates
//by clicking on the exchange rate button
button.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

const updateExchangeRate = async () => {
  //access the amount entered
  let amount = document.querySelector(".amount input");
  let amountVal = amount.value;
  //console.log(amountVal);
  if (amountVal === "" || amountVal < 1) {
    amountVal = 1;
    amount.value = "1";
  }

  const URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurr.value}`;
  let response = await fetch(URL);
  let data = await response.json();
  let exchangeRate = data.conversion_rates[toCurr.value];
  //console.log(exchangeRate);
  let finalAmount = (amountVal * exchangeRate).toFixed(2);
  console.log(finalAmount);
  msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};
