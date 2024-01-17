// product will be loaded dynamically from here

// making product's array
const prodArray = [
    {
        id:"price_1OZGxdSI7wOHRdQYkdMJYLQF",
        title:"product 1",
        price:10.00
    },
    {
        id:"price_1OZGxzSI7wOHRdQYtaHHz106",
        title:"product 2",
        price:20.00
    },
    {
        id:"price_1OZGyMSI7wOHRdQYyMT8hdwx",
        title:"product 3",
        price:30.00
    }
]

// function to get product details from id
function getProductById(id){
    let prodData = prodArray.find(product => product.id===id);

    if(prodData == undefined){
        console.log("product does not exist for id: "+id);
        return undefined;
    }

    return prodData;
}


// to give this data to any component inside src
export {prodArray, getProductById};