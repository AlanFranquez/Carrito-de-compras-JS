// VARIABLES
const espacioCarrito = document.querySelector('#carrito');
const vaciarCarrito = document.querySelector('#vaciar-carrito')
const tbody = document.querySelector('tbody');
const listaCursos = document.querySelector('#lista-cursos');

let arregloCarrito = [];

// Funciones de click
listaCursos.addEventListener('click', agregarCarroBtn)
vaciarCarrito.addEventListener('click', borrarTodo)
espacioCarrito.addEventListener('click', borrarCurso)


function agregarCarroBtn(e) {
    e.preventDefault()

    // console.log(e.target)
    if(e.target.classList.contains('agregar-carrito')) {
        // console.log(e.target.parentElement.parentElement)
        const card = e.target.parentElement.parentElement;
        // console.log(card)

        const infoCursos = {
            imagen: card.querySelector('img').src,
            titulo: card.querySelector('h4').textContent,
            precio: card.querySelector('.precio span').textContent,
            cantidad: 1,
            id: card.querySelector('a').getAttribute('data-id')
        }

        // console.log(infoCursos)

        // Que no se repita un curso si ya está siendo puesto
        const existe = arregloCarrito.some((curso) => {
            return curso.id === infoCursos.id
        })

        if(existe) {
            // Acà actuara si la cantidad es mayor a uno
            const cursos = arregloCarrito.map((curso) => {
                if(curso.id === infoCursos.id) {
                    curso.cantidad++
                    return curso
                } else {
                    return curso
                }

            })

            arregloCarrito = [...cursos]

        } else {
            // Si el curso no se repite actuara normalmente
            arregloCarrito = [...arregloCarrito, infoCursos]
        }
        
        
        
        console.log(arregloCarrito)

        mostrarHTML();
    }

}

function mostrarHTML() {

    limpiarHTML();

    arregloCarrito.forEach((curso) => {

        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>
                <img src="${curso.imagen}" width=150>
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
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `;

        tbody.appendChild(fila)


    })
}

function limpiarHTML() {
    tbody.innerHTML= ''
}

// Funcion para borrar todos los cursos disponibles
function borrarTodo() {
    arregloCarrito = []; // El arreglo se pone vacio
    console.log(arregloCarrito)

    limpiarHTML(); // y se llama a la función de limpiar html para que todo se exprese en el html
}

function borrarCurso(e) {
    // console.log(e.target)
    if(e.target.classList.contains('borrar-curso')) {
        // Para eliminar un curso usaremos la propiedad de .filter

        const cursoId = e.target.getAttribute('data-id')

        arregloCarrito = arregloCarrito.filter((curso) => {
            return curso.id !== cursoId
        })
    }

    mostrarHTML();
}