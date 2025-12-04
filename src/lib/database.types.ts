export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      animais: {
        Row: {
          id: string
          identificador: string
          sexo: 'Macho' | 'Fêmea'
          data_nascimento: string
          peso: number
          lote: string
          status: 'Ativo' | 'Vendido' | 'Morto'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          identificador: string
          sexo: 'Macho' | 'Fêmea'
          data_nascimento: string
          peso: number
          lote: string
          status?: 'Ativo' | 'Vendido' | 'Morto'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          identificador?: string
          sexo?: 'Macho' | 'Fêmea'
          data_nascimento?: string
          peso?: number
          lote?: string
          status?: 'Ativo' | 'Vendido' | 'Morto'
          updated_at?: string
        }
      }
      eventos: {
        Row: {
          id: string
          animal_id: string
          tipo: 'Vacinação' | 'Pesagem' | 'Tratamento' | 'Inseminação'
          data: string
          descricao: string
          valor: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          animal_id: string
          tipo: 'Vacinação' | 'Pesagem' | 'Tratamento' | 'Inseminação'
          data: string
          descricao: string
          valor?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          animal_id?: string
          tipo?: 'Vacinação' | 'Pesagem' | 'Tratamento' | 'Inseminação'
          data?: string
          descricao?: string
          valor?: number | null
          updated_at?: string
        }
      }
      pesagens: {
        Row: {
          id: string
          animal_id: string
          peso_entrada: number
          peso_saida: number
          data_entrada: string
          data_saida: string
          gmd: number
          dias_periodo: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          animal_id: string
          peso_entrada: number
          peso_saida: number
          data_entrada: string
          data_saida: string
          gmd: number
          dias_periodo: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          animal_id?: string
          peso_entrada?: number
          peso_saida?: number
          data_entrada?: string
          data_saida?: string
          gmd?: number
          dias_periodo?: number
          updated_at?: string
        }
      }
    }
  }
}
