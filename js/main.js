// Declaring variables
var productsHolder = [];
var productName = document.getElementById("ProductName");
var ProductPrice = document.getElementById("ProductPrice");
var ProductCategory = document.getElementById("ProductCategory");
var ProductDesc = document.getElementById("ProductDesc");
var tableBodyData = document.getElementById("tableBody");
var containerOfData;
var modifyBtn = document.getElementById("addBtn");

//checking for data in local storage to display
if(localStorage.getItem("productsInfo")){
  productsHolder =JSON.parse(localStorage.getItem("productsInfo"));
  displayProducts(productsHolder);
}

//function to add products in the products array and them to local storage
function addProduct(){
    var product = {
        name: productName.value,
        price: ProductPrice.value,
        category: ProductCategory.value,
        desc: ProductDesc.value
    };
    modifyBtn.innerText = "Add Product";
    modifyBtn.classList.replace('btn-warning', 'btn-info');
    if(checkRedundancy(product)){
      return;
    }
    productsHolder.push(product);
  localStorage.setItem("productsInfo", JSON.stringify(productsHolder));
  displayProducts(productsHolder);
  clearForm();
}

  //generic function to display products 
  function displayProducts(products) {
    containerOfData = "";
for(var i=0; i< products.length ; i++){
    containerOfData+=`
<tr class="d-table-row">
<td class="d-table-cell">${i}</td>
    <td class="d-table-cell">${products[i].name}</td>
    <td class="d-table-cell">${products[i].price}</td>
    <td class="d-table-cell">${products[i].category}</td>
    <td class="d-table-cell">${products[i].desc}</td>
    <td class="d-table-cell">
      <button onclick="updateProduct(${i})" id="updateBtn"
        class="btn btn-outline-primary fw-semibold"
      >
        Update
      </button>
    </td>
    <td class="d-table-cell">
      <button onclick="deleteProduct(${i})"
        class="btn btn-outline-danger fw-semibold"
      >
        Delete
      </button>
    </td>
  </tr>`;
}
tableBodyData.innerHTML=containerOfData;
  }

  //function to clear the input values
  function clearForm(){
    productName.value = "";
    ProductPrice.value = "";
    ProductCategory.value= "";
    ProductDesc.value= "";
    }

  //function for deleting products
    function deleteProduct(index){
      productsHolder.splice(index, 1);
      localStorage.setItem("productsInfo", JSON.stringify(productsHolder));
      displayProducts(productsHolder);
    }

  //function for realTime search and displays the result 
    function searchProducts(keyword){
      var searchedValues= [];
      for(var i=0 ; i<productsHolder.length ; i++){
        if(productsHolder[i].name.toLowerCase().includes(keyword.toLowerCase())=== true){
          searchedValues.push(productsHolder[i]);
        };
      };
      displayProducts(searchedValues);
    };

//function to update a product
function updateProduct(index){
  productName.value = productsHolder[index].name;
  ProductPrice.value =  productsHolder[index].price;
  ProductCategory.value = productsHolder[index].category;
  ProductDesc.value = productsHolder[index].desc;
  modifyBtn.innerText = "Update";
  modifyBtn.classList.replace('btn-info', 'btn-warning');
  deleteProduct(index);
};

//function to check repeated products
function checkRedundancy(product){
  for(var i=0 ; i<productsHolder.length ; i++){
      if( productsHolder[i].name ===product.name &&
          productsHolder[i].price ===product.price &&
          productsHolder[i].category ===product.category &&
          productsHolder[i].desc ===product.desc
        ){
          return true;
      }
    }
}