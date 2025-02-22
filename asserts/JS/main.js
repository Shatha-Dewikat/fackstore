const getCategoires  = async () =>{
    try{
    const {data} = await axios.get("https://fakestoreapi.com/products/categories");
    return data;
    }catch(error){
return [];
    }
   
}


const displayCategoires = async() => {
    try{
    const categories = await getCategoires();
    if(categories.length ==0)
    {
        document.querySelectorAll("section, .pro, .pagination").forEach(el => el.classList.add("d-none"));
    }
    else{
    const result = categories.map(category => 
        `
        <div class='category' data-category="${category}">
            <h2>${category}</h2>
        </div>
        `
    ).join('');

    document.querySelector(".categories .row").innerHTML = result;
    document.querySelector(".loading").classList.add("d-none");
    // إضافة مستمع الأحداث لكل فئة عند النقر
    document.querySelectorAll('.category').forEach(item => {
        item.addEventListener('click', function() {
            const selectedCategory = this.getAttribute('data-category');
            displayProducts(selectedCategory); // تحديث المنتجات بناءً على الفئة المختارة
        });
    });

    document.querySelectorAll('.category').forEach(item => {
        item.addEventListener('click', function() {
            // إزالة التفعيل من جميع العناصر الأخرى
            document.querySelectorAll('.category').forEach(el => el.classList.remove('active2'));
            
            // إضافة التفعيل للعنصر الحالي
            item.classList.toggle('active2');
            
        });
    });
}
}catch(error){

        // إخفاء جميع الأقسام
        document.querySelectorAll("section, .pro, .pagination").forEach(el => el.classList.add("d-none"));
    

    
    

}

};
// استدعاء عرض الفئات
displayCategoires();


const getProducts = async(category,page) => {
    
    const skip = (page - 1)*5;
    const { data } = await axios.get(`https://fakestoreapi.com/products/category/${category}?limit=5&skip=${skip}`);
    return data;
  
};
const displayProducts = async(category,page=1) => {
    const data2 = await getProducts(category,page);

      const number = Math.ceil(data2.length);
    console.log(data2);
    const products = data2;
    const result = products.map(product => 
        `
        <div class='product'>
         <i class="fa-solid fa-heart"></i>
            <img src="${product.image}" class='product-image'/> 
            <h2>${product.title}</h2>
        </div>
        `
    ).join('');
    
    document.querySelector(".pro").innerHTML = result;
    customModal();
   const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"];
const categoryIndex = categories.indexOf(category); // الحصول على الفهرس الحالي للفئة

// تحديد الفئة السابقة والتالية بشكل دائري
const prevCategory = categoryIndex > 0 ? categories[categoryIndex - 1] : categories[categories.length - 1];
const nextCategory = categoryIndex < categories.length - 1 ? categories[categoryIndex + 1] : categories[0];

let paginationLink = `<li><button onclick="displayProducts('${prevCategory.replace(/'/g, "\\'")}', ${page === 1 ? 1 : page - 1})">&lt;</button></li>`;

for (let i = 1; i <= 4; i++) {
    paginationLink += `<li><button onclick="displayProducts(&quot;${categories[i - 1]}&quot;, ${i})">${i}</button></li>`;
}

paginationLink += `<li><button onclick="displayProducts('${nextCategory.replace(/'/g, "\\'")}', ${page + 1})">&gt;</button></li>`;

document.querySelector(".pagination").innerHTML = paginationLink;

};

displayProducts('electronics');

document.querySelectorAll('.last i, .last h3').forEach(item => {
    item.addEventListener('click', function() {
        // إزالة التفعيل من جميع العناصر الأخرى
        document.querySelectorAll('.last i, .last h3').forEach(el => el.classList.remove('active'));
        
        // إضافة التفعيل للعنصر الحالي
        item.classList.toggle('active');
    });
});


window.onscroll = function() { stickyNav() };

var navbar = document.querySelector('.nav');
var sticky = navbar.offsetTop;

function stickyNav() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add('fixed');
    } else {
        navbar.classList.remove('fixed');
    }
}


function customModal() {
    const modal = document.querySelector(".my-modal");
    const closeBtn = modal.querySelector(".close");  // التأكد من أن هذا الزر داخل المودال
    const leftBtn = modal.querySelector(".left-butn"); // زر التنقل لليسار
    const rightBtn = modal.querySelector(".ri-btn"); // زر التنقل لليمين
    const images = document.querySelectorAll(".product-image"); // جميع الصور التي سيتم عرضها
    const modalImg = modal.querySelector("img"); // الصورة داخل المودال

  
    let currentIndex = 0;
    images.forEach( function(img) {
        img.addEventListener('click', (e)=>{
            
            modal.classList.remove('d-none');  // عرض المودال
            modal.querySelector("img").setAttribute("src", e.target.src);
           const currentImg = e.target;
           currentIndex = images.indexOf(currentImg);


        });
    });

    closeBtn.addEventListener("click",(e)=>{
modal.classList.add('d-none');
    });

    rightBtn.addEventListener("click",(e)=>{
currentIndex++;
if(currentIndex >= images.length)
{
    currentIndex=0;
}
const src = images[currentIndex].getAttribute("src");
modal.querySelector("img").setAttribute("src",src);
    });
   
    leftBtn.addEventListener('click',(e)=>{
        currentIndex--;
        if(currentIndex<0){
            currentIndex = images.length-1;

        }
        const src = images[currentIndex].getAttribute("src");
        modal.querySelector("img").setAttribute("src",src);
    });

    document.addEventListener("keydown",(e)=>{

        if(e.code == "ArrowRight") {
            currentIndex++;
            if(currentIndex >= images.length)
                {
                    currentIndex=0;
                }
                const src = images[currentIndex].getAttribute("src");
                modal.querySelector("img").setAttribute("src",src); 
        }

        else if(e.code == "ArrowLeft"){
            currentIndex--;
            if(currentIndex<0){
                currentIndex = images.length-1;
    
            }
            const src = images[currentIndex].getAttribute("src");
            modal.querySelector("img").setAttribute("src",src);
        }
        else if(e.code == "Escape"){
            modal.classList.add('d-none');
        }
        
    });
}







