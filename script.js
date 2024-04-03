let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];
let currencyUnit = [
  ["PENNY", 0.01],
  ["NICKEL", 0.05],
  ["DIME", 0.1],
  ["QUARTER", 0.25],
  ["ONE", 1],
  ["FIVE", 5],
  ["TEN", 10],
  ["TWENTY", 20],
  ["ONE HUNDRED", 100],
];

let names = [
  "Pennies",
  "Nickels",
  "Dimes",
  "Quarters",
  "Ones",
  "Fives",
  "Tens",
  "Twenties",
  "Hundreds",
];
const showChangeDue = document.getElementById("change-due");
const cashValue = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const showDescription = document.getElementById("description");

const showDescriptionPrice = () => {
  showDescription.innerHTML = `<h2 class="description__name-title">Change in drawer</h2>`;
  names.forEach((item, index) => {
    showDescription.innerHTML += `
    <p class="description__name">${item}</p> <p class="description__price">$ ${Number(
      cid[index][1].toFixed(2)
    )}</p>`;
  });
};
showDescriptionPrice();

const updateChangeDue = (arr) => {
  let suma = 0;
  for (let i = 0; i < arr.length; i++) {
    showChangeDue.innerHTML += `<p class="change-due-name">${arr[i][0]}: </p> <p class="change-due-price">$${arr[i][1]}</p>`;
  }
  for (let i = 0; i < cid.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (cid[i][0] === arr[j][0]) {
        cid[i][1] -= arr[j][1];
        console.log("tipo", typeof cid[i][1]);
      }
    }
    suma += cid[i][1];
  }
  console.log("SUMA", suma);
  if (suma <= 0) {
    showChangeDue.innerHTML = `<h3 class="change-due-title">Status: CLOSED</h3>`;
    for (let i = 0; i < arr.length; i++) {
      showChangeDue.innerHTML += `<p class="change-due-name">${arr[i][0]}:</p> <p class="change-due-price">$ ${arr[i][1]}</p>`;
    }
  }
  showDescriptionPrice();
};

const calculateChange = (diffCashPrice) => {
  let changeArr = [];
  for (let i = cid.length - 1; i >= 0; i--) {
    let valorActualNombre = cid[i][0];
    let valorActualTotalEnCid = cid[i][1];
    let valorActual = currencyUnit[i][1];
    let cantidadActual = Number(
      (valorActualTotalEnCid / valorActual).toFixed(0)
    );
    let cambio = 0;
    while (diffCashPrice >= valorActual && cantidadActual > 0) {
      diffCashPrice -= valorActual;
      diffCashPrice = Number(diffCashPrice.toFixed(2));
      cantidadActual--;
      cambio++;
    }
    if (cambio > 0) {
      changeArr.push([valorActualNombre, cambio * valorActual]);
    }
  }

  updateChangeDue(changeArr);
};
const cidOpen = (diffCashPrice) => {
  console.log("CID OPEN igual");

  showChangeDue.innerHTML = `<h3 class="change-due-title">Status: OPEN</h3>`;
  calculateChange(diffCashPrice);
};

const changeDueFunc = (valorCash) => {
  cashValue.value = "";
  let suma = 0;
  let diffCashPrice = Number((valorCash - price).toFixed(2));
  for (let i = 0; i < cid.length; i++) {
    suma += cid[i][1];
  }
  let totalCid = Number(suma.toFixed(2));
  console.log(totalCid, valorCash, totalCid - valorCash);
  if (valorCash < price) {
    //No te alcanza
    alert("Customer does not have enough money to purchase the item");
  } else if (valorCash === price) {
    // No hay cambio que devolver
    showChangeDue.innerHTML = `<h3 class="change-due-title">No change due - customer paid with exact cash</h3>`;
  } else if (totalCid === diffCashPrice) {
    // lo que hay en la caja es IGUAL al cambio a devolver
    cidOpen(diffCashPrice);
  } else if (totalCid < diffCashPrice) {
    showChangeDue.innerHTML = `<h3 class="change-due-title">Status: INSUFFICIENT_FUNDS</h3>`;
  } else {
    cidOpen(diffCashPrice);
  }
};

purchaseBtn.addEventListener("click", () => {
  let cashValor = Number(cashValue.value);
  changeDueFunc(cashValor);
});
