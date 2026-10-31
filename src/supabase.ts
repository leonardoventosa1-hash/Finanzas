import { createClient } from '@supabase/supabase-js';

// La URL y la publishable key son públicas. Nunca colocar aquí service_role ni secret keys.
// Se pueden reemplazar en cada despliegue mediante variables de entorno.
const url = import.meta.env.VITE_SUPABASE_URL || 'https://fjxlklqzevixxfqwtnjj.supabase.co';
const key = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_OkEeZb6td4q3SbRnOPSWNA_hciDXNwU';
export const supabase = createClient(url, key);
