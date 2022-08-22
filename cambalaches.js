$(document).on('ready', function () {//esto ejecuta las funciones despues de cargar el html
    function cargarProductos() {//
       
        let userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn'));//va al local storage y busca el objeto userloggedIn, que corresponde a los datos del usuario que esta logeado
        let productsDb = JSON.parse(localStorage.getItem('products')); //va al local storage y buscar la lista de objetos product
        if (!productsDb) {//si la lista esta vacia ''null''
            productsDb = []; //se cambia por un arreglo vacio para posteriormente poder agregarle elementos

        }

        var htmlProduct = "";
        productsDb.forEach((product) => { //recorremos la lista
         //esto es una concatenacion de la estructura de Div de cada producto de los cambalaches.
          htmlProduct += '<a href ="./descripcion.html?id='+product.id+'">';
            htmlProduct += '<div class="col-lg-4 col-md-4 col-sm-12 my-3">';
            htmlProduct += '<div class="row">';
            htmlProduct += '    <div class="col-lg-6 col-md-6 col-sm-6">';
            htmlProduct += '        <img class="w-100 border border-dark" src="' + product.url + '" alt=""></div>';
            htmlProduct += '    <div class="col-lg-6 col-md-6 col-sm-6">';
            htmlProduct += '        <div class="">';
            htmlProduct += '            <p>' + product.name + ' </p>';
            htmlProduct += '            <div class="">' + getProductOwnerName(product.ownerId) + '</div>';// esta funcion (common.js) busca por el id el nombre del usario
            htmlProduct += '            <p></p>';
            htmlProduct += '        </div>';
            htmlProduct += '    </div>';
            htmlProduct += '</div>';
            htmlProduct += '</div>';
            htmlProduct += '</a>';

        })
        $('.listaProductos')[0].innerHTML = htmlProduct; // mete los divs pequenos(de los productos) dentro del div padre

    }
    cargarProductos();// llama la funcion para que cargue los productos

   
});