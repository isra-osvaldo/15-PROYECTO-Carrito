// Variables
const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
let articulosCarrito = []

cargarEventListeners()
function cargarEventListeners() {
    // Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso)

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso)

    // Vaciar el carrito 
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [] // Resetear el arreglo
        limpiarHTML() // Eliminamos todo el HTML
    })
}


// Funciones
function agregarCurso(e) {
    e.preventDefault()
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement // Traversing
        leerDatosCursos(cursoSeleccionado)
    }
}

// Elimina un curso del carrito
function eliminarCurso (e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id')
        // Eliminar del arreglo articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId) // devuelve todos los cursos que no tengan el id seleccionado
        carritoHTML() // Iterar sobre el carrito y mostrar su HTML
        console.log(articulosCarrito)
    }
}

// Leer contenido del HTML y extraer la información del curso
function leerDatosCursos(curso) {
    // Crear Objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Comprobar si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id)
    if (existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if( curso.id === infoCurso.id) {
                curso.cantidad++
                return curso // retorna el objeto actualizado
            } else {
                return curso // retorna los objetos que no son duplicados
            }
        })
        articulosCarrito = [...cursos]
    } else {
        // Agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
    }
    
    console.log(articulosCarrito)

    carritoHTML()
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {
    // Limpiar HTML
    limpiarHTML()

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id=${id}> X </a>
            </td>
        `
    // Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row)
    })
}

// Elimina los cursos del tbody
function limpiarHTML() {
    // Forma lenta
    //contenedorCarrito.innerHTML = ""

    while(contenedorCarrito.firstChild) { // Mientras haya un elemento dentro de contenedorCarrito se ejecuta
        contenedorCarrito.removeChild(contenedorCarrito.firstChild) // Y elimina el primer elemento
    }

    // <div>
    //     <p></p>
    //     <p></p>
    // </div>
}