// ************  call inputs by id  ********************* /
let title = document.getElementById("title");
let price = document.getElementById("price");
let tax = document.getElementById("tax");
let ads = document.getElementById("ads");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let search = document.getElementById("search");
let srcTit = document.getElementById("srcTit");
let srcCat = document.getElementById("srcCat");
let update = document.getElementById("update");
let Delete = document.getElementById("Delete");
let dele = document.getElementById("del");
let dataArr;
let temp;
let User = "create";
let UserSearch = "";
let TableData = document.getElementById("table_Body");

if (localStorage.length > 0) {
  dataArr = JSON.parse(localStorage.Products);
} else {
  dataArr = [];
}

//----------------------- main button Create
create.onclick = function () {
  let NewProduct = {
    name: title.value,
    price: price.value,
    taxes: tax.value,
    ads: ads.value,
    total: total.innerHTML,
    count: count.value,
    catg: category.value,
  };
  if (
    title.value != "" &&
    price.value != "" &&
    price.value > 0 &&
    category.value != ""
  ) {
    if (User === "create") {
      dataArr.push(NewProduct);
      Swal.fire({
        icon: "success",
        title: "Success",
        background: "#212121",
        html: "<span style='color:black; font-size:30px;'>Successful operation</span>",
      });
      ClearAll();
    } else if (User === "update") {
      dataArr[temp] = NewProduct;
      create.innerHTML = `  <span class="btn-text-one">Create</span>
              <span class="btn-text-two">New Product</span>`;
      Swal.fire({
        icon: "success",
        title: "Success",
        background: "#212121",
        html: "<span style='color:white; font-size:30px;'>Your Product updated well!</span>",
      });
      ClearAll();
      User = "create";
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "oOps",
      html: "<span style='color:white; font-size:30px;'>You must write a valid values!</span>",
      background: "#212121",
    });
  }
  localStorage.Products = JSON.stringify(dataArr);

  ShowData();
};

ShowData();
//---------------- get total values
function getTotal() {
  if (+price.value != 0) {
    total.innerHTML = +price.value + +ads.value + +tax.value;
  } else {
    total.innerHTML = " ";
  }
}
//---------------- function for clear inpus after create
function ClearAll() {
  title.value = "";
  price.value = "";
  tax.value = "";
  ads.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
//-------------------- show Data from storage to table

function ShowData() {
  TableData.innerHTML = " ";
  for (let i = 0; i < dataArr.length; i++) {
    TableData.innerHTML += `
      <tr class="flex flex-column flex-lg-row align-items-center justify-content-center">
      <td>${i + 1}</td>
      <td>${dataArr[i].name}</td>
      <td>${dataArr[i].count}</td>
      <td>${dataArr[i].catg}</td>
      <td>${dataArr[i].price}</td>
      <td>${dataArr[i].taxes}</td>
      <td>${dataArr[i].ads}</td>
      <td>${dataArr[i].total}</td>
     <td><button id="update" onclick="UpdateBtn(${i})" >Update<i class="fa-solid fa-wand-magic-sparkles"></i></button> </td>
      <td><button id="Delete" onclick="DeletBTn(${i})">Delete<i class="fa-solid fa-circle-xmark"></i></button></td>
      </tr>`;
  }
  //----------- delete button for  all products
  if (dataArr.length > 0) {
    dele.innerHTML = `<button id="DeleteAll" onclick="deleteAllData()"> Delete All Products (${dataArr.length}) </button> `;
  } else {
    dele.innerHTML = "";
  }
}
//-------------- delete button

function DeletBTn(x) {
  Swal.fire({
    title: "Are you sure you want to Delete this item?",
    html: "<p style='color:white;font-size:20px;text-align:center;'>You won't be able to revert this!</p>",
    icon: "warning",
    background: "#212121",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      dataArr.splice(x, 1);
      localStorage.Products = JSON.stringify(dataArr);
      ShowData();
      Swal.fire({
        icon: "success",
        title: "Success",
        html: "<p style='color:black; font-size:20px;text-align:center'>Your file has been deleted.</p>",
        background: "#212121",
      });
    }
  });
}
//--------------update button
function UpdateBtn(y) {
  title.value = dataArr[y].name;
  price.value = dataArr[y].price;
  ads.value = dataArr[y].ads;
  tax.value = dataArr[y].taxes;
  count.value = dataArr[y].count;
  category.value = dataArr[y].catg;
  total.innerHTML = dataArr[y].total;
  create.innerHTML = "U P D A T E";
  temp = y;
  User = "update";
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
}

