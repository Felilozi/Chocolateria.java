
class Producto {
    constructor(id,nombre, precio,sabor,img) {
        this.id = id
        this.nombre  = nombre;
        this.precio  = parseFloat(precio);
        this.sabor =  sabor;
        this.img = img
    }
    sumaIva() {
        this.precio = this.precio * 1.21;//21%
    }
}
class ProductoLS {
    constructor(id,nombre, precio,sabor,img,cantidad) {
        this.id = id
        this.nombre  = nombre;
        this.precio  = parseFloat(precio);
        this.sabor =  sabor;
        this.img = img;
        this.cantidad = parseInt(cantidad);
    }
    sumaIva() {
        this.precio = this.precio * 1.21;//21%
    }
}

catalogo =[
    new Producto(1,"Barra de chocolate blanco",1200, "blanco","chocolate_blanco.jpg"),
    new Producto(2,"Barra de chocolate negro",1300,"negro","chocolate_negro.jpg"),
    new Producto(3,"Barra de chocolate leche",1400, "leche","chocolate_leche.jpg"),
    new Producto(4,"Budin de naranja",700, "naranja","Budin_de_naranja.jpg"), 
    new Producto(5,"Budin de manzana",600, "manzana","Budin_de_manzana.jpg"), 
    new Producto(6,"Budin de Limon",800, "limon","Budin_de_limon.jpg"),
]


//////Lista de producto//////////////////////////////////

const productoV = document.getElementById("productoV");
const verCarrito = document.getElementById("verCarrito");
const modalConteiner = document.getElementById("modalConteiner");

//Array con la información a agregar
let carrito = [];// creando un array 

//Iteramos el array con for...of
for (const producto of catalogo) {
    //Creamos un nodo <li> y agregamos al padre en cada ciclo
    let content = document.createElement("div");
    content.innerHTML = `<img  class="tamaño"src="./assets/img/${producto.img}" >
                    <h3> Producto: ${producto.nombre} </h3>
                    <p> Precio: ${producto.precio} </p>
                    
                    <input id="${producto.id}" class="probando" type="number" name="cant" size="0" required placeholder="Ingrese cantidad">
                    `;
    content.className = "card col-4 p-3"
    productoV.append(content);
    let comprar = document.createElement("button");
    comprar.innerText ="Agregar al carrito";
    comprar.className="comprar"
    content.append(comprar);
    comprar.addEventListener("click",() => {
        let cant = document.getElementById(producto.id);
        if (cant.value == '') {
            cant.value = 1;
        }
        carrito.push({id: producto.id, 
                nombre: producto.nombre,
                precio: producto.precio * cant.value,
                img: producto.img});
        console.log(carrito);   
        
        const carritoLS = new ProductoLS(producto.id,producto.nombre,producto.precio*cant.value,producto.sabor,producto.img,
        cant.value); 
        const localcarrito =  JSON.parse(localStorage.getItem(producto.nombre));
        if(localcarrito){
            carritoLS.cantidad += localcarrito.cantidad;
            carritoLS.precio += localcarrito.precio;

        }
        // localStorage.setItem(producto.nombre,JSON.stringify({id,nombre,precio,img}=producto) );
        localStorage.setItem(producto.nombre,JSON.stringify( carritoLS ));
        
        
    });}


    ////modal-header
        verCarrito.addEventListener("click",() => {
        modalConteiner.innerHTML="";
        modalConteiner.style.display = "flex";
        const modalCarrito = document.createElement("div");
        modalCarrito.className = "modal-carrito";
        modalCarrito.innerHTML =`<h2 class="modal-carrito-text">Carrito</h2>`
        modalConteiner.append(modalCarrito);

    //////// booton
        const boton = document.createElement("h1");
        boton.innerText = "x";
        boton.className = "boton-x";
        boton.addEventListener ("click", () =>{
            modalConteiner.style.display= "none";
        })
        modalCarrito.append(boton);
        

    ////carrito en pantalla 
    let carritoLS =[];
    let i = 0;
        catalogo.forEach((producto)  => {
            
            
            const localcarrito =  JSON.parse(localStorage.getItem(producto.nombre));
                if(localcarrito){
                    carritoLS.push(localcarrito); 
                
                // render( carrito );
                console.log(carritoLS);
            let salida = carritoLS[i];
            i++;
            let carritoContenedor = document.createElement("div");
            // let cant = document.getElementById(producto.id);
            carritoContenedor.id = salida.nombre + "x";
            carritoContenedor.className = "carrito-contenedor";
            carritoContenedor.innerHTML =`<img  class="tamaño"src="./assets/img/${salida.img}" >
            <h3> Producto: ${salida.nombre} </h3>
            <p>Cantidad : ${salida.cantidad} </p>
            <p> Precio: ${salida.precio}$ </p>
            `;

            modalConteiner.append(carritoContenedor);
            const boton = document.createElement("h1");
            boton.innerText = "x";
            boton.className = "boton-x";
            boton.id = salida.id + "x";
            boton.addEventListener ("click", () =>{
                const deletecarrito = document.getElementById(salida.nombre + "x");
                const deleteX = document.getElementById(salida.id + "x");
                deletecarrito.remove();
                deleteX.remove();
                localStorage.removeItem(salida.nombre );
                const totalLS = localStorage.getItem("Total");
                // const posicionC = carrito.indexOF('')
                const total1 = document.getElementById("totalcompra2")
                total1.innerHTML = `total de compra : ${totalLS - salida.precio}$`
                localStorage.setItem("Total",totalLS - salida.precio);
            })
            carritoContenedor.append(boton);

        }});
        const total = carritoLS.reduce((acc,catalogo) => acc + catalogo.precio,0);
        const totaldelcompra = document.createElement('div');
        totaldelcompra.className = 'totalCompra';
        totaldelcompra.innerHTML = `total de compra : ${total}$`
        totaldelcompra.id = "totalcompra2"

        modalConteiner.append(totaldelcompra);
        localStorage.setItem("Total",total);
        
    });
    
