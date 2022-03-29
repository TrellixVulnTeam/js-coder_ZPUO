// Fuente: https://www.youtube.com/watch?v=_VPeRSPlf7g

const simulador = document.getElementById('simulador');
const calcular = document.getElementById('calcular');
const tarjeta1 = document.getElementById('tarjeta-total');

const monto = document.getElementById('GET-monto');
const tasa = document.getElementById('GET-interes');
const plazo = document.getElementById('GET-plazo');

const llenarTabla = document.querySelector("#lista-tabla tbody");

window.onload = function saludo(){
    alert("Bienvenido al simulador de financiamiento");
}

function calcularCuota(monto, interes, tiempo) {

    // La tasa es EA se pasa a períodico
    interes = Math.pow(1+(interes/100),(1/12))-1
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
    let tarjeta = document.createElement('p');
    tarjeta.innerHTML = `${pagototal.toFixed(2)}
                        <br />
                        Con tasa Namv ${(interes*12*100).toFixed(2)}% a ${tiempo} meses`;
    tarjeta1.appendChild(tarjeta);
}


simulador.addEventListener('submit',()=>{
    calcularCuota(parseFloat(monto.value), parseFloat(tasa.value), parseFloat(plazo.value));
})

simulador.addEventListener('submit',function(e){
    e.preventDefault();
})
// simulador.addEventListener('submit',function(e){
//     let tarjeta = document.createElement('p');
//     tarjeta.innerHTML = `${monto.value}`;
//     tarjeta1.appendChild(tarjeta);
//     e.preventDefault();
// })