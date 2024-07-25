const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Obtener todos los pacientes
exports.getPacientes = functions.https.onRequest(async (req, res) => {
  try {
    const snapshot = await admin.database().ref("/pacientes").once("value");
    const pacientes = snapshot.val();
    await admin.database().ref("/logs").push({
      createdAt: Date.now(),
      message: "Acceso a endpoint GET /pacientes",
    });
    res.status(200).json(pacientes);
  } catch (error) {
    console.error("Error al obtener los pacientes:", error);
    res.status(500).send("Error al obtener los pacientes");
  }
});

// Obtener un paciente por ID
exports.getPacienteById = functions.https.onRequest(async (req, res) => {
  const pacienteId = req.query.id;
  if (!pacienteId) {
    return res.status(400).send("ID de paciente es requerido");
  }
  try {
    const snapshot = await admin.database()
        .ref(`/pacientes/${pacienteId}`).once("value");
    const paciente = snapshot.val();
    if (!paciente) {
      return res.status(404).send("Paciente no encontrado");
    } else if (paciente.accesible === false) {
      return res.status(403).send("Acceso denegado");
    } else {
      await admin.database().ref("/logs").push({
        createdAt: Date.now(),
        message: `Acceso a endpoint GET /pacientes/${pacienteId}`,
      });
      res.status(200).json(paciente);
    }
  } catch (error) {
    console.error("Error al obtener el paciente:", error);
    res.status(500).send("Error al obtener el paciente");
  }
});

// Crear un nuevo paciente
exports.createPaciente = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Método no permitido");
  }
  const paciente = req.body;
  if (!paciente || !paciente.nombre) {
    return res.status(400).send("Datos del paciente son requeridos");
  }
  try {
    const newRef = admin.database().ref("/pacientes").push();
    await newRef.set({
      nombre: paciente.nombre,
      apellidoPaterno: paciente.apellidoPaterno,
      apellidoMaterno: paciente.apellidoMaterno,
      numeroSeguridadSocial: paciente.numeroSeguridadSocial,
      accesible: paciente.accesible,
    });
    await admin.database().ref("/logs").push({
      createdAt: Date.now(),
      message: "Acceso a endpoint POST /pacientes",
    });
    res.status(201).json({
      id: newRef.key,
      ...paciente,
    });
  } catch (error) {
    console.error("Error al crear el paciente:", error);
    res.status(500).send("Error al crear el paciente");
  }
});
