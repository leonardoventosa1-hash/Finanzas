# Saldos reales — plan de integración
Esta rama contiene **solo SQL propuesto**, no aplicado a Supabase. Requiere migración 002 y respaldo completo previo.

Los movimientos anteriores quedan con `account_id = NULL` y **no deben asignarse automáticamente** a ninguna cuenta. Los balances mostrados hasta vincular movimientos seguirán siendo saldos iniciales, no saldos reales. No debe presentarse como dinero disponible calculado.

Para una cuenta en una moneda: saldo = saldo inicial + ingresos asociados - gastos asociados + transferencias recibidas - transferencias enviadas. No mezclar ARS y USD. Prohibir transferencias entre monedas hasta disponer de un modelo de cambio de divisas. Las transferencias no alteran el informe de ingresos/gastos.

Pruebas obligatorias: RLS con dos usuarios; imposibilidad de vincular cuenta ajena; imposibilidad de transferir entre cuentas de usuarios diferentes; saldo no negativo no es requisito porque puede haber descubierto; tras borrar una cuenta no perder operaciones (definir desactivación en lugar de borrar); descripciones/fechas; retrocompatibilidad con operaciones sin cuenta. Antes de ejecutar la migración en entorno de ensayo, verificar nombres de constraints y los índices existentes.
