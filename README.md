


# HICAPPS Technical Test

La presente prueba técnica pretende evaluar sus habilidades y competencias para el cargo de **Desarrollador Full Stack**.
El test consta del desarrollo de un micro-proyecto los cuales debe resolver en un periodo máximo de 96hrs. desde que ha sido presentado este repositorio vía email.

# Descripción de la prueba
Se debe crear una función serverless utilizando Cloud Functions de Firebase que permita leer y escribir en una base de datos de pacientes usando RTDB de Firebase. Cada paciente debe estar almacenado en un nodo llamado `pacientes` y debe poseer un identificador único (UUID) con los siguientes atributos:

* Nombre (String)
* Apellido Paterno (String)
* Apellido Materno (String)
* Número de seguridad social (String. inventado, cualquiera sirve)
* Accesible (Boolean)

Se debe desplegar una Cloud Function que permita:

* Leer todos los pacientes en el nodo de `pacientes`.
* Obtener los datos de un paciente en particular
* Crear un nuevo registro en el nodo de `pacientes`.
* En caso de acceder a un paciente, se debe dejar un log de acceso en un nodo llamado `logs`

### Requisitos previos
* Crear un nuevo proyecto de Firebase. Nombrarlo de la siguiente manera: `hicapps-<NOMBRE>-<APELLIDO>`
* Instalar en su máquina local Firebase CLI: `npm install -g firebase-tools`
* Crear un set de datos de prueba (3 pacientes máximo). Uno de los paccientes debe tener el atributo `accesible` igual a `false`.

### Requerimientos funcionales
* La Cloud Function debe poseer un recurso llamado `/pacientes` donde se ejecutaran las llamadas HTTP.
* Se debe poder obtener los datos de todos los pacientes (no es necesario que estén paginados) llamando por GET a `/pacientes`.
* Se debe poder obtener los datos de un paciente en particular llamando por GET a `/pacientes/:id_paciente`
* Se debe poder crear un nuevo paciente llamando por POST a `/pacientes`.
* Al obtener los datos de detalle un paciente marcado con el atributo `accesible: false`, el endpoint debe devolver un HTTP 403.
* Cada vez que se haga una operación GET o POST sobre un endpoint, se debe guardar una entrada en el nodo `logs` con la siguiente estructura: `createdAt` (UNIX Timestamp), `message` (Ej: "Acceso a endpoint GET /pacientes")


### Requerimientos no funcionales
* El proyecto de Cloud Functions debe utilizar la dependencia `firebase-admin` para acceder a RTDB.
* Debe crear un proyecto de Cloud Functions con ESLint
* El projecto debe utilizar JavaScript (no TypeScript)
* El proyecto debe tener correctamente ignorados los secretos y variables de ambiente que vaya a utilizar
* Se deben implementar reglas de seguridad en RTDB.

# Entregables
El candidato debe realizar entrega de lo siguiente:

* URL con el repositorio al código de la solución (público).
* URL a Cloud Function deployeada en su proyecto de Firebase.
* JSON con estructura de la base de datos (utilizar el export de Firebase).
* JSON con estructura del modelo de seguridad de la base de datos.
* **No es necesario construir un frontend para este proyecto**

# Criterios de evaluación
| Evaluación                                        | Puntos |
|---------------------------------------------------|--------|
| Cumplir todos los requerimientos funcionales      | 10 pts |
| Cumplir todos los requerimientos no funcionales   | 10 pts |
| Modelamiento adecuado de base de datos            | 5 pts  |
| Modelamiento adecuado de las reglas de seguridad  | 10 pts |
| Indentación adecuada del código                   | 5 pts  |

# Ayudas
* Para inicializar un proyecto nuevo de Firebase: `firebase init`
* Para loguearse a Firebase mediante la CLI: `firebase login`
* Para deployear una Cloud Function: `firebase deploy --only=functions`

# Referencias
* [Firebase CLI](https://firebase.google.com/docs/cli)
* [Firebase Real Time Database (RTDB)](https://firebase.google.com/docs/database?hl=es)
* [Firebase Cloud Functions](https://firebase.google.com/docs/functions)
* [Firebase RTDB Secutiry Rules](https://firebase.google.com/docs/rules)

# Despliege
* [Function URL getPacientes us-central1]( https://us-central1-nicoavila-allpurpose.cloudfunctions.net/getPacientes)

* [Function URL getPacienteById us-central1]( https://us-central1-nicoavila-allpurpose.cloudfunctions.net/getPacienteById)

* [Function URL createPaciente us-central1](https://us-central1-nicoavila-allpurpose.cloudfunctions.net/createPaciente)