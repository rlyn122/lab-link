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
      faculty: {
        Row: {
          id: string
          name: string
          affiliation: string | null
          homepage: string | null
          email_domain: string | null
          scholar_id: string | null
          interests: string[] | null
          citedby: number | null
          citedby5y: number | null
          hindex: number | null
          hindex5y: number | null
          i10index: number | null
          i10index5y: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          affiliation?: string | null
          homepage?: string | null
          email_domain?: string | null
          scholar_id?: string | null
          interests?: string[] | null
          citedby?: number | null
          citedby5y?: number | null
          hindex?: number | null
          hindex5y?: number | null
          i10index?: number | null
          i10index5y?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          affiliation?: string | null
          homepage?: string | null
          email_domain?: string | null
          scholar_id?: string | null
          interests?: string[] | null
          citedby?: number | null
          citedby5y?: number | null
          hindex?: number | null
          hindex5y?: number | null
          i10index?: number | null
          i10index5y?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      papers: {
        Row: {
          id: string
          title: string
          year: number | null
          url: string | null
          abstract: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          year?: number | null
          url?: string | null
          abstract?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          year?: number | null
          url?: string | null
          abstract?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      faculty_papers: {
        Row: {
          faculty_id: string
          paper_id: string
          created_at: string
        }
        Insert: {
          faculty_id: string
          paper_id: string
          created_at?: string
        }
        Update: {
          faculty_id?: string
          paper_id?: string
          created_at?: string
        }
      }
      research_areas: {
        Row: {
          id: string
          name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
          updated_at?: string
        }
      }
      paper_research_areas: {
        Row: {
          paper_id: string
          research_area_id: string
          created_at: string
        }
        Insert: {
          paper_id: string
          research_area_id: string
          created_at?: string
        }
        Update: {
          paper_id?: string
          research_area_id?: string
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