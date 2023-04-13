

let cantidadChoco = parseInt(prompt("Cuantos sabores de chocolate queres comprar"));
function productos(sabor){
  switch(sabor){
    case "leche":
    resultado = 300;
    return  resultado;
    break
  
    case "blanco":
      resultado = 200;
      return resultado;
    break

    case "semiamargo":
      resultado = 250;
      return resultado;
    break

    default:
      return alert("Error los unicos sabores que tenemos son de leche, semiamargo o blanco muchas gracias ");
    break  

  }
}
let precioTotal = 0;
do {
  precioTotal = 0;
  let texto = "Los sabores elegidos son:" ;
  for ( i = 0 ; i < cantidadChoco; i++){
    let saboresChocolate = prompt("Que sabores de chocolate desea elegir (blanco, semiamargo o leche) ");
    precio = productos(saboresChocolate.toLowerCase());
    console.log(saboresChocolate + " " + precio);
    precioTotal = precioTotal + precio;
    texto = texto + " " + saboresChocolate;

  }
  if (isNaN(precioTotal)) {
    alert("Hubo un error al calcular vuelva a ingresar su pedido");
  }

  else {
    alert(texto + " " +" y el precio total es: "+ precioTotal);
  }
}
while (isNaN(precioTotal));


  
