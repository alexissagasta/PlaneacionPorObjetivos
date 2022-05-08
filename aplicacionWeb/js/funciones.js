//Se declaran variables para su uso en distintas fucniones
nombresAreasEnfoque = [];
nombresObjetivos = [];
planAcciones = [];
planRecursos = [];
planIndicadores =[];
planAccionTitulo = [];
let cantPlanes;

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
async function getPlanesAccion(titulo) {
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

  if (0 < numero && numero <= 3) {

    //Se crean las ids de los nuevos elementos a crear; esto al concatenar el tipo de elemento 
    //y la cantPlanes disponibles
    id = "id" + cantPlanes;
    idSelectAreas = "idSelectAreas" + cantPlanes;
    idSelectObjetivos = "idSelectObjetivos" + cantPlanes;
    idSelectPlanes = "idSelectPlanes" + cantPlanes;

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
    div.innerHTML = `
        <button class="collapsible" id=`+ id + ` onclick="hacerColapsable(this.id)">Área de enfoque</button>     
        <div class="content" style = "text-align:center" id=`+ JSON.stringify(idCAreaDeEnfoque) + `>
          `+ form.innerHTML + `
          <p style = "text-align:center;display:inline-block" contenteditable="true" id=`+ JSON.stringify(idPAreaDeEnfoque) + `> --- </p>
          <button style = "text-align:center" onClick = agregarAreaDeEnfoque(`+ JSON.stringify(idPAreaDeEnfoque) + `)> Agregar nuevo </button>
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
    //<p style = "text-align:center;" contenteditable="true" id=`+ JSON.stringify(idPObjetivo) + `> --- </p>
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
              <td id=`+ JSON.stringify(idPObjetivo) + `> --- </td>
              <td> --- </td>
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
          <button onClick = seleccionPlan(`+ JSON.stringify(idSelectPlanes) + `,` + JSON.stringify(idFormPlanEncargados) + `,` + JSON.stringify(idTodasAcciones) + `,` + JSON.stringify(idTodosRecursos) + `,` + JSON.stringify(idIndicadores) +`,` + JSON.stringify(idCPlanes) + `)> Seleccionar </button>
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
        
          <label for="indicadores">Indicadores:</label>
          <p style = "text-align:center;" contenteditable="true" id=`+ JSON.stringify(idIndicadores) + `></p>
          <br>      
          `

    const div3 = document.createElement('div');
    div3.className = 'agregado';
    div3.innerHTML = `
        <button class="collapsible" id=`+ idPlan + ` onclick="hacerColapsable(this.id)">Plan de acción</button>
        <div class="content" style = "text-align:center" id=`+ JSON.stringify(idCPlanes) + `>
          `+ form3.innerHTML + `
          <div id="contenidoPlanesAcciones">
            <p style = "text-align:center;display:inline-block" contenteditable="true" id=`+ JSON.stringify(idPPlanes) + `>` + div4.innerHTML + `</p>
          </div>
          <button style = "text-align:center" onClick = agregarAreaDeEnfoque(`+ JSON.stringify(idPPlanes) + `)> Agregar nuevo plan de acción </button>
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
  areaDeEnfoque = {nombre: yeah}
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


//Funcion que se encarga de asiganar el valor al elemento idSelectPlan que tiene en 
//ese momento al elemento idDivPlan
async function seleccionPlan(idSelectPlanes, idFormPlanEncargados, idTodasAcciones, idTodosRecursos, idIndicadores,idContenido) {
  var planseleccionado = document.getElementById(idSelectPlanes).value;
  await getPlanesAccion(planseleccionado)

  // Se crea el formulario para seleccionar en elcargado del plan 
  //por ahora se establece un valor pre establecido ya que no se
  //manejan usuarios aun
  let encargadosTodos = "<select name=encargados id=encargados><optgroup label=Encargados>";
  for (let i = 0; i < 1; i++) {
    encargadosTodos += "<option value=luis>Luis</option><option value=mario>Mario</option>";
  }
  encargadosTodos += "</optgroup></select><br><br>"

  // Tabla de contenido para llenar las acciones al momento de seleccionar un plan de acción
  let accionesTodas = "<table class=center style =  contenteditable:true ><tr class=cabecera style = contenteditable:false><td>Acciones</td> <td>Porcentaje completado</td></tr>";
  for (let i = 0; i < planAcciones.length; i++) {
    accionesTodas += "<tr><td contenteditable=true>" + planAcciones[i] + "</td> <td contenteditable=true>0%</td></tr>";
  }
  accionesTodas += "</table>"

  // Tabla de contenido para llenar los recursos al momento de seleccionar un plan de acción
  let recursosTodas = "<table class=center style = contenteditable:true><tr class=cabecera style = contenteditable:false><td>Recursos</td></tr>";
  for (let i = 0; i < planRecursos.length; i++) {
    recursosTodas += "<tr><td contenteditable=true>" + planRecursos[i] + "</td></tr>";
  }
  recursosTodas += "</table>"

  // Tabla de contenido para llenar los recursos al momento de seleccionar un plan de acción
  let indicadores = "<p>" + planIndicadores + "</p>"

  //Se cambia el contenido de los elementos acciones, recursos, encargados e indicadores
  document.getElementById(idTodasAcciones).innerHTML = accionesTodas;
  document.getElementById(idTodosRecursos).innerHTML = recursosTodas;
  document.getElementById(idFormPlanEncargados).innerHTML = encargadosTodos;
  document.getElementById(idIndicadores).innerHTML = indicadores;
  
  //se cambia el tamaño del elemento divPlan
  var div = document.getElementById(idContenido);
  div.style.maxHeight = div.scrollHeight + "px";
  console.log()
}

this.onload = agregarColapsable(), getData();