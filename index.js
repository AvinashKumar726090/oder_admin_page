const formInput = document.getElementById("userInputForm");
const list = document.getElementById("list");

formInput.addEventListener("submit", (e) => {
  e.preventDefault();
  const dishPrice = document.getElementById("price").value;
  const dishName = document.getElementById("dish").value;
  const dishTable = document.getElementById("table").value;

  const dish = {
    price: dishPrice,
    dish: dishName,
    table: dishTable,
  };

  addOrder(dish);
  formInput.reset();
});

function displayOrder(dish) {
  const tableHeading = document.createElement("h2");
  tableHeading.textContent = `${dish.table}`;
  tableHeading.style.fontSize = "16px";
  list.appendChild(tableHeading);

  const listItem = document.createElement("li");
  listItem.textContent = `${dish.price} - ${dish.dish} `;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete Order";
  deleteButton.addEventListener("click", () => {
    deleteOrder(dish);
    listItem.remove();
  });

  listItem.appendChild(deleteButton);
  tableHeading.appendChild(listItem);
}

function addOrder(dish) {
  axios
    .post(
      "https://crudcrud.com/api/860d11fdb0e84ea8bb12623efc6ea346/oderPageData",
      dish
    )
    .then((res) => {
      dish._id = res.data._id;
      displayOrder(dish);
    })
    .catch((error) => console.log(error));
}

function deleteOrder(dish) {
  axios
    .delete(
      `https://crudcrud.com/api/860d11fdb0e84ea8bb12623efc6ea346/oderPageData/${dish._id}`
    )
    .then((res) => console.log("User deleted"))
    .catch((error) => console.log(error));
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/860d11fdb0e84ea8bb12623efc6ea346/oderPageData"
    )
    .then((res) => {
      const dish = res.data;
      for (let i = 0; i < dish.length; i++) {
        displayOrder(dish[i]);
      }
    })
    .catch((error) => console.log(error));
});