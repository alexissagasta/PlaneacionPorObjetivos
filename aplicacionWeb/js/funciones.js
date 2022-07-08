//Se declaran variables para su uso en distintas fucniones
nombresAreasEnfoque = [];
nombresObjetivos = [];
planAcciones = [];
planRecursos = [];
planTiempos = [];
planIndicadores = [];
planAccionTitulo = [];
planEmpresa = [];
var cantPlanes;

//Función que sirve para traer las areas de enfoque
async function getData() {
  //
  const response = await fetch("/areasDeEnfoque", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  })

  const data = await response.json();
  const lts = data;
  lts.forEach(lt => {

    const nombre = lt.nombre;
    const objetivos = lt.objetivos;
    nombresAreasEnfoque.push(nombre);
    objetivos.forEach(lt => { nombresObjetivos.push(lt) });

  });
}

//Función que sirve para traer los planes de acción.
async function getPlanesAccion(titulo) {//de acuerdo al titulo, te trae todo el plan de acción
  //
  const response = await fetch("/planesDeAccion/" + titulo, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  })

  const data = await response.json();
  planAcciones = data.acciones;
  planRecursos = data.recursos;
  planTiempos = data.tiempos
  planIndicadores = data.indicadoresYmetas;
}

//Función que sirve para traer el titulo de planes de acción.
async function getPlanesTitulo() {
  //
  const response = await fetch("/titulosPlanesDeAccion", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  })

  const data = await response.json();
  planAccionTitulo = data;
}

async function getConfig() {
  //
  var nombEmpresa = "todas";
  const response = await fetch("/configuracion/todas", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  })

  const data = await response.json();
  planActual = data[0]
  cantPlanes = planActual.cantPlanes;

  return cantPlanes
}


