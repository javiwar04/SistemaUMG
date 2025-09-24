// ===== Base URL y utilidades =====
const API = (import.meta.env.VITE_API_BASE ?? '/api').replace(/\/+$/, ''); 
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

/** GET calificaciones por profesor (ruta por segmento) */
export function getCalificacionesProfesor(usuario) {
  return fetch(join(`calificaciones/profesor/${encodeURIComponent(usuario)}`)).then(handle);
}

/** GET calificaciones por matrícula */
export function getCalificacionesPorMatricula(idMatricula) {
  return fetch(join(`getCalificacionId/${encodeURIComponent(idMatricula)}`)).then(handle);
}

/** POST insertar calificación */
export async function insertCalificacion(calificacion) {
  const body = {
    descripcion: calificacion.descripcion,
    nota: Number(calificacion.nota),
    porcentaje: Number(calificacion.porcentaje),
    matriculaId: Number(calificacion.matriculaId),
  };

  const res = await fetch(join('insertCalificacion'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `HTTP ${res.status}`);
  }

  // 👇 devolvemos la nueva calificación con alumno y nombre incluidos
  return await res.json();
}

/** PUT actualizar calificación */
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

/** DELETE eliminar calificación */
export function eliminarCalificacion(id) {
  return fetch(join(`eliminarCalificacion/${encodeURIComponent(id)}`), {
    method: 'DELETE',
  }).then(handle);
}

// -----------------------------
// PROFESORES
// -----------------------------

export function getProfesores() {
  return fetch(join('profesores')).then(handle);
}
export function getProfesor(usuario) {
  return fetch(join(`profesor/${encodeURIComponent(usuario)}`)).then(handle);
}
export function insertarProfesor(profesor) {
  const body = {
    usuario: profesor.usuario,
    pass: profesor.pass,
    nombre: profesor.nombre,
    email: profesor.email
  };

  return fetch(join('profesor'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(handle);
}
export function actualizarProfesor(usuario, profesor) {
  const body = {
    usuario: usuario,
    pass: profesor.pass,
    nombre: profesor.nombre,
    email: profesor.email
  };

  return fetch(join(`profesor/${encodeURIComponent(usuario)}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(handle);
}
export function eliminarProfesor(usuario) {
  return fetch(join(`profesor/${encodeURIComponent(usuario)}`), {
    method: 'DELETE'
  }).then(handle);
}

// ===============================
// GRAFICAS
// ===============================

export function getAlumnosPorAsignatura(){
  return fetch(join('getAlumnosPorAsignatura'))
    .then(res => {
      if (!res.ok) throw new Error('Error en la solicitud: ' + res.status);
      return res.json();
    });
}

export function getDistribucionCalificaciones(){
  return fetch(join('getDistribucionCalificaciones'))
    .then(res => {
      if (!res.ok) throw new Error('Error en la solicitud: ' + res.status);
      return res.json();
    });
}
