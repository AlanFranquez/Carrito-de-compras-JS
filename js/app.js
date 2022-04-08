// VARIABLES
const espacioCarrito = document.querySelector('#carrito');
const vaciarCarrito = document.querySelector('#vaciar-carrito')
const tbody = document.querySelector('tbody');
const listaCursos = document.querySelector('#lista-cursos');

let arregloCarrito = [];

// Funciones de click
listaCursos.addEventListener('click', agregarCarroBtn)


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
        
        arregloCarrito = [...arregloCarrito, infoCursos]
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
                <a href="#" class="borrar-curso">X</a>
            </td>
        `;

        tbody.appendChild(fila)


    })
}

function limpiarHTML() {
    tbody.innerHTML= ''
}