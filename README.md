# Finanzas

Aplicación web instalable (PWA) de finanzas personales para iPhone, con cuentas privadas por invitación.

## Requisitos
- Node.js 20.19+ o 22.12+
- Un proyecto Supabase propio

## Iniciar en local
1. `npm install`
2. Copiar `.env.example` a `.env.local` y completar URL y clave pública (anon/publishable) de Supabase.
3. Ejecutar `supabase/migrations/001_initial.sql` en el SQL Editor de Supabase.
4. **Desactivar los registros públicos en Supabase Auth**; ocultar el registro en la interfaz no es una medida de seguridad.
5. `npm run dev` para desarrollar y `npm run build` para compilar.
6. Publicar con HTTPS y agregar la app desde Safari a la pantalla de inicio del iPhone.

## Invitaciones
En la primera etapa, las invitaciones se administrarán desde el panel seguro de Supabase (Auth > Users > Invite user). **Nunca** incluir una `service_role` key en una app cliente. El panel de invitaciones para el administrador está pendiente.

**Antes de usar con otras personas:** implementar y probar el flujo de aceptación de invitaciones para establecer contraseña, y el flujo de recuperación de contraseña (incluyendo la pantalla para actualizarla). Configurar las URLs de redirección en Supabase Auth. La interfaz actual solo permite iniciar sesión con credenciales ya configuradas; no presenta formulario de registro público.

## Estado
- ✅ Estructura React/TypeScript/Vite y diseño responsive.
- ✅ Manifest e ícono para instalar desde Safari. La funcionalidad offline queda pendiente.
- ✅ Vista de ingresos/gastos, balance del mes, alta y eliminación de movimientos (conectados cuando Supabase esté configurado).
- ✅ Migración SQL con aislamiento por usuario mediante RLS.
- ⏳ No hay servicio Supabase conectado ni despliegue configurado.
- ⏳ Falta completar invitaciones, aceptación, recuperación, pruebas de seguridad, y mejoras de categorías.

El código se está desarrollando en la rama `feature/multiusuario-pwa`. No está listo para producción. Ver [PLAN_APP.md](PLAN_APP.md).
