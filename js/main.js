// Fuente: https://www.youtube.com/watch?v=_VPeRSPlf7g

const monto = document.getElementById('monto');
const tiempo = document.getElementById('tiempo');
const interes = document.getElementById('interes');
const btnCalcular = document.getElementById('btnCalcular');
const llenarTabla = document.querySelector("#lista-tabla tbody");
const llenarTag1 = document.getElementById('intTotal');
const llenarTag2 = document.getElementById('pagoTotal');

btnCalcular.addEventListener('click', () => {
    calcularCuota(monto.value , interes.value, tiempo.value);
});

function calcularCuota(monto, interes, tiempo) {

    // La tasa es EA se pasa a períodico
    interes = interes / 12
    const capital = monto

    while(llenarTabla.firstChild){
        llenarTabla.removeChild(llenarTabla.firstChild);
    }

    let fechas = [];
    let fechaActual = Date.now();
    let mes_actual = moment(fechaActual);
    mes_actual.add(1, 'month');

    let = pagoInteres = 0, pagoCapital=0, cuota=0;

    let  totalInteres = 0
    cuota = monto * (Math.pow(1+interes/100, tiempo)*interes/100)/(Math.pow(1+interes/100, tiempo)-1);
    for (let i=1; i <= tiempo; i++){
        pagoInteres = parseFloat(monto*(interes/100));
        pagoCapital = cuota - pagoInteres;
        monto = parseFloat(monto-pagoCapital);

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

    const paragraph = document.createElement('p');
    paragraph.textContent = `$${totalInteres.toFixed(2)} plazo ${tiempo} interés ${interes.toFixed(2)}`;
    llenarTag1.append(paragraph);

    const paragraph2 = document.createElement('p');
    paragraph2.textContent = `$${pagototal.toFixed(2)} plazo ${tiempo} interés ${interes.toFixed(2)}`;
    llenarTag2.append(paragraph2);
}



