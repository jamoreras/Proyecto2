$(document).on('ready', function () {
    function cargarProductos() {
       
        let userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn'));
        let productsDb = JSON.parse(localStorage.getItem('products')); //revisa si existe una lista de products en el local storage
        if (!productsDb) {
            productsDb = []; //si esta vacia la crea en blanco en un array

        }

        var htmlProduct = "";
        productsDb.forEach((product,index) => {

            htmlProduct += '<div class="col-lg-4 col-md-4 col-sm-12 my-3">';
            htmlProduct += '<div class="row">';
            htmlProduct += '    <div class="col-lg-6 col-md-6 col-sm-6">';
            htmlProduct += '        <img class="w-100 border border-dark" src="' + product.url + '" alt=""></div>';
            htmlProduct += '    <div class="col-lg-6 col-md-6 col-sm-6">';
            htmlProduct += '        <div class="">';
            htmlProduct += '            <p>' + product.name + ' </p>';
            htmlProduct += '            <div class="">' + getProductOwnerName(product.owner) + '</div>';
            htmlProduct += '            <p>&nbsp;</p>';
            htmlProduct += '        </div>';
            htmlProduct += '    </div>';
            htmlProduct += '</div>';
            htmlProduct += '</div>';

        })
        $('.listaProductos')[0].innerHTML = htmlProduct;

    }
    cargarProductos();

   
});