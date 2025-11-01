
const filterArray = {
  color: [],
  size: [],
  price: [],
  search:[],
}



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


function getData() {
  return Productdata;
}


function checkEmptyFilteredArray() {
  const filterArrayValues = Object.values(filterArray);
  let empty = true;
  // console.log(filterArrayValues);
  for (const value of filterArrayValues) {
    // console.log(value.length)
    // if (value.length > 0 && value[0]!=0) {
     if (Array.isArray(value) && value.length > 0 && value[0] !== 0 && value[0] !== '') {
      empty = false;
      break;
    }
  }
  return empty;
}






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
      const section = document.getElementById("notFound");
      // try {
      //   if (colorproducts.length == 0) {
      //     section.classList.add('active');
      //     section.innerHTML = "Try Searching Other Filters. No Related Products Found."
      //  }
      //   else {
      //     section.classList.remove('active');
      //   }
      //   displayProducts("category", colorproducts);
      // }
      // catch {

      // }
    }
  })
});


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

    // else if (checkEmptyFilteredArray()) {
      // }
      else {
      // displayProducts("category", Productdata);
       filterdProductsData();
    }
    // filterArray.price = [];
})


function filterdProductsData() {
  let data = Productdata;
  const filterProductsColor = [];
  const filterProductsSize = [];
  const filterProductsPrice = [];
  const filterSearchBar=[];
  data.forEach(product => {
    // console.log(filterProductsColor
    // console.log(filterArray);
    let variants = product.variants;
    variants.forEach(variant => {
      let color = variant.color.toLowerCase();
      let size = variant.size.toLocaleLowerCase();
      let price = parseFloat(variant.selling_price);
      let title= variant.title.toLocaleLowerCase();

      // let searchValue=FilterSearchBar.value;
      // console.log(searchValue);
      if (filterArray.color.includes(color)){
        filterProductsColor.push(variant);
      }
      if (filterArray.size.includes(size)) {
        filterProductsSize.push(variant);
      }
      // if (filterArray.price[0] >= price) {
      //   filterProductsPrice.push(variant);
      //   }
       if (filterArray.price[0] >= price) {
        filterProductsPrice.push(variant);
      }
     
      // if(filterArray.search.includes(searchValue)){
      //   console.log(filterSearchBar.push(variant));
      // // }
      //    if (searchValue && title.includes(searchValue)) {
      //   filterSearchBar.push(variant);}

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

const FilterSearchBar=document.getElementById("filter-search-bar");

FilterSearchBar.addEventListener('input',()=>{
  // filterArray.search.push(FilterSearchBar.value.toLowerCase().trim()); 
//  const searchValue = FilterSearchBar.value.toLowerCase().trim();
 
   filterArray.search = [];
 if ( FilterSearchBar.value.toLowerCase().trim()!="") {
    filterArray.search.push(FilterSearchBar.value);
  }

   if (checkEmptyFilteredArray()) {
    displayProducts("category", Productdata);
  } else {
    filterdProductsData();
  }

})
const resetButton=document.getElementById("reset-btn");

// console.log(resetButton);
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

