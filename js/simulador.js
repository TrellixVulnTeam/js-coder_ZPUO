
const buttonSimulador = document.getElementById('bttnSimulador');
const Simulador = document.getElementById('tablaSimulador');
const llenarTabla = document.querySelector("#lista-tabla tbody");

const companyName = document.getElementById('nombreEmpresa');
const companyEmpoyees = document.getElementById('numeroEmpleados');
const companySector = document.getElementById('CIIU');

const monto = document.getElementById('monto');
const plazo = document.getElementById('plazo');

function sizeCompany(companyEmpoyees) {
    const tamaño = document.getElementById('tamañoEmpresa');
    while (tamaño.children[1]) {
        tamaño.removeChild(tamaño.children[1]);
    }

    if (companyEmpoyees >= 0 && companyEmpoyees <= 5) {
        sizeCo = 'Micro';
    } else if (companyEmpoyees > 5 && companyEmpoyees <= 10) {
        sizeCo = 'Pequeña';
    } else if (companyEmpoyees > 10 && companyEmpoyees <= 25) {
        sizeCo = 'Mediana';
    } else if (companyEmpoyees > 25) {
        sizeCo = 'Grande';
    } else {
        sizeCo = companyEmpoyees
    }


    const size = document.createElement('p');
    size.innerHTML = `${sizeCo}`;
    tamaño.appendChild(size)

    return sizeCo
}



function calcularCuota(monto, interes, tiempo) {

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

    let = pagoInteres = 0, pagoCapital = 0, cuota = 0;

    let totalInteres = 0
    cuota = monto * (Math.pow(1 + interes, tiempo) * interes) / (Math.pow(1 + interes, tiempo) - 1);
    for (let i = 1; i <= tiempo; i++) {
        pagoInteres = parseFloat(monto * (interes));
        pagoCapital = cuota - pagoInteres;
        monto = parseFloat(monto - pagoCapital);

        totalInteres += pagoInteres
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

    const pagototal = totalInteres + parseFloat(capital)
}




buttonSimulador.addEventListener('click', () => {
    document.getElementsByClassName('ofertas')[0].style.display = 'flex';
    document.body.style.backgroundColor = "rgb(218, 218, 218)";
    size = sizeCompany(companyEmpoyees.value);
    insertOptions(size);
})

function cerrar() {
    document.getElementsByClassName('ofertas')[0].style.display = 'none';
    document.body.style.backgroundColor = "white"
}

Simulador.addEventListener('submit', function (e) {
    e.preventDefault();
    const Op = document.getElementsByName('options');
    Op.forEach((item) => {
        if (item.checked == true) {
            tasa = item.value;
        }
    });

    calcularCuota(parseInt(monto.value), parseFloat(tasa), parseInt(plazo.value))

})

