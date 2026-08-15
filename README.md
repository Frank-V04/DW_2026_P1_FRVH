036-DW-2026-P1 — Mini RRHH

Aplicación web de gestión de recursos humanos desarrollada con React, TypeScript y Vite. Incluye módulo de Empleados y módulo de Departamentos.

Descripción del módulo de Departamentos

El módulo de Departamentos permite gestionar los departamentos de la empresa mediante un dashboard interactivo. Incluye:

- Tarjetas de estadísticas (total, activos, inactivos)
- CRUD completo: crear, listar, editar y eliminar departamentos
- Barra de filtros: búsqueda por nombre y filtro por estado (activo/inactivo)
- DepartmentCard: visualización tipo tarjeta con información principal y acciones
- Estados de carga y mensaje de "sin resultados"
- Ruta protegida `/departamentos` con autenticación por token
- Diseño responsivo (mobile-first)



Tecnologías utilizadas

- [React 18](https://react.dev/) — Biblioteca de UI
- [TypeScript](https://www.typescriptlang.org/) — Tipado estático
- [Vite](https://vitejs.dev/) — Bundler y servidor de desarrollo
- [React Router DOM v6](https://reactrouter.com/) — Enrutamiento SPA
- CSS-in-JS (estilos en línea) — Sin dependencias externas de estilos


Instrucciones para ejecutar localmente

Prerrequisitos

- Node.js >= 18
- npm >= 9

Pasos


1. Clonar el repositorio
git clone https://github.com/mayen5/036-DW-2026-P1.git
cd 036-DW-2026-P1

2. Instalar dependencias
npm install

3. Iniciar el servidor de desarrollo
npm run dev


La aplicación estará disponible en `http://localhost:5173`

Credenciales de prueba (simuladas)

admin@empresa.com
admin123



Enlace al despliegue

dw-2026-p1-frvh.vercel.app

Capturas de pantalla



Autor

- Nombre: Francisco Ricardo Véliz Hernández
