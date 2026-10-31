# Finanzas — uso personal con Supabase

## Decisión actual
Una única cuenta personal, sin registro público ni invitaciones. Guardar datos en la nube para acceder desde iPhone y computadora.

## Arquitectura
- React + TypeScript + Vite para el cliente PWA.
- Supabase Auth para inicio de sesión.
- Supabase Postgres con Row Level Security para ingresos y gastos.
- Hosting HTTPS por configurar.

## MVP
1. Inicio de sesión con correo y contraseña.
2. Balance mensual en ARS.
3. Agregar, listar y eliminar ingresos y gastos.
4. Diseño mobile-first y manifest de instalación.

## Pendiente
- Crear proyecto Supabase y configurar credenciales públicas.
- Crear el único usuario de manera privada (desactivar altas públicas).
- Verificar políticas RLS con pruebas efectivas.
- Terminar el proceso de recuperación y actualización de contraseña.
- Compilar y probar en iPhone y escritorio.
- Despliegue, service worker y plan de copias de seguridad.

## Datos y seguridad
El proyecto SQL `supabase/migrations/001_initial.sql` contiene tablas y políticas RLS. Nunca subir claves de servicio ni contraseñas. La clave pública y URL de Supabase pueden usarse en el frontend cuando RLS está configurado; la clave secreta solo puede existir en un servidor seguro.
