const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const span_cb_validation=document.getElementById("checkbox_validaton");

//me traje el formulario completo y sus inputs

//expresiones regulares para los campos de los inputs guardados en un objeto
const expresiones = {
	
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
};

// creo un objeto con los campos para despues validarlos

const campos={
	usuario:false,
	nombre:false,
	password:false,
	correo:false,
	telefono:false
}

// que me traiga las expresiones


const validarFormulario = (e)=>{
	switch(e.target.name){
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
	}
};

// validando campos

const validarCampo =(expresion, input, campo)=>{
	
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo]=true;
	}else{
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo]=false;
	}
}


inputs.forEach((input) =>{
	input.addEventListener('keyup', validarFormulario); //dentro
	input.addEventListener('blur', validarFormulario);  //fuera

});






formulario.addEventListener('submit', (e) =>{
	e.preventDefault();
    // validacion de botones checkbox
	const cb =document.querySelectorAll(`label input:checked`)
	if(cb.length===0){
		e.preventDefault();
		console.log(cb)
		span_cb_validation.innerHTML=`Has elegido ${cb.length}`;
	}


	if(campos.nombre &&  campos.correo && campos.telefono ){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		
		setTimeout(()=>{
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');

		},5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) =>{
			icono.classList.remove('formulario__grupo-correcto');
		});
		document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo')
	}else{
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo')
	}
});

