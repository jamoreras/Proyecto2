$(document).on('ready', function () {//esto ejecuta las funciones despues de cargar el html
    function cargarProductos() {
        let userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn'));// va al local storage y se trae los datos del usuario loggeado
        let productsDb = JSON.parse(localStorage.getItem('products')); //revisa si existe una lista de products en el local storage
        if (!productsDb) {
            productsDb = []; //si esta vacia la crea en blanco en un array

        }


        var htmlProduct = ""; 
        productsDb.forEach((product) => { //recorre todos los productos
            if (product.ownerId == userLoggedIn[0].id) {// filtro donde se compara todos los articulos de todas las personas para meter en el dashboard solo los del usuario loggeado
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

    if (confirm("Are you sure?")) { //funcion propia de js del mensajito, devuelve booleano
       
      //edit to a database
      let products = JSON.parse(localStorage.getItem('products'));// se trae la lista de productos del localstorage
      let newProductsDb = []; // se crea una lista nueva que va a remplazar la lista del local storage

      if (products) { // se compara que la lista no traiga un null
        products.forEach((products) => {// se recorre la lista
            if(products.id != id){ // si no es el  producto que quiero eliminar se incerta en la nueva lista
                newProductsDb.push(products);//inserta en la lista
            }
        });
        localStorage.setItem('products', JSON.stringify(newProductsDb)); //guarda la lisla de productos con la nueva lista (sin el producto eliminado)
      }
      window.location.href = './dashboard.html'; // redirecciona a dashboard
    }
}