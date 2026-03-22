let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('createBtn');

let mode = 'create';
let tmp;
let search = document.getElementById('search');

//get total
function getTotal(){
    if(price.value != ''){
        result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor ='#c08300';
}else{
    total.style.backgroundColor ='#009a00';
    total.innerHTML = '';
}
}
//create product
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}else{
    dataPro = [];
}

create.onclick = function(){
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    };
    if(title.value != '' && newPro.count < 100){
        if(mode === 'create'){
            if(newPro.count > 1){
                for(let i = 0;i < newPro.count;i++){
                    dataPro.push(newPro);
        }
            }else{
        dataPro.push(newPro);
    }
        }else{
        dataPro[tmp] = newPro;
        mode = 'create';
        create.innerHTML = 'create';
        count.style.display = 'block';
    }
    clearData();
    };
    
    
      
            
    localStorage.setItem('product', JSON.stringify(dataPro));
    

    
    showData();
}
//clear inputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
// read data
function showData(){
    getTotal();
    let table = '';
    for(let i = 0;i < dataPro.length;i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;

    let deleteBtn = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        deleteBtn.innerHTML = `<button onclick="deleteAll()" id = "deleteAllBtn">delete all (${dataPro.length})</button>`;
    }else{
        deleteBtn.innerHTML = '';
    }
}
showData();
// delete data
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}
//deleteAll
function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}
//update
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = 'none';
    create.innerHTML = 'update';
    category.value = dataPro[i].category;
    mode = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth",
    })
}
//search
let searchMode = 'title';

function getSearchMode(id){
    if(id == 'searchByTitle'){
        searchMode = 'title';
        search.placeholder = 'search by title'
    }else{
        searchMode = 'category'
        search.placeholder = 'search by category'
    }
search.focus();
search.value = '';
showData();
}

function searchData(value){
    let table = '';
    if(searchMode == 'title'){for(let i = 0;i < dataPro.length;i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
                    </tr>
                    `;
            }
        
            
    
        }
    }else{for(let i = 0;i < dataPro.length;i++){
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
                    </tr>
                    `;
            }

    }
    }
    document.getElementById('tbody').innerHTML = table;
}
