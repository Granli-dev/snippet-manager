export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      snippets: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          code: string;
          language: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          code: string;
          language: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          description?: string | null;
          code?: string;
          language?: string;
          updated_at?: string;
        };
      };
      tags: {
        Row: {
          id: string;
          user_id: string;
          name: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
        };
        Update: {
          name?: string;
        };
      };
      snippet_tags: {
        Row: {
          snippet_id: string;
          tag_id: string;
        };
        Insert: {
          snippet_id: string;
          tag_id: string;
        };
        Update: never;
      };
    };
  };
}
