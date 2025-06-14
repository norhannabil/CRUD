var productName = document.getElementById("ProductName");
var productPrice = document.getElementById("ProductPrice");
var productType = document.getElementById("ProductType");
var productDesc = document.getElementById("ProductDesc");
var addButton = document.getElementById('addButton');
var tableBody = document.getElementById('tableBody');
var searchInput = document.getElementById("searchInput");
var addButton = document.getElementById('addButton');
var updateButton = document.getElementById('updateButton');
var nameError = document.getElementById('nameError');
var priceError = document.getElementById('priceError');
var typeError = document.getElementById('typeError');
var descError = document.getElementById('descError');





/*-------------------------t*/
var productList = []
var currentIndex=null
if(localStorage.getItem('products') != null) {
  productList = JSON.parse(localStorage.getItem('products'))
  display();
  
}

/*start addproduct*/
function addProduct() {
    if (validationName()&& validationPrice()&& validationType()&& validationDesc()) {
var product = {
    name: productName.value,
    price: productPrice.value,
    type: productType.value,
    desc: productDesc.value,
};
   
productList.push(product);
  localStorage.setItem('products', JSON.stringify(productList));
 
    
   clearForm();
     display();
    
}else{
         // alert("من فضلك تأكد من ملء كل الحقول بشكل صحيح ✅");
var myModal = new bootstrap.Modal(document.getElementById('validationModal'));
        myModal.show();
}
 
}
/* end addproduct*/
/*start clearfooooooooorm*/
function clearForm() {
    productName.value='';
    productPrice.value='';
    productType.value='';
    productDesc.value='';



     productName.classList.remove("is-valid", "is-invalid");
    productPrice.classList.remove("is-valid", "is-invalid");
    productType.classList.remove("is-valid", "is-invalid");
    productDesc.classList.remove("is-valid", "is-invalid");

    // إخفاء رسائل الخطأ لو ظاهرة
    nameError.classList.add("d-none");
    priceError.classList.add("d-none");
    typeError.classList.add("d-none");
    descError.classList.add("d-none");

}
/*end clearfooooooooorm*/
/*start displaaay*/
function display() {  
  var cartona = '';
  for (var i = 0; i < productList.length; i++){
    cartona += `  <tr>
                    <th scope="row">${i + 1}</th>
                    <td>${productList[i].name}</td>
                    <td>${productList[i].price}</td>
                    <td>${productList[i].type}</td>
                    <td>${productList[i].desc}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
                        <button class="btn btn-warning"  onclick="editProduct(${i})" >Edit</button>
                    </td>
                  </tr>`;
  }
  tableBody.innerHTML=cartona;
}
/*end displaaay*/
/*start deletttttttttttttt*/
function deleteProduct(index) {
  productList.splice(index, 1)
  localStorage.setItem("products", JSON.stringify(productList));

display();
  
}
/*end deletttttttttttttt*/
/*start searchhhhhhhhhhhhhh*/
function searchProduct() {
  var text = searchInput.value.toLowerCase();
  var cartona = '';
   var term='';
  for (var i = 0; i < productList.length; i++){
    term=productList[i].name.toLowerCase()
    if(term.includes(text)){
      cartona += ` <tr>
                    <th scope="row">${i + 1}</th>
                    <td>${productList[i].name}</td>
                    <td>${productList[i].price}</td>
                    <td>${productList[i].type}</td>
                    <td>${productList[i].desc}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
                        <button class="btn btn-warning">Edit</button>
                    </td>
                  </tr>`;
                 
    }
  
    
  }
tableBody.innerHTML=cartona;

  
}
/*end searchhhhhhhhhhhhhh*/
/*start updaaaaaaaaaaaaaaaaaaat*/
function updateProduct(){
var product = {
    name : productName.value,
    price : productPrice.value,
    type : productType.value,
    desc : productDesc.value,
}
      
  productList.splice(currentIndex, 1, product )
 localStorage.setItem("products", JSON.stringify(productList));
  display();
  currentIndex = null;
    addButton.classList.replace("d-none", "d-block");
    updateButton.classList.replace("d-block", "d-none");
    clearForm() 
  
}
/*end updaaaaaaaaaaaaaaaaaaat*/

/*start edittttttttttttttttt*/
function editProduct(i) {
   currentIndex = i;
  productName.value =  productList[i].name;
      productPrice.value =  productList[i].price;
      productType.value = productList[i].type;
    productDesc.value = productList[i].desc;
                       
    updateButton.classList.replace('d-none', 'd-block');
    addButton.classList.replace('d-block', 'd-none');



document.getElementById("productForm").scrollIntoView({ behavior: 'smooth' });
setTimeout(() => {
  productName.focus();       
    
}, 300); 



 }

/*end edittttttttttttttttt*/

/*start validaaaaaaaaaaaaaaaaaaaaaation*/
 function validationName() {
    var regex = /^[A-Za-z]{3,8}$/;
    var text = productName.value;
    var result = regex.test(text);//true or false
    if (result) {
        nameError.classList.add('d-none');
        productName.classList.add("is-valid");
        productName.classList.remove("is-invalid");
        return true;
    }
    else {
        nameError.classList.remove('d-none');
        productName.classList.add("is-invalid");
        productName.classList.remove("is-valid");

        return false;
    }
    
    
    
    
}

 function validationPrice() {
    var regex =/^(10000|[1-9][0-9]{3})$/;
    var text = productPrice.value;
    var result = regex.test(text);//true or false
    if (result) {
        priceError.classList.add('d-none');
        productPrice.classList.add("is-valid");
        productPrice.classList.remove("is-invalid");
        return true;
    }
    else {
        priceError.classList.remove('d-none');
        productPrice.classList.add("is-invalid");
        productPrice.classList.remove("is-valid");

        return false;
    }  
}

 function validationType() {
    var regex = /^(mobil|watch|screen)$/;
    var text = productType.value;
    var result = regex.test(text);//true or false
    if (result) {
        typeError.classList.add('d-none');
        productType.classList.add("is-valid");
        productType.classList.remove("is-invalid");
        return true;
    }
    else {
        typeError.classList.remove('d-none');
        productType.classList.add("is-invalid");
        productType.classList.remove("is-valid");

        return false;
    }
    
    
    
    
}

 function validationDesc() {
    var regex =/^(3|[4-9]|[1-9][0-9]|[1-9][0-9]{2}|500)$/;
    var text = productDesc.value;
    var result = regex.test(text);//true or false
    if (result) {
        descError.classList.add('d-none');
        productDesc.classList.add("is-valid");
        productDesc.classList.remove("is-invalid");
        return true;
    }
    else {
        descError.classList.remove('d-none');
        productDesc.classList.add("is-invalid");
        productDesc.classList.remove("is-valid");

        return false;
    }
    
    
    
    
}

/*end validaaaaaaaaaaaaaaaaaaaaaation*/