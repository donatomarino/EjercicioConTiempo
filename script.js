function enviarMensaje(e) {
    e.preventDefault();
}

function verificaPsw(){
    let email = document.getElementById('email').value; // Cogemos el input mail
    let psw = document.getElementById('password').value; // Cogemos el input psw
    let confirmaPsw = document.getElementById('confirmaPsw').value; // Cogemos el input confirmaPsw
    let msg = document.getElementsByClassName('mensaje'); // Cogemos el input para que aparezca el mensaje de error o acceso correcto.
    
    if(!validarEmail(email)){
        // Si no está bien aparece este mensaje de color rojo y centrado.
        msg[0].textContent = 'El formato de la mail no es correcto' 
        msg[0].style.color = 'red';
        msg[0].style.textAlign = 'center';
        return;
    } else {
        // Si está bien y antes no lo estaba, se borra lo de antes.
        msg[0].textContent = '';
    }


    // Verificamos si la psw está bien
    if(!validarPsw(psw)){
        // Si no está bien aparece este mensaje de color rojo y centrado.
        msg[1].textContent = 'La password tiene que tener al menos 2 mayusculas, un caracter especial, tres números entre 5 y 9 y un tamaño entre 10-15.'
        msg[1].style.color = 'red';
        msg[1].style.textAlign = 'center';
        return;
    } else {
        // Si está bien y antes no lo estaba, se borra lo de antes.
        msg[1].textContent = '';
    }

    // Verificamos si las psw coinciden
    if(!confirmarPsw(psw, confirmaPsw)){
        // Si no coinciden apare este mensaje en rojo centrado.
        msg[2].textContent = 'Las passwords no coinciden.'
        msg[2].style.color = 'red';
        msg[2].style.textAlign = 'center';
    } else {
        // Si está bien se borra lo de antes (si hay), y aparece el mensaje de Acceso confirmado. 
        msg[2].textContent = '';
        msg[3].textContent = 'Acceso confirmado';
        msg[3].style.color = 'green';
        msg[3].style.textAlign = 'center';
    }
}

function validarEmail(email){
    const confEmail = email.trim(); // Quitamos los espacio al principio y al final, si hay.
    let extension= email.split(".")[1]; // Dividimos el array cuando encuentra un punto, y cogemos solamente lo que viene después, como por ejemplo '.com', coge solamente 'com';

    // Verifica si incluye '@'
    if(email.includes('@')){
        // Verifica si hay un punto, y después de el tienen que ir como minimo 2 caracteres y como máximo 3 para ser correcto el formato. 
        // Verificamos que el ultimo caracter del correo no es un '.'.
        if(email.includes('.') && extension.length >= 2 && extension.length <= 3 && confEmail[confEmail.length-1] != '.'){
            return true;
        }
    }

    return false;
}

function validarPsw(psw){
    psw = Array.from(psw);
    const caracteres = '*/-#~'
    let contMayus = 0;
    let contNum = 0;
    let size = false;
    let incluyeCaracteres = false;

    // Verifica el tamaño. Si no es entre 10 y 15 devuelve false.
    if(psw.length < 10 || psw.length > 15){
        alert("La password tiene que tener un tamaño entre 10 y 15 caracteres");
        return false;
    } else {
        size = true; // Si el tamaño es justo, la variable size va a ser 'true'
    }

    // Analizamos singolarmente cada caracteres de la psw
    psw.forEach(c => {
        if(c >= 'A' && c <= 'Z'){ // Si contiene mayusculas el contador aumenta
            contMayus++;
        } else if(c >= 5 && c <= 9){ // Si contiene números entre 5 y 9 el contador aumenta
            contNum++;
        } else if(caracteres.includes(c)){ // Verifica si al menos un caracter coincide con uno de la constante caracteres
            incluyeCaracteres = true;
        }
    });

    // Si la psw tiene menos que 2 caracteres aparece el alert
    if(contMayus < 2){
        alert('La password tiene que tener por lo menos 2 mayusculas.');
        return false;
    }

        // Si la psw tiene menos de 3 números aparece el alert
    if(contNum < 3){
        alert('La password tiene que tener por lo menos 3 números entre 5 y 9');
        return false;
    }

    // Si la psw no incluye un caracter especial aparece el alert
    if(!incluyeCaracteres){
        alert("La password tiene que tener por lo menos un caracter entre '*/-#~'");
        return false;
    }

    // Verifica si se cumplen todas las condiciones:
        // - Al menos 2 mayusculas
        // - Al menos un caracter entre '*/-#~'
        // - Al menos tre números entre 5 y 9
        // - Tamaño entre 10 y 15
    if(contMayus >= 2 && incluyeCaracteres && contNum >= 3 && size){
        return true;
    }

    // Si no se cumplen devuelve false
    return false;
}

function confirmarPsw(psw, confirma){
    // Verificamos si las psw coinciden
    if(psw != confirma){
        return false;
    } 

    return true;
}