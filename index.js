require('dotenv').config();


const { leerInput, inquiererMenu, pausa, listaLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


const main = async () => {

    const busquedas = new Busquedas();
    let opt = '';

    do {
        opt = await inquiererMenu();

        switch (opt) {
            case 1:
                // Mostrar mensaje
                const terminoBusqueda = await leerInput('Ciudad: ');

                // Buscar los lugares
                const lugares = await busquedas.ciudad(terminoBusqueda);

                // Seleccionar el lugar
                const id = await listaLugares(lugares);

                if (id === '0') continue;

                const lugarSel = lugares.find(l => l.id === id);

                //guardar en DB
                busquedas.agregarHistorial(lugarSel.nombre)

                const { nombre, lng, lat } = lugarSel;

                // Clima
                const clima = await busquedas.climaLugar(lat, lng);

                const { min, max, desc, temp } = clima;

                // Mostrar resultados
                console.clear();
                console.log(`${'Ciudad'.green}: ${nombre}`);
                console.log(`${'Lng'.green}: ${lat}`);
                console.log(`${'Lat'.green}: ${lng}`);
                console.log(`${'Temperatura'.green}: ${Math.round(temp)}`);
                console.log(`${'Mínima'.green}: ${Math.round(min)}`);
                console.log(`${'Máxima'.green}: ${Math.round(max)}`);
                console.log(`${'Precipitación'.green}: ${desc}`);
                break;
            case 2:
                console.log('\n');
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx = `${i + 1}.`.green;
                    console.log(`${idx} ${lugar}`);
                })

                break;
        }

        console.log('\n');

        if (opt !== 0) await pausa();

    } while (opt !== 0);

}
main();