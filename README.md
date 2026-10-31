# Finanzas — versión personal

Aplicación de finanzas personales para iPhone como PWA, sin cuenta, sin Supabase y sin backend.

## Ejecutar
1. Instalar Node.js 20.19+ (o 22.12+).
2. Ejecutar `npm install` y `npm run dev` para desarrollo.
3. Ejecutar `npm run build` para generar el sitio estático.
4. Publicar `dist/` en un hosting HTTPS (Vercel, Netlify o similar).
5. En Safari del iPhone abrir la URL y elegir Compartir → Agregar a pantalla de inicio.

## Funcionalidades actuales
- Cargar/eliminar ingresos y gastos en ARS.
- Balance mensual y filtro por mes.
- Guardado automático en localStorage, en **ese navegador y dispositivo**.
- Exportación a JSON e importación de respaldo (reemplaza la información actual después de confirmar).
- Interfaz mobile-first y manifest de PWA.

## Advertencias
- Sin inicio de sesión; cualquier persona con acceso al dispositivo/navegador y su almacenamiento puede consultar los movimientos.
- Sin cifrado propio, sincronización, conexión bancaria ni copias automáticas en la nube.
- Safari puede eliminar almacenamiento del sitio; limpiar datos, cambiar de navegador o de iPhone puede causar pérdida de información. Hacé respaldos frecuentes y guardalos de manera segura.
- El manifest permite añadir la app a la pantalla de inicio, pero **no hay service worker** todavía: se requiere conexión para cargarla.
- Esta rama aún requiere compilación y pruebas manuales en iPhone antes de considerarse lista.
- El código del prototipo multiusuario y su migración Supabase permanecen como archivos no utilizados; **no forman parte de la versión personal**.

Ver `PLAN_APP.md`.
