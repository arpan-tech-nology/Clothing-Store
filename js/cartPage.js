const cart=document.querySelector('.your-cart')
const subTotal=document.getElementById('sub-total');
const total=document.getElementById('total');
const deleivery=document.getElementById('deleivery');

// const total=
console.log(cart)
const cart1=document.createElement('div');
cart1.classList.add('cart1');
cart1.classList.add('d-flex-space-between-only');

const cartImage=document.createElement('div');
cartImage.classList.add('cart-img');

const image=document.createElement('img');
image.classList.add('img');


const leftSection=document.createElement('div');
leftSection.classList.add('left-section');
leftSection.classList.add('d-flex-space-between-only')

const spaceBetween=document.createElement('div');
// spaceBetween.classList.add('space-between');
spaceBetween.classList.add('d-flex-space-between-only')

const heading=document.createElement('h3');
// cart1.classList.add('cart1');


const span=document.createElement('span');
span.classList.add('material-symbols-outlined', 'color');
span.innerHTML="delete";

const sizeDiv=document.createElement('div');
sizeDiv.classList.add('d-flex');
const size=document.createElement('p');
size.innerHTML="Size:"
const sizeText=document.createElement('p');
sizeText.classList.add('text');




const colorDiv=document.createElement('div');
colorDiv.classList.add('d-flex');
const color=document.createElement('p');
color.innerHTML="Color:"
const colorText=document.createElement('p');
colorText.classList.add('text');


const price=document.createElement('div');
// price.classList.add('space-between');
price.classList.add('d-flex-space-between-only')



const priceheading=document.createElement('h2');
 const button=document.createElement('button');
 button.classList.add('button','d-flex')

 const iTag1=document.createElement('i');
 iTag1.classList.add("fa-solid",'fa-minus');

 const quantityDiv=document.createElement('div');
 quantityDiv.classList.add('quantity');

 

const iTag2=document.createElement('i');
iTag2.classList.add("fa-solid",'fa-plus');


cart.appendChild(cart1);
cart1.appendChild(cartImage);
cartImage.appendChild(image);

cart.appendChild(leftSection)

// spaceBetween.appendChild(span)
cart1.appendChild(leftSection)

leftSection.appendChild(spaceBetween);
spaceBetween.appendChild(heading)
spaceBetween.appendChild(span)

leftSection.appendChild(sizeDiv);
sizeDiv.appendChild(size)
sizeDiv.appendChild(sizeText)

leftSection.appendChild(colorDiv);
colorDiv.appendChild(color)
colorDiv.appendChild(colorText);

leftSection.appendChild(price);
price.appendChild(priceheading);
price.appendChild(button);
 button.appendChild(iTag1);
 button.appendChild(quantityDiv);
 button.appendChild(iTag2);


let cartObj={"id":"13456734-2","size":"large","quantity":"2"};
 
const variants=Productdata[0].variants;
  variants.forEach(variant=>{
    if(variant.id==cartObj.id){
        image.src=variant.featured_image;
        heading.innerHTML=variant.title;
        sizeText.innerHTML=cartObj.size;
        colorText.innerHTML=variant.color;
        priceheading.innerHTML=`$${variant.selling_price*cartObj.quantity}`
        quantityDiv.innerHTML=cartObj.quantity;
        subTotal.innerHTML=priceheading.innerHTML;
        total.innerHTML=`$${variant.selling_price*cartObj.quantity+15}`;





        // console.log(heading)
    }
    
  })



                     