/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, 
la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN).
*/


const $botonEnviar = document.querySelector("#enviarCantidad")



let contador = 0

//capturar evento de cantidad de familiares ingresados
$botonEnviar.onclick = function (e) {
    borrarIntegrantesAnteriores()

    const cantidadDeFamiliares = document.querySelector("#cantFamiliares").value
    

    crearIntegrantes(cantidadDeFamiliares)
    //hasta este punto se agregan los inputs donde el usuario podra ingresar las edades


    mostrarBotonCalcular(cantidadDeFamiliares)
    mostrarBotonReset(cantidadDeFamiliares)

    botonConfirmar(cantidadDeFamiliares)
    
    validarFormularioCantidadFamiliares()

    

    e.preventDefault()

}




function validarFormularioCantidadFamiliares() {
    const cantidadFamiliares = $form.cantidad.value


    const errorCantidad = validarcantidadFamiliares(cantidadFamiliares)

    let errores = {}
    errores.cantidad = errorCantidad

    manejarErrores(errores)
}

function crearIntegrantes(cantidad) {
    let tamañoActualFila=0

    for (let i = 0; i < cantidad; i++) {
        const col= document.createElement("div")
        const div = document.createElement("div")
        const label = document.createElement("label")
        const input = document.createElement("input")



        col.className='col'
        div.className = 'integrante'
        label.innerText = `familiar ${i}`
        input.name = `edad${contador}`
        input.className="form-control"

        contador++
        
        col.appendChild(div)
        div.appendChild(label)
        div.appendChild( input)

        
        document.querySelector(".row").appendChild(col)
        
        
        



    }
}

function mostrarBotonCalcular(cantidadIntegrantes) {
    console.log(cantidadIntegrantes)
    if (cantidadIntegrantes != 0) {
        document.querySelector("#calcular").style.display= "inline"
    } else {
        document.querySelector("#calcular").style.display = "none"
    }
}
function mostrarBotonReset(cantidadIntegrantes) {
    if (cantidadIntegrantes != 0) {
        document.querySelector("#reset").style.display= "inline"
    } else {
        document.querySelector("#reset").style.display = "none"
    }
}
function ocultarBotonConfirmar() {
    document.querySelector("#enviarCantidad").style.display = "none"
}
function mostrarBotonConfirmar() {
    document.querySelector("#enviarCantidad").style.display= "inline"
}
function botonConfirmar(cantidadIntegrantes) {
    document.querySelector("#cantFamiliares").className="form-control"
    if (cantidadIntegrantes>0) {
        ocultarBotonConfirmar()
    }else{
        mostrarBotonConfirmar()
    }
}





function borrarIntegrantesAnteriores() {
    const $columnas = document.querySelectorAll(".col")
    for (let i = 0; i < $columnas.length; i++) {

        document.querySelector(".row").removeChild($columnas[i])


    }
    contador = 0


}



document.querySelector("#reset").onclick = function (e) {
    borrarIntegrantesAnteriores()
    const cantidadFamiliares = document.querySelectorAll(".integrante").length
    

    mostrarBotonCalcular(cantidadFamiliares)
    mostrarBotonReset(cantidadFamiliares)
    mostrarBotonConfirmar()
    $form.cantidad.value=""

    return false
}



function calcularPromedioEdadFamiliares(integrantes) {

    
    let acumulador = 0
    for (let i = 0; i < integrantes.length; i++) {
        const edadFamiliar = Number(integrantes[i].value)
        acumulador += edadFamiliar

    }
    return acumulador / integrantes.length
}


function buscarFamiliarMasChico(integrantes) {

    
    min = integrantes[0].value
    for (let i = 0; i < integrantes.length; i++) {
        const edadFamiliar = Number(integrantes[i].value)
        if (edadFamiliar < min) {
            min = edadFamiliar
        }

    }
    return min
}



function buscarFamiliarMasGrande(integrantes) {

    
    max = integrantes[0].value
    for (let i = 0; i < integrantes.length; i++) {
        const edadFamiliar = Number(integrantes[i].value)
        if (edadFamiliar > max) {
            max = edadFamiliar
        }

    }
    return max
}


function validarEdad(edad) {
    const contieneSoloNumeros = /^[0-9]+$/i.test(edad);

    if (edad=== "") {
        return "Te falta ingresar la edad de un familiar"
    } else if (!contieneSoloNumeros) {
        return "El formato solo acepta numeros y que sean enteros"
    }
    return ""
}

function validarcantidadFamiliares(cantidad) {
    if (cantidad==="") {
        return "Te falta ingresar la cantidad de familiares"
    }else if (cantidad==="0") {
        return "Tenes que ingresar al menos un familiar"
    }
    return ""
}


function validarFormularioEdades(event) {

    const $integrantes = document.querySelectorAll(".integrante input")
    
    
    let errores = {

    }
    

    for (let i = 0; i < $integrantes.length; i++) {
        const llave = `edad${i}`
        console.log($integrantes[i].value)
        errores[`${llave}`] = validarEdad($integrantes[i].value)

    }

    const esExito = manejarErrores(errores) === 0



    if (esExito) {
        document.querySelector("#edadPromedio").innerText = "Edad promedio " + calcularPromedioEdadFamiliares($integrantes)
        document.querySelector("#masChico").innerText = "El mas joven tiene " + buscarFamiliarMasChico($integrantes)
        document.querySelector("#masGrande").innerText = "El mas viejo tiene " + buscarFamiliarMasGrande($integrantes)


        document.querySelector("#casoExitoso").className = ""
        $form.className = "oculto"

    }

    event.preventDefault();

}

function manejarErrores(errores) {
    eliminarMensajesError()
    const keys = Object.keys(errores)


    const $errors = document.querySelector("#errores")

    let cantidadErrores = 0

    keys.forEach(function (key) {
        const error = errores[key]

        if (error) {
            $form[key].style.border = "2px solid red"
            const $error = document.createElement("li")

            $error.innerText = error
            $errors.appendChild($error)
            cantidadErrores++

        }
         else {
          //  $form[key].className = ""
          $form[key].style.border = ""
        }
    })

    return cantidadErrores
}

function eliminarMensajesError(event) {
    const $errors = document.querySelector("#errores")
    while ($errors.firstChild) {
        $errors.removeChild($errors.firstChild)
    }

}


const $form = document.querySelector("form")
$form.onsubmit = validarFormularioEdades