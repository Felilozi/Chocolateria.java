//Estos son los productos  es un simulador //
class Producto {
  constructor(nombre, precio,sabor) {
      this.nombre  = nombre.toLowerCase();
      this.precio  = parseFloat(precio);
      this.sabor =  sabor;
  }
  sumaIva() {
      this.precio = this.precio * 1.21;//21%
  }
}

catalogo =[
  new Producto("blanco",1200, "blanco"),
  new Producto("negro",1300,"negro"),
  new Producto("leche",1400, "leche"),
  new Producto("menta",1300, "menta" ),
  new Producto("budin de naranja",700, "naranja" ), 
  new Producto("budin de manzana",600, "manzana"), 
  new Producto("budin de Limon",800, "limon")
]

class Detalledecompra {
  constructor(nombre, precio,sabor) {
      this.nombre  = nombre;
      this.precio  = parseFloat(precio);
      this.sabor =  sabor;
  }}

//////////////////////funciones //////////////////
//-----------Primara parte esto es una busqueda que primero se va iterar para que vean los producto --------------------/*
let busqueda = prompt("Quiere buscar por 'nombre' o por 'precio'" );
function busquedas(busqueda){ 
  if (busqueda === "nombre"){
    pregunta1 = prompt("Ingrese el nombre del producto que estas buscando");
    return  catalogo.filter((x) => x.nombre === pregunta1.toLowerCase() )
  }
  else if(busqueda === "precio"){
    a = Number(prompt("Busqueda por precio ,ingrese el valor inicial"))
    b = Number(prompt("Ingrese el valor final"))

    return catalogo.filter((x) => x.precio > a && x.precio <= b)
}}

console.log(busquedas(busqueda))
//-----------Segunda parte esto te permite elegir las cantidades del producto que elegis y el precio total de tu comprar--------------------/*
function bcompra(busquedaCatalogo){//"bCompra = buscador de compras "  
  
  const r = catalogo.filter((x) => x.nombre === busquedaCatalogo.toLowerCase())
  const preciosfil =r.reduce((acumulador, producto) => acumulador + producto.precio , 0 );

  let cantidadProduc= Number(prompt("Cuantos catidad necesitas" ));
  const detalle = new Detalledecompra(r[0].nombre,preciosfil*cantidadProduc,r[0].sabor) 
  return detalle
}
/* Estoy lo voy a usar  mas tarde
function bcompra(busquedaCatalogo){//"bCompra = buscador de compras "  
  
  const r = catalogo.filter((x) => x.nombre === busquedaCatalogo.toLowerCase())
  const preciosfil =r.reduce((acumulador, producto) => acumulador + producto.precio , 0 );

  let cantidadProduc= Number(prompt("Cuantos catidad necesitas" ));
  return preciosfil *cantidadProduc;

}*/
let cantidadChoco = parseInt(prompt("Cuantos productos desea comprar"));
const detallecompra = []
let precioTotal = 0;
do {
  precioTotal = 0;
  let texto = "Los sabores elegidos son:" ;
  for ( i = 0 ; i < cantidadChoco; i++){
    let busquedaCatalogo = prompt("Selecciona el producto" )  
    precio = bcompra(busquedaCatalogo);
    detallecompra.push(precio) ;  
    console.log(busquedaCatalogo + " " + precio.precio);
    precioTotal = precioTotal + precio.precio;
    texto = texto + " " + busquedaCatalogo;

  }
  if (isNaN(precioTotal)) {
    alert("Hubo un error al calcular vuelva a ingresar su pedido");
  }

  else {
    alert(texto + " " +" y el precio total es: "+ precioTotal    );
    

  }
}
while (isNaN(precioTotal))

console.log(detallecompra)