## Despliegue en Render

**¿Qué Necesitas Antes de Empezar?**

1.  **Tu Código:** Tus archivos HTML, CSS y JavaScript listos en una carpeta en tu computadora. Asegúrate de tener un archivo principal llamado `index.html` en la raíz de esa carpeta (o donde Render pueda encontrarlo).
2.  **Una Cuenta de GitHub:** Render funciona conectándose a repositorios de Git. GitHub es el más popular y fácil de usar para empezar. Si no tienes una, créala en [github.com](https://github.com/).
3.  **Tu Código en GitHub:** Sube la carpeta con tu proyecto a un nuevo repositorio en tu cuenta de GitHub.
    *   Ve a tu perfil de GitHub.
    *   Haz clic en "New" (Nuevo) para crear un repositorio.
    *   Dale un nombre (ej: `mi-primera-app-web`).
    *   Puedes dejarlo público (más fácil para empezar).
    *   **NO** inicialices con README, .gitignore o licencia por ahora si vas a subir una carpeta existente.
    *   Haz clic en "Create repository".
    *   En la página siguiente, busca la opción "uploading an existing file" (subir un archivo existente) o similar.
    *   Arrastra y suelta *todos los archivos y carpetas* de tu proyecto (incluyendo `index.html`, carpetas `css`, `js`, etc.) en la ventana de carga de GitHub.
    *   Espera a que se suban.
    *   Escribe un mensaje corto en "Commit changes" (ej: "Versión inicial del proyecto").
    *   Haz clic en "Commit changes". ¡Tu código ya está en GitHub!

4.  **Una Cuenta de Render:** Ve a [render.com](https://render.com/) y regístrate. Puedes usar tu cuenta de GitHub para registrarte, lo cual facilita el proceso.

---

**Tutorial Paso a Paso para Desplegar en Render**

**Paso 1: Inicia Sesión en Render y Crea un Nuevo Servicio**

1.  Ve a [dashboard.render.com](https://dashboard.render.com/) e inicia sesión.
2.  En el dashboard, busca y haz clic en el botón **"New +"** (normalmente arriba a la derecha o en el centro si es tu primera vez).
3.  Selecciona la opción **"Static Site"** (Sitio Estático). Esta es la opción perfecta para proyectos hechos solo con HTML, CSS y JavaScript.

**Paso 2: Conecta tu Repositorio de GitHub**

1.  Render te pedirá conectar tu cuenta de GitHub (si no lo hiciste al registrarte). Haz clic en **"Configure account"** o **"Connect account"** junto al icono de GitHub.
2.  Se abrirá una ventana de GitHub pidiéndote autorización. Puedes elegir dar acceso a Render a *todos* tus repositorios o *solo a los seleccionados*. Para empezar, puedes seleccionar solo el repositorio que creaste para tu proyecto (ej: `mi-primera-app-web`).
3.  Haz clic en **"Install & Authorize"** (Instalar y Autorizar) o "Save" (Guardar) en GitHub. Serás redirigido de vuelta a Render.
4.  Ahora, en la lista de repositorios, busca y selecciona el repositorio de tu proyecto (ej: `mi-primera-app-web`). Haz clic en **"Connect"** (Conectar) al lado del nombre.

**Paso 3: Configura los Detalles del Sitio Estático**

Ahora verás una pantalla para configurar tu sitio. Presta atención a estos campos:

1.  **Name (Nombre):** Dale un nombre único a tu proyecto en Render (ej: `mi-primera-app`). Este nombre será parte de la URL gratuita que te dará Render (ej: `mi-primera-app.onrender.com`). Elige uno que esté disponible.
2. Nada :) 
3.  **Branch (Rama):** Asegúrate de que esté seleccionada la rama principal de tu repositorio (normalmente `main` o `master`). Es la rama donde subiste tu código en GitHub.
4.  **Root Directory (Directorio Raíz):** *Opcional*. Si tu `index.html` y el resto de archivos están directamente dentro del repositorio (no dentro de otra carpeta como `src` o `app`), puedes dejar este campo **en blanco**. Si todo tu sitio está dentro de una subcarpeta en GitHub (ej: una carpeta llamada `public`), entonces escribe el nombre de esa carpeta aquí (ej: `public`).
5.  **Build Command (Comando de Construcción):** Para un sitio HTML/CSS/JS simple, **no necesitas un comando de construcción**. Deja este campo **en blanco**.
6.  **Publish Directory (Directorio de Publicación):** ¡Este es importante! Indica la carpeta que contiene los archivos finales que se deben servir al público.
    *   Si tu `index.html`, `css/`, `js/` están **directamente en la raíz** de tu repositorio (y dejaste "Root Directory" en blanco), entonces aquí debes poner `.` (un solo punto, que significa el directorio actual) o simplemente dejarlo **en blanco** (Render suele entenderlo para sitios estáticos simples si no hay build step). ***Prueba primero dejándolo en blanco.***
    *   Si en tu repositorio tienes una carpeta como `public` o `dist` que contiene *todo* tu sitio (tu `index.html`, etc.), entonces escribe aquí el nombre de esa carpeta (ej: `public` o `dist`).
    *   **¡Importante!** La clave es que este directorio debe contener el archivo `index.html` principal que quieres que se muestre cuando alguien visite tu URL.
7.  **Auto-Deploy (Despliegue Automático):** Déjalo en `Yes`. Esto significa que cada vez que subas cambios a tu rama `main` (o `master`) en GitHub, Render automáticamente reconstruirá y desplegará la nueva versión de tu sitio. ¡Muy útil!

**Paso 4: Inicia el Despliegue**

1.  Revisa que toda la configuración esté correcta, especialmente el **Publish Directory**.
2.  Desplázate hacia abajo y haz clic en el botón **"Create Static Site"** (Crear Sitio Estático).
3.  ¡Listo! Render empezará el proceso de despliegue.

**Paso 5: Espera y Verifica**

1.  Serás redirigido a la página de tu nuevo servicio en Render. Verás un log o un indicador de estado que dice algo como "In progress", "Cloning repository", "Deploying...", etc.
2.  Este proceso suele ser muy rápido para sitios estáticos simples (menos de un minuto).
3.  Una vez que veas un mensaje como **"Live"** o **"Deploy successful"**, ¡tu sitio estará en línea!
4.  En la parte superior de la página de tu servicio en Render, verás la URL pública de tu sitio (algo como `https://tu-nombre-unico.onrender.com`). Haz clic en ella.
5.  Debería abrirse tu aplicación web en el navegador, exactamente como la ves en tu computadora local.

**¡Felicidades! ¡Has desplegado tu primera aplicación web en Render!**

**¿Qué Sigue? (Pasos Opcionales)**

*   **Actualizar tu Sitio:** Simplemente haz cambios en tu código localmente, súbelos a tu repositorio de GitHub (a la rama `main` o `master`). Render detectará el cambio automáticamente y desplegará la nueva versión en unos minutos.
*   **Dominio Personalizado:** Si tienes tu propio dominio (ej: `www.mi-increible-app.com`), puedes configurarlo en Render para que apunte a tu sitio desplegado. Busca la sección "Settings" (Configuración) y luego "Custom Domains" (Dominios Personalizados) dentro de tu servicio en Render. Sigue las instrucciones (normalmente implica añadir registros CNAME o A en la configuración de tu proveedor de dominio).
*   **Solución de Problemas:** Si el sitio no carga o ves un error "Not Found":
    *   Revisa los logs del despliegue en Render (en la pestaña "Events" o "Logs"). Busca errores.
    *   El error más común es una configuración incorrecta del **Publish Directory**. Asegúrate de que apunta a la carpeta que contiene tu `index.html`. Intenta poner `.` o dejarlo en blanco si tus archivos están en la raíz del repositorio.
    *   Asegúrate de que tu archivo HTML principal se llama exactamente `index.html` (en minúsculas).

