$(document).on('ready', function () {

  $('.responsive').slick({
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

  function cargarProductos() {

    let userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn'));
    let productsDb = JSON.parse(localStorage.getItem('products')); //revisa si existe una lista de products en el local storage
    if (!productsDb) {
      productsDb = []; //si esta vacia la crea en blanco en un array

    }

    var htmlProduct = "";
    var tamanoLista = productsDb.length;

    productsDb.forEach((product, index) => {
      if (tamanoLista >= 3) {
        htmlProduct += ' <a href="./descripcion.html?id='+ product.id +'">';
        htmlProduct += ' <img  src="'+ product.url +'">';
        htmlProduct += ' <p> '+ product.name +'</p> </a>  ';
      } else {
        if (index >= tamanoLista - 3) {
          htmlProduct += '  <a href="./descripcion.html?id='+ product.id +'">';
          htmlProduct += '  <img  src="'+ product.url +'">';
          htmlProduct += '      <p> '+ product.name +'</p> </a>  ';
          
        }
      }
    })
    $('.recientes')[0].innerHTML = htmlProduct;

  }
  cargarProductos();

});