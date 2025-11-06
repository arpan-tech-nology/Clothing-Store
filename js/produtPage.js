
  const colorCodes={
    black:"#282828",
    blue:"#00a2d0",
    red:"#b20000",
  }



const productTitle=document.querySelector('.product-detail-page .product-detail .detail .heading-container .size');

const container=document.querySelector('.product-detail-page .product-detail .product-images');
// console.log(variantImages)
const variantImage=document.querySelectorAll('.product-detail-page .product-detail .product-images .image .img');
const featuredImage=document.querySelector('.product-detail-page .product-detail .featured-img .img ');
const variants=Productdata[0].variants;
featuredImage.src=variants[0].featured_image;
productTitle.innerHTML=Productdata[0].title;
const sizeButton = document.querySelector('.size-button');

const quantityDecremental = document.querySelector('.fa-minus ');
const quantityIncremental = document.querySelector('.fa-plus ');
const totalStock = document.querySelector('.quantity');

let number =totalStock.innerHTML=1;
quantityDecremental.addEventListener('click',()=>{
  if(number>1){
    totalStock.innerHTML=number-=1;
    addToCartQuantity.value=number;
  }

})

quantityIncremental.addEventListener('click',()=>{
  if(number<Productdata[0].stock){
    totalStock.innerHTML=number+=1;
    addToCartQuantity.value=number;

  }

})

// console.log(totalStock);

const addToCartForm=document.getElementById('form');
const addToCartId=document.getElementById('input-variant-id');
const addToCartSize=document.getElementById('input-variant-size');
const addToCartQuantity=document.getElementById('input-variant-quantity');

addToCartForm.addEventListener('submit',()=>{

  const details={
    "id":addToCartId.value,
    "size":addToCartSize.value,
    "quantity":addToCartQuantity.value
  }
  event.preventDefault();
  let selectedItem=JSON.stringify(details);
  console.log(selectedItem)
  // console.log(details)

})


function variantSize(num){
  variants[num].size.forEach(size=>{

    const btnDiv=document.createElement('button');
    btnDiv.classList.add('btn');
    btnDiv.innerHTML=size;
    sizeButton.appendChild(btnDiv);

    btnDiv.addEventListener('click',()=>{
      addToCartSize.value=size;
    
    const activeBtn = document.querySelector('.btn.active');
  
    if (activeBtn==null) {
      btnDiv.classList.add('active');
    }
    else{

      activeBtn.classList.remove('active');
      btnDiv.classList.add('active');
    }

    })


  })



}



variants.forEach((variant,index)=>{
    const div=document.createElement('div');
    div.classList.add('image');
    const image = document.createElement('img');
    image.classList.add('img')
    image.src = variant.featured_image;
    image.dataset.id=variant.id;
    div.appendChild(image);
    container.appendChild(div); 
    image.addEventListener('click',()=>{
    featuredImage.src=image.src;
    })


    const  colors=document.querySelector('.product-detail-page .product-detail .color-option ');
    const colorDiv=document.createElement('div');
    colorDiv.classList.add('circle');
    const iTag=document.createElement('i');
    iTag.classList.add('fa-solid',"fa-check","tick");
    colorDiv.style.backgroundColor=`${colorCodes[variant.color.toLowerCase()]}`;
    colorDiv.appendChild(iTag);
    colors.appendChild(colorDiv);
  

    if(index==0){
        colorDiv.classList.add('active');
        addToCartId.value=variant.id;
        variantSize(index);


    }
    colorDiv.addEventListener("click",()=>{
      sizeButton.innerHTML="";

    const activecolor=document.querySelector('.circle.active');

     
      activecolor.classList.remove('active');
      colorDiv.classList.add('active');

      featuredImage.src=image.src;
      // console.log(variant.title)
      productTitle.innerHTML = `${variant.title} (${variant.color})`;


       const rating=document.querySelector('.star');
      rating.innerHTML = '';
  //  console.log(rating)
    let stars = Math.trunc(variant.rating);
    // console.log(stars)
    let counter = 1;
    for (i = 0; i < 5; i++) {
      if (stars >= counter) {
        const star = document.createElement('i');
        star.classList.add("fa-solid", "fa-star", "color");
        rating.appendChild(star);
      }
      else{
        const star = document.createElement('i');
        star.classList.add("fa-regular", "fa-star", "color");
        rating.appendChild(star);
      }
      counter += 1;
    }

 const price=document.querySelector('.price.d-flex');
  // console.log(price)
  price.innerHTML=`$${variant.selling_price}`;
  
  const spanTag=document.querySelector('.price-container .color');
  // console.log(spanTag)
  spanTag.innerHTML=`$${variant.original_price}`;
  
  const discountButton=document.querySelector('.price-container .discount')
  discountButton.innerHTML = "-" + Math.trunc(((variant.original_price-variant.selling_price) / variant.original_price) * 100) + "%";
  // console.log(variant)

     variantSize(index);

     addToCartId.value=variant.id;
     


    })



    
   


    
})


