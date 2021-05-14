var arrayPeliculas = [];
var arrayCategorias = [];
var valor = true;


const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}



// Se encarga de imprimir las categorias en la lista despegable
function cargarCategorias() {
    var categorias = compruebaLocalStorageCategorias();

    // Imprime los datos en la lista despegable del formulario de Películas
    var select = document.getElementById("categoria");

    for (value in categorias) {
        var option = document.createElement("option");
        option.text = categorias[value].nombre;
        select.add(option);
    }

    var lista = document.getElementById("listaCategorias");
    lista.innerHTML = "";
    var parametro = ""; 

    for (value in categorias) {
        parametro = "mostrarInput" + value;
        lista.innerHTML += "<li>" + categorias[value].nombre + "&nbsp;&nbsp;&nbsp;" + 
                            "<input type='image' name='modificar' src='img/edit.png' width='17px' onclick='cargarFormulario(\"" + parametro + "\")'>" + 
                            "&nbsp;<input type='image' name='borrar' src='img/delete.png' width='17px' onclick='borrarCategoria(" + value + ")'></li>" + 
                            "<p style='display:none' id='" + parametro + "'><input type='text' name='nuevoRegistro' value='" + categorias[value].nombre + "' id='modifica" + value +"' size='10'><br/>" + 
                            "<button onclick='modificaCategoria(" + value +",\"modifica" + value + "\")'>Guardar</button>&nbsp;<button onclick='cancelar(\"" + parametro + "\")'>Cancelar</button></p><br/>";
    }
}


// Oculta el formulario
function cancelar(id) {
    var x = document.getElementById(id);
    if (x.style.display === "block") {
        x.style.display = "none";
    }
}

// Botón guardar que recoge los datos del formulario
function registrarDatos() {
    var x1 = document.getElementById("nombre").value;
    var x2 = document.getElementById("director").value;
    var x3 = document.getElementById("anno").value;
    var x4 = document.getElementById("categoria").value;
    var x5 = document.getElementById("duracion").value;
    var x6 = document.getElementById("url").value;

    var peliculas = compruebaLocalStorage();

    var id = 0;

    if (peliculas.length != 0){
        id = peliculas[peliculas.length - 1].id;
        id++; 
    }    

    if (x1=="" || x2 == "" || x3 == "" || x5 == "" || x6 == "" || x4 == "Categoría") {
        swal({
            title: 'Error',
            text: 'Rellena todos los campos',
            button: 'OK',
            icon: 'warning'        
        });
        
    } else {
        let categoria = new Categoria(x4);
        let pelicula = new Pelicula(id, x1, x2, x3, categoria, x5, x6);
        arrayPeliculas = peliculas;
        arrayPeliculas.push(pelicula);
        localStorage.setItem("arrayPeliculas", JSON.stringify(arrayPeliculas));
    }    
}


function añadirCategoria(){
    var x = document.getElementById("añadirCat");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
}


// Funcion que carga el localStorage de categorias y añade una nueva con el valor obtenido del formulario
function registrarCategoria(){
    var x1 = document.getElementById("nombreCat").value;

    var categorias = compruebaLocalStorageCategorias();
    
    // Comprueba si la categoría existe, si no, crea una nueva
    let existe = false;
    let sinParametro = false;

    for (var i = 0; i<categorias.length;i++){
        var nombre = removeAccents(categorias[i].nombre.toLowerCase());
        var x1SinTildes = removeAccents(x1.toLowerCase());
        if (nombre == x1SinTildes) existe=true;
        if (x1SinTildes == "") sinParametro = true;
    }    

    if (existe) alert("La categoría ya existe. Introduce otra.");
    else if (sinParametro == true) {
        alert("Debes introducir un parámetro");
        location.reload();
    } else {
        var categoria = new Categoria(x1);
        arrayCategorias = categorias;
        arrayCategorias.push(categoria);
        localStorage.setItem("arrayCategorias", JSON.stringify(arrayCategorias));
    }
}


// Carga la lista de películas
function cargarPeliculas(){
    var peliculas = compruebaLocalStorage();

    var lista = document.getElementById("listaPeliculas");
    lista.innerHTML = "";
    
    imprimirPeliculas(peliculas, lista);
}


function borrarPelicula(id){
    var peliculas = compruebaLocalStorage();

    for (value in peliculas){
        if (id == peliculas[value].id){
            if ( value !== -1 ) {
                peliculas.splice( value, 1 );
            }
        
            localStorage.removeItem("arrayPeliculas");
            localStorage.setItem("arrayPeliculas", JSON.stringify(peliculas));
        }
    }

    location.reload();
}


// Borra una categoria
function borrarCategoria(id){
    var categorias = compruebaLocalStorageCategorias();
 
    if ( id !== -1 ) {
        categorias.splice( id, 1 );
    }

    localStorage.removeItem("arrayCategorias");
    localStorage.setItem("arrayCategorias", JSON.stringify(categorias));

    location.reload();
}


function cargarCategoriasModif(){
    var categorias = compruebaLocalStorageCategorias();

    let categoriasOrdenadas = categorias.sort((a, b)=> a.nombre.localeCompare(b.nombre));

    // Imprime los datos en la lista despegable del formulario de Películas
    var select = document.getElementById("modifCategoria");

    for (value in categorias) {
        var option = document.createElement("option");
        option.setAttribute("value",categorias[value].nombre);
        option.text = categorias[value].nombre;
        select.add(option);
    }
}


