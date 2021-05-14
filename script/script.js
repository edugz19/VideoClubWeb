// Carga películas del LocalStorage
function compruebaLocalStorage() {
    var peliculas = localStorage.getItem("arrayPeliculas");

    if (peliculas == null) peliculas = [];    
    else {
        let peliculasStorage = JSON.parse(peliculas);
        peliculas = [];
        
        peliculasStorage.forEach(pelicula => {
            let categoriaAdd = new Categoria(pelicula.categoria.nombre);
            let peliculaAdd = new Pelicula(pelicula.id, pelicula.nombre, pelicula.director, pelicula.anno, categoriaAdd, pelicula.duracion, pelicula.url);
            peliculas.push(peliculaAdd);
        });
    }

    return peliculas;
}


// Carga categorías del LocalStorage
function compruebaLocalStorageCategorias(){
    var categorias = localStorage.getItem("arrayCategorias");

    if (categorias == null) categorias = [];    
    else {
        let categoriasStorage = JSON.parse(categorias);
        categorias = [];
        
        categoriasStorage.forEach(categoria => {
            let categoriaAdd = new Categoria(categoria.nombre);
            categorias.push(categoriaAdd);
        });
    }

    return categorias;
}


// Imprime la lista de películas en el html
function imprimirPeliculas(array, div){
    for (value in array) {
        var id = array[value].id;
        div.innerHTML += "<div id='peli'>" + 
                           "<div id='imagen'><img src=" + array[value].url + " width='170' height='250'/></div>" + 
                           "<div id='datos'>" + 
                           "<h2>" + array[value].nombre.toUpperCase() + "</h2>" + 
                           "<p>Director: " + array[value].director + "</p>" + 
                           "<p>Año: " + array[value].anno + "</p>" + 
                           "<p>Categoría: " + array[value].categoria.nombre + "</p>" + 
                           "<p>Duración: " + array[value].duracion + " minutos</p></div>" + 
                           "<div id='botones'>" + 
                                "<a href='html/alquilar.html?id="+ id + "'>Ver Disponibilidad</a><br/>" + 
                                "<a href='html/modificar.html?id=" + id + "=" + array[value].categoria.nombre + "'>Modificar</a><br/>" + 
                                "<a href='' onclick='borrarPelicula(" + id + ")'>Borrar</a>" + 
                           "</div></div><br/>";
    }

    return div;
}


function ordenarPeliculas(i, peliculas, lista){
    var id = peliculas[i].id;
                lista.innerHTML += "<div id='peli'>" + 
                                "<div id='imagen'><img src=" + peliculas[i].url + " width='170' height='250'/></div>" + 
                                "<div id='datos'>" + 
                                "<h2>" + peliculas[i].nombre.toUpperCase() + "</h2>" + 
                                "<p>Director: " + peliculas[i].director + "</p>" + 
                                "<p>Año: " + peliculas[i].anno + "</p>" + 
                                "<p>Categoría: " + peliculas[i].categoria.nombre + "</p>" + 
                                "<p>Duración: " + peliculas[i].duracion + " minutos</p></div>" + 
                                "<div id='botones'>" + 
                                    "<a href='html/alquilar.html?id="+ id + "'>Ver Disponibilidad</a><br/>" + 
                                    "<a href='html/modificar.html?id=" + id + "=" + peliculas[i].categoria.nombre + "'>Modificar</a><br/>" + 
                                    "<a href='' onclick='borrarPelicula(" + id + ")'>Borrar</a>" + 
                                "</div></div><br/>";
    return lista;
}


function retornarLista(lista, peliculas, value, id){
    lista.innerHTML += "<div id='peli'>" + 
                                "<div id='imagen'><img src=" + peliculas[value].url + " width='170' height='250'/></div>" + 
                                "<div id='datos'>" + 
                                "<h2>" + peliculas[value].nombre.toUpperCase() + "</h2>" + 
                                "<p>Director: " + peliculas[value].director + "</p>" + 
                                "<p>Año: " + peliculas[value].anno + "</p>" + 
                                "<p>Categoría: " + peliculas[value].categoria.nombre + "</p>" + 
                                "<p>Duración: " + peliculas[value].duracion + " minutos</p></div>" + 
                                "<div id='botones'>" + 
                                    "<a href='html/alquilar.html?id="+ id + "'>Ver Disponibilidad</a><br/>" + 
                                        "<a href='html/modificar.html?id=" + id + "=" + peliculas[value].categoria.nombre + "'>Modificar</a><br/>" + 
                                        "<a href='' onclick='borrarPelicula(" + id + ")'>Borrar</a>" + 
                                "</div></div><br/>";

    return lista;
}

function listaFiltrada(lista, newArray, value, id){
    lista.innerHTML += "<div id='peli'>" + 
                                "<div id='imagen'><img src=" + newArray[value].url + " width='170' height='250'/></div>" + 
                                "<div id='datos'>" + 
                                "<h2>" + newArray[value].nombre.toUpperCase() + "</h2>" + 
                                "<p>Director: " + newArray[value].director + "</p>" + 
                                "<p>Año: " + newArray[value].anno + "</p>" + 
                                "<p>Categoría: " + newArray[value].categoria.nombre + "</p>" + 
                                "<p>Duración: " + newArray[value].duracion + " minutos</p></div>" + 
                                "<div id='botones'>" + 
                                    "<a href='html/alquilar.html?id="+ id + "'>Ver Disponibilidad</a><br/>" + 
                                        "<a href='html/modificar.html?id=" + id + "=" + newArray[value].categoria.nombre + "'>Modificar</a><br/>" + 
                                        "<a href='' onclick='borrarPelicula(" + id + ")'>Borrar</a>" + 
                                "</div></div><br/>";

    return lista;
}

function buscar(array, lista, valor, tipo){
    if (tipo == 'nombre'){
        for (value in lista) {
            pelicula = lista[value].nombre.toLowerCase();
            if (pelicula.indexOf(valor) !== -1) array.push(lista[value]);
        }    

    } else if (tipo == 'director'){
        for (value in lista) {
            pelicula = lista[value].director.toLowerCase();
            if (pelicula.indexOf(valor) !== -1) array.push(lista[value]);
        }   

    } else if (tipo == 'anno'){
        for (value in lista){
            pelicula = lista[value].anno;
            if (pelicula == valor) array.push(lista[value]);
        }
    }

    
    return array;
}



function compruebaLocalStorageAlquiler(){
    var alquileres = localStorage.getItem("arrayAlquiler");

    if (alquileres == null) alquileres = [];    
    else {
        let alquilerStorage = JSON.parse(alquileres);
        alquileres = [];

        alquilerStorage.forEach(alquiler => {
            let categoriaAdd = new Categoria(alquiler.pelicula.categoria.nombre);
            let peliculaAdd = new Pelicula(alquiler.pelicula.id, alquiler.pelicula.nombre, alquiler.pelicula.director, alquiler.pelicula.anno, categoriaAdd, alquiler.pelicula.duracion, alquiler.pelicula.url);
            let alquilerAdd = new Alquiler(peliculaAdd, alquiler.fechaAlquiler, alquiler.fechaDevolucion, alquiler.cliente, alquiler.precio);
            alquileres.push(alquilerAdd);
        });

    }

    return alquileres;
}