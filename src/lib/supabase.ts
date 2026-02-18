import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fkssmmdopnrstqytapae.supabase.co';
const supabaseKey = 'sb_publishable_v4JsOeAw22tbYdgRoRUpNg_gRcLNyWf';

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Byproduct {
  id: number;
  material: string;
  custom_material?: string;
  routing: string;
  distance: string;
  rawVolume: number;
  price_inr?: number;
  photo_url?: string;
  status?: string;
  created_at: string;
}
