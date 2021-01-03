// if(document.readyState == 'loading'){
//     document.addEventListener('DOMContentLoaded', ready)
// }
// else{
//     ready();
// }

var carts = document.querySelectorAll('.add-cart');

var products =[
    {
        name:'Strawberry Cheese Tarte',
        tag:'strawberrycheesetarte',
        price:550,
        inCart:0
    },
    {
        name:'Lemon Cheese Tarte&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp',
        tag:'lemoncheesetarte',
        price:500,
        inCart:0
    },
    {
        name:'Orange Cheese Tarte&nbsp&nbsp&nbsp&nbsp',
        tag:'orangecheesetarte',
        price:520,
        inCart:0
    },
    {
        name:'Matcha Cookies&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp',
        tag:'matchacookies',
        price:80,
        inCart:0
    },
    {
        name:'Black Tea Cookies&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp',
        tag:'blackteacookies',
        price:80,
        inCart:0
    },
    {
        name:'Chocolate Cookies&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp',
        tag:'chocolatecookies',
        price:80,
        inCart:0
    },
    {
        name:'Apple Pie&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp',
        tag:'applepie',
        price:450,
        inCart:0
    },
    {
        name:'Brownie&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp',
        tag:'brownie',
        price:350,
        inCart:0
    },
    {
        name:'Madeleine&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp',
        tag:'madeleine',
        price:200,
        inCart:0
    }
];


// function ready(){
//     var removeItemButton = document.getElementsByClassName('remove')
//     for (let i=0; i<removeItemButton.length; i++){
//         var button = removeItemButton[i]
//         button.addEventListener('click', removeCartItem)
//     }

//     // var plusButton = document.getElementsByClassName('plus')
//     // for (let i=0; i<plusButton.length; i++){
//     //     var plusbutton = plusButton[i]
//     //     plusbutton.addEventListener('click', plusQuantity)
//     // }
// }

function removeCartItem(){
    let deleteButtons = document.querySelectorAll('.product ion-icon');
    let productName;
    let productNumbers = localStorage.getItem('cartNumber');
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    // console.log(cartItems);
    let cartCost = localStorage.getItem('totalCost');

    for (let i=0; i<deleteButtons.length; i++){
        deleteButtons[i].addEventListener('click', ()=>{
            productName = deleteButtons[i].parentElement.parentElement.textContent.trim().toLowerCase().replace(/ /g, '');
            // console.log(productName);
            // console.log(cartItems[productName].tag + " " + cartItems[productName].inCart)
            localStorage.setItem('cartNumber', productNumbers - cartItems[productName].inCart)
            localStorage.setItem('totalCost', cartCost - (cartItems[productName].price*cartItems[productName].inCart))
            
            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onloadCartNumbers();
        })
    }
}


for (let i = 0; i < carts.length; i++){
    carts[i].addEventListener('click', function(){
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}


function onloadCartNumbers(){
    let productNum = localStorage.getItem('cartNumber');

    if (productNum){
        document.querySelector('.menu span').textContent = productNum;
    }
}


function cartNumbers(product, action){
    let productNum = localStorage.getItem('cartNumber');
    productNum = parseInt(productNum);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (action == "minus"){
        localStorage.setItem('cartNumber', productNum - 1);
        document.querySelector('.menu span').textContent = productNum - 1;
    }
    else if (productNum){
        localStorage.setItem('cartNumber', productNum + 1);
        document.querySelector('.menu span').textContent = productNum + 1;
    }
    else {
        localStorage.setItem('cartNumber', 1)
        document.querySelector('.menu span').textContent = 1;
    }


    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }
    else{
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product, action){
    // console.log("The price is ", product.price);
    let cartCost = localStorage.getItem('totalCost');
    if(action == "minus"){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost - product.price);
    }
    else if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    }
    else{
        localStorage.setItem('totalCost', product.price);
    }
    
}

function displayCart(){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.products');
    // console.log(cartItems);
    let cartCost = localStorage.getItem('totalCost');
    // var cartRow = document.createElement('div')
    // cartRow.classList.add('product-header')

    if (cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <div class="remove"><ion-icon name="close-circle-outline"></ion-icon></div>
                <img src="image/${item.tag}.jpg" width="140" height="105">
                <span>${item.name}</span>
            </div> 
            <div class="price">$${item.price}</div>
            <div class="quantity">
                <ion-icon class="minus" name="caret-back-circle-outline"></ion-icon>
                <span class="quantity_number">${item.inCart}</span>
                <ion-icon class="plus" name="caret-forward-circle-outline"></ion-icon>
            </div>
            <div class="total">
                $${item.price * item.inCart}
            </div> `

        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    總額：
                </h4>
                <h4 class="basketTotal">
                    $${cartCost}
                </h4>
            </div>
        `
    }
    removeCartItem();
    manageQuantity();
}

function manageQuantity(){
    let decreaseButtons = document.querySelectorAll('.minus');
    let increaseButtons = document.querySelectorAll('.plus');
    let currentQuantity;
    let currentProduct = "";

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for (let i=0; i<decreaseButtons.length; i++){
        decreaseButtons[i].addEventListener('click', ()=>{
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            currentQuantity = parseInt(currentQuantity);

            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '').trim();
            if(cartItems[currentProduct].inCart > 1){
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "minus");
                totalCost(cartItems[currentProduct], "minus");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        })
    }

    for (let i=0; i<increaseButtons.length; i++){
        increaseButtons[i].addEventListener('click', ()=>{
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            currentQuantity = parseInt(currentQuantity);

            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '').trim();
            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        })
    }
}


onloadCartNumbers();
displayCart();