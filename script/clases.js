class Pelicula {    
    constructor(id, nombre, director, anno, categoria, duracion, url) {
        this.nombre = nombre;
        this.director = director;
        this.anno = anno;
        this.categoria = categoria;
        this.duracion = duracion;
        this.url = url;
        this.id = id;
    }

    modificarNombre(nombre){
        this.nombre = nombre;
    }

    modificarNombre(director){
        this.director = director;
    }

    modificarNombre(anno){
        this.anno = anno;
    }

    modificarNombre(categoria){
        this.categoria = categoria;
    }

    modificarNombre(duracion){
        this.duracion = duracion;
    }

    modificarUrl(url){
        this.url = url;
    }
}

class Categoria {
    constructor(nombre) {
        this.nombre = nombre;
    }

    modificarNombre(nuevoNombre){
        this.nombre = nuevoNombre;
      }
}

class Alquiler {
    constructor(pelicula, fechaAlquiler, fechaDevolucion, cliente, precio){
        this.pelicula = pelicula;
        this.fechaAlquiler = fechaAlquiler;
        this.fechaDevolucion = fechaDevolucion;
        this.cliente = cliente;
        this.precio = precio;
    }
}