//Esta funcion se encarga de crear nuevos elementos de area de enfoque, objetivo y
//plan de áccion en el docuemnto html
async function agregarAreadeEnfoque() {

  //Se llama a la funcion getConfig para obtener la configuracion de la empresa y 
  //establecer el valor de cantPlanes
  await getConfig();

  //Se crea la variable numero que mas adelante se usara para establecer el nuevo valor
  //de cantPlanes
  numero = parseInt(cantPlanes, 10);

  if (1 <= numero && numero <= 3) {

    //Se crean las ids de los nuevos elementos a crear; esto al concatenar el tipo de elemento 
    //y la cantPlanes disponibles
    id = "id" + cantPlanes;
    idSelectAreas = "idSelectAreas" + cantPlanes;
    idSelectObjetivos = "idSelectObjetivos" + cantPlanes;
    idSelectPlanes = "idSelectPlanes" + cantPlanes;

    idDivAreaDeEnfoque = "idDivAreaDeEnfoque" + cantPlanes;
    idDivObjetivo = "idDivObjetivo" + cantPlanes;
    idDivPlanes = "idDivPlanes" + cantPlanes;

    idPAreaDeEnfoque = "idPAreaDeEnfoque" + cantPlanes;
    idPObjetivo = "idPObjetivo" + cantPlanes;
    idPPlanes = "idPPlanes" + cantPlanes;

    idCAreaDeEnfoque = "idCAreaDeEnfoque" + cantPlanes;
    idCObjetivo = "idCObjetivo" + cantPlanes;
    idCPlanes = "idCPlanes" + cantPlanes;

    idObjetivo = "idObjetivo" + cantPlanes;
    idPlan = "idPlan" + cantPlanes;
    idFormPlanEncargados = "formPlanEncargados" + cantPlanes;
    idTodasAcciones = "todasAcciones" + cantPlanes;
    idTodosRecursos = "todosRecursos" + cantPlanes;
    idTodosTiempos = "todosTiempos" +cantPlanes;
    idIndicadores = "indicadores" + cantPlanes;

    /*En este apartado inicia para agregar AREAS DE ENFOQUE con el botón */
    const form = document.createElement('form');
    opcionesAreasDeEnfoque = [];
    for (let i = 0; i < nombresAreasEnfoque.length; i++) {
      opcion = "<option value=" + JSON.stringify(nombresAreasEnfoque[i]) + ">" + nombresAreasEnfoque[i] + "</option>";
      opcionesAreasDeEnfoque.push(opcion);
    }
    form.innerHTML = `    
          <label for="AreasDeEnfoque">Áreas De Enfoque:</label>
          <select name="AreasDeEnfoque" id=`+ JSON.stringify(idSelectAreas) + `>
            <optgroup label="AreasDeEnfoque">
              `+ opcionesAreasDeEnfoque + `       
            </optgroup>
          </select>
          <button onClick = seleccionAreaEnfoque(`+ JSON.stringify(idSelectAreas) + `,` + JSON.stringify(idPAreaDeEnfoque) + `)> Seleccionar </button>
          <br><br>    
        `;

    //aqui se crea la divicion que incluye el boton(collapsible) y el contenido(content)      
    const div = document.createElement('div');
    div.className = 'agregado';
    div.id = idDivAreaDeEnfoque;
    div.innerHTML = `
      <button style="display:inline-block" class="collapsible" id=`+ id + ` onclick="hacerColapsable(this.id)">Área de enfoque</button>     
      <div class="content" style = "text-align:center" id=`+ JSON.stringify(idCAreaDeEnfoque) + `>
        `+ form.innerHTML + `
        <p style = "text-align:center" class="claseAreaEnfoque" contenteditable="true" id=`+ JSON.stringify(idPAreaDeEnfoque) + `> --- </p>
        <button style = "text-align:center" onClick = agregarAreaDeEnfoque(`+ JSON.stringify(idPAreaDeEnfoque) + `)> Agregar nuevo </button>     
        <button class="btnEliminarElemento" onclick=eliminarAreaDeEnfoque(`+ JSON.stringify(idDivAreaDeEnfoque) + `,` + JSON.stringify(idDivObjetivo) + `,` + JSON.stringify(idDivPlanes) + `)>Eliminar</button>
      </div>
      
        
        `;

    document.getElementById('ejemploAreadeEnfoque').appendChild(div);

    /*En este apartado inicia para agregar OBJETIVOS con el mismo botón */
    const form2 = document.createElement('form');
    opcionesObjetivos = [];
    for (let i = 0; i < nombresObjetivos.length; i++) {
      opcion = "<option value=" + JSON.stringify(nombresObjetivos[i]) + ">" + nombresObjetivos[i] + "</option>";
      opcionesObjetivos.push(opcion);
    }
    form2.innerHTML = `      
          <label for="AreasDeEnfoque">Objetivo:</label>
          <select name="Objetivo" id=`+ JSON.stringify(idSelectObjetivos) + `>
            <optgroup label="Objetivos">
              `+ opcionesObjetivos + `              
            </optgroup>
          </select>
          <button onClick = seleccionAreaEnfoque(`+ JSON.stringify(idSelectObjetivos) + `,` + JSON.stringify(idPObjetivo) + `)> Seleccionar </button>
          <br><br>         
        `;

    const div2 = document.createElement('div');
    div2.className = 'agregado';
    div2.id = idDivObjetivo;
    div2.innerHTML = `
        <button class="collapsible" id=`+ JSON.stringify(idObjetivo) + ` onclick="hacerColapsable(this.id)">Objetivo</button>
        <div class="content" style = "text-align:center" id=`+ JSON.stringify(idCObjetivo) + `>
          `+ form2.innerHTML + `
          <table class="center">
            <tr class=cabecera contenteditable:false>
              <td>Objetivo</td> 
              <td>Porcentaje completado</td>
            </tr>
            <tr contenteditable=true>
              <td class="claseObjetivos" id=`+ JSON.stringify(idPObjetivo) + `> --- </td>
              <td class="clasePorcentaje"> --- </td>
            </tr>
          </table>
          <br><br>
          <button style = "text-align:center" onClick = agregarAreaDeEnfoque(`+ JSON.stringify(idPObjetivo) + `)> Agregar nuevo objetivo </button>
          <br><br>
          </div>
        `;

    document.getElementById('ejemploObjetivo').appendChild(div2);

    /*En este apartado inicia para agregar PLANES DE ACCIÓN con el mismo botón*/
    await getPlanesTitulo()

    //Pendientes
    /*Boton guardar cambios*/

    const form3 = document.createElement('form');
    opcionesPlanAccionTitulo = [];
    for (let i = 0; i < planAccionTitulo.length; i++) {
      opcion = "<option value=" + JSON.stringify(planAccionTitulo[i]) + ">" + planAccionTitulo[i] + "</option>";
      opcionesPlanAccionTitulo.push(opcion);
    }
    form3.innerHTML = ` 
          <label for="PlanesDeAccion">Planes de acción:</label>
          <select name="plandeaccion" id=`+ JSON.stringify(idSelectPlanes) + `>
            <optgroup label="Planes de acciones">
              `+ opcionesPlanAccionTitulo + `    
            </optgroup>
          </select>
          <button onClick = seleccionPlan(`+ JSON.stringify(idSelectPlanes) + `,` + JSON.stringify(idFormPlanEncargados) + `,` + JSON.stringify(idTodasAcciones) + `,` + JSON.stringify(idTodosRecursos) +`,` + JSON.stringify(idTodosTiempos) + `,` + JSON.stringify(idIndicadores) + `,` + JSON.stringify(idCPlanes) + `)> Seleccionar </button>
          <br><br>       
        `;

    const div4 = document.createElement('div');
    div4.className = 'agregado';
    div4.id = 'div4';
    div4.innerHTML = `
          <label for="encargados">Encargado:</label>
          <form id=`+ JSON.stringify(idFormPlanEncargados) + `></form>
          <br>

          <label for="acciones">Acciones:</label>
          <div id=`+ JSON.stringify(idTodasAcciones) + `></div>
          <br>
        
          <label for="recursos">Recursos:</label>
          <div id=`+ JSON.stringify(idTodosRecursos) + `></div>
          <br>

          <label for="tiempo">Tiempo:</label>
          <p style = "text-align:center;" contenteditable="true" id=`+ JSON.stringify(idTodosTiempos) + `></p>
          <br>
        
          <label for="indicadores">Indicadores:</label>
          <p style = "text-align:center;" contenteditable="true" id=`+ JSON.stringify(idIndicadores) + `></p>
          <br>      
          `

    const div3 = document.createElement('div');
    div3.className = 'agregado';
    div3.id = idDivPlanes;
    div3.innerHTML = `
        <button class="collapsible" id=`+ idPlan + ` onclick="hacerColapsable(this.id)">Plan de acción</button>
        <div class="content" style = "text-align:center" id=`+ JSON.stringify(idCPlanes) + `>
          `+ form3.innerHTML + `
          <div id="contenidoPlanesAcciones">
            <p style = "text-align:center;display:inline-block" contenteditable="true" id=`+ JSON.stringify(idPPlanes) + `>` + div4.innerHTML + `</p>
          </div>
          <br><br>
          </div>
        `;

    document.getElementById('ejemploPlanesAccion').appendChild(div3);

    numero--;
    await updateCantPlanes(JSON.stringify(numero));

  } else {
    alert("Ya creo el maximo de planes, puede incrementar la cantidad en configuraciónes.")
  }
}

