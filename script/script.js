const hamburger_button = document.getElementById("hamburger-menu-icon");
const mobile_navigation = document.getElementById("mobile-navbar");
const mobile_navigation_close_btn = document.getElementById("mobile-navbar-close");
const media_query = window.matchMedia( "(min-width: 650px)" );

const remove_one_article=document.getElementById("remove-one-artice");
const number_of_articles=document.getElementById("number-of-articles");
const add_one_article=document.getElementById("add-one-article");


hamburger_button.addEventListener("click", showMobileMenu);
mobile_navigation_close_btn.addEventListener("click", hideMobileMenu);
media_query.addEventListener('change', closeMobileMenuOnResize)

// MOBILE MENU CODE
//https://css-tricks.com/working-with-javascript-media-queries/
function closeMobileMenuOnResize(e) {
    // Hide mobile menu, if screen is resised past the media query
    if (e.matches) {      
      mobile_navigation.style.display = "none";
    }
  } 

function showMobileMenu(){
    mobile_navigation.style.display = "block";
}
function hideMobileMenu(){
    mobile_navigation.style.display = "none";
}

// ADD/REMOVE AND TO-CART BUTTONS
add_one_article.addEventListener("click", addItem);
remove_one_article.addEventListener("click", removeItem);

function addItem(){
    var item_count=parseInt(number_of_articles.innerText);
    number_of_articles.innerHTML=item_count+1;  
}
function removeItem(){
    var item_count=parseInt(number_of_articles.innerText);
    if(item_count>0){
    number_of_articles.innerHTML=item_count-1;  
    }
}

const add_to_cart_btn=document.getElementById("add-to-cart");
add_to_cart_btn.addEventListener("click", addToCart);
shoppin_basket_array = [];

function addToCart(){
let shopping_item = new Item()

shopping_item.price=125;
shopping_item.name="Fall Limited Edition Sneakers"
shopping_item.image="./images/image-product-1-thumbnail.jpg";
shopping_item.quantity=parseInt(number_of_articles.innerText);

if(shoppin_basket_array.length===0)
{
    shoppin_basket_array.push(shopping_item);
}
else{
shoppin_basket_array.forEach(function (item) {
    if(item.name===shopping_item.name && item.name!==undefined)
    {        
      item.quantity=item.quantity+shopping_item.quantity; 
    }
    else{
    }    
   
  });
}
console.log(shoppin_basket_array);
}





// SHOPING CART 
const product_page_container = document.querySelector('.product-page-container');
const shopping_cart_btn = document.querySelector('#shoping-cart-btn ');

 shopping_cart_btn.addEventListener("click",()=>{openShoppingBasketWindow(shoppin_basket_array)});








class Item {
    constructor(name,price,quantity) {     
      this._name = name;
      this._price = price;
      this._quantity = quantity;
      this._image_path;
    }
set quantity(val)
{
    this._quantity=val;
}
set name(val)
{
    this._name=val;
}
set price(val)
{
    this._price=val;
}
set image(val)
{
    this._image_path=val;
}

get quantity() {
    return this._quantity;
  }
get name() {
    return this._name;
  }
get price() {
    return this._price;
  }
  get image() {
    return this._image_path;
  }

}


function generateAddToBasketModal(shoppin_basket_array){
    // console.log(showMobileMenu.price);

    let add_to_cart_window=document.createElement('div');
    add_to_cart_window.className = "add-to-cart-window";
    let add_to_cart_header=document.createElement('div');
    add_to_cart_header.className = "add-to-cart-header";
    let add_to_cart_header_text=document.createElement('h3');
    let add_to_cart_container=document.createElement('div');    
    add_to_cart_container.className="add-to-cart-container";
    add_to_cart_header_text.className = "add-to-cart-header-text";
    add_to_cart_header_text.textContent="Cart"
    let add_to_cart_img=document.createElement('img');
    add_to_cart_img.className = "add-to-cart-img";
    let add_to_cart_product_container=document.createElement('div');
    add_to_cart_product_container.className = "add-to-cart-product-container";
    let add_to_cart_product_name=document.createElement('h4');
    add_to_cart_product_name.className = "add-to-cart-product-name";
    let add_to_cart_quantity=document.createElement('span');
    add_to_cart_quantity.id = "add-to-cart-quantity";
    let add_to_cart_price=document.createElement('span');
    add_to_cart_price.id = "add-to-cart-price";
    let add_to_cart_total=document.createElement('span');
    add_to_cart_total.id = "add-to-cart-product-total";
    let add_to_cart_remove_item=document.createElement('button');
    add_to_cart_remove_item.id = "add-to-cart-remove-item";
    let add_to_cart_checkout=document.createElement('button');
    add_to_cart_checkout.id = "add-to-cart-checkout";
    add_to_cart_checkout.innerText="Checkout"

    

    add_to_cart_window.appendChild(add_to_cart_header);  
    add_to_cart_header.appendChild(add_to_cart_header_text);
    add_to_cart_window.appendChild(add_to_cart_container);
    if(shoppin_basket_array.length===0)
    {
        let empty_cart_label=document.createElement('p');
        empty_cart_label.innerText="Empty cart"
        empty_cart_label.className = "empty_cart";
        add_to_cart_container.appendChild(empty_cart_label)

    }
    else{
    shoppin_basket_array.forEach(function (item){
    add_to_cart_img.src=item.image; 
    add_to_cart_container.appendChild(add_to_cart_img);
    add_to_cart_container.appendChild(add_to_cart_product_container);    
    add_to_cart_product_name.textContent=item.name;
    add_to_cart_product_container.appendChild(add_to_cart_product_name);
    add_to_cart_price.innerHTML="$"+item.price+" "+" x"+item.quantity+" $<b>"+item.quantity*item.price+"</b>"; 
    add_to_cart_product_container.appendChild(add_to_cart_price);
    add_to_cart_container.appendChild(add_to_cart_remove_item);
    });
    add_to_cart_window.appendChild(add_to_cart_checkout);

    }
    product_page_container.prepend(add_to_cart_window);
    //FIX
    //const delete_icon='<svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>';
    //document.getElementById('add-to-cart-remove-item').innerHTML += delete_icon;

}


function openShoppingBasketWindow(shoppin_basket_array){
if(!shopping_cart_btn.classList.contains("active"))
{
shopping_cart_btn.classList.add("active");
generateAddToBasketModal(shoppin_basket_array);

}
else if(shopping_cart_btn.classList.contains("active"))
{
shopping_cart_btn.classList.remove("active");
const shopping_cart_window = document.querySelector(".add-to-cart-window");
shopping_cart_window.parentElement.removeChild(shopping_cart_window);
}
else{
console.log("Problem with oppening shopping cart")
}
}