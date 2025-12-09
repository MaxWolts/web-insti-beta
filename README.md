# Tecnicatura Superior en Análisis de Sistemas y Desarrollo de Software

Página web informativa para la carrera de **Tecnicatura Superior en Análisis de Sistemas y Desarrollo de Software**, perteneciente a una institución educativa.

## 🚀 Descripción del Proyecto

Este sitio web está desarrollado con Astro y presenta una interfaz moderna y responsiva para promocionar la carrera técnica, mostrando información relevante y un carrusel vertical de imágenes que rotan de manera infinita.

## 🛠️ Tecnologías Utilizadas

- **Astro 5.14.1** - Generador de sitios estáticos con renderizado híbrido
- **React 19.1.0** - Componentes interactivos
- **TypeScript** - Seguridad de tipos y mejor experiencia de desarrollo
- **Tailwind CSS 4.1.4** - Estilos utilitarios
- **Framer Motion** - Animaciones suaves

## 📁 Estructura del Proyecto

```
src/
├── pages/           # Rutas basadas en archivos
│   ├── index.astro  # Página principal (/)
│   ├── about.astro  # Página de información (/about)
│   └── contact.astro # Página de contacto (/contact)
├── components/      # Componentes reutilizables
│   ├── BaseHead.astro    # Metadatos del head
│   ├── Button.astro      # Botón interactivo
│   ├── Footer.astro      # Pie de página
│   ├── HomeMob.astro     # Componente para móviles
│   └── react/
│       └── VerticalCarousel.tsx  # Carrusel vertical infinito
├── layouts/         # Layouts de página
└── styles/          # Estilos globales
```

## 🎨 Características Principales

### Carrusel Vertical Infinito

- **Componente React**: VerticalCarousel con Framer Motion para animaciones suaves
- **Repetición continua**: Muestra 6 imágenes que rotan infinitamente sin saltos abruptos
- **Adaptativo**: Scroll vertical en desktop, horizontal en móviles

### Componentes Interactivos

- **Botón animado**: Efectos hover con transición y flecha
- **Layout responsivo**: Diseño adaptativo para diferentes tamaños de pantalla

### Optimizaciones de Rendimiento

- **Generación estática**: Páginas pre-construidas para rendimiento óptimo
- **Optimización de imágenes**: Formato WebP con carga diferida
- **Separación de código**: Optimización automática de paquetes
- **SEO preparado**: Sitemap automático

## 🛠️ Desarrollo

### Prerrequisitos

- Node.js 18+
- Gestor de paquetes (npm, yarn, o bun)

### Instalación

```bash
# Instalar dependencias
npm i

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

### Personalización

#### Cambiar las imágenes del carrusel

1. Reemplaza las imágenes en `public/assets/city1.webp` a `city6.webp`
2. El carrusel se ajusta automáticamente a 6 imágenes

#### Modificar contenido

1. Edita `src/pages/index.astro` para cambiar el texto principal
2. Modifica `src/components/Footer.astro` para información adicional
3. Actualiza enlaces y botones según necesidades

#### Estilos

- Modifica `src/styles/global.css` para cambios globales
- Personaliza clases Tailwind en los componentes

## 📱 Diseño Responsivo

- **Enfoque mobile-first** con Tailwind CSS
- **Layouts adaptativos** para diferentes tamaños de pantalla
- **Navegación touch-friendly**
- **Imágenes optimizadas** para dispositivos móviles

## 🚀 Despliegue

El sitio está optimizado para despliegue en servicios de hosting estático:

- **Vercel** (recomendado)
- **Netlify**
- **GitHub Pages**
- **Cualquier servicio de hosting estático**

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la Licencia MIT.

---

_Proyecto educativo para promocionar una carrera técnica en desarrollo de software._
