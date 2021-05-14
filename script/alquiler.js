var arrayAlquiler = [];
var arrayPeliculas = [];
var arrayCategorias = [];

function cargarInfoPelicula(){
    var peliculas = compruebaLocalStorage();

    var url = window.location.toString();
    var cadenaDividida = url.split("=");
    var id = cadenaDividida[1];

    var lista = document.getElementById("infoPelicula");
    var titulo = document.getElementById("titulo");
    lista.innerHTML = "";
    for (value in peliculas) {
        if (id == peliculas[value].id) {
            lista.innerHTML += "<div id='imagen'><img src=" + peliculas[value].url + " width='320' height='500'/></div>";
        }
    }
}


function cargarEstado() {
    var url = window.location.toString();
    var cadenaDividida = url.split("=");
    var id = cadenaDividida[1];

    var info = document.getElementById("estadoAlquiler");
    info.innerHTML = "";

    var alquileres = compruebaLocalStorageAlquiler();
    var alquilado = false;

    if (alquileres.length == 0){
        imprimirEstadoPelicula(info, id);

    } else {
        for (value in alquileres) {
            if (id == alquileres[value].pelicula.id){
                info.innerHTML =    "<p class='estado'><img src='../img/alquilado.png' width='20px'/>&nbsp;ALQUILADO</p>" + 
                                    "<p><strong>Nombre del Cliente: </strong>" + alquileres[value].cliente + "</p>" + 
                                    "<p><strong>Precio del Alquiler: </strong>" + alquileres[value].precio + " euros</p>" + 
                                    "<p><strong>Fecha de Préstamo: </strong>" + alquileres[value].fechaAlquiler + "</p>" +
                                    "<p><strong>Fecha Devolución: </strong>" + alquileres[value].fechaDevolucion + "</p><br/>" +
                                    "<button onclick='devolucion(" + id + ")'>Confirmar Devolución</button><br/>" + 
                                    "<button onclick='window.location.href=\"../index.html\"'>Volver al menú principal</button>";
                alquilado = true;
            }
        } 
    }

    if (alquilado == false) imprimirEstadoPelicula(info, id);



        
} 



function alquilarPelicula(id){
    var cliente = document.getElementById("cliente").value;
    var precio = document.getElementById("precio").value;

    if (cliente == "" || precio < 0 || precio == ""){
        swal({
            title: 'Error',
            text: 'Introduce los datos correctamente',
            button: 'OK',
            icon: 'warning'        
        });
    } else {
        var peliculas = compruebaLocalStorage();
        
        moment.locale('ES');

        var fechaInicio = moment().format('DD-MM-YYYY');
        var fechaFin =  moment(fechaInicio, 'DD-MM-YYYY').add(10, 'days').format('DD-MM-YYYY');

        var alquileres = compruebaLocalStorageAlquiler();

        for (value in peliculas){
            if (id == peliculas[value].id){
                var alquiler = new Alquiler(peliculas[value], fechaInicio, fechaFin, cliente, precio);
                arrayAlquiler = alquileres;
                arrayAlquiler.push(alquiler);
                localStorage.setItem("arrayAlquiler", JSON.stringify(arrayAlquiler));
                
                swal({
                    title: 'OK',
                    text: 'Alquiler creado correctamemte',
                    button: 'OK',
                    icon: 'success'        
                })
                .then(resultado => {
                    if (resultado.value = 'OK') location.reload();
                });
            }
        }    
    }
}


function resetear(){
    document.getElementById("cliente").value = ""; 
    document.getElementById("precio").value = "";    
}


function devolucion(id){
    var alquileres = compruebaLocalStorageAlquiler();

    for (value in alquileres){
        if (id == alquileres[value].pelicula.id){
            alquileres.splice(value, 1 );
        
            localStorage.removeItem("arrayAlquiler");
            localStorage.setItem("arrayAlquiler", JSON.stringify(alquileres));
        
            swal({
                title: 'OK',
                text: 'Devolcución confirmada correctamente',
                button: 'OK',
                icon: 'success'        
            })
            .then(resultado => {
                if (resultado.value = 'OK') location.reload();
            });
        }
    }
}


function imprimirEstadoPelicula(div, id){
    div.innerHTML =   "<p class='estado'><img src='../img/disponible.png' width='20px'/>&nbsp;DISPONIBLE</p><br/>" + 
                            "<input type='text' name='cliente' id='cliente' placeholder='Nombre del Cliente'><br/>" + 
                            "<input type='number' name='precio' id='precio' placeholder='Precio'><br/>" +
                            "<button onclick='alquilarPelicula(" + id + ")'>Alquilar</button><br/>" + 
                            "<button onclick='resetear()'>Resetear</button><br/>" +
                            "<button onclick='window.location.href=\"../index.html\"'>Volver al menú principal</button><br/>";
    return div;
}