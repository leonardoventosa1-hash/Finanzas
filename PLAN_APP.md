# Finanzas — plan actualizado (versión individual)

## Decisión
El proyecto pasa de un prototipo multiusuario a una aplicación de uso **personal**, instalable como PWA en iPhone, sin Supabase ni autenticación.

## Incluido en esta etapa
- Interfaz responsive para iPhone.
- Registro y eliminación de ingresos y gastos en pesos argentinos.
- Balance mensual y filtro por período.
- Guardado local en el navegador.
- Exportación e importación manual de copias de seguridad.

## Próximas mejoras
1. Compilar y verificar errores de TypeScript.
2. Probar en Safari e instalación desde pantalla de inicio.
3. Agregar service worker para uso sin conexión y optimizar íconos.
4. Categorías, edición de movimientos, filtros y presupuestos.
5. Evaluar almacenamiento más sólido / sincronización opcional si se necesita usar varios dispositivos.
6. Evaluar protección adicional para datos financieros.

## Limitaciones
Los datos se guardan solo en el navegador del iPhone. No están cifrados por la app ni sincronizados, pueden perderse por limpieza del almacenamiento o cambio de dispositivo. Respaldos manuales recomendados.

El código Supabase anterior puede archivarse o eliminarse cuando se confirme el cambio definitivo; ahora no se usa.