//Función que sirve para actualizar el numero de planes en la base de datos que se 
//encuentra en ese momento
async function updateCantPlanes(numero) {

  cantPlanes = {
    cantPlanes: numero
  }

  var nombEmpresa = "todas";
  const response = await fetch("/configuracion/todas", {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(cantPlanes)
  });

  return response.json()

}

//Agrega un area de enfoque a la base de datos a partir del idP que se le envie
async function agregarAreaDeEnfoque(idP) {

  yeah = document.getElementById(idP).textContent;
  areaDeEnfoque = { nombre: yeah }
  const response = await fetch("/areaDeEnfoque", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(areaDeEnfoque)

  });
  return response.json()
}

//Funcion que se encarga de eliminar un set de area de enfoque, objetivo y plan de accion
async function eliminarAreaDeEnfoque(idArea, idObjetivo, idPlan) {

  //Se llama a la funcion getConfig para obtener la configuracion de la empresa y 
  //establecer el valor de cantPlanes
  await getConfig();

  //Se crea la variable numero que mas adelante se usara para establecer el nuevo valor
  //de cantPlanes
  numero = parseInt(cantPlanes, 10);

  //Se obtienen los elementos que se removeran
  let area = document.getElementById(idArea);
  let objetivo = document.getElementById(idObjetivo);
  let plan = document.getElementById(idPlan);

  //Se remueven los elementos
  area.remove();
  objetivo.remove();
  plan.remove();

  //Se aumenta y actualiza la cantidad de planes en la base de datos
  numero++;
  await updateCantPlanes(JSON.stringify(numero));

}

