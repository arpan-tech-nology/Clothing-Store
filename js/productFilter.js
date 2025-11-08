const filterArray = {
  color: [],
  size: [],
  price: [],
  search:[],
}


//Filter Button to open Filter Container...!
const toogler2 = document.querySelectorAll('.filter-toggler');
const sidebar2 = document.querySelector('.filter-section');
toogler2.forEach(togler => {
  togler.addEventListener('click', () => {
    if (sidebar2.classList.contains('active')) {
      sidebar2.classList.remove('active');
      body.classList.remove('no-scroll');
    }
    else {
      sidebar2.classList.add('active');
      body.classList.add('no-scroll');
    }
  })
})


// Filter dropdown to open filter section
const filterDropDown = document.querySelectorAll('.filter-dropdown');
const subPriceBar = document.querySelectorAll('.sub-filter-item');
filterDropDown.forEach(dropDown => {
  dropDown.addEventListener('click', () => {
    subPriceBar.forEach(subMenu => {
      if (subMenu.dataset.target == dropDown.dataset.target) {
        if (subMenu.classList.contains('active')) {
          subMenu.classList.remove('active');
          dropDown.classList.remove('active');
        }
        else {
          subMenu.classList.add('active');
          dropDown.classList.add('active');
        }
      }
    })
  })
})


// return the boolean values by cheking that object is empty or not...!
function checkEmptyFilteredArray() {
  const filterArrayValues = Object.values(filterArray);
  let empty = true;
    for (const value of filterArrayValues) {
      if (Array.isArray(value) && value.length > 0 && value[0] !== 0 && value[0] !== '') {
      empty = false;
      break;
    }
  }
  return empty;
}


//display the products according to color...!
const allColors = document.querySelectorAll('.select-color');
allColors.forEach(tick => {
  tick.addEventListener('click', () => {
    if (tick.classList.contains('active')) {
      tick.classList.remove('active');
      filterArray.color.splice(filterArray.color.indexOf(tick.dataset.color), 1)
    }
    else {
      tick.classList.add('active');
      filterArray.color.push(tick.dataset.color);
    }
    if (checkEmptyFilteredArray()) {
      displayProducts("category", Productdata);
    }
    else {
      filterdProductsData();
    }
  })
});


//display the products according to price...!
const range = document.querySelector(".range");
const output = document.getElementById('output');
range.addEventListener('change', () => {
  const price = parseFloat(range.value);
  output.value = `$${price}`;
    filterArray.price = [];

  if (price > 0) {
    filterArray.price.push(price);
    filterdProductsData();
  }
  else if (checkEmptyFilteredArray()) {
      displayProducts("category", Productdata);
    }
      else {
       filterdProductsData();
    }
    // filterArray.price = [];
})

//display the products according to size...!
const buttons = document.querySelectorAll(".btn");
let size = [];
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('active')) {
      btn.classList.remove('active');
      filterArray.size.splice(filterArray.size.indexOf(btn.dataset.size), 1)
    }
    else {
      btn.classList.add('active');
      filterArray.size.push(btn.dataset.size);
    }
    if (checkEmptyFilteredArray()) {
      displayProducts("category", Productdata);
    }
    else {
      filterdProductsData();
    }
  })
})

// filter all the products according to selected filter(color , size etc)...!
function filterdProductsData() {
  let data = Productdata;
  const filterProductsColor = [];
  const filterProductsSize = [];
  const filterProductsPrice = [];
  const filterSearchBar=[];
  data.forEach(product => {
    let variants = product.variants;
    variants.forEach(variant => {
      let color = variant.color.toLowerCase();
      let sizes = variant.size;
      console.log(sizes)
      
      let price = parseFloat(variant.selling_price);
      let title= variant.title.toLocaleLowerCase();

       sizes.forEach(size=>{
        if (filterArray.size.includes(size)) {
          filterProductsSize.push(variant);
        }

      })

      if (filterArray.color.includes(color)){
        filterProductsColor.push(variant);
      }
     

     
      if (filterArray.price[0] >= price) {
        filterProductsPrice.push(variant);
      }
 
      if ( title.includes(filterArray.search[0])) {
        filterSearchBar.push(variant);
      }
    })
  })

  let result = combineFilteration('id', Productdata, filterProductsColor, filterProductsSize, filterProductsPrice,filterSearchBar);
  displayProducts("category", result);
  filterProductsColor.length=0;
  filterProductsSize.length=0;
  filterProductsPrice.length=0;
  filterSearchBar.length=0;
}


//It return one array which contain common products...!
function combineFilteration(key, mainArray, ...arrays) {
  if (!arrays.length) return [];
  const activeArrays = arrays.filter(arr => arr.length > 0);

  if (activeArrays.length === 0) return [];
  const common = activeArrays.reduce((acc, curr) => {
    return acc.filter(a => curr.some(c => c[key] === a[key]));
  });

  const result = mainArray.flatMap(product =>
    product.variants.filter(variant =>
      common.some(c => c[key] === variant[key])
    )
  );
  return result;
}


//display the products that the user search...!
const FilterSearchBar=document.getElementById("filter-search-bar");
FilterSearchBar.addEventListener('input',()=>{
 
   filterArray.search = [];
 if ( FilterSearchBar.value.trim()!="") {
    filterArray.search.push(FilterSearchBar.value);
      filterdProductsData();
  }

   if (checkEmptyFilteredArray()) {
    displayProducts("category", Productdata);
  } else {
    filterdProductsData();
  }

})


//it clear all the applied filter in filter section...!
const resetButton=document.getElementById("reset-btn");
resetButton.addEventListener('click',()=>{
// console.log("end")
const activeColor=document.querySelectorAll(".select-color.active");
activeColor.forEach(tick=>{
    tick.classList.remove('active');
})

const activeBtn=document.querySelectorAll(".btn.active")
activeBtn.forEach(btn => {
  btn.classList.remove('active');
})
  Object.keys(filterArray).forEach(key => {
    filterArray[key] = [];
  });
  // filterArray.color=[];
  // filterArray.search=[];
  // filterArray.size=[];
  range.value=0;
  FilterSearchBar.value="";
  output.value=`$0`;
 
displayProducts("category", Productdata);
})

