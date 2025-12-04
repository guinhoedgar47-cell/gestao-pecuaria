import { supabase } from './supabase';
import type { Database } from './database.types';

type Animal = Database['public']['Tables']['animais']['Row'];
type AnimalInsert = Database['public']['Tables']['animais']['Insert'];
type AnimalUpdate = Database['public']['Tables']['animais']['Update'];

type Evento = Database['public']['Tables']['eventos']['Row'];
type EventoInsert = Database['public']['Tables']['eventos']['Insert'];

type Pesagem = Database['public']['Tables']['pesagens']['Row'];
type PesagemInsert = Database['public']['Tables']['pesagens']['Insert'];
type PesagemUpdate = Database['public']['Tables']['pesagens']['Update'];

// ============= ANIMAIS =============

export async function getAnimais() {
  if (!supabase) throw new Error('Supabase não configurado');
  
  const { data, error } = await supabase
    .from('animais')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Animal[];
}

export async function getAnimalById(id: string) {
  if (!supabase) throw new Error('Supabase não configurado');
  
  const { data, error } = await supabase
    .from('animais')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as Animal;
}

export async function createAnimal(animal: AnimalInsert) {
  if (!supabase) throw new Error('Supabase não configurado');
  
  const { data, error } = await supabase
    .from('animais')
    .insert(animal)
    .select()
    .single();
  
  if (error) throw error;
  return data as Animal;
}

export async function updateAnimal(id: string, updates: AnimalUpdate) {
  if (!supabase) throw new Error('Supabase não configurado');
  
  const { data, error } = await supabase
    .from('animais')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Animal;
}

export async function deleteAnimal(id: string) {
  if (!supabase) throw new Error('Supabase não configurado');
  
  const { error } = await supabase
    .from('animais')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

// ============= EVENTOS =============

export async function getEventos() {
  if (!supabase) throw new Error('Supabase não configurado');
  
  const { data, error } = await supabase
    .from('eventos')
    .select('*')
    .order('data', { ascending: false });
  
  if (error) throw error;
  return data as Evento[];
}

export async function getEventosByAnimalId(animalId: string) {
  if (!supabase) throw new Error('Supabase não configurado');
  
  const { data, error } = await supabase
    .from('eventos')
    .select('*')
    .eq('animal_id', animalId)
    .order('data', { ascending: false });
  
  if (error) throw error;
  return data as Evento[];
}

export async function createEvento(evento: EventoInsert) {
  if (!supabase) throw new Error('Supabase não configurado');
  
  const { data, error } = await supabase
    .from('eventos')
    .insert(evento)
    .select()
    .single();
  
  if (error) throw error;
  return data as Evento;
}

export async function deleteEvento(id: string) {
  if (!supabase) throw new Error('Supabase não configurado');
  
  const { error } = await supabase
    .from('eventos')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

// ============= PESAGENS =============

export async function getPesagens() {
  if (!supabase) throw new Error('Supabase não configurado');
  
  const { data, error } = await supabase
    .from('pesagens')
    .select('*')
    .order('data_saida', { ascending: false });
  
  if (error) throw error;
  return data as Pesagem[];
}

export async function getPesagensByAnimalId(animalId: string) {
  if (!supabase) throw new Error('Supabase não configurado');
  
  const { data, error } = await supabase
    .from('pesagens')
    .select('*')
    .eq('animal_id', animalId)
    .order('data_saida', { ascending: false });
  
  if (error) throw error;
  return data as Pesagem[];
}

export async function createPesagem(pesagem: PesagemInsert) {
  if (!supabase) throw new Error('Supabase não configurado');
  
  const { data, error } = await supabase
    .from('pesagens')
    .insert(pesagem)
    .select()
    .single();
  
  if (error) throw error;
  return data as Pesagem;
}

export async function updatePesagem(id: string, updates: PesagemUpdate) {
  if (!supabase) throw new Error('Supabase não configurado');
  
  const { data, error } = await supabase
    .from('pesagens')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Pesagem;
}

export async function deletePesagem(id: string) {
  if (!supabase) throw new Error('Supabase não configurado');
  
  const { error } = await supabase
    .from('pesagens')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}
