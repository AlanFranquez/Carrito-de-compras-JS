// Variables
const tbody = document.querySelector('tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
const carrito = document.querySelector('#carrito')
const card = document.querySelector('.agregar-carrito');

let arregloCarrito = []

document.addEventListener('DOMContentLoaded', () => {
    listaCursos.addEventListener('click', buscarCurso);

    vaciarCarrito.addEventListener('click', borrarCursos)
})



function buscarCurso(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')) {
        leerCurso(e)
    }
}

function leerCurso(e) {
    // console.log(e.target.parentElement.parentElement)

    const curso = e.target.parentElement.parentElement;

    const OBJCurso = {
        // añadirle el tipo de dato que queremos
        img: curso.querySelector('img').src,
        nombre: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    arregloCarrito = [...arregloCarrito, OBJCurso];

    console.log(arregloCarrito)

    agregarHTML();
}


function agregarHTML() {

    limpiarHTML();

    arregloCarrito.forEach((curso) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td><img src="${curso.img}" width=100></td>
            <td>${curso.nombre}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
        `;

        tbody.appendChild(tr)
    })
}


function limpiarHTML() {
    tbody.innerHTML = ''
}

function borrarCursos() {
    tbody.innerHTML = ''

    const p = document.createElement('p')
    p.textContent = 'El carrito ha sido vaciado'
    p.classList.add('cartelVaciarCarrito', 'norepeat')


    const norepeat = document.querySelectorAll('.norepeat');
    if(norepeat.length === 0) {
        vaciarCarrito.appendChild(p)
    }


    setTimeout(() => {
        p.remove()
    }, 2000);
    

}