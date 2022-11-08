export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      card_sets: {
        Row: {
          id: string
          created_at: string
          display_name: string
          user_id: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          display_name: string
          user_id: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          display_name?: string
          user_id?: string
          slug?: string
          updated_at?: string | null
        }
      }
      cards: {
        Row: {
          id: number
          created_at: string
          collector_number: number | null
          name: string | null
          types: string | null
          subtypes: string | null
          rules_text: string | null
          flavor_text: string | null
          mana_cost: string | null
          power: string | null
          toughness: string | null
          artwork_url: string | null
          template_id: string | null
          card_set_id: string | null
          user_id: string
          updated_at: string
        }
        Insert: {
          id?: number
          created_at?: string
          collector_number?: number | null
          name?: string | null
          types?: string | null
          subtypes?: string | null
          rules_text?: string | null
          flavor_text?: string | null
          mana_cost?: string | null
          power?: string | null
          toughness?: string | null
          artwork_url?: string | null
          template_id?: string | null
          card_set_id?: string | null
          user_id: string
          updated_at?: string
        }
        Update: {
          id?: number
          created_at?: string
          collector_number?: number | null
          name?: string | null
          types?: string | null
          subtypes?: string | null
          rules_text?: string | null
          flavor_text?: string | null
          mana_cost?: string | null
          power?: string | null
          toughness?: string | null
          artwork_url?: string | null
          template_id?: string | null
          card_set_id?: string | null
          user_id?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
