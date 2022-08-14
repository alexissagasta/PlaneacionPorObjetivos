nombresAreasEnfoque = [];
nombresObjetivos = [];
nombresPlanesAcciones = [];
//Obtención de los nombres o titulos de las areas de enfoque
async function obtenerAreas() {
    const response = await fetch("/areasDeEnfoque", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
  
    const data = await response.json();
    const opcionesAreas = data;

    for(let i = 0; i < opcionesAreas.nombre; i++){
      const nombre = opcionesAreas[i];
      nombresAreasEnfoque.push(nombre);
    }
    
}
//Obtención de los objetivos de las areas de enfoque
async function obtenerObjetivos() {
  const response = await fetch("/areasDeEnfoque", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  })

  const data = await response.json();
  const opcionesObjetivos = data;

  for(let i = 0; i < opcionesObjetivos.objetivos; i++){
    const objetivos = opcionesObjetivos[i];
    nombresObjetivos.push(objetivos);
  }

}

async function obtenerTituloPlanesAcciones() {
  //
  const response = await fetch("/titulosPlanesDeAccion", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  })

  const data = await response.json();
  const opcionesTituloPlanesAcciones = data;

  for(let i = 0; i < opcionesTituloPlanesAcciones.length; i++){
    const titulosPlanes = opcionesTituloPlanesAcciones[i];
    nombresPlanesAcciones.push(titulosPlanes);
  }

}


async function crearTablaAreas(idAreas) {
    await obtenerAreas()
  
    // Se crea el formulario para seleccionar en elcargado del plan 
    //por ahora se establece un valor pre establecido ya que no se
    //manejan usuarios aun
    
  
    // Tabla de contenido para llenar las acciones al momento de seleccionar un plan de acción
    let areasTodas = "<table class=center style =  background-color:#FFFFFF ><tr class=cabecera style = contenteditable:false ><td></td></tr>";
    for (let i = 0; i < nombresAreasEnfoque.length; i++) {
        areasTodas += "<tr><td contenteditable=false style=text-align:center >" + nombresAreasEnfoque[i] + "</td></tr>";
    }
    areasTodas += "</table>"
  
    //Se cambia el contenido de los elementos acciones, recursos, encargados e indicadores
    document.getElementById(idAreas).innerHTML = areasTodas;
    
  }

  async function crearTablaObjetivos(idObjetivos) {
    await obtenerObjetivos();
  
    // Se crea el formulario para seleccionar en elcargado del plan 
    //por ahora se establece un valor pre establecido ya que no se
    //manejan usuarios aun
    
  
    // Tabla de contenido para llenar las acciones al momento de seleccionar un plan de acción
   let objetivosTodas = "<table class=center style =  background-color:#FFFFFF ><tr class=cabecera style = contenteditable:false ><td></td></tr>";
   for (let i = 0; i < nombresObjetivos.length; i++) {
    objetivosTodas += "<tr><td contenteditable=false style=text-align:center >" + nombresObjetivos[i] + "</td></tr>";
   }
   objetivosTodas += "</table>"
 
   //Se cambia el contenido de los elementos acciones, recursos, encargados e indicadores
   document.getElementById(idObjetivos).innerHTML = objetivosTodas;
    
  }

  async function crearTablaPlanesAcciones(idPlanes) {
    await obtenerTituloPlanesAcciones();
  
    // Se crea el formulario para seleccionar en elcargado del plan 
    //por ahora se establece un valor pre establecido ya que no se
    //manejan usuarios aun
    
  
    // Tabla de contenido para llenar las acciones al momento de seleccionar un plan de acción
   let planAccionTodas = "<table class=center style =  background-color:#FFFFFF ><tr class=cabecera style = contenteditable:false ><td></td></tr>";
   for (let i = 0; i < nombresPlanesAcciones.length; i++) {
    planAccionTodas += "<tr><td contenteditable=false style=text-align:center >" + nombresPlanesAcciones[i] + "</td></tr>";
   }
   planAccionTodas += "</table>"
 
   //Se cambia el contenido de los elementos acciones, recursos, encargados e indicadores
   document.getElementById(idPlanes).innerHTML = planAccionTodas;
    
  }
  
  this.onload = crearTablaAreas("tablaAreas");
  this.onload = crearTablaObjetivos("tablaObjetivos");
  this.onload = crearTablaPlanesAcciones("tablaPlanesAcciones");