function cargarFormularioModificar(){
    var url = window.location.toString();
    var cadenaDividida = url.split("=");
    var id = cadenaDividida[1];
    var categ = cadenaDividida[2];

    var peliculas = compruebaLocalStorage();

    for (value in peliculas){
        if (id == peliculas[value].id){
            document.getElementById("modifNombre").setAttribute("value", peliculas[value].nombre);
            document.getElementById("modifDirector").setAttribute("value", peliculas[value].director);
            document.getElementById("modifAnno").setAttribute("value", peliculas[value].anno);
            $(document).ready(function(){
                $('#modifCategoria > option[value="' + categ + '"]').attr('selected', 'selected');
            });
            document.getElementById("modifDuracion").setAttribute("value", peliculas[value].duracion);   
            document.getElementById("modifUrl").setAttribute("value", peliculas[value].url); 
        }
    }

    
}



function cargarFormulario(id){
    var x = document.getElementById(id);
    if (x.style.display === "none") {
        x.style.display = "block";
    }
}


function modificaCategoria(id, value){
    var input = document.getElementById(value).value;

    var categorias = compruebaLocalStorageCategorias();

    localStorage.removeItem("arrayCategorias");

    categorias[id].nombre = input;

    localStorage.setItem("arrayCategorias", JSON.stringify(categorias));

    swal({
        title: 'OK',
        text: 'Categoría modificada correctamemte',
        button: 'OK',
        icon: 'success'        
    })
    .then(resultado => {
        if (resultado.value = 'OK') location.reload();
    });
}



function modificaPelicula(){
    var url = window.location.toString();
    var cadenaDividida = url.split("=");
    var id = cadenaDividida[1];

    var peliculas = compruebaLocalStorage();

    var nombre = document.getElementById("modifNombre").value;
    var director = document.getElementById("modifDirector").value;
    var anno = document.getElementById("modifAnno").value;
    var categoria = document.getElementById("modifCategoria").value;
    var duracion = document.getElementById("modifDuracion").value;
    var url = document.getElementById("modifUrl").value;

    if (nombre=="" || director == "" || anno == "" || duracion == "" || url == ""){
        swal({
            title: 'Error',
            text: 'Introduce los datos correctamente',
            button: 'OK',
            icon: 'warning'        
        })
        .then(resultado => {
            if (resultado.value = 'OK') location.reload();
        });
    } else if (categoria == ""){ 
        swal({
            title: 'Error',
            text: 'Introduce una opción de la lista despegable',
            button: 'OK',
            icon: 'warning'        
        })
        .then(resultado => {
            if (resultado.value = 'OK') location.reload();
        });
    } else {
        for (value in peliculas){
            if (id == peliculas[value].id){
                localStorage.removeItem("arrayPeliculas");

                peliculas[value].nombre = nombre;
                peliculas[value].director = director;
                peliculas[value].anno = anno;
                peliculas[value].categoria.nombre = categoria;
                peliculas[value].duracion = duracion;
                peliculas[value].url = url;

                localStorage.setItem("arrayPeliculas", JSON.stringify(peliculas));  

                swal({
                    title: 'OK',
                    text: 'Película modificada correctamente',
                    button: 'OK',
                    icon: 'success'        
                })
                .then(resultado => {
                    if (resultado.value = 'OK') window.location.href = "../index.html";
                });
            }
        }
    }       
}


function reset(){
    document.getElementById("modifNombre").value = ""; 
    document.getElementById("modifDirector").value = ""; 
    document.getElementById("modifAnno").value = "";
    document.getElementById("modifCategoria").value = ""; 
    document.getElementById("modifDuracion").value = ""; 
    document.getElementById("modifUrl").value = ""; 
}



function ordenar(id) {
    var flecha = document.getElementById(id);
    var cadenaDividida = id.split("_");
    var tipo = cadenaDividida[1];
    valor ? flecha.innerHTML = tipo + " &nbsp;<img src='img/arriba.png'>" : flecha.innerHTML = tipo + " &nbsp;<img src='img/abajo.png'>";

    var peliculas = compruebaLocalStorage();

    if (tipo == 'Nombre'){
        if (valor == true){         

            peliculas = peliculas.sort((a, b)=> a.nombre.localeCompare(b.nombre));

            var lista = document.getElementById("listaPeliculas");
            lista.innerHTML = "";
            for (var i = peliculas.length - 1; i >= 0; i--) {
                ordenarPeliculas(i, peliculas, lista);
            }
        } else {
            peliculas = peliculas.sort((a, b)=> a.nombre.localeCompare(b.nombre));

            var lista = document.getElementById("listaPeliculas");
            lista.innerHTML = "";
            for (var i = 0; i < peliculas.length; i++) {
                ordenarPeliculas(i, peliculas, lista);
            }
        }
    }

    if (tipo == 'Año') {
        if (valor == true){
            peliculas = peliculas.sort((a, b)=> a.anno.localeCompare(b.anno));

            var lista = document.getElementById("listaPeliculas");
            lista.innerHTML = "";
            for (var i = peliculas.length - 1; i >= 0; i--) {
                ordenarPeliculas(i, peliculas, lista);
            }
        } else {
            peliculas = peliculas.sort((a, b)=> a.anno.localeCompare(b.anno));

            var lista = document.getElementById("listaPeliculas");
            lista.innerHTML = "";
            for (var i = 0; i < peliculas.length; i++) {
                ordenarPeliculas(i, peliculas, lista);
            }
        }
    }

    valor =! valor;
}