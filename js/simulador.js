const monto = document.getElementById('monto');
const plazo = document.getElementById('plazo');
let tasa = null;


const llenarTabla = document.querySelector("#lista-tabla tbody");
const divTabla = document.getElementsByClassName('amortización');
const tablaOfertas = document.getElementById('listaOfertas')


const buttonTasa = document.querySelectorAll('.list-group-button');
const buttonSimular = document.getElementById('simular');


function selectTasa(element){
    buttonTasa.forEach(item => {
        item.parentElement.style.backgroundColor = 'transparent';
        item.id = null;
    })

    element.id = "selectedTasa";
    element.parentElement.style.backgroundColor = 'orange';
}


function emptyTasaAlert(){
    Swal.fire({
        title: 'Error!',
        text: 'Debe escoger una tasa para hacerla simulación',
        icon: 'error',
        confirmButtonText: 'Cool'
    })
}


function calcularCuota(monto, interes, tiempo) {

        // variables y constantes a usar

        // La tasa es EA se pasa a períodico
        interes = Math.pow(1 + (interes / 100), (1 / 12)) - 1
        const capital = monto
    
        while (llenarTabla.firstChild) {
            llenarTabla.removeChild(llenarTabla.firstChild);
        }

        const modalCard1 = document.querySelector('#modalCard1')
        while (modalCard1.children.length>2) {
            modalCard1.removeChild(modalCard1.children[1])
            modalCard1.removeChild(modalCard1.lastChild)
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
    
        const pagototal = totalInteres + parseFloat(capital);

        var trace1 = {
            x:fechas,
            y:aporteCapital,
            name: "Capital",
            type: "bar",
        };

        var trace2 = {
            x:fechas,
            y:aporteInteres,
            name:"Interés",
            type:"bar",
        };

        var data = [trace1, trace2];
        var layout = {barmode: 'stack',
        title:{
            text:'Perfil de pagos',
            xref: 'paper',
            x: 0.05,
        },
        yaxis: {
            title: {
                text: 'Pago en pesos'}
        },

        legend: {x:0,y:1.1, orientation: 'h'},
        };
        var config = {responsive: true};
        Plotly.newPlot('chart', data, layout,config);


        const mc1 = document.getElementById('modalCard1');
        let parrafo1 = document.createElement('p');
        parrafo1.innerHTML = `$${pagototal.toFixed(2)} COP`;
        mc1.appendChild(parrafo1);
}


buttonSimular.addEventListener('click', () => {
    let tasa = document.getElementById('selectedTasa');
    if (tasa != null){
        tasa = parseFloat(tasa.children[1].textContent.split("%",1)[0]);
    }else{
        emptyTasaAlert()
    }
    
    
    calcularCuota(parseInt(monto.value), tasa, parseInt(plazo.value));

    if (window.localStorage.getItem('Monto')==null && monto!= null){
        window.localStorage.setItem('Monto', monto.value)
        monto.value = window.localStorage.getItem('Monto')
    }

    fetch('../bancosDB/bancos.json')
        .then((res) => res.json())
        .then((data) => {
            
            data.forEach((banco) => {
                const oferta = document.createElement('li');
                oferta.innerHTML = `<button class="list-group-button" onclick="selectTasa(this);">
                                    <div class="text-success">
                                        <h6 class="my-0">${banco.Banco}</h6>
                                        <small>Préstamo para pequeña empresa</small>
                                    </div>
                                    <span class="text-success">${banco.Tasa}/span>
                                </button> `
                tablaOfertas.appendChild(oferta)
            })
        })
});











