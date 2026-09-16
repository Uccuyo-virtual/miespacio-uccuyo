# 🎓 Mi Espacio UCCuyo — Portal Estudiantil Inteligente

> Plataforma web interactiva desarrollada para la comunidad de la **Universidad Católica de Cuyo (UCCuyo)** por la **Dirección de Educación a Distancia (DEaD)**. Diseñada para brindar accesibilidad, bienestar, productividad y acompañamiento a los estudiantes de modalidad presencial y virtual.

---

## 🌟 Características y Módulos Principales

### 1. 🧭 Accesos Rápidos Institucionales
- **Campus Virtual Moodle:** Ingreso directo a las aulas y material de cursado.
- **Correo Institucional:** Acceso rápido para redacción directa a `uccuyovirtual@uccuyo.edu.ar`.
- **Biblioteca Digital eLibro:** Acceso a colecciones, journals y libros académicos en línea.
- **Autogestión Alumno:** Enlace oficial a inscripciones a mesas, certificados y trámites.

### 2. ⚡ Herramientas Inteligentes de Rendimiento
- **Calculadora de Ahorro Virtual:** Permite al estudiante calcular el impacto en tiempo ganado y dinero ahorrado en combustible/transporte al cursar desde casa.
- **Planificador Semanal Flex:** Simulador que proyecta el ritmo de cursada sugerido (Materias vs. Horas semanales de dedicación).
- **Beneficios Alumnos:** Catálogo filtrable de beneficios en deportes, salud, certificaciones y descuentos de la comunidad UCCuyo.

### 3. 🧠 Caja de Herramientas de Estudio (Productividad)
- **Cronómetro Pomodoro:** Temporizador de concentración de 25 min y descansos de 5 min con avisos y felicitaciones.
- **Sonidos de Estudio (Deep Focus):** Reproductor de música Lo-Fi, lluvia, cafetería y viento blanco para aislar el ruido exterior.
- **Notas Rápidas (GlowNotes):** Bloc de apuntes con persistencia en el navegador para recordatorios rápidos.
- **Tablero de Tareas (Kanban):** Gestor de pendientes (*Pendiente*, *En Progreso*, *Terminado*).

### 4. 🧘 Pausa Consciente (Zona Zen)
Experiencias breves y sin cronómetros de estrés para resetear la mente entre horas de estudio:
- **Juego de Memoria Visual**
- **Sopa de Letras Académica**
- **Víbora Zen**
- **Conexiones Estelares**

### 5. 💬 Canal Directo de Acompañamiento
- Botón flotante interactivo de atención por **WhatsApp** con soporte institucional directo.

---

## 📊 Analíticas y Medición (Google Analytics 4)

El portal cuenta con instrumentación de eventos personalizados mediante **Google Analytics 4** (`G-20CXWJDF24`), lo que permite a las autoridades conocer de forma 100% gratuita y en tiempo real:
- Cantidad de visitantes únicos y páginas vistas.
- Dispositivos más utilizados (móviles vs. computadoras).
- Procedencia geográfica de los alumnos.
- **Ranking de módulos más utilizados** (`use_ahorro_virtual`, `use_planificador_semanal`, `use_juegos_zen`, `use_sonidos_estudio`, `use_notas_rapidas`, `click_whatsapp`, `click_campus_access`, entre otros).

---

## 🛠️ Tecnologías Utilizadas

- **Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server:** [Vite](https://vitejs.dev/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Animaciones:** [Framer Motion](https://www.framer.com/motion/)
- **Iconografía:** [Lucide React](https://lucide.dev/)
- **Efectos:** Canvas-Confetti, Three.js / React Three Fiber

---

## 🚀 Instalación y Desarrollo Local

Para correr este proyecto en tu entorno local:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Uccuyo-virtual/miespacio-uccuyo.git
   cd miespacio-uccuyo
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

4. **Compilar para producción:**
   ```bash
   npm run build
   ```
   Genera la carpeta optimizada `dist/` lista para subir a cualquier hosting o servidor web.

---

## 🏛️ Institucional

**Universidad Católica de Cuyo**  
*Dirección de Educación a Distancia (DEaD)*  
San Juan, Argentina  
Sitio oficial: [https://virtual.uccuyo.edu.ar/](https://virtual.uccuyo.edu.ar/)  
Portal de Alumnos: [https://miespacio.uccuyo.edu.ar/](https://miespacio.uccuyo.edu.ar/)
