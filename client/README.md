# Aplicación de Gestión de Tareas

## Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Decisiones Técnicas](#decisiones-técnicas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Uso de la Aplicación](#uso-de-la-aplicación)
- [Características](#características)

## Descripción

Esta aplicación implementa un sistema de gestión de tareas que permite a los usuarios administrar sus actividades diarias de manera eficiente. Todas las tareas se almacenan en el localStorage del navegador, lo que permite que la aplicación funcione completamente en el cliente sin necesidad de un servidor backend.

### Funcionalidades principales:

- **Gestión de tareas**: Crear, listar, editar, eliminar, y organizar tareas según su estado (por hacer, en curso, completadas).
- **Almacenamiento local**: Todas las tareas se guardan en el localStorage del navegador.
- **Interfaz intuitiva**: Diseño limpio y responsive para facilitar la gestión de tareas.
- **Filtros y búsqueda**: Posibilidad de filtrar tareas por estado y buscar por título o descripción.

## Tecnologías Utilizadas

### Frontend

- **React**: Framework para desarrollo de la interfaz de usuario
- **TypeScript**: Para tipado estático y mejor desarrollo
- **React Router**: Para gestión de rutas
- **Tailwind CSS**: Para estilizado de componentes
- **FontAwesome**: Para los iconos

## Decisiones Técnicas

### Arquitectura y Patrones

- **Hooks personalizados**: Se implementó el patrón de custom hooks para encapsular la lógica de negocio, como `useTasks` que gestiona todas las operaciones CRUD de tareas, permitiendo una mejor separación de responsabilidades.

- **Almacenamiento local**: Se optó por utilizar localStorage en lugar de una API externa para simplificar la aplicación y permitir su funcionamiento sin conexión a internet, eliminando la necesidad de configurar un backend.

- **Componentes controlados**: Todos los formularios utilizan el patrón de componentes controlados para mantener el estado de React como única fuente de verdad, facilitando la validación y el manejo de errores.

- **Composición de componentes**: La aplicación está estructurada mediante composición de componentes pequeños y reutilizables en lugar de herencia, siguiendo las mejores prácticas de React.

- **Memoización**: Se utiliza useMemo para optimizar el rendimiento en operaciones costosas como el filtrado de tareas.

### Estructura del Proyecto

- **Organización por tipos**: Los componentes están organizados por su funcionalidad (shared, components, hooks) en lugar de por páginas, facilitando la reutilización.

- **Componentes atómicos**: Se siguió un enfoque similar al diseño atómico, con componentes básicos reutilizables (Button, Modal) que se combinan para formar interfaces más complejas.

### Gestión del Estado

- **Estado local**: Se utiliza el estado local de React mediante useState para la mayoría de las funcionalidades, evitando la complejidad adicional de soluciones de gestión de estado global.

- **Estado persistente**: Las tareas se almacenan en localStorage para persistir entre sesiones, implementando una capa de abstracción a través de hooks para facilitar posibles cambios futuros en el método de almacenamiento.

## Instalación

### Requisitos previos

- Node.js (v22.14.0 o superior)
- npm (v10.9.2 o superior)

### Pasos de instalación

1. Clonar el repositorio:

2. Instalar dependencias:
   ```bash
   npm install
   ```

## Ejecución

### Iniciar la aplicación:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## Uso de la Aplicación

### Gestión de Tareas

- Para crear una nueva tarea, haz clic en el botón "Añadir tarea"
- Completa el formulario con el título (obligatorio), descripción y estado de la tarea
- Para editar una tarea, haz clic en el icono de edición junto a la tarea
- Para eliminar una tarea, haz clic en el icono de papelera

### Filtrado y Búsqueda

- Utiliza los botones de filtro para ver todas las tareas o solo las que están en un estado específico
- Usa el campo de búsqueda para encontrar tareas por título o descripción
- Las tareas se organizan automáticamente en columnas según su estado (Por hacer, En curso, Completadas)

### Organización Visual

- Cada columna muestra las tareas del estado correspondiente
- Una barra de progreso indica el porcentaje de tareas completadas respecto al total
- Cada columna muestra el número de tareas en ese estado

## Características

### Almacenamiento Local

La aplicación utiliza el localStorage del navegador para:

- Guardar todas las tareas del usuario
- Mantener los datos entre sesiones de navegación
- Funcionar completamente sin conexión a internet

### Validación de Datos

- Validación para que el campo de título no esté vacío
- Mensajes de error claros cuando la validación falla

### Interfaz Responsive

La aplicación está diseñada para funcionar correctamente en:

- Dispositivos móviles
- Tablets
- Ordenadores de escritorio