//------------ delete all Data

function deleteAllData() {
  Swal.fire({
    title: "Are you sure you want to Delete all?",
    text: "You won't be able to revert this!",
    icon: "warning",
    background: "#212121",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete All!",
  }).then((result) => {
    if (result.isConfirmed) {
      dataArr.splice(0);
      localStorage.clear();
      ShowData();
      Swal.fire({
        icon: "success",
        title: "Success",
        html: "<p style='color:black; font-size:20px;text-align:center'>Your file has been deleted.</p>",
        background: "#212121",
      });
    }
  });
}

//-------------- search function
// search by title **
srcTit.onclick = function () {
  search.placeholder = "Search by Product Name ";
  search.onkeyup = function () {
    if (search.value != "") {
      TableData.innerHTML = "";
      for (let i = 0; i < dataArr.length; i++) {
        if (dataArr[i].name.includes(search.value)) {
          TableData.innerHTML += `
      <tr class="flex flex-column flex-lg-row align-items-center justify-content-center">
      <td>${i + 1}</td>
      <td>${dataArr[i].name}</td>
      <td>${dataArr[i].count}</td>
      <td>${dataArr[i].catg}</td>
      <td>${dataArr[i].price}</td>
      <td>${dataArr[i].taxes}</td>
      <td>${dataArr[i].ads}</td>
      <td>${dataArr[i].total}</td>
     <td><button id="update" onclick="UpdateBtn(${i})" >Update<i class="fa-solid fa-wand-magic-sparkles"></i></button> </td>
      <td><button id="Delete" onclick="DeletBTn(${i})">Delete<i class="fa-solid fa-circle-xmark"></i></button></td>
      </tr>`;
        }
      }
    } else {
      ShowData();
    }
  };
};
// search by category **
srcCat.onclick = function () {
  search.placeholder = "Search by Category ";
  UserSearch = "category";
  search.onkeyup = function () {
    if (search.value != "") {
      TableData.innerHTML = "";
      for (let i = 0; i < dataArr.length; i++) {
        if (dataArr[i].catg.includes(search.value)) {
          TableData.innerHTML += `
      <tr class="flex flex-column flex-lg-row align-items-center justify-content-center">
      <td>${i + 1}</td>
      <td>${dataArr[i].name}</td>
      <td>${dataArr[i].count}</td>
      <td>${dataArr[i].catg}</td>
      <td>${dataArr[i].price}</td>
      <td>${dataArr[i].taxes}</td>
      <td>${dataArr[i].ads}</td>
     <td>${dataArr[i].total}</td>
     <td><button id="update" onclick="UpdateBtn(${i})" >Update<i class="fa-solid fa-wand-magic-sparkles"></i></button> </td>
      <td><button id="Delete" onclick="DeletBTn(${i})">Delete<i class="fa-solid fa-circle-xmark"></i></button></td>
      </tr>`;
        }
      }
    } else {
      ShowData();
    }
  };
};

//------------ scroll button for window
let scrolll = document.getElementById("Scroll");
window.onscroll = function () {
  if (scrollY > 100) {
    scrolll.classList.remove("hide");
  } else {
    scrolll.classList.add("hide");
  }
};
scrolll.onclick = function () {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
};
