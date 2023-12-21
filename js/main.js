// Declaring variables
var productsHolder = [];
var productName = document.getElementById("ProductName");
var ProductPrice = document.getElementById("ProductPrice");
var ProductCategory = document.getElementById("ProductCategory");
var ProductDesc = document.getElementById("ProductDesc");
var tableBodyData = document.getElementById("tableBody");
var modifyBtn = document.getElementById("addBtn");
var nameErr = document.getElementById("nameErr");
var priceErr = document.getElementById("priceErr");
var catErr = document.getElementById("catErr");
var descErr = document.getElementById("descErr");
var btnDelete;
var containerOfData;
var updatedIndex;
var savedProducts = "productsInfo";

//checking for data in local storage to display
if(localStorage.getItem(savedProducts)){
  productsHolder =JSON.parse(localStorage.getItem(savedProducts));
  displayProducts(productsHolder);
}

//function to add products in the products array and them to local storage
function addProduct(){
  if(modifyBtn.innerText=="Update"){
    var updatedProduct = {
      name: productName.value,
      price: ProductPrice.value,
      category: ProductCategory.value,
      desc: ProductDesc.value
    }
   if (productsHolder[updatedIndex].name === updatedProduct.name &&
      productsHolder[updatedIndex].price === updatedProduct.price &&
      productsHolder[updatedIndex].category === updatedProduct.category &&
      productsHolder[updatedIndex].desc === updatedProduct.desc
      ){
    alert("You didn't make any changes");
    return;
   }
   if(productNameValidation() && productPriceValidation() &&
        productCategoryValidation() && productDescValidation()){
    if(checkRedundancy(updatedProduct)){
      alert("this product is duplicated");
      return;
    }
 productsHolder[updatedIndex].name= productName.value;
 productsHolder[updatedIndex].price= ProductPrice.value; 
 productsHolder[updatedIndex].category= ProductCategory.value;
 productsHolder[updatedIndex].desc= ProductDesc.value;
 modifyBtn.innerText = "Add Product";
 modifyBtn.classList.replace('btn-warning', 'btn-info');
 btnDelete[updatedIndex].classList.remove("disabled");
  }else{
    alert("Please, Fill in the inputs correctly");
    return
  }
    }else{
    if(productNameValidation() && productPriceValidation() &&
        productCategoryValidation() && productDescValidation()){
    var product = {
      name: productName.value,
      price: ProductPrice.value,
      category: ProductCategory.value,
      desc: ProductDesc.value
  };
  if(checkRedundancy(product)){
    alert("this product is duplicated");
    return;
  }
  productsHolder.push(product);
}else{
  alert("Please, Fill in the inputs correctly");
  console.log("wrong credentials");
  return;
};
  }
  saveToLocalStorage(productsHolder);
  displayProducts(productsHolder);
  updateFormValues();
}

  //generic function to display products 
  function displayProducts(products, searchLetters) {
    if(products.length ==0){
tableBodyData.innerHTML=`
<tr class="d-table-row">
    <td class="d-table-cell" colspan="7">
      <div class="alert alert-danger">No Products!</div>
    </td>
  </tr>`
    }else{
    containerOfData = "";
for(var i=0; i< products.length ; i++){
    containerOfData+=`
<tr class="d-table-row">
<td class="d-table-cell">${i}</td>
    <td class="d-table-cell">${searchLetters? products[i].name.toLowerCase().replace(searchLetters.toLowerCase(), `<span class="text-warning fw-bolder">${searchLetters}</span>`): products[i].name}</td>
    <td class="d-table-cell">${products[i].price}</td>
    <td class="d-table-cell">${products[i].category}</td>
    <td class="d-table-cell">${products[i].desc}</td>
    <td class="d-table-cell">
      <button onclick="updateProduct(${i})"
        class="btn btn-outline-primary fw-semibold"
      >
        Update
      </button>
    </td>
    <td class="d-table-cell">
      <button onclick="deleteProduct(${i})"  
      id="deleteBtn"
        class="btn btn-outline-danger fw-semibold ToDelete"
      >
        Delete
      </button>
    </td>
  </tr>`;
}
tableBodyData.innerHTML=containerOfData;
  }
}

  //function to clear the input values
  function updateFormValues(mark){
    productName.value = mark? mark.name: "";
    ProductPrice.value = mark? mark.price: "";
    ProductCategory.value= mark? mark.category: "";
    ProductDesc.value= mark? mark.desc: "";
    }

  //function for deleting products
    function deleteProduct(index){
      productsHolder.splice(index, 1);
      saveToLocalStorage(productsHolder);
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
      displayProducts(searchedValues, keyword);
    };

//function to update a product
function updateProduct(index){ 
  updateFormValues(productsHolder[index]);
  modifyBtn.innerText = "Update";
  modifyBtn.classList.replace('btn-info', 'btn-warning');
  btnDelete= document.getElementsByClassName("ToDelete");
  btnDelete[index].classList.add("disabled");
  updatedIndex = index;
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

function saveToLocalStorage(savedItem){
  localStorage.setItem(savedProducts, JSON.stringify(savedItem));
}

function productNameValidation(){
  var regex = /^[A-Z][a-z]{3,8}$/
  if(regex.test(productName.value)){
    // productName.classList.replace("is-invalid", "is-valid");
    productName.classList.add("is-valid");
    productName.classList.remove("is-invalid");
    nameErr.classList.replace("d-block", "d-none");
    return true;
  }else{
    // productName.classList.replace("is-valid", "is-invalid");
    productName.classList.add("is-invalid");
    productName.classList.remove("is-valid");
    nameErr.classList.replace("d-none", "d-block");
    return false;
  }
};

function productPriceValidation(){
  var regex = /^(1\d{4}|[2-4]\d{4}|50000)$/
  if(regex.test(ProductPrice.value)){
    // ProductPrice.classList.replace("is-invalid", "is-valid");
    ProductPrice.classList.add("is-valid");
    ProductPrice.classList.remove("is-invalid");
    priceErr.classList.replace("d-block", "d-none");
    return true;
  }else{
    // ProductPrice.classList.replace("is-valid", "is-invalid");
    ProductPrice.classList.add("is-invalid");
    ProductPrice.classList.remove("is-valid");
    priceErr.classList.replace("d-none", "d-block");
    return false;
  }
}

function productCategoryValidation(){
  var regex = /^(mobile|laptop|pc|phone|tv)$/
  if(regex.test(ProductCategory.value)){
    // ProductCategory.classList.replace("is-invalid", "is-valid");
    ProductCategory.classList.add("is-valid");
    ProductCategory.classList.remove("is-invalid");
    catErr.classList.replace("d-block", "d-none");
    return true;
  }else{
    // ProductCategory.classList.replace("is-valid","is-invalid");
    ProductCategory.classList.add("is-invalid");
    ProductCategory.classList.remove("is-valid");
    catErr.classList.replace("d-none", "d-block");
    return false;
  }
}

function productDescValidation(){
  var regex = /^.{2,100}$/
  if(regex.test(ProductDesc.value)){
    // ProductDesc.classList.replace("is-invalid", "is-valid");
    ProductDesc.classList.add("is-valid");
    ProductDesc.classList.remove("is-invalid");
    descErr.classList.replace("d-block", "d-none");
    return true;
  }else{
    // ProductDesc.classList.replace("is-valid","is-invalid");
    ProductDesc.classList.add("is-invalid");
    ProductDesc.classList.remove("is-valid");
    descErr.classList.replace("d-none", "d-block");
    return false;
  }
}