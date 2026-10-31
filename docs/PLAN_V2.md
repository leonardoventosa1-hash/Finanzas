# Finanzas V2 — hoja de ruta por etapas

## Principios
- Una sola cuenta privada con Supabase; no habilitar registros públicos.
- Mantener la interfaz Premium iOS como base de diseño.
- Ningún módulo a medias visible en producción: desarrollo en ramas, revisión, pruebas y merge posterior.
- Nunca eliminar ni sobrescribir movimientos existentes. Usar migraciones aditivas y reversibles cuando sea posible.
- Antes de modificar datos reales: exportación/backup verificado y pruebas con datos ficticios en proyecto de prueba.
- Tratar montos como NUMERIC en Postgres; evitar errores por redondeo en JS, y no mezclar ARS y USD sin cotización identificada.

## Etapas
### 0. Preparación y diseño
- Validar estado de main y del PR de rediseño Premium iOS (PR #2); no asumir que se integró.
- Definir navegación: Inicio, Movimientos, Agregar y Más en iPhone; sidebar en escritorio.
- Diseñar entidades y contratos; pruebas de compilación y login.

### 1. Cuentas y transferencias (primera funcionalidad nueva)
- Tipos: banco, billetera virtual, efectivo.
- Saldo inicial, moneda, nombre, activo/inactivo.
- Asociar transacciones a cuenta; las anteriores siguen válidas sin cuenta asociada.
- Transferencias entre cuentas como operación atómica, no como ingreso o gasto.
- Comprobar que sumas por moneda cuadren y que las políticas RLS se apliquen.

### 2. Tarjetas, cuotas y vencimientos
- Tarjetas con alias, cierre y vencimiento (sin número completo, CVV ni claves).
- Compras en cuotas, plan de cuotas y calendario de vencimientos.
- Evitar doble contabilización de compras y pagos de resumen.

### 3. Gastos fijos y suscripciones
- Plantillas recurrentes, próximos vencimientos, alertas visuales.
- La generación de movimientos debe ser explícita/idempotente.
- No suponer que un gasto se pagó porque venció.

### 4. Ahorro en dólares, inversiones y objetivos
- Tenencias en ARS/USD separadas; cotización con fuente y fecha si se muestran conversiones.
- Movimientos de inversión, costos y rendimientos; evitar duplicar transferencias.
- Objetivos con monto y progreso vinculables a cuentas, sin confundir saldo con patrimonio.

### 5. Estadísticas avanzadas
- Series mensuales, distribución de gastos, comparaciones por categorías.
- Datos agregados respetando RLS; filtros por cuenta, fecha y moneda.
- Estados sin datos y coherencia con saldos históricos.

## Criterios de aceptación generales
1. `npm run build` sin errores; pruebas automáticas y manuales en Safari de iPhone.
2. Confirmar login, creación/edición/eliminación y persistencia desde otro dispositivo.
3. Movimientos previos permanecen intactos y legibles.
4. Backups accesibles y recuperación documentada.
5. Sin claves secretas en frontend; RLS y propiedad de usuario verificadas.
6. Revisar despliegue de Vercel Preview antes de integrar en main.
