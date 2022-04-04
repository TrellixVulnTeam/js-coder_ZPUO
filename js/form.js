
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
        }
    ],

    "Grande": [
        {
            "Banco" : "Bancolombia",
            "Tasa"  : 0.25
        },
        {
            "Banco" : "BBVA",
            "Tasa"  : 0.25
        },
        {
            "Banco" : "Citi",
            "Tasa"  : 0.23
        }
    ]
}

function onlyOne(checkbox) {
    var checkboxes = document.getElementsByName('check')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false;
    })
}

function onlyOneoption(checkbox) {
    var checkboxes = document.getElementsByName('options')
    checkboxes.forEach((item) => {
        if (item !== checkbox) {
            item.checked = false;
        };
    })
}


function insertOptions(size){

    // Insertar opciones de financiamiento

    const  formOptions = document.getElementsByClassName('ofertas-list')
    for (let i = 0; i <= 3; i++){

    }

    bancosDB[size].forEach((item => {
        let options = document.createElement('label');
        options.innerHTML = `<label> 
                                <p>${item['Banco']}</p>
                                <p>Tasa: ${item['Tasa']}</p>
                                <input class="options" id="${item['Banco']}" type="checkbox" name="options" onclick="onlyOneoption(this)" value="${item['Tasa']}"/>
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



