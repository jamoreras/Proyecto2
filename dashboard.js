$(document).on('ready', function () {
    function cargarProductos() {
        let userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn'));
        let productsDb = JSON.parse(localStorage.getItem('products')); //revisa si existe una lista de products en el local storage
        if (!productsDb) {
            productsDb = []; //si esta vacia la crea en blanco en un array

        }


        var htmlProduct = "";
        productsDb.forEach((product) => {
            if (product.owner == userLoggedIn[0].id) {
                htmlProduct += '<div class="col-lg-4 col-md-4 col-sm-12 my-3">';
                htmlProduct += '<div class="row">';
                htmlProduct += '<div class="col-lg-6 col-md-6 col-sm-12">';
                htmlProduct += '<img class="w-100 border border-dark" src="' + product.url + '" alt=""></div>';
                htmlProduct += '<div class="col-lg-6 col-md-6 col-sm-12">';
                htmlProduct += '<p><a class="color-link" href="./descripcion.html?id='+product.id+'">' + product.name + '</a> </p>';
                htmlProduct += '<a class="mb-5 btn btn-primary" href="product.html?id=' + product.id + '">Editar</a>';
                htmlProduct += '<br>';
                htmlProduct += '<button class="btn btn-danger" onclick="deleteProduct(' + product.id + ')">Eliminar</button>';
                htmlProduct += '</div>';
                htmlProduct += '</div>';
                htmlProduct += '</div>';
            }
        })
        $('.listaProductos')[0].innerHTML = htmlProduct;

        
    }
    cargarProductos();

});
function deleteProduct(id) {
    debugger
    if (confirm("Are you sure?")) {
       
      //edit to a database
      let products = JSON.parse(localStorage.getItem('products'));
      let productsDb = [];

      if (products) {
        products.forEach((products) => {
            if(products.id != id){
                productsDb.push(products);
            }
        });
        localStorage.setItem('products', JSON.stringify(productsDb));
      }
      window.location.href = './dashboard.html';
    }
}