# Finanzas — versión personal con Supabase

Aplicación web instalable (PWA) para iPhone, con una cuenta privada y datos sincronizados en Supabase.

## Activación
1. Crear un proyecto gratuito en https://supabase.com/dashboard
2. Abrir SQL Editor y ejecutar `supabase/migrations/001_initial.sql` para crear las tablas y reglas de seguridad (RLS).
3. En Authentication, deshabilitar el registro público para que nadie pueda crear cuentas por su cuenta.
4. En Authentication > Users, crear **solamente tu usuario**, utilizando las opciones disponibles en el panel de administración. Definir la contraseña por un canal seguro.
5. Copiar `.env.example` como `.env.local` y completar `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` con la **URL y clave pública** de tu proyecto, nunca con una clave service_role o secret.
6. Ejecutar `npm install`, `npm run dev` y `npm run build`.
7. Publicar el resultado en un hosting HTTPS y configurar URL pública y redirect URLs en Supabase Auth.
8. Abrir la URL desde Safari en iPhone y usar Compartir > Agregar a pantalla de inicio.

## Funcionalidades implementadas en el código
- Inicio de sesión con correo y contraseña (sin formulario de registro).
- Consultar y cargar ingresos y gastos en ARS, con balance mensual.
- Eliminar movimientos.
- Tabla en Supabase protegida con RLS para que cada cuenta acceda solo a sus datos.

## Pendientes antes de uso real
- Configurar y probar el servicio Supabase (no está conectado).
- Completar el flujo de recuperación de contraseña (actualmente envía el correo pero aún no ofrece formulario para establecer la contraseña nueva).
- Revisar pruebas de integración, seguridad, estados offline, respaldos externos y compilación.
- No hay integración bancaria ni sincronización de los datos que hayas guardado antes en localStorage: si ya usaste la versión local, se requiere migración.

La versión de uso solo local está en el historial de Git. El servicio de alojamiento y credenciales se configuran fuera de GitHub.
