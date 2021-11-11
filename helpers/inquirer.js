const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                name: `${('1.'.green)} Buscar Ciudad`
            }, {
                value: 2,
                name: `${('2.'.green)} Historial`
            },{
                value: 0,
                name: `${('0.'.green)} Salir`
            },
        ]
    }
]

const inquiererMenu = async () => {

    console.clear();

    const { option } = await inquirer.prompt(questions)

    return option;
}


const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar\n`
        }
    ]

    await inquirer.prompt(question)

}


const leerInput = async (message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor'
                }

                return true;
            }
        }
    ]

    const { desc } = await inquirer.prompt(question)

    return desc

}


const listaLugares = async( lugares = [] ) =>{

    const choices = lugares.map( (lugar, i) =>{

        const idx = `${i + 1}.`.green;

        return {
            value: lugar.id ,
            name: `${ idx } ${ lugar.nombre }`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar:',
            choices
        }
    ];

    const { id } = await inquirer.prompt( preguntas );
    return id;
}



const confirmar = async( message ) =>{

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt( question );
    return ok;
}




const mostrarListadoChecklist = async( tareas = [] ) =>{

    const choices = tareas.map( (tarea, i) =>{

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id ,
            name: `${ idx } ${ tarea.desc }`,
            checked: ( tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ];

    const { ids } = await inquirer.prompt( pregunta );
    return ids;
}


module.exports = {
    inquiererMenu,
    pausa,
    leerInput,
    listaLugares,
    confirmar,
    mostrarListadoChecklist,
}