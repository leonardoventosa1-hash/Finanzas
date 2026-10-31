# Finanzas V2 — módulos futuros (NO ACTIVOS)

## Estado
Este PR contiene **solo una propuesta de SQL**. No ejecuta SQL en Supabase, no modifica `transactions` ni `categories`, no expone botones sin backend y no publica funcionalidades incompletas. Requiere respaldo y pruebas antes de aplicarse.

## Orden de despliegue
1. Comprobar copia de seguridad completa de Supabase y capacidad de restauración.
2. Probar migraciones en un proyecto Supabase de ensayo. La migración 002 de cuentas es independiente y deberá revisarse previamente.
3. Aplicar 003 en ensayo. Probar RLS con usuario A y B: ni SELECT, INSERT, UPDATE ni DELETE cruzados; intentar usar tarjeta de otro usuario.
4. Validar cierres (meses con <31 días), vencimientos, redondeo de cuotas, zona horaria y moneda. La estructura de datos no calcula vencimientos ni mueve automáticamente dinero.
5. Solo entonces aplicar SQL en producción; desarrollar pantallas y pruebas y publicar mediante PR con estado Vercel exitoso.

## Modelos
- `credit_cards`: nombre, emisor, moneda, día de cierre y vencimiento, límite opcional.
- `card_purchases`: compra, importe total, cuotas y primer mes de resumen; la lógica de cada cuota aún está pendiente.
- `recurring_expenses`: nombre, importe, frecuencia, próximo vencimiento, activo. **No genera movimientos automáticamente**.
- `savings_goals`: objetivo, meta y monto guardado declarado. **No descuenta dinero automáticamente**.

## Riesgos pendientes
- Migraciones no idempotentes (pensadas para ejecutarse una sola vez bajo control de versión).
- Ninguna ejecución en Supabase verificada aún.
- No hay integración de tablas con la aplicación ni pruebas de RLS ejecutadas.
- El presupuesto de inversión en USD no está desarrollado; no inventar cotizaciones ni sumar monedas distintas.