//Funcion que se encarga de asiganar el valor al elemento idSelectPlan que tiene en 
//ese momento al elemento idDivPlan
async function seleccionPlan(idSelectPlanes, idFormPlanEncargados, idTodasAcciones, idTodosRecursos, idTodosTiempos, idIndicadores, idContenido) {
  var planseleccionado = document.getElementById(idSelectPlanes).value;
  await getPlanesAccion(planseleccionado)

  // Se crea el formulario para seleccionar en elcargado del plan 
  //por ahora se establece un valor pre establecido ya que no se
  //manejan usuarios aun
  let encargadosTodos = "<select name=encargados id=encargados><optgroup label=Encargados>";
  for (let i = 0; i < 1; i++) {
    encargadosTodos += "<option class=claseEncargados value=luis>Luis</option><option value=mario>Mario</option>";
  }
  encargadosTodos += "</optgroup></select><br><br>"

  // Tabla de contenido para llenar las acciones al momento de seleccionar un plan de acción
  let accionesTodas = "<table class=center style =  contenteditable:true ><tr class=cabecera style = contenteditable:false><td>Acciones</td> <td>Porcentaje completado</td></tr>";
  for (let i = 0; i < planAcciones.length; i++) { 
    accionesTodas += "<tr><td contenteditable=true class=claseAcciones>" + planAcciones[i] + "</td> <td contenteditable=true class=clasePorcentajeAcciones>0%</td></tr>";
  }
  accionesTodas += "</table>"

  // Tabla de contenido para llenar los recursos al momento de seleccionar un plan de acción
  let recursosTodas = "<table class=center style = contenteditable:true><tr class=cabecera style = contenteditable:false><td>Recursos</td></tr>";
  for (let i = 0; i < planRecursos.length; i++) {
    recursosTodas += "<tr><td contenteditable=true class=claseRecursos>" + planRecursos[i] + "</td></tr>";
  }
  recursosTodas += "</table>"

  // Tabla de contenido para llenar los recursos al momento de seleccionar un plan de acción
  let tiempos = "<p class=claseTiempos>" + planTiempos + "</p>"

  // Tabla de contenido para llenar los recursos al momento de seleccionar un plan de acción
  let indicadores = "<p class=claseIndicadores>" + planIndicadores + "</p>"

  //Se cambia el contenido de los elementos acciones, recursos, encargados e indicadores
  document.getElementById(idTodasAcciones).innerHTML = accionesTodas;
  document.getElementById(idTodosRecursos).innerHTML = recursosTodas;
  document.getElementById(idTodosTiempos).innerHTML = tiempos;
  document.getElementById(idFormPlanEncargados).innerHTML = encargadosTodos;
  document.getElementById(idIndicadores).innerHTML = indicadores;

  //se cambia el tamaño del elemento divPlan
  var div = document.getElementById(idContenido);
  div.style.maxHeight = div.scrollHeight + "px";
  console.log()

}

