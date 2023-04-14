const productsBox = document.getElementById("products-box");

const myProducts = [
  {
    title: "titulo 1",
    calificacion: 5,
    description: "esto es una referencia de descripcion",
    caracteristicas: "bonito",
    otherProducts: "titulo 1.1",
    price: 5000,
  },
  {
    title: "titulo 2",
    calificacion: 5,
    description: "esto es una referencia de descripcion",
    caracteristicas: "bonito",
    otherProducts: "titulo 2.1",
    price: 5000,
  },
  {
    title: "titulo 3",
    calificacion: 5,
    description: "esto es una referencia de descripcion",
    caracteristicas: "bonito",
    otherProducts: "titulo 3.1",
    price: 5000,
  },
  {
    title: "titulo 4",
    calificacion: 5,
    description: "esto es una referencia de descripcion",
    caracteristicas: "bonito",
    otherProducts: "titulo 4.1",
    price: 5000,
  },
];

const renderProducts = (listOfProducts) => {
  listOfProducts.forEach((element) => {
    productsBox.appendChild(element);
  });
};

const createProductElement = (element) => {
  const product = document.createElement("div");
  product.classList.add("productos");
  product.innerHTML = `
    <div class="img1">
        <img src="" alt="">
    </div>    
    <div class="titulo">
        <h3>${element.title}</h3>
    </div>    
    <div class="calificacion">
        <p>${element.calificacion}</p>
    </div>    
    <div class="descripcion">
        <p>${element.description}</p>
    </div>    
    <div class="caracteristicas">
        <p>${element.caracteristicas}</p>
    </div>    
    <div class="otros">
        <p>${element.otherProducts}</p>
    </div>    
    <div class="precio">
        <p>$${element.price}</p>
    </div>    
    <div class="comprar">
        <p>COMPRAR</p>
    </div>    
    <div class="agregar">
        <p>Agregar</p>
    </div>`;
  return product;
};

window.onload = () => {
  const listOfProducts = myProducts.map((element) =>
    createProductElement(element)
  );

  renderProducts(listOfProducts);
};
