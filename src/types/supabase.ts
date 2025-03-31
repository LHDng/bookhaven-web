
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
      books: {
        Row: {
          id: number
          title: string
          author: string
          price: number
          original_price: number | null
          cover_image: string
          rating: number
          category: string
          tags: string[]
          description: string
          pages: number
          publisher: string
          published_date: string
          language: string
          isbn: string
          featured: boolean | null
          created_at: string
        }
        Insert: {
          id?: number
          title: string
          author: string
          price: number
          original_price?: number | null
          cover_image: string
          rating: number
          category: string
          tags: string[]
          description: string
          pages: number
          publisher: string
          published_date: string
          language: string
          isbn: string
          featured?: boolean | null
          created_at?: string
        }
        Update: {
          id?: number
          title?: string
          author?: string
          price?: number
          original_price?: number | null
          cover_image?: string
          rating?: number
          category?: string
          tags?: string[]
          description?: string
          pages?: number
          publisher?: string
          published_date?: string
          language?: string
          isbn?: string
          featured?: boolean | null
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          icon: string
        }
        Insert: {
          id: string
          name: string
          icon: string
        }
        Update: {
          id?: string
          name?: string
          icon?: string
        }
      }
      orders: {
        Row: {
          id: number
          user_id: string
          status: string
          total: number
          created_at: string
          shipping_address: Json | null
        }
        Insert: {
          id?: number
          user_id: string
          status: string
          total: number
          created_at?: string
          shipping_address?: Json | null
        }
        Update: {
          id?: number
          user_id?: string
          status?: string
          total?: number
          created_at?: string
          shipping_address?: Json | null
        }
      }
      order_items: {
        Row: {
          id: number
          order_id: number
          book_id: number
          quantity: number
          price: number
        }
        Insert: {
          id?: number
          order_id: number
          book_id: number
          quantity: number
          price: number
        }
        Update: {
          id?: number
          order_id?: number
          book_id?: number
          quantity?: number
          price?: number
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
