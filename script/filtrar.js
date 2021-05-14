var arrayPeliculas = [];

function filtrar(){
    var nombre = document.getElementById("filtN").value.toLowerCase();
    var director = document.getElementById("filtD").value.toLowerCase();
    var anno = document.getElementById("filtA").value;

    var peliculas = compruebaLocalStorage();

    var lista = document.getElementById("listaPeliculas"); 
    lista.innerHTML = "";  
    let arrayNombre = [];
    let arrayDirector = [];
    let arrayAnno = [];
    let encontrado = false;


    if (director == "" && anno == "" && nombre != ""){
        for (value in peliculas) {
            var id = peliculas[value].id;
            pelicula = peliculas[value].nombre.toLowerCase();
            if (pelicula.indexOf(nombre) !== -1){
                retornarLista(lista, peliculas, value, id);
                encontrado = true;
            }
        }

        if (encontrado == false) lista.innerHTML = "<p>No se han encontrado resultados</p>";
    }

    encontrado = false;
    if (director != "" && anno == "" && nombre == ""){
        for (value in peliculas) {
            var id = peliculas[value].id;
            pelicula = peliculas[value].director.toLowerCase();
            if (pelicula.indexOf(director) !== -1){
                retornarLista(lista, peliculas, value, id);
                encontrado = true;
            }
        }

        if (encontrado == false) lista.innerHTML = "<p>No se han encontrado resultados</p>";
    }

    encontrado = false;
    if (director == "" && anno != "" && nombre == ""){
        for (value in peliculas) {
            var id = peliculas[value].id;
            pelicula = peliculas[value].anno;
            if (pelicula == anno){
                retornarLista(lista, peliculas, value, id);
                encontrado = true;
            }
        }

        if (encontrado == false) lista.innerHTML = "<p>No se han encontrado resultados</p>";
    }

    if (director != "" && anno != "" && nombre != ""){
        buscar(arrayNombre, peliculas, nombre, 'nombre');
        buscar(arrayDirector, peliculas, director, 'director');
        buscar(arrayAnno, peliculas, anno, 'anno');

        let newArray = _.intersection(arrayNombre,arrayDirector,arrayAnno);
        
        if(newArray.length == 0){
            lista.innerHTML = "<p>No se han encontrado resultados</p>";
        } else {
            for (value in newArray){
                var id = newArray[value].id;
                listaFiltrada(lista, newArray, value, id);
            }
        }
    }

    if (director != "" && anno != "" && nombre == "") {
        buscar(arrayDirector, peliculas, director, 'director');
        buscar(arrayAnno, peliculas, anno, 'anno');

        let newArray = _.intersection(arrayDirector,arrayAnno);
        
        if(newArray.length == 0){
            lista.innerHTML = "<p>No se han encontrado resultados</p>";
        } else {
            for (value in newArray){
                var id = newArray[value].id;
                listaFiltrada(lista, newArray, value, id);
            }
        }
    }

    if (director != "" && anno == "" && nombre != ""){
        buscar(arrayNombre, peliculas, nombre, 'nombre');
        buscar(arrayDirector, peliculas, director, 'director');

        let newArray = _.intersection(arrayNombre,arrayDirector);
        
        if(newArray.length == 0){
            lista.innerHTML = "<p>No se han encontrado resultados</p>";
        } else {
            for (value in newArray){
                var id = newArray[value].id;
                listaFiltrada(lista, newArray, value, id);
            }
        }
    }

    if (director == "" && anno != "" && nombre != ""){
        buscar(arrayNombre, peliculas, nombre, 'nombre');
        buscar(arrayAnno, peliculas, anno, 'anno');

        let newArray = _.intersection(arrayNombre,arrayAnno);
        
        if(newArray.length == 0){
            lista.innerHTML = "<p>No se han encontrado resultados</p>";
        } else {
            for (value in newArray){
                var id = newArray[value].id;
                listaFiltrada(lista, newArray, value, id);
            }
        }
    }

    if (director == "" && anno == "" && nombre == "") {
        alert("Introduce valores en los elementos de búsqueda");
        location.reload();
    }
}





