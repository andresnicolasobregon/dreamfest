let total= 0;
let carrito = [];
// Cargas datos almacenados en el storage
function cargardatos(){
    
    let datosParse = JSON.parse (localStorage.getItem("datospresupuesto"));
    $("#lblbienvenida").append("¡Te damos la bienvenida <span>" + datosParse.usuario + "</span>!");
    $("#lista").append("<li>Nombre y Apellido: <span><b>" + datosParse.usuario + "</b></span></li>");
    $("#lista").append("<li>Teléfono: <span><b>" + datosParse.telefono + "</b></span></li>");
    $("#lista").append("<li>Mail: <span><b>" + datosParse.mail + "</b></span></li>");
    // Carga el carrito cuado actalizo la págia 
    let serviciosParse = JSON.parse (localStorage.getItem("datoscompra"));
    let total1=0;
    if (serviciosParse != null){

        for (let i = 0; i < serviciosParse.length ; i++){

            $("#tbody").append(`
            <tr id= ${serviciosParse[i].servicio} >
                <td> ${serviciosParse[i].servicio} </td>
                <td> ${serviciosParse[i].precio} </td>
            </tr>    
            `);
            //  Carga el precio total

            newWord1 = serviciosParse[i].precio.replace("$", "")
            total1 = parseFloat(total1) + parseFloat(newWord1);
            $("#precioTotalTabla").html(`
            $ ${total1}
            `);
            //  Carga el carrito
            const producto = {
                servicio : serviciosParse[i].servicio,
                precio : serviciosParse[i].precio,
            }
            carrito.push(producto);
            
        }
        total = total1;
        console.log(total);

    }
}
cargardatos();

// Crea nuevos servicios a partir de un array. 

const servicioArray = [];
class tipodeservicio{
    constructor( servicio, precio, descripcion, imagen){
        this.servicio = servicio;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagen = imagen;
    }
}

servicioArray.push(new tipodeservicio( "Salón", 20500 , "Salón de fiesta", "imagenes/salon.jpg"));
servicioArray.push(new tipodeservicio( "Personal", 5500 , "Platos, cubiertos y copas", "imagenes/moso.jpg"));
servicioArray.push(new tipodeservicio( "Vajilla", 5500 , "Platos, cubiertos y copas", "imagenes/vajilla.jpg"));
servicioArray.push(new tipodeservicio( "Decoración", 5500 , "La mejor decoración, con telas.", "imagenes/decoracion.jpg"));
servicioArray.push(new tipodeservicio( "Musicalización", 5500 , "El mejor DJ y la mejor música", "imagenes/musica.jpg"));
servicioArray.push(new tipodeservicio( "Menú", 5500 , "La comida que más te gusta", "imagenes/menu.jpg"));
servicioArray.push(new tipodeservicio( "Bebidas", 5500 , "Tragos, vinos, gaseosas.", "imagenes/bebidas.jpg"));
servicioArray.push(new tipodeservicio( "Torta", 5500 , "Torta principal con decoración", "imagenes/torta.jpg"));
servicioArray.push(new tipodeservicio( "Dulces", 5500 , "Mesa de dulces, con gran variedad", "imagenes/dulces.jpg"));
servicioArray.push(new tipodeservicio( "Invitaciones", 5500 , "Tarjetas de invitación personalizadas", "imagenes/invitacion.jpg"));
servicioArray.push(new tipodeservicio( "Fotografía", 5500 , "Servicio de fotos, con fotografos profesionales", "imagenes/camara.jpg"));
servicioArray.push(new tipodeservicio( "Souvenir", 5500 , "Recuerdos inolvidables", "imagenes/souvenir.jpg"));
servicioArray.push(new tipodeservicio( "Cintas", 5500 , "Ceremonia de cintas", "imagenes/cintas.jpg"));
servicioArray.push(new tipodeservicio( "Velas", 5500 , "Ceremonia de velas", "imagenes/velas.jpg"));
servicioArray.push(new tipodeservicio( "Cotillon", 1500 , "Cotillon para el baile carioca", "imagenes/cotillon.jpg"));


function serviciosMenu (){
    for (let i = 0; i < servicioArray.length ; i++){
        $("#boxservicio").append(`
        <div class="box-menu-hijo">
        <img src="${servicioArray[i].imagen}" alt="foto de fiesta" width="200">
        <h3> ${servicioArray[i].servicio} </h3>
        <p> ${servicioArray[i].descripcion} </p>  
        <h2>$ ${servicioArray[i].precio} </h2>    
        <button class="btn-agregar" id= "id${servicioArray[i].servicio}" >Agregar</button>
        <button class="btn-eliminar" id= "eliminar${servicioArray[i].servicio}" disabled>Eliminar</button>
        </div> 
        `);
        
    }
  }
serviciosMenu();

// Deshabilita los botones agregar cuando se cargan los productos. 

function deshabilitarBotonAlCargar(){
    let serviciosParse = JSON.parse (localStorage.getItem("datoscompra"));
    if (serviciosParse != null){
        for (let i = 0; i < serviciosParse.length ; i++){
            
            let idboton = "id" + serviciosParse[i].servicio;
            idboton =  idboton.replace(/ /g, ""); 
            let idboton1 = "eliminar" + serviciosParse[i].servicio;
            idboton1 =  idboton1.replace(/ /g, ""); 
            document.getElementById(idboton).disabled = true;
            document.getElementById(idboton1).disabled = false;
            document.getElementById(idboton).style.background  = "#0000008a";
        }
    }
}
deshabilitarBotonAlCargar()

// Boton agregar.
let botonAgregar = document.querySelectorAll(".btn-agregar");

