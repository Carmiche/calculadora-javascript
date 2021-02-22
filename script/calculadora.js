let teclas = document.querySelectorAll(".panel-numerico ul li");
let operaciones = document.getElementById('resultado')
let divHistorial = document.getElementById('historial')
let botonHistorial = document.getElementById('botonHistorial')

let enunciado, respuesta = 0;
let accion, digito = null;
let resultado = false;
let cantidadSignos = 0;
let cantidadDecimal = false;

//inicio de la funcion
inicio = () => {
	//itera todos los nodos de las teclas
	for (let i = 0; i < teclas.length; i++) {
		//cada vez que se pulse alguna tecla se ejecutara una funcion.
		teclas[i].addEventListener("click", teclaPulsada);
	}
	divHistorial.innerHTML = `Historial: <br>`

}
//la tecla pulsada ejecuta esta funcion que captura su atributo y valor HTML
teclaPulsada = (tecla) =>{
	//captura de la tecla pulsada y se accede a su atributo clase
	accion = tecla.target.getAttribute("class");
	//captura del digito (o operador) mostrado en el HTML
	digito = tecla.target.innerHTML;
	//se lanza una funcion cuando se cumpla todo lo de arriba y guarda los parametros de accion y digito
	calcular(accion,digito)


}
//calcular se lanza despues de presionar una tecla  
calcular = (accion,digito) => {
	//si accion es igual a numero 
	if (accion == "numero") {
		//la cantidad de signos sera 0
		cantidadSignos = 0;
		//si la operaciones del HTML estan en 0 sera igual al digito (nose sumara)
		if (operaciones.innerHTML == "0") operaciones.innerHTML = digito;
		//sino 
		else{
			//si el resultado es verdadero
			if (resultado) {    
				//se volvera falso    
                resultado = false;
                //junto a ello se sumara un digito
                operaciones.innerHTML += digito;
                //sino simplemente se sumara el digito
            }else operaciones.innerHTML +=digito;
		}
	}
	//sino si accion es igual a operador
	else if (accion == "operador") {
		// se aumentara la cantidadSignos (era 0 ahora sera 1)
		cantidadSignos++;
		//si cantidad de signos es igual a 1
		if (cantidadSignos == 1) {
			//y operaciones es 0 el HTML de operacion sera 0
			if (operaciones == 0) operacion.innerHTML = 0;
			//sino 
			else{
				//la cantidadDecimal sera falsa
				cantidadDecimal = false;
				//el resultado tambien
                resultado = false;
                //y se escribira en operaciones (HTML) un digito
                operaciones.innerHTML += digito;
			}
		}
	}

	//sino si accion es igual a decimal
	else if(accion == "decimal"){
		// y la cantidadDecimal es falsa y la cantidadSignos es diferente de 1
		if (!cantidadDecimal && cantidadSignos != 1) {
			//entonces la cantidadDecimal sera verdadera
            cantidadDecimal = true;
            //el resultado sera falso
            resultado = false;
            //y se escribira en las operaciones otro digito
            operaciones.innerHTML +=digito;

         }              
	}

	//Sino si accion es igual a igual
	else if (accion == "igual") {
		enunciado = operaciones.innerHTML 
		//operaciones (HTML) sera puesta en evaluacion (se operara automaticamente por javascript)
		operaciones.innerHTML = eval(operaciones.innerHTML);
		respuesta = operaciones.innerHTML
		//esto es algo que no se pero es una expresion regular sino me equivoco
		var expresion = /./g;

		if(!expresion.test(operaciones.innerHTML))cantidadDecimal = true;
		//el resultado se convierte en verdadero
        resultado = true;	
        historial()
	}
	//sino (definitivo) se borrar todo y se pondra en cero y se reiniciaran los parametros
	else {operaciones.innerHTML = 0; resultado = false; cantidadDecimal = false;};
	resultado = true;

}
historial = () => {
	divHistorial.innerHTML += `${enunciado} <br> ${respuesta} <br><br>`
	botonHistorial.addEventListener("click", function (){
		divHistorial.innerHTML = `Historial: <br>`
	})
}

inicio();