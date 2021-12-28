// Uso de json

function cargardatos(){
    
    let usuario = document.getElementById ("usuario");
    let telefono = document.getElementById ("telefono");
    let mail = document.getElementById ("mail");
    if ( usuario.value == ""){
        alert ("Ingrese un nombre");
        document.getElementById("usuario").focus();
    }else if ( telefono.value == "") {
        alert ("Ingrese un télefono");
        document.getElementById("telefono").focus();
    }else if ( mail.value == "") {
        alert ("Ingrese su mail");
        document.getElementById("mail").focus();
    }else if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(mail.value)){
        alert ("Ingrese su mail");
        document.getElementById("mail").focus();
    }else {
        let usuario = document.getElementById ("usuario").value;
        let telefono = document.getElementById ("telefono").value;
        let mail = document.getElementById ("mail").value;
        let datos = { usuario, telefono, mail };
        let datosJSON = JSON.stringify (datos); 
        localStorage.setItem("datospresupuesto", datosJSON );
        location.assign("presupuesto.html");
        window.open("presupuesto.html");

    }
}


// Evento enter en el formulario de datos. 
window.addEventListener("keydown", teclaEnter);
function teclaEnter(e){
    let usuario = $("usuario").val();
    let telefono = $("telefono").val();
    let mail = $("mail").val();
    
    if (e.key== "Enter" && usuario.value == ""){
        document.getElementById("usuario").focus();
    }
    if (e.key== "Enter" && usuario.value != ""){
        document.getElementById("telefono").focus();
    }
    if (e.key== "Enter" && telefono.value != ""){
        document.getElementById("mail").focus();
    }
    if (e.key== "Enter" && mail.value != ""){
        document.getElementById("btn-cargarnombre").focus();
    }

}

// Boton Elminar.
let botonEliminar = document.querySelectorAll(".btn-eliminar");


for (let boton of botonEliminar){
    boton.addEventListener("click", eliminarFor)
}

function eliminarFor(){

    document.getElementById ("usuario").value="";
    document.getElementById ("telefono").value="";
    document.getElementById ("mail").value ="";

    

}





