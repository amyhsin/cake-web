var carts = document.querySelectorAll('.add-cart');

var products =[
    {
        name:'草莓乳酪塔',
        tag:'strawcheese',
        price:550,
        inCart:0
    },
    {
        name:'檸檬乳酪塔',
        tag:'lemoncheese',
        price:500,
        inCart:0
    },
    {
        name:'香橙乳酪塔',
        tag:'orangecheese',
        price:520,
        inCart:0
    },
    {
        name:'抹茶雪球',
        tag:'matchacookie',
        price:80,
        inCart:0
    },
    {
        name:'伯爵雪球',
        tag:'blackteacookie',
        price:80,
        inCart:0
    },
    {
        name:'巧克力雪球',
        tag:'chocolatecookie',
        price:80,
        inCart:0
    },
    {
        name:'蘋果派',
        tag:'applepie',
        price:450,
        inCart:0
    },
    {
        name:'熔岩布朗尼',
        tag:'brownie',
        price:350,
        inCart:0
    },
    {
        name:'檸檬瑪德蓮',
        tag:'madeleine',
        price:200,
        inCart:0
    }
];

for (let i = 0; i < carts.length; i++){
    carts[i].addEventListener('click', function(){
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}


function onloadCartNumbers(){
    let productNum = localStorage.getItem('cartNumbers');

    if (productNum){
        document.querySelector('.menu span').textContent = productNum;
    }
}


function cartNumbers(product){
    let productNum = localStorage.getItem('cartNumbers');

    productNum = parseInt(productNum);

    if (productNum){
        localStorage.setItem('cartNumbers', productNum + 1);
        document.querySelector('.menu span').textContent = productNum + 1;
    }
    else{
        localStorage.setItem('cartNumbers', 1);
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

function totalCost(product){
    // console.log("The price is ", product.price);
    let cartCost = localStorage.getItem('totalCost');

    if(cartCost != null){
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

    if (cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle-outline"></ion-icon>
                <img src="image/${item.tag}.jpg" width="140" height="105">
                <span>${item.name}</span>
            </div>
            <div class="price">$${item.price}</div>
            <div class="quantity">
                <ion-icon name="caret-back-circle-outline"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon name="caret-forward-circle-outline"></ion-icon>
            </div>
            <div class="total">
                $${item.price * item.inCart}
            </div>
            `;
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
}

function scrollWindow(){
    window.scrollTo(0,1410);
}

scrollWindow();
onloadCartNumbers();
displayCart();