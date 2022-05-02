const empleados = document.getElementById('empleados');
const sector = document.getElementById('sector');
const ingresos = document.getElementById('ingresos');
const gastos = document.getElementById('gastos');

const sectionSimulador = document.getElementById('simuladorCuota');
const ofertasUl = document.getElementById('ofertasUl');

const inputForm = document.getElementById('inputForm');
const simuladorForm = document.getElementById('inputFormSimulador');

const monto = document.getElementById('monto');
const plazo = document.getElementById('plazo');
var tasa = null;
const amortizacion = document.getElementById('amortizacion');
const llenarTabla = document.querySelector("#lista-tabla tbody");


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
                ofertasLi.innerHTML = `<a href="#simuladorCuota">
                                            <button class="list-group-button" onclick="ofertasOnclick(this);">
                                            <div class="text-success">
                                                <h4 class="my-0">${of.Banco}</h4>
                                                <small>Préstamo para ${tamaño} empresa</small>
                                            </div>
                                            <span class="text-success" id="ofertasSpan">${parseFloat(of.Tasa)*100}%</span>
                                        </button>
                                    </a> `;
                ofertasUl.appendChild(ofertasLi);
            })
        })
}

inputForm.addEventListener('submit', function(e){
    e.preventDefault();
    
    const tamañoEm = clasificadorEmpresa(empleados.value);
    ofertasSegunTamañoEmpresa(tamañoEm);
})
ofertasSegunTamañoEmpresa('Micro')
// ofertasSegunTamañoEmpresa('Micro')

// `<button class="list-group-button" onclick="selectTasa(this);">
// ofertasSegunTamañoEmpresa("Micro")

function ofertasOnclick(obj)  {
    sectionSimulador.style.display = 'grid';
    obj.id = 'tasaEscogida';
} 

// console.log(tasa)

function calcularCuota(monto, interes, tiempo) {

    // variables y constantes a usar
    amortizacion.style.display = "flex";
    // La tasa es EA se pasa a períodico
    interes = Math.pow(1 + (interes / 100), (1 / 12)) - 1
    const capital = monto

    while (llenarTabla.firstChild) {
        llenarTabla.removeChild(llenarTabla.firstChild);
    }

    let fechas = [];
    let fechaActual = Date.now();
    let mes_actual = moment(fechaActual);
    mes_actual.add(1, 'month');

    const aporteCapital = [];
    const aporteInteres = [];

    let pagoInteres = 0;
    let pagoCapital = 0;
    let cuota = 0;

    let totalInteres = 0;

    cuota = monto * (Math.pow(1 + interes, tiempo) * interes) / (Math.pow(1 + interes, tiempo) - 1);
    for (let i = 1; i <= tiempo; i++) {

        // Calculo para cada fecha
        pagoInteres = parseFloat(monto * (interes));
        pagoCapital = cuota - pagoInteres;
        monto = parseFloat(monto - pagoCapital);
        totalInteres += pagoInteres

        // Almacenar en un array
        aporteCapital[i] = pagoCapital;
        aporteInteres[i] = pagoInteres;

        // Formato fechas
        fechas[i] = mes_actual.format("DD-MM-YYYY");
        mes_actual.add(1, 'month');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${fechas[i]}</td>
            <td>${cuota.toFixed(2)}</td>
            <td>${pagoCapital.toFixed(2)}</td>
            <td>${pagoInteres.toFixed(2)}</td>
            <td>${monto.toFixed(2)}</td>
        `;
        llenarTabla.appendChild(row)
    }
}

simuladorForm.addEventListener('submit', function(e){
    e.preventDefault();
    var spanTasa = document.getElementById('tasaEscogida');
    if (spanTasa != null) {
        var tasa = parseFloat(spanTasa.children[1].textContent.split("%")[0])/100
    }
    
    calcularCuota(parseFloat(monto.value),tasa,parseFloat(plazo.value))

})

