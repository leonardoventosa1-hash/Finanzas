# Finanzas — aplicación multiusuario para iPhone

## Objetivo
Una aplicación de finanzas personales para múltiples usuarios. Cada persona crea su cuenta y administra únicamente sus datos. La primera versión será una Progressive Web App (PWA), instalable en iPhone desde Safari.

## Stack propuesto
- Frontend: React + TypeScript + Vite
- Estilos: CSS responsive, mobile-first
- Backend: Supabase (Postgres + Auth)
- Hosting: Vercel o Netlify (a configurar)
- PWA: manifest, iconos y service worker

## MVP
1. Acceso exclusivamente por invitación del administrador, login, logout y recuperación de contraseña.
2. Panel con saldo, ingresos, gastos y balance mensual (ARS).
3. Alta, edición y eliminación de movimientos.
4. Categorías de ingresos y gastos.
5. Filtro por mes y gráficos sencillos.
6. Diseño responsivo e instalación en iPhone.
7. Estados vacíos, errores, carga y accesibilidad básica.

## Modelo de datos inicial
- profiles: id (uuid, FK auth.users), display_name, created_at
- categories: id, user_id, name, kind (income/expense), created_at
- transactions: id, user_id, category_id, kind, amount, currency, occurred_on, description, created_at

Dinero: NUMERIC(14,2) y divisa inicial ARS; no usar números flotantes para cálculos financieros.

## Acceso privado por invitación
- No mostrar ni habilitar registro público.
- Solo el administrador puede invitar correos electrónicos desde un panel protegido.
- Las invitaciones se emiten desde una función segura en el servidor usando la API de administración de Supabase, nunca desde el navegador.
- Enviar enlace de invitación con vencimiento, de un solo uso según el flujo de autenticación implementado; validar el estado de invitación y la identidad antes de habilitar el perfil.
- Revocar invitaciones pendientes y desactivar cuentas cuando corresponda; verificar que la desactivación impida acceso a los datos incluso con sesiones previas.
- El administrador no puede ver las finanzas de otros usuarios por defecto; cualquier acceso excepcional requerirá definición y autorización explícita.

## Requisitos de seguridad
- Habilitar Row Level Security (RLS) en todas las tablas con datos personales.
- Policies SELECT/INSERT/UPDATE/DELETE condicionadas a auth.uid() = user_id.
- Verificar pertenencia de category_id al mismo usuario también en base de datos.
- Nunca exponer la service_role key en frontend ni subir secretos a GitHub.
- Sesiones protegidas y recuperación de contraseña.
- Revisar minimización de datos, exportación y borrado de cuenta antes de lanzar públicamente.

## Fases
1. Crear estructura de proyecto React/TypeScript/PWA.
2. Configurar proyecto Supabase (requiere credenciales del propietario).
3. Crear migraciones SQL y políticas RLS, probar aislamiento con dos usuarios.
4. Construir pantallas y conectar movimientos reales.
5. Pruebas en iPhone y despliegue HTTPS.
6. Eventual evolución a app nativa (Capacitor o React Native), si hiciera falta.

## No incluido inicialmente
- Integración bancaria, sincronización con bancos o billeteras.
- Suscripciones y cobros.
- Publicación en App Store.

> Documento inicial de planificación. No implica que la aplicación o el backend ya estén desplegados.
