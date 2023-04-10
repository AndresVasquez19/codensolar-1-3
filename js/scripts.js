const productBox = document.getElementById("products-box");

const idProducts = getIds();

const quoteTemplate = document.getElementById("cotizacion").content;

/* 
name:"Nevera solar 50 LT ECO"
description:"Un sistema de generación de energía eléctrica mediante paneles fotovoltaicos, ECO AMIGABLE/24WHORA/45X39X46,5/PESO 22 KG"
caracteristicas:"Nevera 235 Litros 100% Solar Voltaje 12v/24"
category_id:3
consume:70
id:1
image:"Otros/promo_nevera-50-02.jpg"
price:1412900
 */

fetch("http://127.0.0.1:8000/products/all")
.then(response => response.json())
.then(products => {
  const jsonInfo = [];

  idProducts.forEach(id => {
    const product = products.find(p => p.id === id);
    const similarProduct = products.find(p => p.category_id === product.category_id && p.id != product.id).name;

    productBox.innerHTML+=`
    <div class="productos">
      <div class="img1"><img src="" alt=""></div>    
      <div class="titulo"><h3>${product.name}</h3></div>    
      <div class="calificacion"><p>${generarNumeroAleatorio()}</p></div>    
      <div class="descripcion"><p>${product.description}</p></div>    
      <div class="caracteristicas"><p>${product.caracteristicas}</p></div>    
      <div class="otros"><p> <small>Producto similar:</small> <br>${similarProduct}</p></div>    
      <div class="precio"><p>$${formatearNumero(product.price)}</p></div>    
      <div class="comprar"><p>COMPRAR</p></div>    
      <div class="agregar"><p>Agregar</p></div>
    </div>
    `

    jsonInfo.push({product_id:id});
  });

  fetch("http://127.0.0.1:8000/products/cotizacion",{
    method:"POST",
    headers: {'Content-Type': 'application/json'},
    body:JSON.stringify(jsonInfo),
  })
  .then((response)=>response.json())
  .then(quote => {
    quote.consumptions.forEach(consumption => {
      document.querySelector(".cotizador").appendChild(createQuote(consumption));
    });
  }) 
  .catch(error => {console.log(error);});

})
.catch((error) => {console.log(error);})


// Funciones auxiliares -----------------------------------------------------------------------------

function getIds() {
  let idsValidos = false;

  while (!idsValidos) {
    const ids = prompt("Escriba los ids de los productos separados por coma:");

    // Verificamos que se haya ingresado algo
    if (ids === null) {
      // Si se presionó "Cancelar", salimos del ciclo
      break;
    }

    // Separamos los ids por coma y eliminamos los espacios en blanco
    const listaIds = ids.split(",").map(id => parseInt(id.trim()));

    // Validamos que todos los elementos de la lista sean números enteros
    if (listaIds.every(id => Number.isInteger(id))) {
      idsValidos = true;
      return listaIds;
    } else {
      alert("Por favor, ingrese una lista de números enteros separados por coma.");
    }
  }
}

function generarNumeroAleatorio() {
  // Generar un número aleatorio entre 0 y 1
  const numeroAleatorio = Math.random();
  
  // Ajustar el rango al que necesitamos: 0 <= numeroAleatorio < 1
  const numeroAjustado = numeroAleatorio + 4;

  // Redondear a un decimal
  const numeroRedondeado = Math.round(numeroAjustado * 10) / 10;

  // Devolver el número generado
  return numeroRedondeado;
}

function formatearNumero(numero) {
  // Convertir el número a un string y separar la parte entera de la decimal
  const [parteEntera, parteDecimal] = numero.toString().split('.');

  // Insertar un punto cada tres dígitos en la parte entera
  const parteEnteraFormateada = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Combinar la parte entera formateada y la parte decimal (si existe) en un solo string
  const numeroFormateado = parteDecimal ? `${parteEnteraFormateada},${parteDecimal}` : parteEnteraFormateada;

  // Devolver el número formateado como string
  return numeroFormateado;
}

function createQuote(info) {
  const quote = document.importNode(quoteTemplate,true)
  const quoteInfo = {
    name : quote.querySelector(".inf2 .nombre"),
    hours : quote.querySelector(".inf2 .horas"),
    amount : quote.querySelector(".inf2 .cantidad"),
    consumption : quote.querySelector(".inf2 .consumo"),
    usedHours : quote.querySelector(".inf2 .horasuso"),
    lossPercentage : quote.querySelector(".inf2 .porcentajeperdidas"),
    totalConsumption : quote.querySelector(".inf2 .cantidadconsumo"),
  }

  // Asignar la información del objeto a cada elemento de quoteInfo
  quoteInfo.name.textContent = info.product;
  quoteInfo.hours.textContent = info.hours_used;
  quoteInfo.amount.textContent = info.amount;
  quoteInfo.consumption.textContent = info.consumption_hour;
  quoteInfo.usedHours.textContent = info.hours_used;
  quoteInfo.lossPercentage.textContent = info.loss_percentage;
  quoteInfo.totalConsumption.textContent = info.total_consumption;

  return quote;
}