for (let boton of botonAgregar){
    boton.addEventListener("click", agregarCarrito)
}

function agregarCarrito(e){
    let hijo = e.target;
    let padre = hijo.parentNode;
    let nombreServicio = padre.querySelector("h3").textContent;
    let precioServicio = padre.querySelector("h2").textContent;

    const producto = {
        servicio : nombreServicio,
        precio : precioServicio,
    }
    carrito.push(producto);
    let servicioJSON = JSON.stringify (carrito); 
    localStorage.setItem("datoscompra", servicioJSON );
    mostrarCarrito (producto);
    deshabilitarBoton(padre);
    precioTotal(precioServicio);
}

/*desabilita el botón despues de seleccionarlo*/

function deshabilitarBoton(padre){
    let idboton = padre.querySelector(".btn-agregar").id;
    let idboton1 = padre.querySelector(".btn-eliminar").id;
    document.getElementById(idboton).disabled = true;
    document.getElementById(idboton1).disabled = false;
    document.getElementById(idboton).style.background  = "#0000008a";

}

/*Habilita el boton despues de seleccionarlo*/

function habilitarBoton(padre){
    let idboton = padre.querySelector(".btn-agregar").id;
    let idboton1 = padre.querySelector(".btn-eliminar").id;
    document.getElementById(idboton).disabled = false;
    document.getElementById(idboton1).disabled = true;
    document.getElementById(idboton).style.background  = "#212121";

}

/*Calcular el precio total*/

function precioTotal(precioServicio){

    newWord = precioServicio.replace("$", "")
    total = parseFloat(total) + parseFloat(newWord);
    $("#precioTotalTabla").html(`
    $ ${total}
    `);

}

/*Agrega un producto al carrito*/

function mostrarCarrito(producto){

    $("#tbody").append(`
    <tr id= ${producto.servicio} >
        <td> ${producto.servicio} </td>
        <td> ${producto.precio} </td>
    </tr>    
    `);

}


// Boton Elminar.
let botonEliminar = document.querySelectorAll(".btn-eliminar");

for (let boton of botonEliminar){
    boton.addEventListener("click", eliminarProducto)
}

function eliminarProducto(e){
    let hijo = e.target;
    let padre = hijo.parentNode;
    console.log(padre);
    let nombreServicio = `#${padre.querySelector("h3").textContent}`;
    let precioServicio = padre.querySelector("h2").textContent;
    nombreServicio =  nombreServicio.replace(/ /g, ""); 
    $(nombreServicio).remove();
    precioDecuento(precioServicio);
    habilitarBoton(padre);
    nombreServicio = `${padre.querySelector("h3").textContent}`;
    console.log(nombreServicio);
    for (let i = 0; i < carrito.length ; i++){
        if (carrito[i].servicio == nombreServicio ) {
            carrito.splice(i, 1);
        }
             
    }
    let servicioJSON = JSON.stringify (carrito); 
    localStorage.setItem("datoscompra", servicioJSON );

}

// Boton Elminar todo.
let botonBorrar = document.querySelectorAll(".btn-borrar");

for (let boton of botonBorrar){
    boton.addEventListener("click", eliminarCarrito)
}

function eliminarCarrito(){
    swal({
        title: "¡Cuidado!",
        text: "¿Desea borrar el presupuesto?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("¡Listo! ¡El presupuesto ha sido borrado!", {
            icon: "success",
            
          });
          localStorage.removeItem("datoscompra");
          location.reload();
 
        } else {
          swal("¡Su presupuesto está a salvo!");
        }
      });

}

// Boton agendar entrevista.

let botonEntrevista = document.querySelectorAll(".btn-entrevista");

for (let boton of botonEntrevista){
    boton.addEventListener("click", agregarEntrevista)
}

function agregarEntrevista(e){
 let datosParse = JSON.parse (localStorage.getItem("datospresupuesto"));
 let serviciosParse = JSON.parse (localStorage.getItem("datoscompra"));
 document.getElementById("mail").value = datosParse.mail;
 let serviciosReservados="";
 if (serviciosParse != null){
    for (let i = 0; i < serviciosParse.length ; i++){
        serviciosReservados = serviciosReservados + serviciosParse[i].servicio + " " + serviciosParse[i].precio + " ";
    }
}
let textoEnviar= "Nombre y Apellido: " + datosParse.usuario + " " + "Télefono: " + datosParse.telefono + " " + serviciosReservados;
confirmarEntrevista(textoEnviar);
 document.getElementById("mensaje").value =  textoEnviar ;

}

function confirmarEntrevista(textoEnviar) {
    swal({
        title: "¡Está seguro que desea confirmar una entrevista!",
        text: textoEnviar,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("¡Listo! ¡A la brevedad nos comunicaremos!", {
            icon: "success",
            
          });
          localStorage.removeItem("datoscompra");
          location.reload(); 
        } else {
          swal("¡Tu presupuesto no fue enviado!");
        }
      });
}


/*Descontar precio de producto eliminado*/
function precioDecuento(precioServicio){

    newWord = precioServicio.replace("$", "")
    console.log(newWord); 
    total = parseFloat(total) - parseFloat(newWord);
    console.log(total);
    $("#precioTotalTabla").html(`
    $ ${total}
    `);

}

/*Enviar Formulario*/
var form = document.getElementById("my-form");
    
async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("my-form-status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        status.innerHTML = "Gracias por comunicarte con nuestro equipo. ¡En breve nos comunicaremos!";
        form.reset()
      }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
      });
    }
form.addEventListener("OK", handleSubmit)



// animación inicial.  

$("#boxnav")
.slideUp(5000);