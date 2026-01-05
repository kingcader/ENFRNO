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
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          location: string | null
          state: string | null
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          state?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          state?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      listings: {
        Row: {
          id: string
          seller_id: string
          title: string
          description: string | null
          brand: string
          model: string | null
          size: string
          condition: 'deadstock' | 'like_new' | 'used' | 'worn'
          price: number
          open_to_trades: boolean
          images: string[]
          slug: string
          status: 'active' | 'sold' | 'traded' | 'inactive'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          seller_id: string
          title: string
          description?: string | null
          brand: string
          model?: string | null
          size: string
          condition: 'deadstock' | 'like_new' | 'used' | 'worn'
          price: number
          open_to_trades?: boolean
          images?: string[]
          slug: string
          status?: 'active' | 'sold' | 'traded' | 'inactive'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          seller_id?: string
          title?: string
          description?: string | null
          brand?: string
          model?: string | null
          size?: string
          condition?: 'deadstock' | 'like_new' | 'used' | 'worn'
          price?: number
          open_to_trades?: boolean
          images?: string[]
          slug?: string
          status?: 'active' | 'sold' | 'traded' | 'inactive'
          created_at?: string
          updated_at?: string
        }
      }
      trade_offers: {
        Row: {
          id: string
          listing_id: string
          offerer_id: string
          offered_listing_id: string | null
          cash_offer: number | null
          message: string | null
          status: 'pending' | 'accepted' | 'rejected' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          listing_id: string
          offerer_id: string
          offered_listing_id?: string | null
          cash_offer?: number | null
          message?: string | null
          status?: 'pending' | 'accepted' | 'rejected' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          listing_id?: string
          offerer_id?: string
          offered_listing_id?: string | null
          cash_offer?: number | null
          message?: string | null
          status?: 'pending' | 'accepted' | 'rejected' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          listing_id: string | null
          content: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id: string
          listing_id?: string | null
          content: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          sender_id?: string
          receiver_id?: string
          listing_id?: string | null
          content?: string
          read?: boolean
          created_at?: string
        }
      }
      saved_listings: {
        Row: {
          id: string
          user_id: string
          listing_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          listing_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          listing_id?: string
          created_at?: string
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

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Listing = Database['public']['Tables']['listings']['Row']
export type TradeOffer = Database['public']['Tables']['trade_offers']['Row']
export type Message = Database['public']['Tables']['messages']['Row']
export type SavedListing = Database['public']['Tables']['saved_listings']['Row']

export type ListingWithSeller = Listing & {
  profiles: Profile
}


