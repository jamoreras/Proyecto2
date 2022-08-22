$(document).on('ready', function () {//esto ejecuta las funciones despues de cargar el html


  function cargarProductos() {

    let userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn'));
    let productsDb = JSON.parse(localStorage.getItem('products')); //revisa si existe una lista de products en el local storage
    if (!productsDb) {
      productsDb = []; //si esta vacia la crea en blanco en un array

    }

    var htmlProduct = "";
    var tamanoLista = productsDb.length;

    productsDb.forEach((product, index) => {// recorre la lista de productos
      if (tamanoLista <= 5) {//compara si el tamano de la lista es <= que 5 para agregarlo al slidder
        htmlProduct += ' <a href="./descripcion.html?id=' + product.id + '">';
        htmlProduct += ' <img  src="' + product.url + '">';
        htmlProduct += ' <p> ' + product.name + '</p> </a>  ';
      } else { //en caso de ser el tamano de la lista mayor a 5 
        if (index >= tamanoLista - 5) { //compara si el index va por los ultimos 5 elementos de la lista para agregarlos al slidder
          htmlProduct += '  <a href="./descripcion.html?id=' + product.id + '">';
          htmlProduct += '  <img  src="' + product.url + '">';
          htmlProduct += '      <p> ' + product.name + '</p> </a>  ';

        }
      }
    })
    $('.recientes')[0].innerHTML = htmlProduct;   //agrego el top 5 al slidder

    $('.responsive').slick({   //libreria de slidder que da vista al slidder
      dots: true,
      infinite: true,
      speed: 300,
      autoplay: true,
      autoplaySpeed: 2000,
      centerMode: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      lazyLoad: 'ondemand',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: false,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
          }
        }
      ]
    });


  }
  cargarProductos();

});