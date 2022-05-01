const empleados = document.getElementById('empleados');
const sector = document.getElementById('sector');
const ingresos = document.getElementById('ingresos');
const gastos = document.getElementById('gastos');

const ofertasUl = document.getElementById('ofertasUl')

const inputForm = document.getElementById('inputForm');

function ofertasSegunTamañoEmpresa(tamaño){

    while (ofertasUl.firstChild) {
        ofertasUl.removeChild(ofertasUl.firstChild);
    }

    fetch('../bancosDB/bancos.json')
        .then((res) => res.json())
        .then((data) => {
            var ofertas = data[tamaño];
            ofertas.forEach((of)=>{
                const ofertasLi = document.createElement('li');
                ofertasLi.innerHTML = `<button class="list-group-button">
                                        <div class="text-success">
                                            <h4 class="my-0">${of.Banco}</h4>
                                            <small>Préstamo para ${tamaño} empresa</small>
                                        </div>
                                        <span class="text-success">${parseFloat(of.Tasa)*100}%</span>
                                    </button> `;
                ofertasUl.appendChild(ofertasLi);
            })
        })
}

// ofertasSegunTamañoEmpresa('Micro')

// `<button class="list-group-button" onclick="selectTasa(this);">
// ofertasSegunTamañoEmpresa("Micro")

function clasificadorEmpresa(empleados, sector, ingresos, gastos) {
    // Por el momento solo vamos a considerar el número de empleados como 
    // Criterio de clasificación
    tamañoEmpresa = null;
    if (empleados <= 5 ){
        tamañoEmpresa = "Micro";
    } else if (empleados<=15){
        tamañoEmpresa = "Pequeña";
    } else if (empleados<=50){
        tamañoEmpresa = "Mediana"
    } else if (empleados>50){
        tamañoEmpresa = "Grande";
    }
    
    return tamañoEmpresa
};

inputForm.addEventListener('submit', function(e){
    e.preventDefault();
    
    const tamañoEm = clasificadorEmpresa(empleados.value);
    ofertasSegunTamañoEmpresa(tamañoEm);
})

