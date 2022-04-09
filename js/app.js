// Variables
const tbody = document.querySelector('tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
const carrito = document.querySelector('#carrito')

let arregloCarrito = []

// Eventos
listaCursos.addEventListener('click', agregarCursos);
vaciarCarrito.addEventListener('click', borrarTodo)
carrito.addEventListener('click', borrarUnCurso)


// funciones
function agregarCursos(e) {
    e.preventDefault();
    // console.log(e.target)

    if(e.target.classList.contains('agregar-carrito')) {
        const card = e.target.parentElement.parentElement;
        // console.log(card)

        informacionCursos = {
            titulo: card.querySelector('h4').textContent,
            imagen: card.querySelector('img').src,
            precio: card.querySelector('.precio span').textContent,
            id: card.querySelector('a').getAttribute('data-id'),
            cantidad: 1
        }

        const existe = arregloCarrito.some((curso) =>{
            return curso.id === informacionCursos.id
        })

        if(existe) {
            const cursos = arregloCarrito.map((curso) => {
                if(curso.id === informacionCursos.id) {
                    curso.cantidad++
                    return curso
                } else {
                    return curso
                }
            })
        } else {
            arregloCarrito = [...arregloCarrito, informacionCursos]
        }



        mostrarHTML();
    }
}

function mostrarHTML() {

    // Se limpia el html para que no se repitan los cursos en cada arreglo
    limpiarHTML()

    arregloCarrito.forEach((curso) => {
        const fila = document.createElement('tr');

        fila.innerHTML= `
            <td>
                <img src="${curso.imagen}" width=120>
            </td>

            <td>
                ${curso.titulo}
            </td>

            <td>
                ${curso.precio}
            </td>

            <td>
                ${curso.cantidad}
            </td>

            <td>
            <a href="#" data-id="${curso.id}" class="borrar-curso">X</a>
            </td>
        `;

        tbody.appendChild(fila)
    })

}

// Se usa esta forma para eliminar un curso en particular
function borrarUnCurso(e) {

    // evitamos el evnet bubbling seleccionando el boton de la clase
    if(e.target.classList.contains('borrar-curso')) {
        // Accedemos a su id
        const cursoId = e.target.getAttribute('data-id')

        // y usamos .filter
        arregloCarrito = arregloCarrito.filter((curso) => {
            return curso.id !== cursoId
        })

        mostrarHTML()
    }
}


function limpiarHTML() {
    tbody.innerHTML = ''
}

function borrarTodo() {
    arregloCarrito = [];

    limpiarHTML();
}