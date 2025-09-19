// ===== Base URL y utilidades =====
const API = (import.meta.env.VITE_API_BASE ?? '/api').replace(/\/+$/, ''); // '/api' o 'https://localhost:7263/api'
const join = (p) => `${API}/${String(p).replace(/^\/+/, '')}`;

const handle = async (res) => {
  const text = await res.text().catch(() => '');
  if (!res.ok) throw new Error(text || `HTTP ${res.status}`);
  try { return JSON.parse(text); } catch { return text; }
};

// ===============================
// LOGIN
// ===============================
export function login(usuario, pass) {
  return fetch(join('autenticacion'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, pass }),
  }).then(async (res) => {
    if (!res.ok) throw new Error('Error en la solicitud: ' + res.status);
    const t = await res.text();
    return t || null;
  });
}

// ===============================
// ALUMNOS 
// ===============================
export function alumnoProfesor(usuario) {
  return fetch(join(`getAlumnosProfesor?usuario=${encodeURIComponent(usuario)}`)).then(handle);
}
export function getAlumno(id) {
  return fetch(join(`getAlumnoId?id=${encodeURIComponent(id)}`)).then(handle);
}
export function insertarAlumnoMatricular(alumno, id_asig) {
  return fetch(join(`insertarMatricular?id_asig=${encodeURIComponent(id_asig)}`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      dni: alumno.dni,
      nombre: alumno.nombre,
      direccion: alumno.direccion,
      edad: Number(alumno.edad),
      email: alumno.email,
    }),
  }).then(async (res) => {
    if (!res.ok) throw new Error('Error en la solicitud: ' + res.status);
    return res.text();
  });
}
export function actualizarAlumno(alumno) {
  return fetch(join('actualizarAlumno'), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(alumno),
  }).then(async (res) => {
    if (!res.ok) throw new Error('Error en la solicitud: ' + res.status);
    return res.text();
  });
}
export function eliminarAlumno(id) {
  return fetch(join(`eliminarAlumno?id=${encodeURIComponent(id)}`), {
    method: 'DELETE',
  }).then(async (res) => {
    if (!res.ok) throw new Error('Error en la solicitud: ' + res.status);
    return res.text();
  });
}

// ===============================
// ASIGNATURAS
// ===============================
export function getAsignaturas() {
  return fetch(join('getAsignaturas')).then(handle);
}

// ===============================
// CALIFICACIONES
// ===============================

/** GET calificaciones por profesor */
export function getCalificacionesProfesor(usuario) {
  return fetch(join(`calificaciones/profesor/${encodeURIComponent(usuario)}`)).then(handle);
}

/** GET calificaciones por matrícula */
export function getCalificacionesPorMatricula(idMatricula) {
  return fetch(join(`getCalificacionId/${encodeURIComponent(idMatricula)}`)).then(handle);
}

/** POST insertar calificación */
export function insertCalificacion(calificacion) {
  const body = {
    descripcion: calificacion.descripcion,
    nota: Number(calificacion.nota),
    porcentaje: Number(calificacion.porcentaje), 
    matriculaId: Number(calificacion.matriculaId),
  };
  return fetch(join('insertCalificacion'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(handle);
}

/** PUT  */
export function actualizarCalificacion(calificacion) {
  if (!calificacion.id) throw new Error('Falta el id de la calificación para actualizar.');
  const body = {
    descripcion: calificacion.descripcion,
    nota: Number(calificacion.nota),
    porcentaje: Number(calificacion.porcentaje),
    matriculaId: Number(calificacion.matriculaId),
  };
  return fetch(join(`actualizarCalificacion/${encodeURIComponent(calificacion.id)}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(handle);
}


/** DELETE  */
export function eliminarCalificacion(id) {
  return fetch(join(`eliminarCalificacion/${encodeURIComponent(id)}`), {
    method: 'DELETE',
  }).then(handle);
}
