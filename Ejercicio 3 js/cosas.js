

const mostrarEtiquetas = (lista) => {
    const contenedor = document.querySelector("#etiquetas");
    contenedor.innerHTML = "";
    lista.forEach(habilidad => {
        const etiqueta = document.createElement("span");
        etiqueta.classList.add("etiqueta");
        etiqueta.textContent = habilidad;
        contenedor.appendChild(etiqueta);
    });
};


const construirPerfil = (datosPais) => {
    const nombre = datosPais.name.find(n => n.language === "EN")?.text 
                || datosPais.name[0]?.text 
                || "Sin nombre";

    return {
        nombre:        nombre,
        isoCode:       datosPais.isoCode,
        idiomas:       datosPais.officialLanguages.join(", ") || "No disponible",
        numNombres:    datosPais.name.length,
        primerNombre:  datosPais.name[0]?.text + " (" + (datosPais.name[0]?.language || "?") + ")",
        ultimoNombre:  datosPais.name[datosPais.name.length - 1]?.text + " (" + (datosPais.name[datosPais.name.length - 1]?.language || "?") + ")"
    };
};

const renderizarPerfil = (perfil) => {
    document.getElementById("nombre").textContent     = perfil.nombre;
    document.getElementById("isoCode").textContent    = perfil.isoCode;
    document.getElementById("idiomas").textContent    = perfil.idiomas;
    document.getElementById("numNombres").textContent = perfil.numNombres;
    document.getElementById("primerNombre").textContent = perfil.primerNombre;
    document.getElementById("ultimoNombre").textContent = perfil.ultimoNombre;
};

const cargarPais = async () => {
    const mensaje = document.getElementById("loading");
    mensaje.textContent = "Cargando país...";

    try {
        const respuesta = await fetch("https://openholidaysapi.org/Countries");
        const datos     = await respuesta.json();
        const paisElegido = datos.find(p => p.isoCode === "US") || datos[0];
        const perfil = construirPerfil(paisElegido);

        renderizarPerfil(perfil);
        mostrarEtiquetas(habilidades);

        mensaje.textContent = "¡País cargado!";

    } catch (error) {
        mensaje.textContent = "Error al cargar los datos del país";
        console.error("Error fetching Countries:", error);
    }
};

document.getElementById("btn").addEventListener("click", cargarPais);