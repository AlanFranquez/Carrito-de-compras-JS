// Variables
const tbody = document.querySelector('tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
const carrito = document.querySelector('#carrito')
const card = document.querySelector('.agregar-carrito');


let arregloCarrito = []

document.addEventListener('DOMContentLoaded', () => {
    listaCursos.addEventListener('click', buscarCurso);

    vaciarCarrito.addEventListener('click', borrarCursos);

    carrito.addEventListener('click', eliminarCurso);

    mantenerloEnHTML()
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

    

    // console.log(arregloCarrito)

    const existe = arregloCarrito.some((curso) => {
        return curso.id === OBJCurso.id
    })

    if(existe) {
        const cursos = arregloCarrito.map((curso) => {
            if(curso.id === OBJCurso.id) {
                curso.cantidad++
                return curso // retorna el curso individual
            } else {
                return curso
            }

        });

        arregloCarrito =[...cursos]
    } else {
        // Si el curso no está repetido entonces se ejecuta esto
        arregloCarrito = [...arregloCarrito, OBJCurso];
    }

   

    // console.

    console.log(existe)

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
            <td><a href="#" class="borrar-curso" data-id="${curso.id}">X</td>
        `;

        tbody.appendChild(tr)
    })

    //Llamado al localStorage
    sincronizarStorage();
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

function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        // Obtenemos el id del curso que clickeamos.
        const idDelCurso = e.target.getAttribute('data-id');
        
        // en el arreglo, lo abrimos y filtramos aquellos que no conicidan con la id del curso
        // basicamente lo que hace en terminos simples es traerse todos los cursos, excepto el que nosotros le dimos click
        arregloCarrito = arregloCarrito.filter((curso) => {
            return curso.id !== idDelCurso
        })

        agregarHTML()
    }
}

//LocalStorage sección
function sincronizarStorage() {
    //Añadir al storage

    //Pasarlo a texto
    const arreglocarritoTexto = JSON.stringify(arregloCarrito);
    localStorage.setItem('productos', arreglocarritoTexto);
}

// Asi se mantiene en el html
// se consigue el localstorage , y se pone los [] en caso de que el elemento este vacio y no se agrego nada
function mantenerloEnHTML() {

    const prueba = JSON.parse(localStorage.getItem('productos'));
    // JSON.parse(prueba)
    arregloCarrito = prueba || [];

    agregarHTML()
}


// Modo oscuro

const boton = document.querySelector('#img-carrito-2');
const body = document.querySelector('body')
const header = document.querySelector('.header')
const carta = document.querySelector('.card')

console.log(carta)
boton.addEventListener('click', () => {
    
    
    body.classList.toggle('modooscuro')
    header.classList.toggle('modooscuro')
    carta.classList.toggle('card-oscuro')
    carrito.style.color = 'black'
})