async function obtenerPlanEmpresa(email) {
  const response = await fetch("/obtenerPlanEmpresa/" + email, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  })

  const data = await response.json();
  const lts = data;
  await lts.forEach(async lt => {

    const email = lt.email;
    const mision = lt.mision;
    const vision = lt.vision;
    const valores = lt.valores;
    const areasEnfoque = lt.areasEnfoque;
    const objetivos = lt.objetivos;
    const porcentaje = lt.porcentaje;

    planEmpresa.push(email, mision, vision, valores, areasEnfoque, objetivos, porcentaje);
  });
  console.log("Plan empresa "+planEmpresa)
}


async function crearPlanEmpresa() {
  let email = document.getElementById("idEmail").textContent;
  console.log(email);
  await obtenerPlanEmpresa(email)
  if (planEmpresa.length > 0) {
    document.getElementById("idMision").textContent = planEmpresa[1];
    document.getElementById("idVision").textContent = planEmpresa[2];
    document.getElementById("idValores").textContent = planEmpresa[3];
    
    let areasEnfoqueEmpresa=planEmpresa[4]
    // variable numPlanesAccion que sirve para saber el numero de areas de enfoque, 
    //lo cual ayudará para agregar la cantidad de botones de planes de acción de acuerdo a la cantidad de areas de enfoque.
    let numPlanesAccion = areasEnfoqueEmpresa.length;


    areasEnfoqueEmpresa.forEach(async lt => {
        await agregarAreaDeEnfoqueEmpresa(lt)
    })

    let objetivosEmpresa=planEmpresa[5]
    let porcentaje = planEmpresa[6]

    console.log("Contenido nombres objetivos123 "+objetivosEmpresa)
    objetivosEmpresa.forEach(async lt =>{
      porcentaje.forEach(async lt2 =>{
        await agregarNombresObjetivosEmpresa(lt, lt2)
      })
    })

    
  
  }

}

function generateRandomInteger(max) {
  return Math.floor(Math.random() * max) + 1;
}


async function agregarAreaDeEnfoqueEmpresa(areasEnfoqueEmpresa){
  let idRandom = generateRandomInteger(100000000000);

  /*En este apartado inicia para agregar AREAS DE ENFOQUE con el botón */
  const form = document.createElement('form');
  opcionesAreasDeEnfoque = [];
  for (let i = 0; i < nombresAreasEnfoque.length; i++) {
    opcion = "<option value=" + JSON.stringify(nombresAreasEnfoque[i]) + ">" + nombresAreasEnfoque[i] + "</option>";
    opcionesAreasDeEnfoque.push(opcion);
  }
  form.innerHTML = `    
        <label for="AreasDeEnfoque">Áreas De Enfoque:</label>
        <select name="AreasDeEnfoque" id=`+ JSON.stringify(idRandom+"SelectAreas") + `>
          <optgroup label="AreasDeEnfoque">
            `+ opcionesAreasDeEnfoque + `       
          </optgroup>
        </select>
        <button onClick = seleccionAreaEnfoque(`+ JSON.stringify(idRandom+"SelectAreas") + `,` + JSON.stringify(idRandom+"PAreaDeEnfoque") + `)> Seleccionar </button>
        <br><br>    
      `;

  //aqui se crea la divicion que incluye el boton(collapsible) y el contenido(content)      
  const div = document.createElement('div');
  div.className = 'agregado';
  div.id = idRandom+"DivAreaDeEnfoque";
  div.innerHTML = `
    <button style="display:inline-block" class="collapsible" id=`+ idRandom + ` onclick="hacerColapsable(this.id)">Área de enfoque</button>     
    <div class="content" style = "text-align:center" id=`+ JSON.stringify(idRandom+"CAreaDeEnfoque") + `>
      `+ form.innerHTML + `
      <p style = "text-align:center" contenteditable="true" id=`+ JSON.stringify(idRandom+"PAreaDeEnfoque") + `> `+areasEnfoqueEmpresa+` </p>
      <button style = "text-align:center" onClick = agregarAreaDeEnfoque(`+ JSON.stringify(idRandom+"PAreaDeEnfoque") + `)> Agregar nuevo </button>     
      <button class="btnEliminarElemento" onclick=eliminarAreaDeEnfoque(`+ JSON.stringify(idRandom+"DivAreaDeEnfoque") + `,` + JSON.stringify(idRandom+"DivObjetivo") + `,` + JSON.stringify(idRandom+"DivPlanes") + `)>Eliminar</button>
    </div>
    
      
      `;

  document.getElementById('ejemploAreadeEnfoque').appendChild(div);

}

