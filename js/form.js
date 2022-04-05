// el script form.js se encarga de rellenar y capturar todos los eventos relacionados con los dos formularios
// tanto el que aparece de forma inicial para capturar los datos de las empresas, como aquel que se muestra luego 
// de dar click al botón "ver ofertas", el segundo form que aparece como  un "popup" muestra las ofertas de bancos
// y tasas dispoibles según el tamaño de la empresa

// Definimos la oferta de bancos, la idea es que posteriormente sea información real
// suministrada por cada entidad de acuerdo a la oferta de sus productos
const bancosDB = {
    "Micro" : [
        {
            "Banco" : "Bancolombia",
            "Tasa"  : 0.06
        },
        {
            "Banco" : "BBVA",
            "Tasa"  : 0.08
        },
        {
            "Banco" : "Citi",
            "Tasa"  : 0.05
        }
    ],

    "Pequeña": [
        {
            "Banco" : "Bancolombia",
            "Tasa"  : 0.08
        },
        {
            "Banco" : "BBVA",
            "Tasa"  : 0.10
        },
        {
            "Banco" : "Citi",
            "Tasa"  : 0.12
        }
        ,
        {
            "Banco" : "Popular",
            "Tasa"  : 0.13
        }
    ],

    "Mediana": [
        {
            "Banco" : "Bancolombia",
            "Tasa"  : 0.15
        },
        {
            "Banco" : "BBVA",
            "Tasa"  : 0.13
        },
        {
            "Banco" : "Citi",
            "Tasa"  : 0.14
        },
        {
            "Banco" : "Davivienda",
            "Tasa"  : 0.17
        }
    ],

    "Grande": [
        {
            "Banco" : "Bancolombia",
            "Tasa"  : 0.25
        },
        {
            "Banco" : "Banco de bogotá",
            "Tasa"  : 0.25
        },
        {
            "Banco" : "Bancoldex",
            "Tasa"  : 0.23
        },
        {
            "Banco" : "Santander",
            "Tasa"  : 0.23
        }
    ]
}


// Un solo chekbox para elegir entre bancos e inversores
// Por el momento solo la oferta de bancos está disponible y 
// Marcar o no marcar no influye en el funcionamiento del código
function onlyOne(checkbox) {
    var checkboxes = document.getElementsByName('check')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false;
    })
}

// Un solo checkbox para elegir alguna de las ofertas de bancos
function onlyOneoption(checkbox) {
    var checkboxes = document.getElementsByName('options')
    checkboxes.forEach((item) => {
        if (item !== checkbox) {
            item.checked = false;
        };
    })
}

// Inserta las ofertas dispoibles en la nueva subventana o POOPUP
function insertOptions(size){

    // Insertar opciones de financiamiento

    const  formOptions = document.getElementsByClassName('ofertas-list')
    for (let i = 0; i <= 3; i++){

    }

    bancosDB[size].forEach((item => {
        let options = document.createElement('label');
        options.innerHTML = `<label> 
                                <div class="banco-nombre">
                                    <span>${item['Banco']}</span>
                                </div>
                                <div class="banco-checkbox">
                                    <span>Tasa: ${item['Tasa']*100}% E.A</span>
                                    <input class="options" id="${item['Banco']}" type="checkbox" name="options" onclick="onlyOneoption(this)" value="${item['Tasa']}"/>
                                    <span class="checkmark"></span>
                                </div>
                            </label>`;
        formOptions[0].appendChild(options)

        
    }))

    // Eliminar sobrantes

    const formOpciones = document.getElementById('listaOfertas')
    for (let i=0; i<formOpciones.children.length;i++){ 
            if(i>=bancosDB[size].length){
                formOpciones.removeChild(formOpciones.children[i-bancosDB[size].length]);
                i -= 1
            }
        }
}


// No funcionó :C
// var cleave = new Cleave('.monto', {
//     numeral: true,
//     numeralThousandsGroupStyle: 'thousand'
// });


