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
  console.log("Cant planes accion "+numero)
  
  cantPlanes = {
    cantPlanes: numero
  }

  console.log("Cant planes "+cantPlanes)
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
      <p style = "text-align:center" contenteditable="true" class="claseAreaEnfoque" id=`+ JSON.stringify(idRandom+"PAreaDeEnfoque") + `> `+areasEnfoqueEmpresa+` </p>
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
            <td class ="claseObjetivos" id=`+ JSON.stringify(idRandom+"PObjetivo") + `> `+objetivosEmpresa+` </td>
            <td class="clasePorcentaje" id=`+ JSON.stringify(idRandom+"PPorcentaje") + `> `+porcentajeObjetivo+ `</td>
          </tr>
        </table>
        <br><br>
        <button style = "text-align:center" onClick = agregarAreaDeEnfoque(`+ JSON.stringify(idRandom+"PObjetivo") + `)> Agregar nuevo objetivo </button>
        <br><br>
        </div>
      `;

  document.getElementById('ejemploObjetivo').appendChild(div2);
}

//async function guardarCambios(email) {
async function guardarCambios() {
  let email = document.getElementById("idEmail").textContent;
  let nuevoAreasEnfoques= [];
  let nuevoObjetivos= [];
  let nuevoPorcentajes= [];
  let nuevoTitulos0= [];
  let nuevoTitulos1= [];
  let nuevoTitulos2= [];
  let nuevoEncargados0= [];
  let nuevoEncargados1= [];
  let nuevoEncargados2= [];
  let nuevoAcciones0= [];
  let nuevoAcciones1= [];
  let nuevoAcciones2= [];
  let nuevoPorcentajesAcciones0=[];
  let nuevoPorcentajesAcciones1=[];
  let nuevoPorcentajesAcciones2=[];
  let nuevoRecursos0=[];
  let nuevoRecursos1=[];
  let nuevoRecursos2=[];
  let nuevoTiempos0= [];
  let nuevoTiempos1= [];
  let nuevoTiempos2= [];
  let nuevoIndicadores0= [];
  let nuevoIndicadores1= [];
  let nuevoIndicadores2= [];
  
  
  let nuevoOpcionesAreasEnfoque = document.getElementsByClassName("claseAreaEnfoque")
  for (i = 0; i < nuevoOpcionesAreasEnfoque.length; i++) {
    nuevoAreasEnfoques.push(nuevoOpcionesAreasEnfoque[i].textContent)
  }
  
  let nuevoOpcionesObjetivos = document.getElementsByClassName("claseObjetivos")
  for (i = 0; i < nuevoOpcionesObjetivos.length; i++) {
    nuevoObjetivos.push(nuevoOpcionesObjetivos[i].textContent)
  }

  let nuevoOpcionesPorcentaje = document.getElementsByClassName("clasePorcentaje")
  for (i = 0; i < nuevoOpcionesPorcentaje.length; i++) {
    nuevoPorcentajes.push(nuevoOpcionesPorcentaje[i].textContent)
  }

  // A partir de aquí empieza los planes de acción
    let nuevoOpcionesTitulos0 = document.getElementsByClassName("claseTitulos0")
    for (i = 0; i < nuevoOpcionesTitulos0.length; i++) {
      nuevoTitulos0.push(nuevoOpcionesTitulos0[i].textContent)
    }
  let nuevoOpcionesTitulos1 = document.getElementsByClassName("claseTitulos1")
    for (i = 0; i < nuevoOpcionesTitulos1.length; i++) {
      nuevoTitulos1.push(nuevoOpcionesTitulos1[i].textContent)
    }
    let nuevoOpcionesTitulos2 = document.getElementsByClassName("claseTitulos2")
    for (i = 0; i < nuevoOpcionesTitulos2.length; i++) {
      nuevoTitulos2.push(nuevoOpcionesTitulos2[i].textContent)
    }

    let nuevoOpcionesEncargados0 = document.getElementsByClassName("claseEncargados0")
    for (i = 0; i < nuevoOpcionesEncargados0.length; i++) {
      nuevoEncargados0.push(nuevoOpcionesEncargados0[i].textContent)
    }
    
    let nuevoOpcionesEncargados1 = document.getElementsByClassName("claseEncargados1")
    for (i = 0; i < nuevoOpcionesEncargados1.length; i++) {
      nuevoEncargados1.push(nuevoOpcionesEncargados1[i].textContent)
    }
    let nuevoOpcionesEncargados2 = document.getElementsByClassName("claseEncargados2")
    for (i = 0; i < nuevoOpcionesEncargados2.length; i++) {
      nuevoEncargados2.push(nuevoOpcionesEncargados2[i].textContent)
    }

    let nuevoOpcionesAcciones0 = document.getElementsByClassName("claseAcciones0")
    for (i = 0; i < nuevoOpcionesAcciones0.length; i++) {
      nuevoAcciones0.push(nuevoOpcionesAcciones0[i].textContent)
    }
    let nuevoOpcionesAcciones1 = document.getElementsByClassName("claseAcciones1")
    for (i = 0; i < nuevoOpcionesAcciones1.length; i++) {
      nuevoAcciones1.push(nuevoOpcionesAcciones1[i].textContent)
    }
    let nuevoOpcionesAcciones2 = document.getElementsByClassName("claseAcciones2")
    for (i = 0; i < nuevoOpcionesAcciones2.length; i++) {
      nuevoAcciones2.push(nuevoOpcionesAcciones2[i].textContent)
    }

    let nuevoOpcionesPorcentajeAcciones0 = document.getElementsByClassName("clasePorcentajeAcciones0")
    for (i = 0; i < nuevoOpcionesPorcentajeAcciones0.length; i++) {
      nuevoPorcentajesAcciones0.push(nuevoOpcionesPorcentajeAcciones0[i].textContent)
    }
    let nuevoOpcionesPorcentajeAcciones1 = document.getElementsByClassName("clasePorcentajeAcciones1")
    for (i = 0; i < nuevoOpcionesPorcentajeAcciones1.length; i++) {
      nuevoPorcentajesAcciones1.push(nuevoOpcionesPorcentajeAcciones1[i].textContent)
    }
    let nuevoOpcionesPorcentajeAcciones2 = document.getElementsByClassName("clasePorcentajeAcciones2")
    for (i = 0; i < nuevoOpcionesPorcentajeAcciones2.length; i++) {
      nuevoPorcentajesAcciones2.push(nuevoOpcionesPorcentajeAcciones2[i].textContent)
    }
  
    let nuevoOpcionesRecursos0 = document.getElementsByClassName("claseRecursos0")
    for (i = 0; i < nuevoOpcionesRecursos0.length; i++) {
      nuevoRecursos0.push(nuevoOpcionesRecursos0[i].textContent)
    }
    let nuevoOpcionesRecursos1 = document.getElementsByClassName("claseRecursos1")
    for (i = 0; i < nuevoOpcionesRecursos1.length; i++) {
      nuevoRecursos1.push(nuevoOpcionesRecursos1[i].textContent)
    }
    let nuevoOpcionesRecursos2 = document.getElementsByClassName("claseRecursos2")
    for (i = 0; i < nuevoOpcionesRecursos2.length; i++) {
      nuevoRecursos2.push(nuevoOpcionesRecursos2[i].textContent)
    }

    let nuevoOpcionesTiempos0 = document.getElementsByClassName("claseTiempos0")
    for (i = 0; i < nuevoOpcionesTiempos0.length; i++) {
      nuevoTiempos0.push(nuevoOpcionesTiempos0[i].textContent)
    }
    let nuevoOpcionesTiempos1 = document.getElementsByClassName("claseTiempos1")
    for (i = 0; i < nuevoOpcionesTiempos1.length; i++) {
      nuevoTiempos1.push(nuevoOpcionesTiempos1[i].textContent)
    }
    let nuevoOpcionesTiempos2 = document.getElementsByClassName("claseTiempos2")
    for (i = 0; i < nuevoOpcionesTiempos2.length; i++) {
      nuevoTiempos2.push(nuevoOpcionesTiempos2[i].textContent)
    }

    let nuevoOpcionesIndicadores0 = document.getElementsByClassName("claseIndicadores0")
    for (i = 0; i < nuevoOpcionesIndicadores0.length; i++) {
      nuevoIndicadores0.push(nuevoOpcionesIndicadores0[i].textContent)
    }
    let nuevoOpcionesIndicadores1 = document.getElementsByClassName("claseIndicadores1")
    for (i = 0; i < nuevoOpcionesIndicadores1.length; i++) {
      nuevoIndicadores1.push(nuevoOpcionesIndicadores1[i].textContent)
    }
    let nuevoOpcionesIndicadores2 = document.getElementsByClassName("claseIndicadores2")
    for (i = 0; i < nuevoOpcionesIndicadores2.length; i++) {
      nuevoIndicadores2.push(nuevoOpcionesIndicadores2[i].textContent)
    }
  
  let nuevoMision = document.getElementById("idMision").textContent
  let nuevoVision = document.getElementById("idVision").textContent
  let nuevoValores = document.getElementById("idValores").textContent


  let guardar = {
    "email": email,
    "mision": nuevoMision,
    "vision": nuevoVision,
    "valores": nuevoValores,
    "areasEnfoque": nuevoAreasEnfoques,
    "objetivos": nuevoObjetivos,
    "porcentaje": nuevoPorcentajes
  }

  let guardarPlanAccion0 = {
    "email": email,
    "titulo": nuevoTitulos0,
    "encargado": nuevoEncargados0,
    "acciones": nuevoAcciones0,
    "porcentajeAcciones": nuevoPorcentajesAcciones0,
    "recursos": nuevoRecursos0,
    "tiempo": nuevoTiempos0,
    "indicadores": nuevoIndicadores0
  }

  let guardarPlanAccion1 = {
    "email": email,
    "titulo": nuevoTitulos1,
    "encargado": nuevoEncargados1,
    "acciones": nuevoAcciones1,
    "porcentajeAcciones": nuevoPorcentajesAcciones1,
    "recursos": nuevoRecursos1,
    "tiempo": nuevoTiempos1,
    "indicadores": nuevoIndicadores1
  }

  let guardarPlanAccion2 = {
    "email": email,
    "titulo": nuevoTitulos2,
    "encargado": nuevoEncargados2,
    "acciones": nuevoAcciones2,
    "porcentajeAcciones": nuevoPorcentajesAcciones2,
    "recursos": nuevoRecursos2,
    "tiempo": nuevoTiempos2,
    "indicadores": nuevoIndicadores2
  }
  //console.log(guardar);
  console.log(guardarPlanAccion0);
  console.log(guardarPlanAccion1);
  console.log(guardarPlanAccion2);
  
  try {
    await guardarPlanEmpresa(guardar);
    /*await guardarPlanAccionEmpresa(guardarPlanAccion0)
    await guardarPlanAccionEmpresa(guardarPlanAccion1)
    await guardarPlanAccionEmpresa(guardarPlanAccion2)*/
    alert("Plan guardado");
  } catch (error) {
    console.error(error);
  }
  
  
}

async function guardarPlanEmpresa(planEmpresa) {
  //
  const response = await fetch("/registrarPlanEmpresa", {
    method: 'POST',
    headers: {
      //'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(planEmpresa)
    
  })
}

async function guardarPlanAccionEmpresa(planAccionEmpresa) {
  //
  const response = await fetch("/planDeAccion", {
    method: 'POST',
    headers: {
      //'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: planAccionEmpresa
  
  })
}

this.onload = getData();