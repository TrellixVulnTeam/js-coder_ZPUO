import  "../node_modules/sweetalert2/dist/sweetalert2.js"


function emptyTasaAlert(){
    Swal.fire({
        title: 'Error!',
        text: 'Debe escoger una tasa para hacerla simulación',
        icon: 'error',
        confirmButtonText: 'Cool'
    })
}