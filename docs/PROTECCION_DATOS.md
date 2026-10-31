# Protección de datos y plan de pruebas

- La aplicación existente está en producción: NO ejecutar migraciones experimentales en el Supabase principal.
- Exportar movimientos desde Supabase con un procedimiento verificable antes de migrar.
- Crear un proyecto Supabase de prueba o una base aislada para verificar SQL y reglas RLS.
- No usar cuentas bancarias reales, CVV, números completos de tarjeta, tokens ni contraseñas en datos de prueba.
- Para cada tabla nueva: SELECT/INSERT/UPDATE/DELETE autorizados solo para auth.uid() propietario.
- Probar bloqueos entre dos usuarios ficticios, incluso aunque el producto final sea de uso individual.
- Asegurar que balances anteriores y los registros con account_id nulo sigan funcionando.
- No fusionar ramas de desarrollo ni desplegar funciones incompletas a producción.
