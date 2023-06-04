
class ProductoLS {
    constructor(id,nombre, precio,sabor,img,cantidad) {
        this.id = id
        this.nombre  = nombre;
        this.precio  = parseFloat(precio);
        this.sabor =  sabor;
        this.img = img;
        this.cantidad = parseInt(cantidad);
        // this.stock = stock;
    }
    sumaIva() {
        this.precio = this.precio * 1.21;//21%
    }
}



const productoV =$("#productoV")
const verCarrito = document.getElementById("verCarrito");
const modalConteiner = document.getElementById("modalConteiner");


let carrito = [];// creando un array 
let catalogo = [];// creando un

//Fetch productos
fetch('./js/productos.json')
.then((res) => res.json())
.then((data) =>{
    catalogo = [...data]
    data.forEach((producto) =>{
// for (const producto of catalogo) {
    //Creamos un nodo <li> y agregamos al padre en cada ciclo
    let content = document.createElement("div");
    content.innerHTML = `<img  class="tamaño "src="./assets/img/${producto.img}" >
                    <h3 class=" texto-carrito  "> Producto: ${producto.nombre} </h3>
                    <p class="texto-carrito"> Precio: $${producto.precio} </p>
                    
                    <input id="${producto.id}" class="probando" type="number" name="cant" size="0" required placeholder="Ingrese cantidad">
                    `;
    content.className = "card col-4 p-3 d-flex "
    productoV.append(content);
    let comprar = document.createElement("button");
    comprar.innerText ="Agregar al carrito";
    comprar.className="comprar btn btn-warning "
    
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
        
        
        const carritoLS = new ProductoLS(producto.id,producto.nombre,producto.precio*cant.value,producto.sabor,producto.img,
        cant.value); 
        const localcarrito =  JSON.parse(localStorage.getItem(producto.nombre));
        if(localcarrito){
            carritoLS.cantidad += localcarrito.cantidad;
            carritoLS.precio += localcarrito.precio;

        }
        // local Storge 
        const enjson = JSON.stringify( carritoLS )
        localStorage.setItem(producto.nombre,enjson);
        Swal.fire({
            title: 'Se agrego al carrito!',  
            icon: 'success',
            background:'#ffecd2', 
                
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
                timer: 2000,
                showConfirmButton: false
            
            })
        
        
    });}
    )})////aca cierra 


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
            $("#modalConteiner").css("display", "none");
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
            carritoContenedor.innerHTML =`<img  class="tamaño1 m-3"src="./assets/img/${salida.img}" >
            <p class="texto-carrito"> Producto: ${salida.nombre} <p>
            <p class="texto-carrito ">Cantidad : ${salida.cantidad} </p>
            <p class="texto-carrito"> Precio: $${salida.precio} </p>
            `;

            modalConteiner.append(carritoContenedor);
            //////////////////////////////////////////////////////

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
                total1.innerHTML = `total de compra : $${totalLS - salida.precio}
                `
                
                
                
                localStorage.setItem("Total",totalLS - salida.precio);
            })
            carritoContenedor.append(boton);

        }});
        //////////////////////////////////////////////////////
        const total = carritoLS.reduce((acc,catalogo) => acc + catalogo.precio,0);
        const totaldelcompra = document.createElement('div');
        totaldelcompra.className = 'totalCompra';
        totaldelcompra.innerHTML = `total de compra : $${total}
        `
        totaldelcompra.id = "totalcompra2"
        /////boton de finalizar compra
        const btn = document.createElement('button');
        btn.innerText = "Finalizar la compra"
        btn.id = "myBtn"
        btn.className = "btn btn-warning m-3"
        btn.addEventListener('click', () => {


            Swal.fire({
                title: 'Genial!',
                    text: 'Has finalizado tu compra ',
                    
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    },
                    timer: 2100,
                    showConfirmButton: false
                
                })
                carritoLS.forEach(el => {
                    localStorage.removeItem(el.nombre );

                })
            // Cerrar el carrito para arriba 

            $("#modalConteiner").css("display", "none");
            let posicion2 = $("#scroll").offset().top;
                    $("html, body").animate({ scrollTop: posicion2 }, 100);

            })


            
            

        
        modalConteiner.append(totaldelcompra);
        modalConteiner.append(btn);
        
        localStorage.setItem("Total",total);
        

            
        
    });
