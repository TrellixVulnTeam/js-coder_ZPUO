const registerButton = document.getElementById('registerButton');


class user{
    constructor(email,phone){
        this.email = email;
        this.phone = phone;
    }

    rellenar(){
        const swal1 = document.getElementById('swal-input1');
        const swal2 = document.getElementById('swal-input2');
        swal1.value = localStorage.getItem('email');
        swal2.value = localStorage.getItem('number');
    }


}

registerButton.addEventListener('click', async () => {

    const { value: formValues } = await Swal.fire({
        title: 'Registrarse',
        html:
            '<input id="swal-input1" class="swal2-input" type="email" placeholder="email">' +
            '<input id="swal-input2" class="swal2-input" type="number" placeholder="teléfono">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            const email = document.getElementById('swal-input1');
            const number = document.getElementById('swal-input2');
            localStorage.setItem('email',email.value);
            localStorage.setItem('number',number.value);
            if (nombreEmpresa){
                localStorage.setItem('empresa',nombreEmpresa);
            }

            const usuario = new user(email.value,number.value);
            usuario.rellenar()

        }
    })

    if (formValues) {
        Swal.fire("Enviado")
    }

})