// const circle=document.querySelectorAll('.circle');
  
//   circle.forEach(color=>{
//     color.addEventListener('click',()=>{
     
      // const activecolor=document.querySelector('.circle.active');
      // activecolor.classList.remove('active');
      // color.classList.add('active');
//       // console.log(v)
//       const matchImage=document.querySelector(`[data-id="${color.dataset.target}"]`);
     
//       featuredImage.src=matchImage.src;
//           // productTitle.innerHTML=color.dataset.title;
//       productTitle.innerHTML = `${color.dataset.title} (${color.dataset.color})`;
  
//         console.log(color.dataset.title);
//         console.log(color)
  
//       const rating=document.querySelector('.star');
//       rating.innerHTML = '';
//   //  console.log(rating)
//     let stars = Math.trunc(color.dataset.rating);
//     // console.log(stars)
//     let counter = 1;
//     for (i = 0; i < 5; i++) {
//       if (stars >= counter) {
//         const star = document.createElement('i');
//         star.classList.add("fa-solid", "fa-star", "color");
//         rating.appendChild(star);
//       }
//       else{
//         const star = document.createElement('i');
//         star.classList.add("fa-regular", "fa-star", "color");
//         rating.appendChild(star);
//       }
//       counter += 1;
//     }
//   const price=document.querySelector('.price.d-flex');
//   console.log(price)
//   price.innerHTML=`$${color.dataset.sellprice}`;
  
//   const spanTag=document.querySelector('.price-container .color');
//   console.log(spanTag)
//   spanTag.innerHTML=`$${color.dataset.originalprice}`;
  
//   const discountButton=document.querySelector('.price-container .discount')
//   discountButton.innerHTML = "-" + Math.trunc(((color.dataset.originalprice - color.dataset.sellprice) / color.dataset.originalprice) * 100) + "%";
//   // console.log(variant)
//   })
// })
 
// const sizeButtons = document.querySelectorAll('.size-button .btn');
// sizeButtons.forEach(btn => {
//   btn.addEventListener('click', () => {
//     const activeBtn = document.querySelector('.btn.active');
//     if (activeBtn) {
//       activeBtn.classList.remove('active');
//     }
//       btn.classList.add('active');
//       // const matchImage=document.querySelector(`[data-id="${btn.dataset.target}"]`);
     
//       //   featuredImage.src=matchImage.src;

//   });
// });


    // variantColor.addEventListener('click',()=>{
    //   // console.log("click")
    // })

    // console.log(variantColor)
      // console.log(index)
  
    // console.log(container);
    // console.log(variant)
  // })
  

  // const variantImage=document.querySelectorAll('.product-detail-page .product-detail .product-images .image .img');
 
  // variantImage.forEach(variantImg=>{
  //   variantImg.addEventListener('click',()=>{
  //     // console.log("click")
  //     // console.log(variant.src)
  //     featuredImage.src=variantImg.src;


  //     const variantIndex = parseInt(variantImg.dataset.variantIndex);
  //     const selectedVariant = variants[variantIndex];
        
  //       productTitle.innerHTML = `${selectedVariant.title} ${selectedVariant.color}`;
  //       console.log(selectedVariant.color);

  //     // console.log(variantImage.rating)
  //    const rating=document.querySelector('.star');
  //       rating.innerHTML = '';
  //   //  console.log(rating)
  //     let stars = Math.trunc(selectedVariant.rating);
  //     // console.log(stars)
  //     let counter = 1;
  //     for (i = 0; i < 5; i++) {
  //       if (stars >= counter) {
  //         const star = document.createElement('i');
  //         star.classList.add("fa-solid", "fa-star", "color");
  //         rating.appendChild(star);
  //       }
  //       else{
  //         const star = document.createElement('i');
  //         star.classList.add("fa-regular", "fa-star", "color");
  //         rating.appendChild(star);
  //       }
  //       counter += 1;
  //     }
      
  //   const price=document.querySelector('.price.d-flex');
  //   console.log(price)
  //   price.innerHTML=`$${selectedVariant.selling_price}`;

  //   const spanTag=document.querySelector('.price-container .color');
  //   console.log(spanTag)
  //   spanTag.innerHTML=`$${selectedVariant.original_price}`;

  //   const discountButton=document.querySelector('.price-container .discount')
  //   discountButton.innerHTML = "-" + Math.trunc(((selectedVariant.original_price - selectedVariant.selling_price) / selectedVariant.original_price) * 100) + "%";

  //     const color=document.querySelector('.product-detail-page .product-detail .color-option ');

      
  //     // let variantCoolor=
  //      console.log(color);    

  //   })
  // })