/*En este apartado inicia para agregar OBJETIVOS con el mismo botón */
async function agregarNombresObjetivosEmpresa(objetivosEmpresa, porcentajeObjetivo){
  let idRandom = generateRandomInteger(100000000000);

  const form2 = document.createElement('form');
  opcionesObjetivos = [];
  for (let i = 0; i < nombresObjetivos.length; i++) {
    opcion = "<option value=" + JSON.stringify(nombresObjetivos[i]) + ">" + nombresObjetivos[i] + "</option>";
    opcionesObjetivos.push(opcion);
  }
  form2.innerHTML = `      
        <label for="AreasDeEnfoque">Objetivo:</label>
        <select name="Objetivo" id=`+ JSON.stringify(idRandom+"SelectObjetivos") + `>
          <optgroup label="Objetivos">
            `+ opcionesObjetivos + `              
          </optgroup>
        </select>
        <button onClick = seleccionAreaEnfoque(`+ JSON.stringify(idRandom+"SelectObjetivos") + `,` + JSON.stringify(idRandom+"PObjetivo") + `)> Seleccionar </button>
        <br><br>         
      `;

  const div2 = document.createElement('div');
  div2.className = 'agregado';
  div2.id = idRandom+"DivObjetivo";
  div2.innerHTML = `
      <button class="collapsible" id=`+ JSON.stringify(idRandom+"Objetivo") + ` onclick="hacerColapsable(this.id)">Objetivo</button>
      <div class="content" style = "text-align:center" id=`+ JSON.stringify(idRandom+"CObjetivo") + `>
        `+ form2.innerHTML + `
        <table class="center">
          <tr class=cabecera contenteditable:false>
            <td>Objetivo</td> 
            <td>Porcentaje completado</td>
          </tr>
          <tr contenteditable=true>
            <td id=`+ JSON.stringify(idRandom+"PObjetivo") + `> `+objetivosEmpresa+` </td>
            <td id=`+ JSON.stringify(idRandom+"PPorcentaje") + `> `+porcentajeObjetivo+ `</td>
          </tr>
        </table>
        <br><br>
        <button style = "text-align:center" onClick = agregarAreaDeEnfoque(`+ JSON.stringify(idRandom+"PObjetivo") + `)> Agregar nuevo objetivo </button>
        <br><br>
        </div>
      `;

  document.getElementById('ejemploObjetivo').appendChild(div2);
}

async function guardarCambios(email) {
  let nuevoMision = document.getElementById("idMision").textContent
  let nuevoVision = document.getElementById("idVision").textContent
  let nuevoValores = document.getElementById("idValores").textContent
  let nuevoAcciones = document.getElementsByClassName("claseAcciones")

  let guardar = {
    email: email,
    mision: nuevoMision,
    vision: nuevoVision,
    valores: nuevoValores
  }
}

this.onload = getData();