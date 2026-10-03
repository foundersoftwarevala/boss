export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      _migration_apply_log: {
        Row: {
          applied_at: string | null
          err: string | null
          file: string
          ok: boolean | null
        }
        Insert: {
          applied_at?: string | null
          err?: string | null
          file: string
          ok?: boolean | null
        }
        Update: {
          applied_at?: string | null
          err?: string | null
          file?: string
          ok?: boolean | null
        }
        Relationships: []
      }
      achievement_categories: {
        Row: {
          color: string | null
          created_at: string
          created_by: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          slug: string
          sort_order: number | null
          status: Database["public"]["Enums"]["entity_status"]
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: string
          sort_order?: number | null
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
          sort_order?: number | null
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
        }
        Relationships: []
      }
      achievements: {
        Row: {
          category_id: string | null
          color: string | null
          conditions: Json
          created_at: string
          created_by: string | null
          description: string | null
          icon: string | null
          id: string
          image_url: string | null
          is_secret: boolean
          name: string
          rarity: Database["public"]["Enums"]["rarity_tier"]
          rewards: Json
          slug: string
          sort_order: number | null
          status: Database["public"]["Enums"]["entity_status"]
          updated_at: string
          xp_reward: number
        }
        Insert: {
          category_id?: string | null
          color?: string | null
          conditions?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_secret?: boolean
          name: string
          rarity?: Database["public"]["Enums"]["rarity_tier"]
          rewards?: Json
          slug: string
          sort_order?: number | null
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
          xp_reward?: number
        }
        Update: {
          category_id?: string | null
          color?: string | null
          conditions?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_secret?: boolean
          name?: string
          rarity?: Database["public"]["Enums"]["rarity_tier"]
          rewards?: Json
          slug?: string
          sort_order?: number | null
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
          xp_reward?: number
        }
        Relationships: [
          {
            foreignKeyName: "achievements_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "achievement_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      activity_logs: {
        Row: {
          activity: string
          created_at: string
          id: string
          metadata: Json | null
          user_id: string | null
        }
        Insert: {
          activity: string
          created_at?: string
          id?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Update: {
          activity?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_agents: {
        Row: {
          created_at: string
          id: string
          max_tokens: number
          model_id: string | null
          name: string
          purpose: string
          runs_30d: number
          status: string
          success_rate: number
          system_prompt: string
          temperature: number
          tools: Json
        }
        Insert: {
          created_at?: string
          id?: string
          max_tokens?: number
          model_id?: string | null
          name: string
          purpose: string
          runs_30d?: number
          status?: string
          success_rate?: number
          system_prompt?: string
          temperature?: number
          tools?: Json
        }
        Update: {
          created_at?: string
          id?: string
          max_tokens?: number
          model_id?: string | null
          name?: string
          purpose?: string
          runs_30d?: number
          status?: string
          success_rate?: number
          system_prompt?: string
          temperature?: number
          tools?: Json
        }
        Relationships: [
          {
            foreignKeyName: "ai_agents_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "ai_models"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_decision_logs: {
        Row: {
          agent_id: string | null
          confidence: number
          cost_usd: number
          decision: string
          id: string
          input_summary: string | null
          model_id: string | null
          occurred_at: string
          outcome: string
          output_summary: string | null
          tokens: number
        }
        Insert: {
          agent_id?: string | null
          confidence?: number
          cost_usd?: number
          decision: string
          id?: string
          input_summary?: string | null
          model_id?: string | null
          occurred_at?: string
          outcome?: string
          output_summary?: string | null
          tokens?: number
        }
        Update: {
          agent_id?: string | null
          confidence?: number
          cost_usd?: number
          decision?: string
          id?: string
          input_summary?: string | null
          model_id?: string | null
          occurred_at?: string
          outcome?: string
          output_summary?: string | null
          tokens?: number
        }
        Relationships: [
          {
            foreignKeyName: "ai_decision_logs_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "ai_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_decision_logs_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "ai_models"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_models: {
        Row: {
          context_window: number
          created_at: string
          id: string
          input_cost_per_1k: number
          is_default: boolean
          latency_ms: number
          modality: string
          model_id: string
          name: string
          output_cost_per_1k: number
          provider_id: string | null
          quality_score: number
          status: string
        }
        Insert: {
          context_window?: number
          created_at?: string
          id?: string
          input_cost_per_1k?: number
          is_default?: boolean
          latency_ms?: number
          modality?: string
          model_id: string
          name: string
          output_cost_per_1k?: number
          provider_id?: string | null
          quality_score?: number
          status?: string
        }
        Update: {
          context_window?: number
          created_at?: string
          id?: string
          input_cost_per_1k?: number
          is_default?: boolean
          latency_ms?: number
          modality?: string
          model_id?: string
          name?: string
          output_cost_per_1k?: number
          provider_id?: string | null
          quality_score?: number
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_models_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "ai_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_prompts: {
        Row: {
          config: Json | null
          id: string
          key: string
          model: string
          name: string
          prompt: string
          status: Database["public"]["Enums"]["entity_status"]
          updated_at: string
        }
        Insert: {
          config?: Json | null
          id?: string
          key: string
          model?: string
          name: string
          prompt: string
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
        }
        Update: {
          config?: Json | null
          id?: string
          key?: string
          model?: string
          name?: string
          prompt?: string
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
        }
        Relationships: []
      }
      ai_providers: {
        Row: {
          base_url: string | null
          category: string
          created_at: string
          docs_url: string | null
          id: string
          monthly_cost_usd: number
          name: string
          region: string
          slug: string
          status: string
        }
        Insert: {
          base_url?: string | null
          category?: string
          created_at?: string
          docs_url?: string | null
          id?: string
          monthly_cost_usd?: number
          name: string
          region?: string
          slug: string
          status?: string
        }
        Update: {
          base_url?: string | null
          category?: string
          created_at?: string
          docs_url?: string | null
          id?: string
          monthly_cost_usd?: number
          name?: string
          region?: string
          slug?: string
          status?: string
        }
        Relationships: []
      }
      ams_achievement_progress: {
        Row: {
          achievement_id: string
          earned_at: string | null
          id: string
          progress: number
          revoked_at: string | null
          role: string
          source_event_id: string | null
          state: string
          target: number
          updated_at: string
          user_id: string
          verified_at: string | null
        }
        Insert: {
          achievement_id: string
          earned_at?: string | null
          id?: string
          progress?: number
          revoked_at?: string | null
          role: string
          source_event_id?: string | null
          state?: string
          target?: number
          updated_at?: string
          user_id: string
          verified_at?: string | null
        }
        Update: {
          achievement_id?: string
          earned_at?: string | null
          id?: string
          progress?: number
          revoked_at?: string | null
          role?: string
          source_event_id?: string | null
          state?: string
          target?: number
          updated_at?: string
          user_id?: string
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ams_achievement_progress_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ams_achievement_progress_source_event_id_fkey"
            columns: ["source_event_id"]
            isOneToOne: false
            referencedRelation: "ams_activity_events"
            referencedColumns: ["id"]
          },
        ]
      }
      ams_activity_events: {
        Row: {
          created_at: string
          dedupe_key: string
          entity_id: string | null
          entity_type: string | null
          event_key: string
          id: string
          occurred_at: string
          payload: Json
          processed_at: string | null
          role: string
          source: string
          user_id: string
          value: number
        }
        Insert: {
          created_at?: string
          dedupe_key: string
          entity_id?: string | null
          entity_type?: string | null
          event_key: string
          id?: string
          occurred_at?: string
          payload?: Json
          processed_at?: string | null
          role: string
          source?: string
          user_id: string
          value?: number
        }
        Update: {
          created_at?: string
          dedupe_key?: string
          entity_id?: string | null
          entity_type?: string | null
          event_key?: string
          id?: string
          occurred_at?: string
          payload?: Json
          processed_at?: string | null
          role?: string
          source?: string
          user_id?: string
          value?: number
        }
        Relationships: []
      }
      ams_attachments: {
        Row: {
          created_at: string
          file_name: string
          file_size: number
          id: string
          mime_type: string | null
          ticket_id: string
          uploader_id: string
          url: string
        }
        Insert: {
          created_at?: string
          file_name: string
          file_size?: number
          id?: string
          mime_type?: string | null
          ticket_id: string
          uploader_id: string
          url: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_size?: number
          id?: string
          mime_type?: string | null
          ticket_id?: string
          uploader_id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "ams_attachments_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "ams_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      ams_award_ledger: {
        Row: {
          asset_kind: string
          asset_slug: string | null
          created_at: string
          event_id: string | null
          id: string
          reason: string | null
          role: string
          rule_id: string | null
          user_id: string
          xp_awarded: number
        }
        Insert: {
          asset_kind: string
          asset_slug?: string | null
          created_at?: string
          event_id?: string | null
          id?: string
          reason?: string | null
          role: string
          rule_id?: string | null
          user_id: string
          xp_awarded?: number
        }
        Update: {
          asset_kind?: string
          asset_slug?: string | null
          created_at?: string
          event_id?: string | null
          id?: string
          reason?: string | null
          role?: string
          rule_id?: string | null
          user_id?: string
          xp_awarded?: number
        }
        Relationships: [
          {
            foreignKeyName: "ams_award_ledger_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "ams_activity_events"
            referencedColumns: ["id"]
          },
        ]
      }
      ams_certificates: {
        Row: {
          achievement_slug: string | null
          certificate_no: string
          expires_at: string | null
          id: string
          issued_at: string
          revoked_at: string | null
          revoked_reason: string | null
          role: string
          stage: number | null
          title: string
          user_id: string
          verification: string
          verification_code: string | null
        }
        Insert: {
          achievement_slug?: string | null
          certificate_no: string
          expires_at?: string | null
          id?: string
          issued_at?: string
          revoked_at?: string | null
          revoked_reason?: string | null
          role: string
          stage?: number | null
          title: string
          user_id: string
          verification?: string
          verification_code?: string | null
        }
        Update: {
          achievement_slug?: string | null
          certificate_no?: string
          expires_at?: string | null
          id?: string
          issued_at?: string
          revoked_at?: string | null
          revoked_reason?: string | null
          role?: string
          stage?: number | null
          title?: string
          user_id?: string
          verification?: string
          verification_code?: string | null
        }
        Relationships: []
      }
      ams_chat_messages: {
        Row: {
          author_id: string | null
          body: string
          bookmarked: boolean
          channel: Database["public"]["Enums"]["ams_chat_channel"]
          created_at: string
          id: string
          metadata: Json
          pinned: boolean
          role: string
          ticket_id: string
        }
        Insert: {
          author_id?: string | null
          body: string
          bookmarked?: boolean
          channel?: Database["public"]["Enums"]["ams_chat_channel"]
          created_at?: string
          id?: string
          metadata?: Json
          pinned?: boolean
          role?: string
          ticket_id: string
        }
        Update: {
          author_id?: string | null
          body?: string
          bookmarked?: boolean
          channel?: Database["public"]["Enums"]["ams_chat_channel"]
          created_at?: string
          id?: string
          metadata?: Json
          pinned?: boolean
          role?: string
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ams_chat_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "ams_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      ams_comments: {
        Row: {
          author_id: string
          body: string
          created_at: string
          id: string
          is_internal: boolean
          ticket_id: string
          updated_at: string
        }
        Insert: {
          author_id: string
          body: string
          created_at?: string
          id?: string
          is_internal?: boolean
          ticket_id: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          body?: string
          created_at?: string
          id?: string
          is_internal?: boolean
          ticket_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ams_comments_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "ams_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      ams_events: {
        Row: {
          actor_id: string | null
          created_at: string
          from_value: string | null
          id: string
          kind: Database["public"]["Enums"]["ams_event_kind"]
          payload: Json
          ticket_id: string
          to_value: string | null
        }
        Insert: {
          actor_id?: string | null
          created_at?: string
          from_value?: string | null
          id?: string
          kind: Database["public"]["Enums"]["ams_event_kind"]
          payload?: Json
          ticket_id: string
          to_value?: string | null
        }
        Update: {
          actor_id?: string | null
          created_at?: string
          from_value?: string | null
          id?: string
          kind?: Database["public"]["Enums"]["ams_event_kind"]
          payload?: Json
          ticket_id?: string
          to_value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ams_events_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "ams_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      ams_passports: {
        Row: {
          expires_at: string | null
          id: string | null
          issued_at: string
          level: number
          passport_no: string
          revoked_at: string | null
          role: string
          stage: number
          updated_at: string
          user_id: string
          verification: string
          verification_code: string | null
        }
        Insert: {
          expires_at?: string | null
          id?: string | null
          issued_at?: string
          level?: number
          passport_no: string
          revoked_at?: string | null
          role: string
          stage?: number
          updated_at?: string
          user_id: string
          verification?: string
          verification_code?: string | null
        }
        Update: {
          expires_at?: string | null
          id?: string | null
          issued_at?: string
          level?: number
          passport_no?: string
          revoked_at?: string | null
          role?: string
          stage?: number
          updated_at?: string
          user_id?: string
          verification?: string
          verification_code?: string | null
        }
        Relationships: []
      }
      ams_recognition_mappings: {
        Row: {
          achievement_id: string
          active: boolean
          asset_slug: string | null
          created_at: string
          id: string
          recognition_type: string
          role: string
        }
        Insert: {
          achievement_id: string
          active?: boolean
          asset_slug?: string | null
          created_at?: string
          id?: string
          recognition_type: string
          role: string
        }
        Update: {
          achievement_id?: string
          active?: boolean
          asset_slug?: string | null
          created_at?: string
          id?: string
          recognition_type?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "ams_recognition_mappings_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      ams_role_passports: {
        Row: {
          expires_at: string | null
          id: string
          issued_at: string
          level: number
          passport_no: string
          rank: number
          reputation: number
          revoked_at: string | null
          role: string
          stage: number
          total_xp: number
          updated_at: string
          user_id: string
          verification: string
          verification_code: string
        }
        Insert: {
          expires_at?: string | null
          id?: string
          issued_at?: string
          level?: number
          passport_no: string
          rank?: number
          reputation?: number
          revoked_at?: string | null
          role: string
          stage?: number
          total_xp?: number
          updated_at?: string
          user_id: string
          verification?: string
          verification_code: string
        }
        Update: {
          expires_at?: string | null
          id?: string
          issued_at?: string
          level?: number
          passport_no?: string
          rank?: number
          reputation?: number
          revoked_at?: string | null
          role?: string
          stage?: number
          total_xp?: number
          updated_at?: string
          user_id?: string
          verification?: string
          verification_code?: string
        }
        Relationships: []
      }
      ams_role_progress: {
        Row: {
          current_level: number
          current_rank: number
          current_stage: number
          id: string
          role: string
          total_xp: number
          updated_at: string
          user_id: string
        }
        Insert: {
          current_level?: number
          current_rank?: number
          current_stage?: number
          id?: string
          role: string
          total_xp?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          current_level?: number
          current_rank?: number
          current_stage?: number
          id?: string
          role?: string
          total_xp?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ams_role_stages: {
        Row: {
          created_at: string
          id: string
          min_xp: number
          role: string
          stage: number
          tagline: string | null
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          min_xp?: number
          role: string
          stage: number
          tagline?: string | null
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          min_xp?: number
          role?: string
          stage?: number
          tagline?: string | null
          title?: string
        }
        Relationships: []
      }
      ams_tickets: {
        Row: {
          assignee_id: string | null
          category: string | null
          closed_at: string | null
          created_at: string
          created_by: string
          customer_id: string | null
          deleted_at: string | null
          department: string | null
          description: string | null
          expected_resolution_at: string | null
          id: string
          metadata: Json
          priority: Database["public"]["Enums"]["ams_priority"]
          product: string | null
          resolved_at: string | null
          status: Database["public"]["Enums"]["ams_status"]
          subject: string
          tags: string[]
          team: string | null
          ticket_no: string
          updated_at: string
        }
        Insert: {
          assignee_id?: string | null
          category?: string | null
          closed_at?: string | null
          created_at?: string
          created_by: string
          customer_id?: string | null
          deleted_at?: string | null
          department?: string | null
          description?: string | null
          expected_resolution_at?: string | null
          id?: string
          metadata?: Json
          priority?: Database["public"]["Enums"]["ams_priority"]
          product?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["ams_status"]
          subject: string
          tags?: string[]
          team?: string | null
          ticket_no?: string
          updated_at?: string
        }
        Update: {
          assignee_id?: string | null
          category?: string | null
          closed_at?: string | null
          created_at?: string
          created_by?: string
          customer_id?: string | null
          deleted_at?: string | null
          department?: string | null
          description?: string | null
          expected_resolution_at?: string | null
          id?: string
          metadata?: Json
          priority?: Database["public"]["Enums"]["ams_priority"]
          product?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["ams_status"]
          subject?: string
          tags?: string[]
          team?: string | null
          ticket_no?: string
          updated_at?: string
        }
        Relationships: []
      }
      ams_user_roles: {
        Row: {
          active: boolean
          assigned_at: string
          id: string
          role: string
          source: string
          source_reference: string | null
          user_id: string
        }
        Insert: {
          active?: boolean
          assigned_at?: string
          id?: string
          role: string
          source?: string
          source_reference?: string | null
          user_id: string
        }
        Update: {
          active?: boolean
          assigned_at?: string
          id?: string
          role?: string
          source?: string
          source_reference?: string | null
          user_id?: string
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          created_at: string
          event_type: string
          id: string
          payload: Json | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          payload?: Json | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          payload?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      announcements: {
        Row: {
          badge: string
          created_at: string
          ends_at: string | null
          gradient: string
          icon_name: string
          id: string
          position: number
          starts_at: string | null
          text: string
          title: string
          updated_at: string
          visible: boolean
        }
        Insert: {
          badge?: string
          created_at?: string
          ends_at?: string | null
          gradient?: string
          icon_name?: string
          id?: string
          position?: number
          starts_at?: string | null
          text?: string
          title: string
          updated_at?: string
          visible?: boolean
        }
        Update: {
          badge?: string
          created_at?: string
          ends_at?: string | null
          gradient?: string
          icon_name?: string
          id?: string
          position?: number
          starts_at?: string | null
          text?: string
          title?: string
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      api_integrations: {
        Row: {
          auth_type: string
          category: string
          created_at: string
          direction: string
          error_count: number
          id: string
          last_sync_at: string | null
          name: string
          provider_id: string | null
          status: string
          sync_frequency: string
          webhook_url: string | null
        }
        Insert: {
          auth_type?: string
          category?: string
          created_at?: string
          direction?: string
          error_count?: number
          id?: string
          last_sync_at?: string | null
          name: string
          provider_id?: string | null
          status?: string
          sync_frequency?: string
          webhook_url?: string | null
        }
        Update: {
          auth_type?: string
          category?: string
          created_at?: string
          direction?: string
          error_count?: number
          id?: string
          last_sync_at?: string | null
          name?: string
          provider_id?: string | null
          status?: string
          sync_frequency?: string
          webhook_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "api_integrations_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "ai_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      api_keys: {
        Row: {
          created_at: string
          created_by: string
          environment: string
          expires_at: string | null
          fingerprint: string
          id: string
          key_prefix: string
          label: string
          last_four: string
          last_rotated_at: string | null
          last_used_at: string | null
          provider_id: string | null
          rotation_days: number
          scopes: string[]
          secret_encrypted: string | null
          service_id: string | null
          status: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          environment?: string
          expires_at?: string | null
          fingerprint: string
          id?: string
          key_prefix?: string
          label: string
          last_four?: string
          last_rotated_at?: string | null
          last_used_at?: string | null
          provider_id?: string | null
          rotation_days?: number
          scopes?: string[]
          secret_encrypted?: string | null
          service_id?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          environment?: string
          expires_at?: string | null
          fingerprint?: string
          id?: string
          key_prefix?: string
          label?: string
          last_four?: string
          last_rotated_at?: string | null
          last_used_at?: string | null
          provider_id?: string | null
          rotation_days?: number
          scopes?: string[]
          secret_encrypted?: string | null
          service_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_keys_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "ai_providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "api_keys_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "api_services"
            referencedColumns: ["id"]
          },
        ]
      }
      api_request_logs: {
        Row: {
          error_message: string | null
          id: string
          ip: string | null
          latency_ms: number
          method: string
          occurred_at: string
          path: string
          request_id: string | null
          service_id: string | null
          status_code: number
          user_agent: string | null
        }
        Insert: {
          error_message?: string | null
          id?: string
          ip?: string | null
          latency_ms?: number
          method?: string
          occurred_at?: string
          path?: string
          request_id?: string | null
          service_id?: string | null
          status_code?: number
          user_agent?: string | null
        }
        Update: {
          error_message?: string | null
          id?: string
          ip?: string | null
          latency_ms?: number
          method?: string
          occurred_at?: string
          path?: string
          request_id?: string | null
          service_id?: string | null
          status_code?: number
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "api_request_logs_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "api_services"
            referencedColumns: ["id"]
          },
        ]
      }
      api_services: {
        Row: {
          avg_latency_ms: number
          category: string
          created_at: string
          endpoint_url: string | null
          health_status: string
          id: string
          last_checked_at: string | null
          name: string
          owner_team: string
          provider_id: string | null
          slug: string
          status: string
          type: string
          uptime_pct: number
          version: string
        }
        Insert: {
          avg_latency_ms?: number
          category?: string
          created_at?: string
          endpoint_url?: string | null
          health_status?: string
          id?: string
          last_checked_at?: string | null
          name: string
          owner_team?: string
          provider_id?: string | null
          slug: string
          status?: string
          type?: string
          uptime_pct?: number
          version?: string
        }
        Update: {
          avg_latency_ms?: number
          category?: string
          created_at?: string
          endpoint_url?: string | null
          health_status?: string
          id?: string
          last_checked_at?: string | null
          name?: string
          owner_team?: string
          provider_id?: string | null
          slug?: string
          status?: string
          type?: string
          uptime_pct?: number
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_services_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "ai_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      assist_access_modes: {
        Row: {
          description: string
          icon: string
          id: string
          is_active: boolean
          label: string
          mode_key: string
          sort_order: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          description: string
          icon?: string
          id?: string
          is_active?: boolean
          label: string
          mode_key: string
          sort_order?: number
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          description?: string
          icon?: string
          id?: string
          is_active?: boolean
          label?: string
          mode_key?: string
          sort_order?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      assist_agents: {
        Row: {
          agent_code: string
          created_at: string
          display_name: string
          id: string
          specialisation: string
          status: string
          user_id: string | null
        }
        Insert: {
          agent_code: string
          created_at?: string
          display_name: string
          id?: string
          specialisation?: string
          status?: string
          user_id?: string | null
        }
        Update: {
          agent_code?: string
          created_at?: string
          display_name?: string
          id?: string
          specialisation?: string
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
      assist_ai_suggestions: {
        Row: {
          acted_at: string | null
          acted_by: string | null
          confidence: number
          created_at: string
          id: string
          message: string
          session_id: string | null
          status: string
          suggestion_code: string
          suggestion_type: string
        }
        Insert: {
          acted_at?: string | null
          acted_by?: string | null
          confidence?: number
          created_at?: string
          id?: string
          message: string
          session_id?: string | null
          status?: string
          suggestion_code: string
          suggestion_type?: string
        }
        Update: {
          acted_at?: string | null
          acted_by?: string | null
          confidence?: number
          created_at?: string
          id?: string
          message?: string
          session_id?: string | null
          status?: string
          suggestion_code?: string
          suggestion_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "assist_ai_suggestions_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "assist_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      assist_approvals: {
        Row: {
          agent_id: string | null
          approval_code: string
          assist_type: string
          awaiting_role: string
          decided_at: string | null
          decided_by: string | null
          decision_note: string | null
          end_user_id: string | null
          expires_at: string
          id: string
          request_id: string | null
          scope: string
          session_id: string | null
          status: string
          submitted_at: string
        }
        Insert: {
          agent_id?: string | null
          approval_code: string
          assist_type?: string
          awaiting_role?: string
          decided_at?: string | null
          decided_by?: string | null
          decision_note?: string | null
          end_user_id?: string | null
          expires_at?: string
          id?: string
          request_id?: string | null
          scope?: string
          session_id?: string | null
          status?: string
          submitted_at?: string
        }
        Update: {
          agent_id?: string | null
          approval_code?: string
          assist_type?: string
          awaiting_role?: string
          decided_at?: string | null
          decided_by?: string | null
          decision_note?: string | null
          end_user_id?: string | null
          expires_at?: string
          id?: string
          request_id?: string | null
          scope?: string
          session_id?: string | null
          status?: string
          submitted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assist_approvals_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "assist_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assist_approvals_end_user_id_fkey"
            columns: ["end_user_id"]
            isOneToOne: false
            referencedRelation: "assist_end_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assist_approvals_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "assist_session_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assist_approvals_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "assist_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      assist_audit_logs: {
        Row: {
          action: string
          actor: string
          actor_role: string
          actor_user_id: string | null
          created_at: string
          id: string
          new_state: Json | null
          old_state: Json | null
          reason: string | null
          result: string
          session_code: string | null
          session_id: string | null
          severity: string
          target: string | null
          target_user_id: string | null
        }
        Insert: {
          action: string
          actor: string
          actor_role?: string
          actor_user_id?: string | null
          created_at?: string
          id?: string
          new_state?: Json | null
          old_state?: Json | null
          reason?: string | null
          result?: string
          session_code?: string | null
          session_id?: string | null
          severity?: string
          target?: string | null
          target_user_id?: string | null
        }
        Update: {
          action?: string
          actor?: string
          actor_role?: string
          actor_user_id?: string | null
          created_at?: string
          id?: string
          new_state?: Json | null
          old_state?: Json | null
          reason?: string | null
          result?: string
          session_code?: string | null
          session_id?: string | null
          severity?: string
          target?: string | null
          target_user_id?: string | null
        }
        Relationships: []
      }
      assist_chat_messages: {
        Row: {
          body: string
          created_at: string
          id: string
          is_translation: boolean
          sender: string
          sender_user_id: string | null
          session_id: string | null
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          is_translation?: boolean
          sender: string
          sender_user_id?: string | null
          session_id?: string | null
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          is_translation?: boolean
          sender?: string
          sender_user_id?: string | null
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assist_chat_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "assist_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      assist_control_state: {
        Row: {
          auto_translate: boolean
          control_mode: string
          cursor_control: boolean
          id: string
          is_paused: boolean
          keyboard_control: boolean
          microphone_enabled: boolean
          resolution_lock: boolean
          session_id: string | null
          speaker_enabled: boolean
          updated_at: string
          voice_active: boolean
          window_specific: boolean
        }
        Insert: {
          auto_translate?: boolean
          control_mode?: string
          cursor_control?: boolean
          id?: string
          is_paused?: boolean
          keyboard_control?: boolean
          microphone_enabled?: boolean
          resolution_lock?: boolean
          session_id?: string | null
          speaker_enabled?: boolean
          updated_at?: string
          voice_active?: boolean
          window_specific?: boolean
        }
        Update: {
          auto_translate?: boolean
          control_mode?: string
          cursor_control?: boolean
          id?: string
          is_paused?: boolean
          keyboard_control?: boolean
          microphone_enabled?: boolean
          resolution_lock?: boolean
          session_id?: string | null
          speaker_enabled?: boolean
          updated_at?: string
          voice_active?: boolean
          window_specific?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "assist_control_state_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: true
            referencedRelation: "assist_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      assist_emergency_stops: {
        Row: {
          created_at: string
          id: string
          reason: string
          session_code: string
          sessions_affected: number
          stop_code: string
          stop_type: string
          stopped_by: string
          stopped_by_user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          reason: string
          session_code: string
          sessions_affected?: number
          stop_code: string
          stop_type?: string
          stopped_by?: string
          stopped_by_user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          reason?: string
          session_code?: string
          sessions_affected?: number
          stop_code?: string
          stop_type?: string
          stopped_by?: string
          stopped_by_user_id?: string | null
        }
        Relationships: []
      }
      assist_end_users: {
        Row: {
          active_window: string | null
          created_at: string
          device: string
          id: string
          operating_system: string
          role: string
          user_code: string
          user_id: string | null
        }
        Insert: {
          active_window?: string | null
          created_at?: string
          device?: string
          id?: string
          operating_system?: string
          role?: string
          user_code: string
          user_id?: string | null
        }
        Update: {
          active_window?: string | null
          created_at?: string
          device?: string
          id?: string
          operating_system?: string
          role?: string
          user_code?: string
          user_id?: string | null
        }
        Relationships: []
      }
      assist_file_transfers: {
        Row: {
          accessed_at: string | null
          auto_delete: boolean
          checksum: string | null
          created_at: string
          deleted_at: string | null
          direction: string
          expires_at: string | null
          file_name: string
          id: string
          initiated_by: string | null
          one_time_access: boolean
          progress: number
          session_id: string | null
          size_bytes: number
          status: string
          storage_path: string | null
          transfer_code: string
        }
        Insert: {
          accessed_at?: string | null
          auto_delete?: boolean
          checksum?: string | null
          created_at?: string
          deleted_at?: string | null
          direction: string
          expires_at?: string | null
          file_name: string
          id?: string
          initiated_by?: string | null
          one_time_access?: boolean
          progress?: number
          session_id?: string | null
          size_bytes?: number
          status?: string
          storage_path?: string | null
          transfer_code: string
        }
        Update: {
          accessed_at?: string | null
          auto_delete?: boolean
          checksum?: string | null
          created_at?: string
          deleted_at?: string | null
          direction?: string
          expires_at?: string | null
          file_name?: string
          id?: string
          initiated_by?: string | null
          one_time_access?: boolean
          progress?: number
          session_id?: string | null
          size_bytes?: number
          status?: string
          storage_path?: string | null
          transfer_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "assist_file_transfers_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "assist_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      assist_privacy_controls: {
        Row: {
          control_key: string
          description: string
          enabled: boolean
          icon: string
          id: string
          is_critical: boolean
          label: string
          sort_order: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          control_key: string
          description: string
          enabled?: boolean
          icon?: string
          id?: string
          is_critical?: boolean
          label: string
          sort_order?: number
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          control_key?: string
          description?: string
          enabled?: boolean
          icon?: string
          id?: string
          is_critical?: boolean
          label?: string
          sort_order?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      assist_session_requests: {
        Row: {
          ai_assist_enabled: boolean
          assist_type: string
          created_at: string
          end_user_id: string | null
          id: string
          priority: string
          purpose: string
          request_code: string
          requested_by: string | null
          requested_duration_minutes: number
          requested_scope: string
          review_note: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          support_ticket_id: string | null
          target_user_id: string | null
          task_id: string | null
        }
        Insert: {
          ai_assist_enabled?: boolean
          assist_type?: string
          created_at?: string
          end_user_id?: string | null
          id?: string
          priority?: string
          purpose: string
          request_code: string
          requested_by?: string | null
          requested_duration_minutes?: number
          requested_scope?: string
          review_note?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          support_ticket_id?: string | null
          target_user_id?: string | null
          task_id?: string | null
        }
        Update: {
          ai_assist_enabled?: boolean
          assist_type?: string
          created_at?: string
          end_user_id?: string | null
          id?: string
          priority?: string
          purpose?: string
          request_code?: string
          requested_by?: string | null
          requested_duration_minutes?: number
          requested_scope?: string
          review_note?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          support_ticket_id?: string | null
          target_user_id?: string | null
          task_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assist_session_requests_end_user_id_fkey"
            columns: ["end_user_id"]
            isOneToOne: false
            referencedRelation: "assist_end_users"
            referencedColumns: ["id"]
          },
        ]
      }
      assist_session_windows: {
        Row: {
          id: string
          is_visible: boolean
          session_id: string | null
          sort_order: number
          title: string
        }
        Insert: {
          id?: string
          is_visible?: boolean
          session_id?: string | null
          sort_order?: number
          title: string
        }
        Update: {
          id?: string
          is_visible?: boolean
          session_id?: string | null
          sort_order?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "assist_session_windows_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "assist_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      assist_sessions: {
        Row: {
          access_mode: string
          actions_count: number
          agent_id: string | null
          ai_involved: boolean
          ai_score: number
          assist_type: string
          consent_at: string | null
          consent_by: string | null
          consent_granted: boolean
          consent_revoked_at: string | null
          created_at: string
          created_by: string | null
          end_reason: string | null
          end_user_id: string | null
          ended_at: string | null
          frame_rate: number
          id: string
          latency_ms: number
          operator_user_id: string | null
          permissions: string[]
          promise_id: string | null
          purpose: string | null
          resolution: string
          restrictions: string[]
          risk_level: string
          session_code: string
          started_at: string | null
          status: string
          support_ticket_id: string | null
          target_user_id: string | null
          task_id: string | null
          updated_at: string
        }
        Insert: {
          access_mode?: string
          actions_count?: number
          agent_id?: string | null
          ai_involved?: boolean
          ai_score?: number
          assist_type?: string
          consent_at?: string | null
          consent_by?: string | null
          consent_granted?: boolean
          consent_revoked_at?: string | null
          created_at?: string
          created_by?: string | null
          end_reason?: string | null
          end_user_id?: string | null
          ended_at?: string | null
          frame_rate?: number
          id?: string
          latency_ms?: number
          operator_user_id?: string | null
          permissions?: string[]
          promise_id?: string | null
          purpose?: string | null
          resolution?: string
          restrictions?: string[]
          risk_level?: string
          session_code: string
          started_at?: string | null
          status?: string
          support_ticket_id?: string | null
          target_user_id?: string | null
          task_id?: string | null
          updated_at?: string
        }
        Update: {
          access_mode?: string
          actions_count?: number
          agent_id?: string | null
          ai_involved?: boolean
          ai_score?: number
          assist_type?: string
          consent_at?: string | null
          consent_by?: string | null
          consent_granted?: boolean
          consent_revoked_at?: string | null
          created_at?: string
          created_by?: string | null
          end_reason?: string | null
          end_user_id?: string | null
          ended_at?: string | null
          frame_rate?: number
          id?: string
          latency_ms?: number
          operator_user_id?: string | null
          permissions?: string[]
          promise_id?: string | null
          purpose?: string | null
          resolution?: string
          restrictions?: string[]
          risk_level?: string
          session_code?: string
          started_at?: string | null
          status?: string
          support_ticket_id?: string | null
          target_user_id?: string | null
          task_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assist_sessions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "assist_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assist_sessions_end_user_id_fkey"
            columns: ["end_user_id"]
            isOneToOne: false
            referencedRelation: "assist_end_users"
            referencedColumns: ["id"]
          },
        ]
      }
      assist_settings: {
        Row: {
          control_type: string
          id: string
          is_locked: boolean
          label: string
          section: string
          setting_key: string
          sort_order: number
          updated_at: string
          updated_by: string | null
          value: string
        }
        Insert: {
          control_type: string
          id?: string
          is_locked?: boolean
          label: string
          section: string
          setting_key: string
          sort_order?: number
          updated_at?: string
          updated_by?: string | null
          value: string
        }
        Update: {
          control_type?: string
          id?: string
          is_locked?: boolean
          label?: string
          section?: string
          setting_key?: string
          sort_order?: number
          updated_at?: string
          updated_by?: string | null
          value?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          actor: string
          entity_id: string | null
          entity_type: string
          id: string
          ip: string | null
          metadata: Json
          occurred_at: string
          severity: string
        }
        Insert: {
          action: string
          actor?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          ip?: string | null
          metadata?: Json
          occurred_at?: string
          severity?: string
        }
        Update: {
          action?: string
          actor?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip?: string | null
          metadata?: Json
          occurred_at?: string
          severity?: string
        }
        Relationships: []
      }
      auth_qr_sessions: {
        Row: {
          approved_email: string | null
          created_at: string
          expires_at: string
          id: string
          status: string
          token: string
          user_id: string | null
        }
        Insert: {
          approved_email?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          status?: string
          token: string
          user_id?: string | null
        }
        Update: {
          approved_email?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          status?: string
          token?: string
          user_id?: string | null
        }
        Relationships: []
      }
      automation_rules: {
        Row: {
          action_config: Json
          action_type: string
          condition: Json
          created_at: string
          enabled: boolean
          id: string
          last_run_at: string | null
          name: string
          run_count: number
          trigger_type: string
        }
        Insert: {
          action_config?: Json
          action_type?: string
          condition?: Json
          created_at?: string
          enabled?: boolean
          id?: string
          last_run_at?: string | null
          name: string
          run_count?: number
          trigger_type?: string
        }
        Update: {
          action_config?: Json
          action_type?: string
          condition?: Json
          created_at?: string
          enabled?: boolean
          id?: string
          last_run_at?: string | null
          name?: string
          run_count?: number
          trigger_type?: string
        }
        Relationships: []
      }
      awards: {
        Row: {
          audit: Json
          category: string | null
          conditions: Json
          created_at: string
          created_by: string | null
          department: string | null
          description: string
          eligibility_rules: Json
          id: string
          media: Json
          name: string
          priority: number
          rarity: string
          rewards: Json
          slug: string
          status: string
          supported_modules: Json
          supported_roles: Json
          type: string
          unlock_conditions: Json
          updated_at: string
          versions: Json
          visibility: string
        }
        Insert: {
          audit?: Json
          category?: string | null
          conditions?: Json
          created_at?: string
          created_by?: string | null
          department?: string | null
          description?: string
          eligibility_rules?: Json
          id?: string
          media?: Json
          name: string
          priority?: number
          rarity?: string
          rewards?: Json
          slug: string
          status?: string
          supported_modules?: Json
          supported_roles?: Json
          type?: string
          unlock_conditions?: Json
          updated_at?: string
          versions?: Json
          visibility?: string
        }
        Update: {
          audit?: Json
          category?: string | null
          conditions?: Json
          created_at?: string
          created_by?: string | null
          department?: string | null
          description?: string
          eligibility_rules?: Json
          id?: string
          media?: Json
          name?: string
          priority?: number
          rarity?: string
          rewards?: Json
          slug?: string
          status?: string
          supported_modules?: Json
          supported_roles?: Json
          type?: string
          unlock_conditions?: Json
          updated_at?: string
          versions?: Json
          visibility?: string
        }
        Relationships: []
      }
      badge_collections: {
        Row: {
          color: string | null
          created_at: string
          created_by: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          slug: string
          status: Database["public"]["Enums"]["entity_status"]
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: string
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
        }
        Relationships: []
      }
      badges: {
        Row: {
          collection_id: string | null
          color: string | null
          conditions: Json
          created_at: string
          created_by: string | null
          description: string | null
          icon: string | null
          id: string
          image_url: string | null
          name: string
          rarity: Database["public"]["Enums"]["rarity_tier"]
          slug: string
          status: Database["public"]["Enums"]["entity_status"]
          updated_at: string
        }
        Insert: {
          collection_id?: string | null
          color?: string | null
          conditions?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          name: string
          rarity?: Database["public"]["Enums"]["rarity_tier"]
          slug: string
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
        }
        Update: {
          collection_id?: string | null
          color?: string | null
          conditions?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          name?: string
          rarity?: Database["public"]["Enums"]["rarity_tier"]
          slug?: string
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "badges_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "badge_collections"
            referencedColumns: ["id"]
          },
        ]
      }
      billing_plans: {
        Row: {
          billing_cycle: string
          created_at: string
          currency: string
          id: string
          included_requests: number
          monthly_fee: number
          name: string
          overage_per_1k: number
          provider_id: string | null
          renewal_date: string | null
          status: string
        }
        Insert: {
          billing_cycle?: string
          created_at?: string
          currency?: string
          id?: string
          included_requests?: number
          monthly_fee?: number
          name: string
          overage_per_1k?: number
          provider_id?: string | null
          renewal_date?: string | null
          status?: string
        }
        Update: {
          billing_cycle?: string
          created_at?: string
          currency?: string
          id?: string
          included_requests?: number
          monthly_fee?: number
          name?: string
          overage_per_1k?: number
          provider_id?: string | null
          renewal_date?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "billing_plans_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "ai_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      cache_entries: {
        Row: {
          cache_key: string
          cost_saved_usd: number
          created_at: string
          hits: number
          id: string
          last_hit_at: string | null
          model: string
          size_kb: number
          ttl_hours: number
        }
        Insert: {
          cache_key: string
          cost_saved_usd?: number
          created_at?: string
          hits?: number
          id?: string
          last_hit_at?: string | null
          model: string
          size_kb?: number
          ttl_hours?: number
        }
        Update: {
          cache_key?: string
          cost_saved_usd?: number
          created_at?: string
          hits?: number
          id?: string
          last_hit_at?: string | null
          model?: string
          size_kb?: number
          ttl_hours?: number
        }
        Relationships: []
      }
      campaigns: {
        Row: {
          created_at: string
          description: string | null
          ends_at: string | null
          id: string
          name: string
          rewards: Json | null
          slug: string
          starts_at: string | null
          status: Database["public"]["Enums"]["entity_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          ends_at?: string | null
          id?: string
          name: string
          rewards?: Json | null
          slug: string
          starts_at?: string | null
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          ends_at?: string | null
          id?: string
          name?: string
          rewards?: Json | null
          slug?: string
          starts_at?: string | null
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
        }
        Relationships: []
      }
      challenges: {
        Row: {
          conditions: Json
          created_at: string
          created_by: string | null
          description: string | null
          ends_at: string | null
          id: string
          name: string
          rewards: Json
          starts_at: string | null
          status: Database["public"]["Enums"]["entity_status"]
          updated_at: string
          xp_reward: number
        }
        Insert: {
          conditions?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          ends_at?: string | null
          id?: string
          name: string
          rewards?: Json
          starts_at?: string | null
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
          xp_reward?: number
        }
        Update: {
          conditions?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          ends_at?: string | null
          id?: string
          name?: string
          rewards?: Json
          starts_at?: string | null
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
          xp_reward?: number
        }
        Relationships: []
      }
      chat_conversations: {
        Row: {
          allowed_roles: string[]
          created_at: string
          created_by: string | null
          id: string
          module: string
          title: string | null
          updated_at: string
        }
        Insert: {
          allowed_roles?: string[]
          created_at?: string
          created_by?: string | null
          id?: string
          module?: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          allowed_roles?: string[]
          created_at?: string
          created_by?: string | null
          id?: string
          module?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      chat_handoffs: {
        Row: {
          assigned_to: string | null
          conversation_id: string
          created_at: string
          id: string
          reason: string | null
          requested_by: string
          resolved_at: string | null
          status: string
        }
        Insert: {
          assigned_to?: string | null
          conversation_id: string
          created_at?: string
          id?: string
          reason?: string | null
          requested_by: string
          resolved_at?: string | null
          status?: string
        }
        Update: {
          assigned_to?: string | null
          conversation_id?: string
          created_at?: string
          id?: string
          reason?: string | null
          requested_by?: string
          resolved_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_handoffs_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          body: string
          conversation_id: string
          created_at: string
          id: string
          metadata: Json
          sender_id: string | null
        }
        Insert: {
          body: string
          conversation_id: string
          created_at?: string
          id?: string
          metadata?: Json
          sender_id?: string | null
        }
        Update: {
          body?: string
          conversation_id?: string
          created_at?: string
          id?: string
          metadata?: Json
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_participants: {
        Row: {
          conversation_id: string
          joined_at: string
          role: string
          user_id: string
        }
        Insert: {
          conversation_id: string
          joined_at?: string
          role?: string
          user_id: string
        }
        Update: {
          conversation_id?: string
          joined_at?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      claims: {
        Row: {
          cost_coins: number
          cost_tokens: number
          created_at: string
          decided_at: string | null
          decided_by: string | null
          fulfilled_at: string | null
          id: string
          notes: string | null
          reward_id: string
          status: Database["public"]["Enums"]["claim_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          cost_coins?: number
          cost_tokens?: number
          created_at?: string
          decided_at?: string | null
          decided_by?: string | null
          fulfilled_at?: string | null
          id?: string
          notes?: string | null
          reward_id: string
          status?: Database["public"]["Enums"]["claim_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          cost_coins?: number
          cost_tokens?: number
          created_at?: string
          decided_at?: string | null
          decided_by?: string | null
          fulfilled_at?: string | null
          id?: string
          notes?: string | null
          reward_id?: string
          status?: Database["public"]["Enums"]["claim_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "claims_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "rewards"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_participants: {
        Row: {
          conversation_id: string
          favorite: boolean
          last_read_at: string
          muted: boolean
          role_label: string | null
          user_id: string
        }
        Insert: {
          conversation_id: string
          favorite?: boolean
          last_read_at?: string
          muted?: boolean
          role_label?: string | null
          user_id: string
        }
        Update: {
          conversation_id?: string
          favorite?: boolean
          last_read_at?: string
          muted?: boolean
          role_label?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          ai_enabled: boolean
          assigned_agent_id: string | null
          category: string | null
          created_at: string
          created_by: string
          department: string | null
          id: string
          kind: string
          last_message_at: string
          priority: string
          reference_code: string | null
          status: string
          subject: string
        }
        Insert: {
          ai_enabled?: boolean
          assigned_agent_id?: string | null
          category?: string | null
          created_at?: string
          created_by: string
          department?: string | null
          id?: string
          kind?: string
          last_message_at?: string
          priority?: string
          reference_code?: string | null
          status?: string
          subject?: string
        }
        Update: {
          ai_enabled?: boolean
          assigned_agent_id?: string | null
          category?: string | null
          created_at?: string
          created_by?: string
          department?: string | null
          id?: string
          kind?: string
          last_message_at?: string
          priority?: string
          reference_code?: string | null
          status?: string
          subject?: string
        }
        Relationships: []
      }
      cost_recommendations: {
        Row: {
          category: string
          created_at: string
          detail: string
          effort: string
          estimated_monthly_saving: number
          id: string
          service_id: string | null
          status: string
          title: string
        }
        Insert: {
          category?: string
          created_at?: string
          detail?: string
          effort?: string
          estimated_monthly_saving?: number
          id?: string
          service_id?: string | null
          status?: string
          title: string
        }
        Update: {
          category?: string
          created_at?: string
          detail?: string
          effort?: string
          estimated_monthly_saving?: number
          id?: string
          service_id?: string | null
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "cost_recommendations_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "api_services"
            referencedColumns: ["id"]
          },
        ]
      }
      data_governance_rules: {
        Row: {
          compliance_tags: string[]
          created_at: string
          data_class: string
          enabled: boolean
          encryption: string
          id: string
          masking: string
          name: string
          region: string
          retention_days: number
        }
        Insert: {
          compliance_tags?: string[]
          created_at?: string
          data_class?: string
          enabled?: boolean
          encryption?: string
          id?: string
          masking?: string
          name: string
          region?: string
          retention_days?: number
        }
        Update: {
          compliance_tags?: string[]
          created_at?: string
          data_class?: string
          enabled?: boolean
          encryption?: string
          id?: string
          masking?: string
          name?: string
          region?: string
          retention_days?: number
        }
        Relationships: []
      }
      demo_alerts: {
        Row: {
          alert_type: string
          created_at: string
          demo_id: string | null
          id: string
          is_resolved: boolean
          message: string
          resolved_at: string | null
          severity: string
        }
        Insert: {
          alert_type?: string
          created_at?: string
          demo_id?: string | null
          id?: string
          is_resolved?: boolean
          message: string
          resolved_at?: string | null
          severity?: string
        }
        Update: {
          alert_type?: string
          created_at?: string
          demo_id?: string | null
          id?: string
          is_resolved?: boolean
          message?: string
          resolved_at?: string | null
          severity?: string
        }
        Relationships: [
          {
            foreignKeyName: "demo_alerts_demo_id_fkey"
            columns: ["demo_id"]
            isOneToOne: false
            referencedRelation: "demos"
            referencedColumns: ["id"]
          },
        ]
      }
      demo_analytics: {
        Row: {
          avg_duration_seconds: number
          bounce_rate: number
          conversion_count: number
          conversion_rate: number
          created_at: string
          date: string
          demo_id: string
          device_breakdown: Json
          id: string
          region_breakdown: Json
          top_pages: Json
          total_views: number
          unique_views: number
        }
        Insert: {
          avg_duration_seconds?: number
          bounce_rate?: number
          conversion_count?: number
          conversion_rate?: number
          created_at?: string
          date?: string
          demo_id: string
          device_breakdown?: Json
          id?: string
          region_breakdown?: Json
          top_pages?: Json
          total_views?: number
          unique_views?: number
        }
        Update: {
          avg_duration_seconds?: number
          bounce_rate?: number
          conversion_count?: number
          conversion_rate?: number
          created_at?: string
          date?: string
          demo_id?: string
          device_breakdown?: Json
          id?: string
          region_breakdown?: Json
          top_pages?: Json
          total_views?: number
          unique_views?: number
        }
        Relationships: [
          {
            foreignKeyName: "demo_analytics_demo_id_fkey"
            columns: ["demo_id"]
            isOneToOne: false
            referencedRelation: "demos"
            referencedColumns: ["id"]
          },
        ]
      }
      demo_categories: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          icon: string | null
          id: string
          is_active: boolean
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          icon?: string | null
          id?: string
          is_active?: boolean
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          icon?: string | null
          id?: string
          is_active?: boolean
          name?: string
        }
        Relationships: []
      }
      demo_clicks: {
        Row: {
          browser: string | null
          city: string | null
          clicked_at: string
          converted: boolean
          country: string | null
          demo_id: string
          device_type: string | null
          id: string
          product_id: string | null
          referrer: string | null
          region: string | null
          session_duration: number | null
          user_id: string | null
        }
        Insert: {
          browser?: string | null
          city?: string | null
          clicked_at?: string
          converted?: boolean
          country?: string | null
          demo_id: string
          device_type?: string | null
          id?: string
          product_id?: string | null
          referrer?: string | null
          region?: string | null
          session_duration?: number | null
          user_id?: string | null
        }
        Update: {
          browser?: string | null
          city?: string | null
          clicked_at?: string
          converted?: boolean
          country?: string | null
          demo_id?: string
          device_type?: string | null
          id?: string
          product_id?: string | null
          referrer?: string | null
          region?: string | null
          session_duration?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "demo_clicks_demo_id_fkey"
            columns: ["demo_id"]
            isOneToOne: false
            referencedRelation: "demos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "demo_clicks_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "marketplace_products"
            referencedColumns: ["id"]
          },
        ]
      }
      demo_health: {
        Row: {
          checked_at: string
          demo_id: string
          error_message: string | null
          http_status: number | null
          id: string
          response_time: number | null
          status: Database["public"]["Enums"]["demo_status"]
        }
        Insert: {
          checked_at?: string
          demo_id: string
          error_message?: string | null
          http_status?: number | null
          id?: string
          response_time?: number | null
          status?: Database["public"]["Enums"]["demo_status"]
        }
        Update: {
          checked_at?: string
          demo_id?: string
          error_message?: string | null
          http_status?: number | null
          id?: string
          response_time?: number | null
          status?: Database["public"]["Enums"]["demo_status"]
        }
        Relationships: [
          {
            foreignKeyName: "demo_health_demo_id_fkey"
            columns: ["demo_id"]
            isOneToOne: false
            referencedRelation: "demos"
            referencedColumns: ["id"]
          },
        ]
      }
      demo_login_credentials: {
        Row: {
          created_at: string
          demo_id: string
          id: string
          is_active: boolean
          login_url: string | null
          notes: string | null
          password: string
          role_type: string
          username: string
        }
        Insert: {
          created_at?: string
          demo_id: string
          id?: string
          is_active?: boolean
          login_url?: string | null
          notes?: string | null
          password: string
          role_type?: string
          username: string
        }
        Update: {
          created_at?: string
          demo_id?: string
          id?: string
          is_active?: boolean
          login_url?: string | null
          notes?: string | null
          password?: string
          role_type?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "demo_login_credentials_demo_id_fkey"
            columns: ["demo_id"]
            isOneToOne: false
            referencedRelation: "demos"
            referencedColumns: ["id"]
          },
        ]
      }
      demo_requests: {
        Row: {
          company: string | null
          created_at: string
          demo_id: string | null
          id: string
          message: string | null
          product_id: string | null
          requester_email: string
          requester_name: string
          status: string
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          demo_id?: string | null
          id?: string
          message?: string | null
          product_id?: string | null
          requester_email: string
          requester_name: string
          status?: string
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          demo_id?: string | null
          id?: string
          message?: string | null
          product_id?: string | null
          requester_email?: string
          requester_name?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "demo_requests_demo_id_fkey"
            columns: ["demo_id"]
            isOneToOne: false
            referencedRelation: "demos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "demo_requests_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "marketplace_products"
            referencedColumns: ["id"]
          },
        ]
      }
      demo_technologies: {
        Row: {
          created_at: string
          icon: string | null
          id: string
          is_active: boolean
          name: string
          stack: Database["public"]["Enums"]["demo_tech_stack"]
        }
        Insert: {
          created_at?: string
          icon?: string | null
          id?: string
          is_active?: boolean
          name: string
          stack?: Database["public"]["Enums"]["demo_tech_stack"]
        }
        Update: {
          created_at?: string
          icon?: string | null
          id?: string
          is_active?: boolean
          name?: string
          stack?: Database["public"]["Enums"]["demo_tech_stack"]
        }
        Relationships: []
      }
      demo_url_audit_log: {
        Row: {
          action: string
          actor_email: string | null
          actor_id: string | null
          created_at: string
          demo_url_id: string | null
          id: string
          metadata: Json
        }
        Insert: {
          action: string
          actor_email?: string | null
          actor_id?: string | null
          created_at?: string
          demo_url_id?: string | null
          id?: string
          metadata?: Json
        }
        Update: {
          action?: string
          actor_email?: string | null
          actor_id?: string | null
          created_at?: string
          demo_url_id?: string | null
          id?: string
          metadata?: Json
        }
        Relationships: []
      }
      demos: {
        Row: {
          activated_at: string | null
          activated_by: string | null
          ai_category_suggestion: string | null
          ai_tech_suggestion: string | null
          backup_url: string | null
          category: string
          category_id: string | null
          created_at: string
          created_by: string | null
          demo_banner_text: string | null
          demo_type: string
          description: string | null
          disable_destructive: boolean
          disable_exports: boolean
          expiry_date: string | null
          health_check_interval: number
          health_score: number
          http_status: number | null
          id: string
          is_bulk_created: boolean
          is_trending: boolean
          last_health_check: string | null
          last_verified_at: string | null
          lifecycle_status: string
          login_url: string | null
          masked_url: string | null
          max_concurrent_logins: number
          multi_login_enabled: boolean
          normalized_url: string | null
          renewal_date: string | null
          response_time_ms: number | null
          status: Database["public"]["Enums"]["demo_status"]
          tech_stack: Database["public"]["Enums"]["demo_tech_stack"]
          technology_id: string | null
          title: string
          total_login_roles: number
          updated_at: string
          uptime_percentage: number
          url: string
          verification_status: string
          video_fallback_url: string | null
        }
        Insert: {
          activated_at?: string | null
          activated_by?: string | null
          ai_category_suggestion?: string | null
          ai_tech_suggestion?: string | null
          backup_url?: string | null
          category?: string
          category_id?: string | null
          created_at?: string
          created_by?: string | null
          demo_banner_text?: string | null
          demo_type?: string
          description?: string | null
          disable_destructive?: boolean
          disable_exports?: boolean
          expiry_date?: string | null
          health_check_interval?: number
          health_score?: number
          http_status?: number | null
          id?: string
          is_bulk_created?: boolean
          is_trending?: boolean
          last_health_check?: string | null
          last_verified_at?: string | null
          lifecycle_status?: string
          login_url?: string | null
          masked_url?: string | null
          max_concurrent_logins?: number
          multi_login_enabled?: boolean
          normalized_url?: string | null
          renewal_date?: string | null
          response_time_ms?: number | null
          status?: Database["public"]["Enums"]["demo_status"]
          tech_stack?: Database["public"]["Enums"]["demo_tech_stack"]
          technology_id?: string | null
          title: string
          total_login_roles?: number
          updated_at?: string
          uptime_percentage?: number
          url: string
          verification_status?: string
          video_fallback_url?: string | null
        }
        Update: {
          activated_at?: string | null
          activated_by?: string | null
          ai_category_suggestion?: string | null
          ai_tech_suggestion?: string | null
          backup_url?: string | null
          category?: string
          category_id?: string | null
          created_at?: string
          created_by?: string | null
          demo_banner_text?: string | null
          demo_type?: string
          description?: string | null
          disable_destructive?: boolean
          disable_exports?: boolean
          expiry_date?: string | null
          health_check_interval?: number
          health_score?: number
          http_status?: number | null
          id?: string
          is_bulk_created?: boolean
          is_trending?: boolean
          last_health_check?: string | null
          last_verified_at?: string | null
          lifecycle_status?: string
          login_url?: string | null
          masked_url?: string | null
          max_concurrent_logins?: number
          multi_login_enabled?: boolean
          normalized_url?: string | null
          renewal_date?: string | null
          response_time_ms?: number | null
          status?: Database["public"]["Enums"]["demo_status"]
          tech_stack?: Database["public"]["Enums"]["demo_tech_stack"]
          technology_id?: string | null
          title?: string
          total_login_roles?: number
          updated_at?: string
          uptime_percentage?: number
          url?: string
          verification_status?: string
          video_fallback_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "demos_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "demo_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "demos_technology_id_fkey"
            columns: ["technology_id"]
            isOneToOne: false
            referencedRelation: "demo_technologies"
            referencedColumns: ["id"]
          },
        ]
      }
      emergency_controls: {
        Row: {
          description: string | null
          engaged: boolean
          engaged_at: string | null
          engaged_by: string | null
          id: string
          key: string
          label: string
          scope: string
        }
        Insert: {
          description?: string | null
          engaged?: boolean
          engaged_at?: string | null
          engaged_by?: string | null
          id?: string
          key: string
          label: string
          scope?: string
        }
        Update: {
          description?: string | null
          engaged?: boolean
          engaged_at?: string | null
          engaged_by?: string | null
          id?: string
          key?: string
          label?: string
          scope?: string
        }
        Relationships: []
      }
      error_events: {
        Row: {
          created_at: string
          fingerprint: string
          fn_name: string | null
          id: string
          message: string
          metadata: Json
          occurred_at: string
          resolved: boolean
          route: string | null
          severity: string
          source: string
          stack: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          fingerprint: string
          fn_name?: string | null
          id?: string
          message: string
          metadata?: Json
          occurred_at?: string
          resolved?: boolean
          route?: string | null
          severity?: string
          source: string
          stack?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          fingerprint?: string
          fn_name?: string | null
          id?: string
          message?: string
          metadata?: Json
          occurred_at?: string
          resolved?: boolean
          route?: string | null
          severity?: string
          source?: string
          stack?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          description: string | null
          ends_at: string | null
          id: string
          name: string
          rewards: Json | null
          slug: string
          starts_at: string | null
          status: Database["public"]["Enums"]["entity_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          ends_at?: string | null
          id?: string
          name: string
          rewards?: Json | null
          slug: string
          starts_at?: string | null
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          ends_at?: string | null
          id?: string
          name?: string
          rewards?: Json | null
          slug?: string
          starts_at?: string | null
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
        }
        Relationships: []
      }
      extension_events: {
        Row: {
          created_at: string
          event_type: string
          extension_id: string | null
          id: string
          install_id: string | null
          latency_ms: number
          message: string | null
          metadata: Json
          occurred_at: string
          status: string
        }
        Insert: {
          created_at?: string
          event_type: string
          extension_id?: string | null
          id?: string
          install_id?: string | null
          latency_ms?: number
          message?: string | null
          metadata?: Json
          occurred_at?: string
          status?: string
        }
        Update: {
          created_at?: string
          event_type?: string
          extension_id?: string | null
          id?: string
          install_id?: string | null
          latency_ms?: number
          message?: string | null
          metadata?: Json
          occurred_at?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "extension_events_extension_id_fkey"
            columns: ["extension_id"]
            isOneToOne: false
            referencedRelation: "extensions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "extension_events_install_id_fkey"
            columns: ["install_id"]
            isOneToOne: false
            referencedRelation: "extension_installs"
            referencedColumns: ["id"]
          },
        ]
      }
      extension_installs: {
        Row: {
          config: Json
          created_at: string
          environment: string
          extension_id: string
          granted_scopes: string[]
          health: string
          id: string
          installed_by: string
          last_sync_at: string | null
          monthly_cost_usd: number
          product: string
          status: string
          updated_at: string
        }
        Insert: {
          config?: Json
          created_at?: string
          environment?: string
          extension_id: string
          granted_scopes?: string[]
          health?: string
          id?: string
          installed_by?: string
          last_sync_at?: string | null
          monthly_cost_usd?: number
          product?: string
          status?: string
          updated_at?: string
        }
        Update: {
          config?: Json
          created_at?: string
          environment?: string
          extension_id?: string
          granted_scopes?: string[]
          health?: string
          id?: string
          installed_by?: string
          last_sync_at?: string | null
          monthly_cost_usd?: number
          product?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "extension_installs_extension_id_fkey"
            columns: ["extension_id"]
            isOneToOne: false
            referencedRelation: "extensions"
            referencedColumns: ["id"]
          },
        ]
      }
      extensions: {
        Row: {
          base_url: string | null
          category: string
          created_at: string
          description: string | null
          docs_url: string | null
          id: string
          install_count: number
          is_official: boolean
          name: string
          price_usd_month: number
          rating: number
          scopes: string[]
          slug: string
          status: string
          updated_at: string
          vendor: string
          version: string
          webhook_url: string | null
        }
        Insert: {
          base_url?: string | null
          category?: string
          created_at?: string
          description?: string | null
          docs_url?: string | null
          id?: string
          install_count?: number
          is_official?: boolean
          name: string
          price_usd_month?: number
          rating?: number
          scopes?: string[]
          slug: string
          status?: string
          updated_at?: string
          vendor: string
          version?: string
          webhook_url?: string | null
        }
        Update: {
          base_url?: string | null
          category?: string
          created_at?: string
          description?: string | null
          docs_url?: string | null
          id?: string
          install_count?: number
          is_official?: boolean
          name?: string
          price_usd_month?: number
          rating?: number
          scopes?: string[]
          slug?: string
          status?: string
          updated_at?: string
          vendor?: string
          version?: string
          webhook_url?: string | null
        }
        Relationships: []
      }
      failover_events: {
        Row: {
          extra_latency_ms: number
          from_model: string
          id: string
          occurred_at: string
          reason: string
          result: string
          to_model: string
        }
        Insert: {
          extra_latency_ms?: number
          from_model: string
          id?: string
          occurred_at?: string
          reason: string
          result?: string
          to_model: string
        }
        Update: {
          extra_latency_ms?: number
          from_model?: string
          id?: string
          occurred_at?: string
          reason?: string
          result?: string
          to_model?: string
        }
        Relationships: []
      }
      feature_strip_items: {
        Row: {
          color_class: string
          created_at: string
          icon_name: string
          id: string
          label: string
          position: number
          updated_at: string
          visible: boolean
        }
        Insert: {
          color_class?: string
          created_at?: string
          icon_name?: string
          id?: string
          label: string
          position?: number
          updated_at?: string
          visible?: boolean
        }
        Update: {
          color_class?: string
          created_at?: string
          icon_name?: string
          id?: string
          label?: string
          position?: number
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      fine_tuning_jobs: {
        Row: {
          base_model: string
          completed_at: string | null
          cost_usd: number
          created_at: string
          dataset_name: string
          dataset_rows: number
          id: string
          metrics: Json
          name: string
          progress: number
          result_model_id: string | null
          started_at: string | null
          status: string
        }
        Insert: {
          base_model: string
          completed_at?: string | null
          cost_usd?: number
          created_at?: string
          dataset_name: string
          dataset_rows?: number
          id?: string
          metrics?: Json
          name: string
          progress?: number
          result_model_id?: string | null
          started_at?: string | null
          status?: string
        }
        Update: {
          base_model?: string
          completed_at?: string | null
          cost_usd?: number
          created_at?: string
          dataset_name?: string
          dataset_rows?: number
          id?: string
          metrics?: Json
          name?: string
          progress?: number
          result_model_id?: string | null
          started_at?: string | null
          status?: string
        }
        Relationships: []
      }
      home_hero_slides: {
        Row: {
          accent: string
          created_at: string
          cta_link: string
          cta_primary: string
          cta_secondary: string
          gradient: string
          highlight: string
          icon_name: string
          id: string
          kicker: string
          position: number
          published_at: string | null
          slug: string
          subtitle: string
          title: string
          unpublish_at: string | null
          updated_at: string
          visible: boolean
        }
        Insert: {
          accent: string
          created_at?: string
          cta_link?: string
          cta_primary: string
          cta_secondary: string
          gradient: string
          highlight?: string
          icon_name: string
          id?: string
          kicker: string
          position?: number
          published_at?: string | null
          slug: string
          subtitle: string
          title: string
          unpublish_at?: string | null
          updated_at?: string
          visible?: boolean
        }
        Update: {
          accent?: string
          created_at?: string
          cta_link?: string
          cta_primary?: string
          cta_secondary?: string
          gradient?: string
          highlight?: string
          icon_name?: string
          id?: string
          kicker?: string
          position?: number
          published_at?: string | null
          slug?: string
          subtitle?: string
          title?: string
          unpublish_at?: string | null
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      homepage_sections: {
        Row: {
          created_at: string
          id: string
          label: string
          position: number
          section_key: string
          updated_at: string
          visible: boolean
        }
        Insert: {
          created_at?: string
          id?: string
          label: string
          position?: number
          section_key: string
          updated_at?: string
          visible?: boolean
        }
        Update: {
          created_at?: string
          id?: string
          label?: string
          position?: number
          section_key?: string
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      incidents: {
        Row: {
          id: string
          impact: string | null
          postmortem_url: string | null
          resolved_at: string | null
          root_cause: string | null
          service_id: string | null
          severity: string
          started_at: string
          status: string
          title: string
        }
        Insert: {
          id?: string
          impact?: string | null
          postmortem_url?: string | null
          resolved_at?: string | null
          root_cause?: string | null
          service_id?: string | null
          severity?: string
          started_at?: string
          status?: string
          title: string
        }
        Update: {
          id?: string
          impact?: string | null
          postmortem_url?: string | null
          resolved_at?: string | null
          root_cause?: string | null
          service_id?: string | null
          severity?: string
          started_at?: string
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "incidents_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "api_services"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount_usd: number
          due_at: string | null
          id: string
          invoice_number: string
          issued_at: string
          paid_at: string | null
          period_end: string
          period_start: string
          provider_id: string | null
          status: string
          tax_usd: number
        }
        Insert: {
          amount_usd?: number
          due_at?: string | null
          id?: string
          invoice_number: string
          issued_at?: string
          paid_at?: string | null
          period_end: string
          period_start: string
          provider_id?: string | null
          status?: string
          tax_usd?: number
        }
        Update: {
          amount_usd?: number
          due_at?: string | null
          id?: string
          invoice_number?: string
          issued_at?: string
          paid_at?: string | null
          period_end?: string
          period_start?: string
          provider_id?: string | null
          status?: string
          tax_usd?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoices_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "ai_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      leaderboard_definitions: {
        Row: {
          created_at: string
          description: string | null
          formula: Json | null
          id: string
          metric: string
          name: string
          refresh_minutes: number
          scope: string
          scope_value: string | null
          slug: string
          status: Database["public"]["Enums"]["entity_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          formula?: Json | null
          id?: string
          metric?: string
          name: string
          refresh_minutes?: number
          scope?: string
          scope_value?: string | null
          slug: string
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          formula?: Json | null
          id?: string
          metric?: string
          name?: string
          refresh_minutes?: number
          scope?: string
          scope_value?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
        }
        Relationships: []
      }
      leaderboard_entries: {
        Row: {
          computed_at: string
          definition_id: string
          id: string
          rank: number
          score: number
          user_id: string
        }
        Insert: {
          computed_at?: string
          definition_id: string
          id?: string
          rank: number
          score?: number
          user_id: string
        }
        Update: {
          computed_at?: string
          definition_id?: string
          id?: string
          rank?: number
          score?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "leaderboard_entries_definition_id_fkey"
            columns: ["definition_id"]
            isOneToOne: false
            referencedRelation: "leaderboard_definitions"
            referencedColumns: ["id"]
          },
        ]
      }
      legal_acceptances: {
        Row: {
          accepted_at: string
          agreement_id: string
          body_sha256: string | null
          decision: string
          id: string
          ip_address: string | null
          method: string
          scrolled_to_end: boolean
          session_reference: string | null
          user_agent: string | null
          user_email: string | null
          user_id: string
          user_role: string | null
          version_id: string
          version_label: string
        }
        Insert: {
          accepted_at?: string
          agreement_id: string
          body_sha256?: string | null
          decision?: string
          id?: string
          ip_address?: string | null
          method?: string
          scrolled_to_end?: boolean
          session_reference?: string | null
          user_agent?: string | null
          user_email?: string | null
          user_id: string
          user_role?: string | null
          version_id: string
          version_label: string
        }
        Update: {
          accepted_at?: string
          agreement_id?: string
          body_sha256?: string | null
          decision?: string
          id?: string
          ip_address?: string | null
          method?: string
          scrolled_to_end?: boolean
          session_reference?: string | null
          user_agent?: string | null
          user_email?: string | null
          user_id?: string
          user_role?: string | null
          version_id?: string
          version_label?: string
        }
        Relationships: [
          {
            foreignKeyName: "legal_acceptances_agreement_id_fkey"
            columns: ["agreement_id"]
            isOneToOne: false
            referencedRelation: "legal_agreements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "legal_acceptances_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "legal_agreement_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      legal_agreement_versions: {
        Row: {
          agreement_id: string
          ai_generated: boolean
          ai_request_id: string | null
          approved_at: string | null
          approved_by: string | null
          body: string
          body_sha256: string | null
          change_summary: string | null
          created_at: string
          created_by: string | null
          id: string
          published_at: string | null
          published_by: string | null
          reason: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          superseded_at: string | null
          updated_at: string
          version: string
        }
        Insert: {
          agreement_id: string
          ai_generated?: boolean
          ai_request_id?: string | null
          approved_at?: string | null
          approved_by?: string | null
          body: string
          body_sha256?: string | null
          change_summary?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          published_at?: string | null
          published_by?: string | null
          reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          superseded_at?: string | null
          updated_at?: string
          version: string
        }
        Update: {
          agreement_id?: string
          ai_generated?: boolean
          ai_request_id?: string | null
          approved_at?: string | null
          approved_by?: string | null
          body?: string
          body_sha256?: string | null
          change_summary?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          published_at?: string | null
          published_by?: string | null
          reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          superseded_at?: string | null
          updated_at?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "legal_agreement_versions_agreement_id_fkey"
            columns: ["agreement_id"]
            isOneToOne: false
            referencedRelation: "legal_agreements"
            referencedColumns: ["id"]
          },
        ]
      }
      legal_agreements: {
        Row: {
          agreement_type: string
          applies_to_role: string | null
          country_code: string | null
          created_at: string
          created_by: string | null
          current_version_id: string | null
          gate_on_login: boolean
          id: string
          jurisdiction: string | null
          language_code: string
          language_confirmed_by: string | null
          language_detected: string | null
          name: string
          owner_user_id: string | null
          product_id: string | null
          ref_code: string
          requires_acceptance: boolean
          scope: string
          status: string
          updated_at: string
        }
        Insert: {
          agreement_type: string
          applies_to_role?: string | null
          country_code?: string | null
          created_at?: string
          created_by?: string | null
          current_version_id?: string | null
          gate_on_login?: boolean
          id?: string
          jurisdiction?: string | null
          language_code?: string
          language_confirmed_by?: string | null
          language_detected?: string | null
          name: string
          owner_user_id?: string | null
          product_id?: string | null
          ref_code: string
          requires_acceptance?: boolean
          scope?: string
          status?: string
          updated_at?: string
        }
        Update: {
          agreement_type?: string
          applies_to_role?: string | null
          country_code?: string | null
          created_at?: string
          created_by?: string | null
          current_version_id?: string | null
          gate_on_login?: boolean
          id?: string
          jurisdiction?: string | null
          language_code?: string
          language_confirmed_by?: string | null
          language_detected?: string | null
          name?: string
          owner_user_id?: string | null
          product_id?: string | null
          ref_code?: string
          requires_acceptance?: boolean
          scope?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      legal_ai_requests: {
        Row: {
          ai_type: string
          completed_at: string | null
          created_at: string
          error: string | null
          id: string
          input_reference: string | null
          jurisdiction: string | null
          latency_ms: number | null
          model: string | null
          module: string
          output: string | null
          provider: string | null
          requested_by: string | null
          review_status: string
          reviewed_at: string | null
          reviewed_by: string | null
          started_at: string
          status: string
        }
        Insert: {
          ai_type: string
          completed_at?: string | null
          created_at?: string
          error?: string | null
          id?: string
          input_reference?: string | null
          jurisdiction?: string | null
          latency_ms?: number | null
          model?: string | null
          module?: string
          output?: string | null
          provider?: string | null
          requested_by?: string | null
          review_status?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          started_at?: string
          status?: string
        }
        Update: {
          ai_type?: string
          completed_at?: string | null
          created_at?: string
          error?: string | null
          id?: string
          input_reference?: string | null
          jurisdiction?: string | null
          latency_ms?: number | null
          model?: string | null
          module?: string
          output?: string | null
          provider?: string | null
          requested_by?: string | null
          review_status?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          started_at?: string
          status?: string
        }
        Relationships: []
      }
      legal_alerts: {
        Row: {
          ai_request_id: string | null
          ai_suggestion: string
          alert_type: string
          confidence: number
          created_at: string
          decision: string | null
          decision_note: string | null
          description: string
          detected_at: string
          detected_in: string
          id: string
          ref_code: string
          reviewed_at: string | null
          reviewed_by: string | null
          severity: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          ai_request_id?: string | null
          ai_suggestion?: string
          alert_type: string
          confidence?: number
          created_at?: string
          decision?: string | null
          decision_note?: string | null
          description: string
          detected_at?: string
          detected_in: string
          id?: string
          ref_code: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          severity: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          ai_request_id?: string | null
          ai_suggestion?: string
          alert_type?: string
          confidence?: number
          created_at?: string
          decision?: string | null
          decision_note?: string | null
          description?: string
          detected_at?: string
          detected_in?: string
          id?: string
          ref_code?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          severity?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      legal_documents: {
        Row: {
          access_level: string
          checksum: string | null
          created_at: string
          doc_type: string
          encrypted: boolean
          expiry_date: string | null
          id: string
          name: string
          ref_code: string
          size_bytes: number
          size_label: string
          storage_path: string | null
          updated_at: string
          uploaded_at: string
          uploaded_by: string
          uploaded_by_user_id: string | null
        }
        Insert: {
          access_level?: string
          checksum?: string | null
          created_at?: string
          doc_type: string
          encrypted?: boolean
          expiry_date?: string | null
          id?: string
          name: string
          ref_code: string
          size_bytes?: number
          size_label?: string
          storage_path?: string | null
          updated_at?: string
          uploaded_at?: string
          uploaded_by?: string
          uploaded_by_user_id?: string | null
        }
        Update: {
          access_level?: string
          checksum?: string | null
          created_at?: string
          doc_type?: string
          encrypted?: boolean
          expiry_date?: string | null
          id?: string
          name?: string
          ref_code?: string
          size_bytes?: number
          size_label?: string
          storage_path?: string | null
          updated_at?: string
          uploaded_at?: string
          uploaded_by?: string
          uploaded_by_user_id?: string | null
        }
        Relationships: []
      }
      legal_jurisdictions: {
        Row: {
          country_code: string
          country_name: string
          created_at: string
          default_language: string
          electronic_acceptance_recognised: boolean | null
          id: string
          notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          source_reference: string | null
          verified: boolean
        }
        Insert: {
          country_code: string
          country_name: string
          created_at?: string
          default_language?: string
          electronic_acceptance_recognised?: boolean | null
          id?: string
          notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          source_reference?: string | null
          verified?: boolean
        }
        Update: {
          country_code?: string
          country_name?: string
          created_at?: string
          default_language?: string
          electronic_acceptance_recognised?: boolean | null
          id?: string
          notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          source_reference?: string | null
          verified?: boolean
        }
        Relationships: []
      }
      legal_logs: {
        Row: {
          action: string
          actor: string
          actor_role: string
          actor_user_id: string | null
          created_at: string
          entity_id: string | null
          entity_type: string | null
          id: string
          new_state: Json | null
          old_state: Json | null
          reason: string | null
          ref_code: string | null
          result: string
          severity: string
        }
        Insert: {
          action: string
          actor?: string
          actor_role?: string
          actor_user_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          new_state?: Json | null
          old_state?: Json | null
          reason?: string | null
          ref_code?: string | null
          result?: string
          severity?: string
        }
        Update: {
          action?: string
          actor?: string
          actor_role?: string
          actor_user_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          new_state?: Json | null
          old_state?: Json | null
          reason?: string | null
          ref_code?: string | null
          result?: string
          severity?: string
        }
        Relationships: []
      }
      legal_misuse_alerts: {
        Row: {
          asset_name: string
          asset_ref: string
          created_at: string
          description: string | null
          detected_in: string
          evidence: string[]
          id: string
          ref_code: string
          reviewed_at: string | null
          reviewed_by: string | null
          severity: string
          status: string
          updated_at: string
        }
        Insert: {
          asset_name: string
          asset_ref: string
          created_at?: string
          description?: string | null
          detected_in: string
          evidence?: string[]
          id?: string
          ref_code: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          severity: string
          status?: string
          updated_at?: string
        }
        Update: {
          asset_name?: string
          asset_ref?: string
          created_at?: string
          description?: string | null
          detected_in?: string
          evidence?: string[]
          id?: string
          ref_code?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          severity?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      legal_policies: {
        Row: {
          compliance_assessed_at: string | null
          compliance_assessed_by: string | null
          compliance_score: number
          compliance_source: string
          content: string | null
          created_at: string
          created_by: string | null
          effective_from: string | null
          id: string
          last_updated: string
          name: string
          owner_user_id: string | null
          policy_type: string
          ref_code: string
          review_due: string | null
          status: string
          updated_at: string
          updated_by: string
          version: string
        }
        Insert: {
          compliance_assessed_at?: string | null
          compliance_assessed_by?: string | null
          compliance_score?: number
          compliance_source?: string
          content?: string | null
          created_at?: string
          created_by?: string | null
          effective_from?: string | null
          id?: string
          last_updated?: string
          name: string
          owner_user_id?: string | null
          policy_type: string
          ref_code: string
          review_due?: string | null
          status?: string
          updated_at?: string
          updated_by: string
          version: string
        }
        Update: {
          compliance_assessed_at?: string | null
          compliance_assessed_by?: string | null
          compliance_score?: number
          compliance_source?: string
          content?: string | null
          created_at?: string
          created_by?: string | null
          effective_from?: string | null
          id?: string
          last_updated?: string
          name?: string
          owner_user_id?: string | null
          policy_type?: string
          ref_code?: string
          review_due?: string | null
          status?: string
          updated_at?: string
          updated_by?: string
          version?: string
        }
        Relationships: []
      }
      legal_product_bindings: {
        Row: {
          acceptance_required: boolean
          agreement_id: string | null
          country_code: string | null
          created_at: string
          created_by: string | null
          id: string
          product_id: string | null
          product_name: string | null
          status: string
          updated_at: string
          user_type: string | null
          version_id: string | null
        }
        Insert: {
          acceptance_required?: boolean
          agreement_id?: string | null
          country_code?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          product_id?: string | null
          product_name?: string | null
          status?: string
          updated_at?: string
          user_type?: string | null
          version_id?: string | null
        }
        Update: {
          acceptance_required?: boolean
          agreement_id?: string | null
          country_code?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          product_id?: string | null
          product_name?: string | null
          status?: string
          updated_at?: string
          user_type?: string | null
          version_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "legal_product_bindings_agreement_id_fkey"
            columns: ["agreement_id"]
            isOneToOne: false
            referencedRelation: "legal_agreements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "legal_product_bindings_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "legal_agreement_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      legal_records: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          details: Json
          id: string
          name: string
          position: number
          record_type: string | null
          ref_code: string | null
          status: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          created_by?: string | null
          details?: Json
          id?: string
          name: string
          position?: number
          record_type?: string | null
          ref_code?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          details?: Json
          id?: string
          name?: string
          position?: number
          record_type?: string | null
          ref_code?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      legal_regulations: {
        Row: {
          applies_to: string | null
          code: string
          country_code: string | null
          created_at: string
          evidence_excerpt: string | null
          id: string
          name: string
          notes: string | null
          published_on: string | null
          relevant_section: string | null
          retrieved_on: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          source_reference: string | null
          source_url: string | null
          status: string
          updated_at: string
          verified: boolean
        }
        Insert: {
          applies_to?: string | null
          code: string
          country_code?: string | null
          created_at?: string
          evidence_excerpt?: string | null
          id?: string
          name: string
          notes?: string | null
          published_on?: string | null
          relevant_section?: string | null
          retrieved_on?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          source_reference?: string | null
          source_url?: string | null
          status?: string
          updated_at?: string
          verified?: boolean
        }
        Update: {
          applies_to?: string | null
          code?: string
          country_code?: string | null
          created_at?: string
          evidence_excerpt?: string | null
          id?: string
          name?: string
          notes?: string | null
          published_on?: string | null
          relevant_section?: string | null
          retrieved_on?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          source_reference?: string | null
          source_url?: string | null
          status?: string
          updated_at?: string
          verified?: boolean
        }
        Relationships: []
      }
      legal_trademark_assets: {
        Row: {
          asset_type: string
          created_at: string
          expiry_date: string
          id: string
          jurisdiction: string | null
          name: string
          owner_name: string | null
          ref_code: string
          registration_checked_at: string | null
          registration_checked_by: string | null
          registration_number: string
          registration_source: string | null
          registration_verified: boolean
          status: string
          updated_at: string
          violations: number
        }
        Insert: {
          asset_type: string
          created_at?: string
          expiry_date?: string
          id?: string
          jurisdiction?: string | null
          name: string
          owner_name?: string | null
          ref_code: string
          registration_checked_at?: string | null
          registration_checked_by?: string | null
          registration_number: string
          registration_source?: string | null
          registration_verified?: boolean
          status?: string
          updated_at?: string
          violations?: number
        }
        Update: {
          asset_type?: string
          created_at?: string
          expiry_date?: string
          id?: string
          jurisdiction?: string | null
          name?: string
          owner_name?: string | null
          ref_code?: string
          registration_checked_at?: string | null
          registration_checked_by?: string | null
          registration_number?: string
          registration_source?: string | null
          registration_verified?: boolean
          status?: string
          updated_at?: string
          violations?: number
        }
        Relationships: []
      }
      legal_violations: {
        Row: {
          action_notes: string | null
          assigned_to: string | null
          created_at: string
          description: string
          detected_at: string
          evidence: string[]
          id: string
          previous_violations: number
          ref_code: string
          resolved_at: string | null
          resolved_by: string | null
          severity: string
          status: string
          updated_at: string
          violation_type: string
          violator_id: string
          violator_type: string
          violator_user_id: string | null
        }
        Insert: {
          action_notes?: string | null
          assigned_to?: string | null
          created_at?: string
          description: string
          detected_at?: string
          evidence?: string[]
          id?: string
          previous_violations?: number
          ref_code: string
          resolved_at?: string | null
          resolved_by?: string | null
          severity: string
          status?: string
          updated_at?: string
          violation_type: string
          violator_id: string
          violator_type: string
          violator_user_id?: string | null
        }
        Update: {
          action_notes?: string | null
          assigned_to?: string | null
          created_at?: string
          description?: string
          detected_at?: string
          evidence?: string[]
          id?: string
          previous_violations?: number
          ref_code?: string
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string
          status?: string
          updated_at?: string
          violation_type?: string
          violator_id?: string
          violator_type?: string
          violator_user_id?: string | null
        }
        Relationships: []
      }
      levels: {
        Row: {
          color: string | null
          created_at: string
          icon: string | null
          id: string
          level_number: number
          name: string
          rewards: Json
          status: Database["public"]["Enums"]["entity_status"]
          updated_at: string
          xp_required: number
        }
        Insert: {
          color?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          level_number: number
          name: string
          rewards?: Json
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
          xp_required: number
        }
        Update: {
          color?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          level_number?: number
          name?: string
          rewards?: Json
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
          xp_required?: number
        }
        Relationships: []
      }
      license_keys: {
        Row: {
          created_at: string
          email: string | null
          expires_at: string | null
          id: string
          last_used_at: string | null
          license_key: string
          plan: string | null
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          expires_at?: string | null
          id?: string
          last_used_at?: string | null
          license_key: string
          plan?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          expires_at?: string | null
          id?: string
          last_used_at?: string | null
          license_key?: string
          plan?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      marketplace_card_fields: {
        Row: {
          data_column: string | null
          enabled: boolean
          hint: string | null
          id: string
          key: string
          kind: string
          label: string
          position: number
          priority: number
          requires: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          data_column?: string | null
          enabled?: boolean
          hint?: string | null
          id?: string
          key: string
          kind: string
          label: string
          position: number
          priority?: number
          requires?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          data_column?: string | null
          enabled?: boolean
          hint?: string | null
          id?: string
          key?: string
          kind?: string
          label?: string
          position?: number
          priority?: number
          requires?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      marketplace_categories: {
        Row: {
          created_at: string
          icon: string | null
          id: string
          image_key: string | null
          is_featured: boolean
          is_hidden: boolean
          name: string
          seo: Json
          slug: string
          sort_order: number
          tone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          icon?: string | null
          id?: string
          image_key?: string | null
          is_featured?: boolean
          is_hidden?: boolean
          name: string
          seo?: Json
          slug: string
          sort_order?: number
          tone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          icon?: string | null
          id?: string
          image_key?: string | null
          is_featured?: boolean
          is_hidden?: boolean
          name?: string
          seo?: Json
          slug?: string
          sort_order?: number
          tone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      marketplace_filter_groups: {
        Row: {
          combine: string
          enabled: boolean
          id: string
          key: string
          label: string
          position: number
          select_mode: string
          source: string
          updated_at: string
          updated_by: string | null
          visible_desktop: boolean
          visible_mobile: boolean
        }
        Insert: {
          combine?: string
          enabled?: boolean
          id?: string
          key: string
          label: string
          position: number
          select_mode?: string
          source: string
          updated_at?: string
          updated_by?: string | null
          visible_desktop?: boolean
          visible_mobile?: boolean
        }
        Update: {
          combine?: string
          enabled?: boolean
          id?: string
          key?: string
          label?: string
          position?: number
          select_mode?: string
          source?: string
          updated_at?: string
          updated_by?: string | null
          visible_desktop?: boolean
          visible_mobile?: boolean
        }
        Relationships: []
      }
      marketplace_homepage_sections: {
        Row: {
          config: Json
          created_at: string
          enabled: boolean
          id: string
          key: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          config?: Json
          created_at?: string
          enabled?: boolean
          id?: string
          key: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          config?: Json
          created_at?: string
          enabled?: boolean
          id?: string
          key?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      marketplace_products: {
        Row: {
          badge: string | null
          category_id: string | null
          created_at: string
          downloads: number
          downloads_label: string | null
          icon: string | null
          id: string
          industry_label: string | null
          is_ai: boolean
          is_best_seller: boolean
          is_featured: boolean
          is_new_release: boolean
          is_trending: boolean
          name: string
          price_label: string
          price_period: string | null
          publish_at: string | null
          rating: number
          slug: string
          sort_order: number
          unpublish_at: string | null
          updated_at: string
          visible: boolean
        }
        Insert: {
          badge?: string | null
          category_id?: string | null
          created_at?: string
          downloads?: number
          downloads_label?: string | null
          icon?: string | null
          id?: string
          industry_label?: string | null
          is_ai?: boolean
          is_best_seller?: boolean
          is_featured?: boolean
          is_new_release?: boolean
          is_trending?: boolean
          name: string
          price_label?: string
          price_period?: string | null
          publish_at?: string | null
          rating?: number
          slug: string
          sort_order?: number
          unpublish_at?: string | null
          updated_at?: string
          visible?: boolean
        }
        Update: {
          badge?: string | null
          category_id?: string | null
          created_at?: string
          downloads?: number
          downloads_label?: string | null
          icon?: string | null
          id?: string
          industry_label?: string | null
          is_ai?: boolean
          is_best_seller?: boolean
          is_featured?: boolean
          is_new_release?: boolean
          is_trending?: boolean
          name?: string
          price_label?: string
          price_period?: string | null
          publish_at?: string | null
          rating?: number
          slug?: string
          sort_order?: number
          unpublish_at?: string | null
          updated_at?: string
          visible?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "marketplace_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_topbar_modules: {
        Row: {
          category: string
          component: string | null
          config: Json
          created_at: string
          created_by: string | null
          description: string | null
          desktop_enabled: boolean
          featured: boolean
          icon: string | null
          id: string
          mobile_enabled: boolean
          module_key: string
          name: string
          sort_order: number
          status: string
          sticky_enabled: boolean
          tablet_enabled: boolean
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          category?: string
          component?: string | null
          config?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          desktop_enabled?: boolean
          featured?: boolean
          icon?: string | null
          id?: string
          mobile_enabled?: boolean
          module_key: string
          name: string
          sort_order?: number
          status?: string
          sticky_enabled?: boolean
          tablet_enabled?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          category?: string
          component?: string | null
          config?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          desktop_enabled?: boolean
          featured?: boolean
          icon?: string | null
          id?: string
          mobile_enabled?: boolean
          module_key?: string
          name?: string
          sort_order?: number
          status?: string
          sticky_enabled?: boolean
          tablet_enabled?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      marketplace_translations: {
        Row: {
          created_at: string
          id: string
          locale: string
          model: string | null
          provider: string | null
          source_hash: string
          source_text: string
          translated_text: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          locale: string
          model?: string | null
          provider?: string | null
          source_hash: string
          source_text: string
          translated_text: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          locale?: string
          model?: string | null
          provider?: string | null
          source_hash?: string
          source_text?: string
          translated_text?: string
          updated_at?: string
        }
        Relationships: []
      }
      marketplace_vendors: {
        Row: {
          country: string | null
          created_at: string
          id: string
          name: string
          product_count: number
          rating: number
          slug: string
          updated_at: string
          verified: boolean
          visible: boolean
        }
        Insert: {
          country?: string | null
          created_at?: string
          id?: string
          name: string
          product_count?: number
          rating?: number
          slug: string
          updated_at?: string
          verified?: boolean
          visible?: boolean
        }
        Update: {
          country?: string | null
          created_at?: string
          id?: string
          name?: string
          product_count?: number
          rating?: number
          slug?: string
          updated_at?: string
          verified?: boolean
          visible?: boolean
        }
        Relationships: []
      }
      message_attachments: {
        Row: {
          conversation_id: string
          created_at: string
          duration_seconds: number | null
          file_name: string
          id: string
          media_kind: string
          message_id: string
          mime_type: string
          size_bytes: number
          storage_path: string
        }
        Insert: {
          conversation_id: string
          created_at?: string
          duration_seconds?: number | null
          file_name: string
          id?: string
          media_kind?: string
          message_id: string
          mime_type: string
          size_bytes?: number
          storage_path: string
        }
        Update: {
          conversation_id?: string
          created_at?: string
          duration_seconds?: number | null
          file_name?: string
          id?: string
          media_kind?: string
          message_id?: string
          mime_type?: string
          size_bytes?: number
          storage_path?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_attachments_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_attachments_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      message_bookmarks: {
        Row: {
          created_at: string
          message_id: string
          pinned: boolean
          user_id: string
        }
        Insert: {
          created_at?: string
          message_id: string
          pinned?: boolean
          user_id: string
        }
        Update: {
          created_at?: string
          message_id?: string
          pinned?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_bookmarks_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      message_mentions: {
        Row: {
          message_id: string
          user_id: string
        }
        Insert: {
          message_id: string
          user_id: string
        }
        Update: {
          message_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_mentions_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      message_reactions: {
        Row: {
          created_at: string
          emoji: string
          message_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          emoji: string
          message_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          emoji?: string
          message_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_reactions_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      message_receipts: {
        Row: {
          delivered_at: string
          message_id: string
          read_at: string | null
          user_id: string
        }
        Insert: {
          delivered_at?: string
          message_id: string
          read_at?: string | null
          user_id: string
        }
        Update: {
          delivered_at?: string
          message_id?: string
          read_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_receipts_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          body: string
          client_ref: string | null
          conversation_id: string
          created_at: string
          id: string
          kind: string
          parent_id: string | null
          sender_id: string
        }
        Insert: {
          body?: string
          client_ref?: string | null
          conversation_id: string
          created_at?: string
          id?: string
          kind?: string
          parent_id?: string | null
          sender_id: string
        }
        Update: {
          body?: string
          client_ref?: string | null
          conversation_id?: string
          created_at?: string
          id?: string
          kind?: string
          parent_id?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      missions: {
        Row: {
          cadence: Database["public"]["Enums"]["mission_cadence"]
          conditions: Json
          created_at: string
          created_by: string | null
          description: string | null
          ends_at: string | null
          id: string
          name: string
          rewards: Json
          season_id: string | null
          starts_at: string | null
          status: Database["public"]["Enums"]["entity_status"]
          updated_at: string
          xp_reward: number
        }
        Insert: {
          cadence?: Database["public"]["Enums"]["mission_cadence"]
          conditions?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          ends_at?: string | null
          id?: string
          name: string
          rewards?: Json
          season_id?: string | null
          starts_at?: string | null
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
          xp_reward?: number
        }
        Update: {
          cadence?: Database["public"]["Enums"]["mission_cadence"]
          conditions?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          ends_at?: string | null
          id?: string
          name?: string
          rewards?: Json
          season_id?: string | null
          starts_at?: string | null
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
          xp_reward?: number
        }
        Relationships: [
          {
            foreignKeyName: "missions_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
        ]
      }
      model_evaluations: {
        Row: {
          baseline: number
          evaluated_at: string
          id: string
          metric: string
          model_id: string | null
          notes: string | null
          score: number
          status: string
          suite: string
        }
        Insert: {
          baseline?: number
          evaluated_at?: string
          id?: string
          metric: string
          model_id?: string | null
          notes?: string | null
          score?: number
          status?: string
          suite: string
        }
        Update: {
          baseline?: number
          evaluated_at?: string
          id?: string
          metric?: string
          model_id?: string | null
          notes?: string | null
          score?: number
          status?: string
          suite?: string
        }
        Relationships: [
          {
            foreignKeyName: "model_evaluations_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "ai_models"
            referencedColumns: ["id"]
          },
        ]
      }
      model_versions: {
        Row: {
          deprecate_at: string | null
          id: string
          model_id: string | null
          notes: string | null
          released_at: string | null
          retire_at: string | null
          stage: string
          version: string
        }
        Insert: {
          deprecate_at?: string | null
          id?: string
          model_id?: string | null
          notes?: string | null
          released_at?: string | null
          retire_at?: string | null
          stage?: string
          version: string
        }
        Update: {
          deprecate_at?: string | null
          id?: string
          model_id?: string | null
          notes?: string | null
          released_at?: string | null
          retire_at?: string | null
          stage?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "model_versions_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "ai_models"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_rules: {
        Row: {
          conditions: Json | null
          created_at: string
          id: string
          name: string
          status: Database["public"]["Enums"]["entity_status"]
          template_id: string | null
          trigger: string
          updated_at: string
        }
        Insert: {
          conditions?: Json | null
          created_at?: string
          id?: string
          name: string
          status?: Database["public"]["Enums"]["entity_status"]
          template_id?: string | null
          trigger: string
          updated_at?: string
        }
        Update: {
          conditions?: Json | null
          created_at?: string
          id?: string
          name?: string
          status?: Database["public"]["Enums"]["entity_status"]
          template_id?: string | null
          trigger?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_rules_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "notification_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_templates: {
        Row: {
          body_template: string
          channel: string
          created_at: string
          id: string
          key: string
          status: Database["public"]["Enums"]["entity_status"]
          title_template: string
          updated_at: string
        }
        Insert: {
          body_template: string
          channel?: string
          created_at?: string
          id?: string
          key: string
          status?: Database["public"]["Enums"]["entity_status"]
          title_template: string
          updated_at?: string
        }
        Update: {
          body_template?: string
          channel?: string
          created_at?: string
          id?: string
          key?: string
          status?: Database["public"]["Enums"]["entity_status"]
          title_template?: string
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          data: Json | null
          id: string
          kind: string
          read_at: string | null
          title: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          data?: Json | null
          id?: string
          kind?: string
          read_at?: string | null
          title: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          data?: Json | null
          id?: string
          kind?: string
          read_at?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      on_device_models: {
        Row: {
          accuracy: number
          created_at: string
          downloads: number
          framework: string
          id: string
          name: string
          platforms: string[]
          size_mb: number
          status: string
          version: string
        }
        Insert: {
          accuracy?: number
          created_at?: string
          downloads?: number
          framework?: string
          id?: string
          name: string
          platforms?: string[]
          size_mb?: number
          status?: string
          version?: string
        }
        Update: {
          accuracy?: number
          created_at?: string
          downloads?: number
          framework?: string
          id?: string
          name?: string
          platforms?: string[]
          size_mb?: number
          status?: string
          version?: string
        }
        Relationships: []
      }
      product_apis: {
        Row: {
          created_at: string
          enabled: boolean
          id: string
          notes: string | null
          plan: string
          product: string
          quota_monthly: number
          service_id: string | null
          used_this_month: number
        }
        Insert: {
          created_at?: string
          enabled?: boolean
          id?: string
          notes?: string | null
          plan?: string
          product: string
          quota_monthly?: number
          service_id?: string | null
          used_this_month?: number
        }
        Update: {
          created_at?: string
          enabled?: boolean
          id?: string
          notes?: string | null
          plan?: string
          product?: string
          quota_monthly?: number
          service_id?: string | null
          used_this_month?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_apis_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "api_services"
            referencedColumns: ["id"]
          },
        ]
      }
      product_demo_mappings: {
        Row: {
          demo_id: string
          id: string
          is_active: boolean
          is_primary: boolean
          linked_at: string
          linked_by: string | null
          product_id: string
        }
        Insert: {
          demo_id: string
          id?: string
          is_active?: boolean
          is_primary?: boolean
          linked_at?: string
          linked_by?: string | null
          product_id: string
        }
        Update: {
          demo_id?: string
          id?: string
          is_active?: boolean
          is_primary?: boolean
          linked_at?: string
          linked_by?: string | null
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_demo_mappings_demo_id_fkey"
            columns: ["demo_id"]
            isOneToOne: false
            referencedRelation: "demos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_demo_mappings_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "marketplace_products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_demo_urls: {
        Row: {
          created_at: string
          demo_name: string
          description: string | null
          environment: string
          id: string
          last_checked_at: string | null
          last_http_status: number | null
          last_response_ms: number | null
          last_result: string
          password: string | null
          product_id: string | null
          role_name: string
          sort_order: number
          ssl_valid: boolean | null
          status: string
          updated_at: string
          url: string
          username: string | null
        }
        Insert: {
          created_at?: string
          demo_name: string
          description?: string | null
          environment?: string
          id?: string
          last_checked_at?: string | null
          last_http_status?: number | null
          last_response_ms?: number | null
          last_result?: string
          password?: string | null
          product_id?: string | null
          role_name?: string
          sort_order?: number
          ssl_valid?: boolean | null
          status?: string
          updated_at?: string
          url: string
          username?: string | null
        }
        Update: {
          created_at?: string
          demo_name?: string
          description?: string | null
          environment?: string
          id?: string
          last_checked_at?: string | null
          last_http_status?: number | null
          last_response_ms?: number | null
          last_result?: string
          password?: string | null
          product_id?: string | null
          role_name?: string
          sort_order?: number
          ssl_valid?: boolean | null
          status?: string
          updated_at?: string
          url?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_demo_urls_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "marketplace_products"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_path: string | null
          created_at: string
          display_name: string | null
          email: string | null
          full_name: string | null
          handle: string | null
          id: string
          job_title: string | null
          last_seen_at: string
          phone: string | null
          presence: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_path?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          full_name?: string | null
          handle?: string | null
          id: string
          job_title?: string | null
          last_seen_at?: string
          phone?: string | null
          presence?: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_path?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          full_name?: string | null
          handle?: string | null
          id?: string
          job_title?: string | null
          last_seen_at?: string
          phone?: string | null
          presence?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      prompt_versions: {
        Row: {
          content: string
          created_at: string
          created_by: string
          id: string
          is_active: boolean
          notes: string | null
          prompt_id: string | null
          version: number
        }
        Insert: {
          content: string
          created_at?: string
          created_by?: string
          id?: string
          is_active?: boolean
          notes?: string | null
          prompt_id?: string | null
          version: number
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string
          id?: string
          is_active?: boolean
          notes?: string | null
          prompt_id?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "prompt_versions_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "prompts"
            referencedColumns: ["id"]
          },
        ]
      }
      prompts: {
        Row: {
          category: string
          current_version: number
          description: string | null
          id: string
          name: string
          owner: string
          slug: string
          status: string
          updated_at: string
        }
        Insert: {
          category?: string
          current_version?: number
          description?: string | null
          id?: string
          name: string
          owner?: string
          slug: string
          status?: string
          updated_at?: string
        }
        Update: {
          category?: string
          current_version?: number
          description?: string | null
          id?: string
          name?: string
          owner?: string
          slug?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      quests: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          name: string
          rewards: Json
          status: Database["public"]["Enums"]["entity_status"]
          steps: Json
          steps_meta: Json
          updated_at: string
          xp_reward: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          rewards?: Json
          status?: Database["public"]["Enums"]["entity_status"]
          steps?: Json
          steps_meta?: Json
          updated_at?: string
          xp_reward?: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          rewards?: Json
          status?: Database["public"]["Enums"]["entity_status"]
          steps?: Json
          steps_meta?: Json
          updated_at?: string
          xp_reward?: number
        }
        Relationships: []
      }
      ranks: {
        Row: {
          benefits: Json
          color: string | null
          created_at: string
          icon: string | null
          id: string
          min_xp: number
          name: string
          rank_number: number
          status: Database["public"]["Enums"]["entity_status"]
          updated_at: string
        }
        Insert: {
          benefits?: Json
          color?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          min_xp: number
          name: string
          rank_number: number
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
        }
        Update: {
          benefits?: Json
          color?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          min_xp?: number
          name?: string
          rank_number?: number
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          action_on_exceed: string
          burst: number
          created_at: string
          current_usage: number
          enabled: boolean
          id: string
          max_requests: number
          scope: string
          service_id: string | null
          window_seconds: number
        }
        Insert: {
          action_on_exceed?: string
          burst?: number
          created_at?: string
          current_usage?: number
          enabled?: boolean
          id?: string
          max_requests?: number
          scope?: string
          service_id?: string | null
          window_seconds?: number
        }
        Update: {
          action_on_exceed?: string
          burst?: number
          created_at?: string
          current_usage?: number
          enabled?: boolean
          id?: string
          max_requests?: number
          scope?: string
          service_id?: string | null
          window_seconds?: number
        }
        Relationships: [
          {
            foreignKeyName: "rate_limits_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "api_services"
            referencedColumns: ["id"]
          },
        ]
      }
      reward_wallets: {
        Row: {
          balance: number
          kind: Database["public"]["Enums"]["wallet_kind"]
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          kind: Database["public"]["Enums"]["wallet_kind"]
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          kind?: Database["public"]["Enums"]["wallet_kind"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      rewards: {
        Row: {
          cost_coins: number
          cost_tokens: number
          created_at: string
          created_by: string | null
          description: string | null
          eligibility: Json
          icon: string | null
          id: string
          image_url: string | null
          name: string
          rarity: Database["public"]["Enums"]["rarity_tier"]
          slug: string
          status: Database["public"]["Enums"]["entity_status"]
          stock: number | null
          updated_at: string
        }
        Insert: {
          cost_coins?: number
          cost_tokens?: number
          created_at?: string
          created_by?: string | null
          description?: string | null
          eligibility?: Json
          icon?: string | null
          id?: string
          image_url?: string | null
          name: string
          rarity?: Database["public"]["Enums"]["rarity_tier"]
          slug: string
          status?: Database["public"]["Enums"]["entity_status"]
          stock?: number | null
          updated_at?: string
        }
        Update: {
          cost_coins?: number
          cost_tokens?: number
          created_at?: string
          created_by?: string | null
          description?: string | null
          eligibility?: Json
          icon?: string | null
          id?: string
          image_url?: string | null
          name?: string
          rarity?: Database["public"]["Enums"]["rarity_tier"]
          slug?: string
          status?: Database["public"]["Enums"]["entity_status"]
          stock?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      role_api_permissions: {
        Row: {
          can_admin: boolean
          can_read: boolean
          can_write: boolean
          created_at: string
          id: string
          rate_limit_per_min: number
          role_name: string
          service_id: string | null
        }
        Insert: {
          can_admin?: boolean
          can_read?: boolean
          can_write?: boolean
          created_at?: string
          id?: string
          rate_limit_per_min?: number
          role_name: string
          service_id?: string | null
        }
        Update: {
          can_admin?: boolean
          can_read?: boolean
          can_write?: boolean
          created_at?: string
          id?: string
          rate_limit_per_min?: number
          role_name?: string
          service_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "role_api_permissions_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "api_services"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          created_at: string
          id: string
          permission: string
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          created_at?: string
          id?: string
          permission: string
          role: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          created_at?: string
          id?: string
          permission?: string
          role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: []
      }
      router_rules: {
        Row: {
          active: boolean
          created_at: string
          fallback_model: string | null
          id: string
          matches_30d: number
          name: string
          pattern: string
          priority: string
          sort_order: number
          target_model: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          fallback_model?: string | null
          id?: string
          matches_30d?: number
          name: string
          pattern: string
          priority?: string
          sort_order?: number
          target_model: string
        }
        Update: {
          active?: boolean
          created_at?: string
          fallback_model?: string | null
          id?: string
          matches_30d?: number
          name?: string
          pattern?: string
          priority?: string
          sort_order?: number
          target_model?: string
        }
        Relationships: []
      }
      rt_apps: {
        Row: {
          allowed_origins: string[]
          app_id: string
          app_key: string
          client_events: boolean
          created_at: string
          environment: string
          id: string
          name: string
          node_id: string | null
          owner_id: string
          plan: string
          region: string | null
          require_tls: boolean
          secret_hash: string
          secret_last4: string
          status: string
          updated_at: string
        }
        Insert: {
          allowed_origins?: string[]
          app_id: string
          app_key: string
          client_events?: boolean
          created_at?: string
          environment?: string
          id?: string
          name: string
          node_id?: string | null
          owner_id: string
          plan?: string
          region?: string | null
          require_tls?: boolean
          secret_hash: string
          secret_last4: string
          status?: string
          updated_at?: string
        }
        Update: {
          allowed_origins?: string[]
          app_id?: string
          app_key?: string
          client_events?: boolean
          created_at?: string
          environment?: string
          id?: string
          name?: string
          node_id?: string | null
          owner_id?: string
          plan?: string
          region?: string | null
          require_tls?: boolean
          secret_hash?: string
          secret_last4?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rt_apps_node_id_fkey"
            columns: ["node_id"]
            isOneToOne: false
            referencedRelation: "rt_nodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rt_apps_plan_fkey"
            columns: ["plan"]
            isOneToOne: false
            referencedRelation: "rt_plans"
            referencedColumns: ["code"]
          },
        ]
      }
      rt_audit: {
        Row: {
          action: string
          actor: string | null
          app: string | null
          created_at: string
          id: string
          meta: Json
          target: string | null
        }
        Insert: {
          action: string
          actor?: string | null
          app?: string | null
          created_at?: string
          id?: string
          meta?: Json
          target?: string | null
        }
        Update: {
          action?: string
          actor?: string | null
          app?: string | null
          created_at?: string
          id?: string
          meta?: Json
          target?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rt_audit_app_fkey"
            columns: ["app"]
            isOneToOne: false
            referencedRelation: "rt_apps"
            referencedColumns: ["id"]
          },
        ]
      }
      rt_channels: {
        Row: {
          app: string
          created_at: string
          id: string
          last_activity: string | null
          message_count: number
          name: string
          status: string
          type: string
        }
        Insert: {
          app: string
          created_at?: string
          id?: string
          last_activity?: string | null
          message_count?: number
          name: string
          status?: string
          type?: string
        }
        Update: {
          app?: string
          created_at?: string
          id?: string
          last_activity?: string | null
          message_count?: number
          name?: string
          status?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "rt_channels_app_fkey"
            columns: ["app"]
            isOneToOne: false
            referencedRelation: "rt_apps"
            referencedColumns: ["id"]
          },
        ]
      }
      rt_events: {
        Row: {
          app: string
          channel: string
          created_at: string
          error: string | null
          event: string
          id: string
          latency_ms: number | null
          payload: Json
          region: string | null
          sender: string | null
          source: string
          status: string
        }
        Insert: {
          app: string
          channel: string
          created_at?: string
          error?: string | null
          event: string
          id?: string
          latency_ms?: number | null
          payload?: Json
          region?: string | null
          sender?: string | null
          source?: string
          status?: string
        }
        Update: {
          app?: string
          channel?: string
          created_at?: string
          error?: string | null
          event?: string
          id?: string
          latency_ms?: number | null
          payload?: Json
          region?: string | null
          sender?: string | null
          source?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "rt_events_app_fkey"
            columns: ["app"]
            isOneToOne: false
            referencedRelation: "rt_apps"
            referencedColumns: ["id"]
          },
        ]
      }
      rt_nodes: {
        Row: {
          capacity: number
          connections: number
          cpu_pct: number | null
          created_at: string
          host: string
          id: string
          is_primary: boolean
          last_heartbeat: string | null
          mem_pct: number | null
          name: string
          node_key_hash: string | null
          node_key_last4: string | null
          region: string | null
          status: string
        }
        Insert: {
          capacity?: number
          connections?: number
          cpu_pct?: number | null
          created_at?: string
          host: string
          id?: string
          is_primary?: boolean
          last_heartbeat?: string | null
          mem_pct?: number | null
          name: string
          node_key_hash?: string | null
          node_key_last4?: string | null
          region?: string | null
          status?: string
        }
        Update: {
          capacity?: number
          connections?: number
          cpu_pct?: number | null
          created_at?: string
          host?: string
          id?: string
          is_primary?: boolean
          last_heartbeat?: string | null
          mem_pct?: number | null
          name?: string
          node_key_hash?: string | null
          node_key_last4?: string | null
          region?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "rt_nodes_region_fkey"
            columns: ["region"]
            isOneToOne: false
            referencedRelation: "rt_regions"
            referencedColumns: ["code"]
          },
        ]
      }
      rt_plans: {
        Row: {
          code: string
          created_at: string
          max_channels: number
          max_connections: number
          max_messages_day: number
          name: string
          price_usd: number
          sort: number
        }
        Insert: {
          code: string
          created_at?: string
          max_channels: number
          max_connections: number
          max_messages_day: number
          name: string
          price_usd?: number
          sort?: number
        }
        Update: {
          code?: string
          created_at?: string
          max_channels?: number
          max_connections?: number
          max_messages_day?: number
          name?: string
          price_usd?: number
          sort?: number
        }
        Relationships: []
      }
      rt_regions: {
        Row: {
          code: string
          created_at: string
          name: string
          status: string
        }
        Insert: {
          code: string
          created_at?: string
          name: string
          status?: string
        }
        Update: {
          code?: string
          created_at?: string
          name?: string
          status?: string
        }
        Relationships: []
      }
      rt_webhook_deliveries: {
        Row: {
          app: string
          created_at: string
          duration_ms: number | null
          error: string | null
          event_id: string | null
          id: string
          status: number | null
          webhook: string
        }
        Insert: {
          app: string
          created_at?: string
          duration_ms?: number | null
          error?: string | null
          event_id?: string | null
          id?: string
          status?: number | null
          webhook: string
        }
        Update: {
          app?: string
          created_at?: string
          duration_ms?: number | null
          error?: string | null
          event_id?: string | null
          id?: string
          status?: number | null
          webhook?: string
        }
        Relationships: [
          {
            foreignKeyName: "rt_webhook_deliveries_app_fkey"
            columns: ["app"]
            isOneToOne: false
            referencedRelation: "rt_apps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rt_webhook_deliveries_webhook_fkey"
            columns: ["webhook"]
            isOneToOne: false
            referencedRelation: "rt_webhooks"
            referencedColumns: ["id"]
          },
        ]
      }
      rt_webhooks: {
        Row: {
          active: boolean
          app: string
          created_at: string
          events: string[]
          failures: number
          id: string
          last_delivery_at: string | null
          last_status: number | null
          signing_secret: string
          url: string
        }
        Insert: {
          active?: boolean
          app: string
          created_at?: string
          events?: string[]
          failures?: number
          id?: string
          last_delivery_at?: string | null
          last_status?: number | null
          signing_secret: string
          url: string
        }
        Update: {
          active?: boolean
          app?: string
          created_at?: string
          events?: string[]
          failures?: number
          id?: string
          last_delivery_at?: string | null
          last_status?: number | null
          signing_secret?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "rt_webhooks_app_fkey"
            columns: ["app"]
            isOneToOne: false
            referencedRelation: "rt_apps"
            referencedColumns: ["id"]
          },
        ]
      }
      safety_policies: {
        Row: {
          action: string
          category: string
          created_at: string
          description: string | null
          enabled: boolean
          id: string
          name: string
          severity_threshold: string
          violations_30d: number
        }
        Insert: {
          action?: string
          category?: string
          created_at?: string
          description?: string | null
          enabled?: boolean
          id?: string
          name: string
          severity_threshold?: string
          violations_30d?: number
        }
        Update: {
          action?: string
          category?: string
          created_at?: string
          description?: string | null
          enabled?: boolean
          id?: string
          name?: string
          severity_threshold?: string
          violations_30d?: number
        }
        Relationships: []
      }
      seasons: {
        Row: {
          created_at: string
          description: string | null
          ends_at: string
          id: string
          name: string
          slug: string
          starts_at: string
          status: Database["public"]["Enums"]["entity_status"]
          theme: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          ends_at: string
          id?: string
          name: string
          slug: string
          starts_at: string
          status?: Database["public"]["Enums"]["entity_status"]
          theme?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          ends_at?: string
          id?: string
          name?: string
          slug?: string
          starts_at?: string
          status?: Database["public"]["Enums"]["entity_status"]
          theme?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      security_alerts: {
        Row: {
          category: string
          description: string | null
          detected_at: string
          id: string
          resolved_at: string | null
          severity: string
          source: string
          status: string
          title: string
        }
        Insert: {
          category?: string
          description?: string | null
          detected_at?: string
          id?: string
          resolved_at?: string | null
          severity?: string
          source?: string
          status?: string
          title: string
        }
        Update: {
          category?: string
          description?: string | null
          detected_at?: string
          id?: string
          resolved_at?: string | null
          severity?: string
          source?: string
          status?: string
          title?: string
        }
        Relationships: []
      }
      site_notifications: {
        Row: {
          body: string
          created_at: string
          id: string
          is_published: boolean
          kind: string
          link_url: string | null
          published_at: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          body?: string
          created_at?: string
          id?: string
          is_published?: boolean
          kind?: string
          link_url?: string | null
          published_at?: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          is_published?: boolean
          kind?: string
          link_url?: string | null
          published_at?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          created_at?: string
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          created_at?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      storefront_floating_elements: {
        Row: {
          action_target: string | null
          action_type: string
          audience: string
          created_at: string
          created_by: string | null
          desktop_enabled: boolean
          element_type: string
          enabled: boolean
          ends_at: string | null
          icon: string | null
          id: string
          key: string
          label: string
          mobile_enabled: boolean
          name: string
          offset_x: number
          offset_y: number
          page_scope: string
          position: string
          priority: number
          starts_at: string | null
          tablet_enabled: boolean
          theme: string
          trigger_type: string
          trigger_value: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          action_target?: string | null
          action_type?: string
          audience?: string
          created_at?: string
          created_by?: string | null
          desktop_enabled?: boolean
          element_type: string
          enabled?: boolean
          ends_at?: string | null
          icon?: string | null
          id?: string
          key: string
          label: string
          mobile_enabled?: boolean
          name: string
          offset_x?: number
          offset_y?: number
          page_scope?: string
          position?: string
          priority?: number
          starts_at?: string | null
          tablet_enabled?: boolean
          theme?: string
          trigger_type?: string
          trigger_value?: number
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          action_target?: string | null
          action_type?: string
          audience?: string
          created_at?: string
          created_by?: string | null
          desktop_enabled?: boolean
          element_type?: string
          enabled?: boolean
          ends_at?: string | null
          icon?: string | null
          id?: string
          key?: string
          label?: string
          mobile_enabled?: boolean
          name?: string
          offset_x?: number
          offset_y?: number
          page_scope?: string
          position?: string
          priority?: number
          starts_at?: string | null
          tablet_enabled?: boolean
          theme?: string
          trigger_type?: string
          trigger_value?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      storefront_footer_columns: {
        Row: {
          created_at: string
          created_by: string | null
          enabled: boolean
          heading: string
          id: string
          key: string
          position: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          enabled?: boolean
          heading: string
          id?: string
          key: string
          position: number
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          enabled?: boolean
          heading?: string
          id?: string
          key?: string
          position?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      storefront_footer_links: {
        Row: {
          audience: string
          column_id: string
          created_at: string
          created_by: string | null
          enabled: boolean
          href: string | null
          id: string
          label: string
          legal_policy_type: string | null
          link_type: string
          open_in_new: boolean
          position: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          audience?: string
          column_id: string
          created_at?: string
          created_by?: string | null
          enabled?: boolean
          href?: string | null
          id?: string
          label: string
          legal_policy_type?: string | null
          link_type?: string
          open_in_new?: boolean
          position: number
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          audience?: string
          column_id?: string
          created_at?: string
          created_by?: string | null
          enabled?: boolean
          href?: string | null
          id?: string
          label?: string
          legal_policy_type?: string | null
          link_type?: string
          open_in_new?: boolean
          position?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "storefront_footer_links_column_id_fkey"
            columns: ["column_id"]
            isOneToOne: false
            referencedRelation: "storefront_footer_columns"
            referencedColumns: ["id"]
          },
        ]
      }
      storefront_footer_settings: {
        Row: {
          id: boolean
          newsletter_consent: string | null
          newsletter_description: string | null
          newsletter_enabled: boolean
          newsletter_list_id: string | null
          newsletter_placeholder: string
          newsletter_provider: string | null
          newsletter_success: string
          newsletter_title: string
          show_footer: boolean
          trust_strip_enabled: boolean
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          id?: boolean
          newsletter_consent?: string | null
          newsletter_description?: string | null
          newsletter_enabled?: boolean
          newsletter_list_id?: string | null
          newsletter_placeholder?: string
          newsletter_provider?: string | null
          newsletter_success?: string
          newsletter_title?: string
          show_footer?: boolean
          trust_strip_enabled?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          id?: boolean
          newsletter_consent?: string | null
          newsletter_description?: string | null
          newsletter_enabled?: boolean
          newsletter_list_id?: string | null
          newsletter_placeholder?: string
          newsletter_provider?: string | null
          newsletter_success?: string
          newsletter_title?: string
          show_footer?: boolean
          trust_strip_enabled?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      storefront_published_config: {
        Row: {
          id: string
          is_live: boolean
          kind: string
          note: string | null
          published_at: string
          published_by: string | null
          snapshot: Json
          version: number
        }
        Insert: {
          id?: string
          is_live?: boolean
          kind: string
          note?: string | null
          published_at?: string
          published_by?: string | null
          snapshot: Json
          version: number
        }
        Update: {
          id?: string
          is_live?: boolean
          kind?: string
          note?: string | null
          published_at?: string
          published_by?: string | null
          snapshot?: Json
          version?: number
        }
        Relationships: []
      }
      storefront_social_links: {
        Row: {
          created_at: string
          created_by: string | null
          enabled: boolean
          handle: string | null
          id: string
          platform: string
          position: number
          updated_at: string
          updated_by: string | null
          url: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          enabled?: boolean
          handle?: string | null
          id?: string
          platform: string
          position: number
          updated_at?: string
          updated_by?: string | null
          url: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          enabled?: boolean
          handle?: string | null
          id?: string
          platform?: string
          position?: number
          updated_at?: string
          updated_by?: string | null
          url?: string
        }
        Relationships: []
      }
      storefront_trust_items: {
        Row: {
          alt_text: string
          created_at: string
          created_by: string | null
          enabled: boolean
          href: string | null
          icon: string | null
          id: string
          kind: string
          name: string
          position: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          alt_text: string
          created_at?: string
          created_by?: string | null
          enabled?: boolean
          href?: string | null
          icon?: string | null
          id?: string
          kind: string
          name: string
          position: number
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          alt_text?: string
          created_at?: string
          created_by?: string | null
          enabled?: boolean
          href?: string | null
          icon?: string | null
          id?: string
          kind?: string
          name?: string
          position?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          category: string
          description: string | null
          id: string
          key: string
          label: string
          updated_at: string
          value: string
          value_type: string
        }
        Insert: {
          category?: string
          description?: string | null
          id?: string
          key: string
          label: string
          updated_at?: string
          value?: string
          value_type?: string
        }
        Update: {
          category?: string
          description?: string | null
          id?: string
          key?: string
          label?: string
          updated_at?: string
          value?: string
          value_type?: string
        }
        Relationships: []
      }
      trophies: {
        Row: {
          color: string | null
          conditions: Json
          created_at: string
          created_by: string | null
          description: string | null
          icon: string | null
          id: string
          image_url: string | null
          name: string
          slug: string
          status: Database["public"]["Enums"]["entity_status"]
          tier: Database["public"]["Enums"]["trophy_tier"]
          updated_at: string
        }
        Insert: {
          color?: string | null
          conditions?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          name: string
          slug: string
          status?: Database["public"]["Enums"]["entity_status"]
          tier?: Database["public"]["Enums"]["trophy_tier"]
          updated_at?: string
        }
        Update: {
          color?: string | null
          conditions?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          name?: string
          slug?: string
          status?: Database["public"]["Enums"]["entity_status"]
          tier?: Database["public"]["Enums"]["trophy_tier"]
          updated_at?: string
        }
        Relationships: []
      }
      usage_daily: {
        Row: {
          avg_latency_ms: number
          cost_usd: number
          day: string
          errors: number
          id: string
          model_id: string | null
          requests: number
          service_id: string | null
          tokens: number
        }
        Insert: {
          avg_latency_ms?: number
          cost_usd?: number
          day: string
          errors?: number
          id?: string
          model_id?: string | null
          requests?: number
          service_id?: string | null
          tokens?: number
        }
        Update: {
          avg_latency_ms?: number
          cost_usd?: number
          day?: string
          errors?: number
          id?: string
          model_id?: string | null
          requests?: number
          service_id?: string | null
          tokens?: number
        }
        Relationships: [
          {
            foreignKeyName: "usage_daily_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "ai_models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usage_daily_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "api_services"
            referencedColumns: ["id"]
          },
        ]
      }
      usage_events: {
        Row: {
          cost_usd: number
          id: string
          latency_ms: number
          model_id: string | null
          occurred_at: string
          product: string
          requests: number
          service_id: string | null
          source: string
          status_code: number
          success: boolean
          tokens_in: number
          tokens_out: number
        }
        Insert: {
          cost_usd?: number
          id?: string
          latency_ms?: number
          model_id?: string | null
          occurred_at?: string
          product?: string
          requests?: number
          service_id?: string | null
          source?: string
          status_code?: number
          success?: boolean
          tokens_in?: number
          tokens_out?: number
        }
        Update: {
          cost_usd?: number
          id?: string
          latency_ms?: number
          model_id?: string | null
          occurred_at?: string
          product?: string
          requests?: number
          service_id?: string | null
          source?: string
          status_code?: number
          success?: boolean
          tokens_in?: number
          tokens_out?: number
        }
        Relationships: [
          {
            foreignKeyName: "usage_events_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "ai_models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usage_events_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "api_services"
            referencedColumns: ["id"]
          },
        ]
      }
      user_achievements: {
        Row: {
          achievement_id: string
          id: string
          metadata: Json | null
          progress: number
          unlocked_at: string | null
          user_id: string
        }
        Insert: {
          achievement_id: string
          id?: string
          metadata?: Json | null
          progress?: number
          unlocked_at?: string | null
          user_id: string
        }
        Update: {
          achievement_id?: string
          id?: string
          metadata?: Json | null
          progress?: number
          unlocked_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_awards: {
        Row: {
          award_id: string
          claimed_at: string | null
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          award_id: string
          claimed_at?: string | null
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          award_id?: string
          claimed_at?: string | null
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_awards_award_id_fkey"
            columns: ["award_id"]
            isOneToOne: false
            referencedRelation: "awards"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          badge_id: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_mission_progress: {
        Row: {
          completed_at: string | null
          id: string
          mission_id: string
          period_key: string | null
          progress: number
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          id?: string
          mission_id: string
          period_key?: string | null
          progress?: number
          user_id: string
        }
        Update: {
          completed_at?: string | null
          id?: string
          mission_id?: string
          period_key?: string | null
          progress?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_mission_progress_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_streaks: {
        Row: {
          current_streak: number
          last_active_date: string | null
          longest_streak: number
          updated_at: string
          user_id: string
        }
        Insert: {
          current_streak?: number
          last_active_date?: string | null
          longest_streak?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          current_streak?: number
          last_active_date?: string | null
          longest_streak?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_trophies: {
        Row: {
          earned_at: string
          id: string
          trophy_id: string
          user_id: string
        }
        Insert: {
          earned_at?: string
          id?: string
          trophy_id: string
          user_id: string
        }
        Update: {
          earned_at?: string
          id?: string
          trophy_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_trophies_trophy_id_fkey"
            columns: ["trophy_id"]
            isOneToOne: false
            referencedRelation: "trophies"
            referencedColumns: ["id"]
          },
        ]
      }
      user_xp: {
        Row: {
          current_level: number
          current_rank: number
          total_xp: number
          updated_at: string
          user_id: string
        }
        Insert: {
          current_level?: number
          current_rank?: number
          total_xp?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          current_level?: number
          current_rank?: number
          total_xp?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      vala_tv_categories: {
        Row: {
          archived: boolean
          created_at: string
          id: string
          name: string
          position: number
          slug: string
          updated_at: string
          visible: boolean
        }
        Insert: {
          archived?: boolean
          created_at?: string
          id?: string
          name: string
          position?: number
          slug: string
          updated_at?: string
          visible?: boolean
        }
        Update: {
          archived?: boolean
          created_at?: string
          id?: string
          name?: string
          position?: number
          slug?: string
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      vala_tv_videos: {
        Row: {
          category_id: string | null
          country: string | null
          created_at: string
          created_by: string | null
          description: string | null
          duration: string | null
          featured: boolean
          id: string
          language: string | null
          position: number
          product_id: string | null
          publish_at: string | null
          published_at: string | null
          seo_description: string | null
          seo_title: string | null
          status: string
          thumbnail_url: string | null
          title: string
          updated_at: string
          updated_by: string | null
          url: string | null
        }
        Insert: {
          category_id?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          duration?: string | null
          featured?: boolean
          id?: string
          language?: string | null
          position?: number
          product_id?: string | null
          publish_at?: string | null
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          status?: string
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          updated_by?: string | null
          url?: string | null
        }
        Update: {
          category_id?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          duration?: string | null
          featured?: boolean
          id?: string
          language?: string | null
          position?: number
          product_id?: string | null
          publish_at?: string | null
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          status?: string
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          updated_by?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vala_tv_videos_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "vala_tv_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vala_tv_videos_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "marketplace_products"
            referencedColumns: ["id"]
          },
        ]
      }
      vala_tv_views: {
        Row: {
          completed: boolean
          created_at: string
          id: string
          session_id: string | null
          user_id: string | null
          video_id: string
          watched_ms: number | null
        }
        Insert: {
          completed?: boolean
          created_at?: string
          id?: string
          session_id?: string | null
          user_id?: string | null
          video_id: string
          watched_ms?: number | null
        }
        Update: {
          completed?: boolean
          created_at?: string
          id?: string
          session_id?: string | null
          user_id?: string | null
          video_id?: string
          watched_ms?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vala_tv_views_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "vala_tv_videos"
            referencedColumns: ["id"]
          },
        ]
      }
      wallet_transactions: {
        Row: {
          amount: number
          balance_after: number
          created_at: string
          description: string | null
          id: string
          reference: string | null
          type: string
          wallet_id: string | null
        }
        Insert: {
          amount: number
          balance_after?: number
          created_at?: string
          description?: string | null
          id?: string
          reference?: string | null
          type: string
          wallet_id?: string | null
        }
        Update: {
          amount?: number
          balance_after?: number
          created_at?: string
          description?: string | null
          id?: string
          reference?: string | null
          type?: string
          wallet_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wallet_transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          auto_topup: boolean
          auto_topup_amount: number
          balance: number
          created_at: string
          currency: string
          id: string
          low_balance_threshold: number
          name: string
          status: string
        }
        Insert: {
          auto_topup?: boolean
          auto_topup_amount?: number
          balance?: number
          created_at?: string
          currency?: string
          id?: string
          low_balance_threshold?: number
          name: string
          status?: string
        }
        Update: {
          auto_topup?: boolean
          auto_topup_amount?: number
          balance?: number
          created_at?: string
          currency?: string
          id?: string
          low_balance_threshold?: number
          name?: string
          status?: string
        }
        Relationships: []
      }
      xp_rules: {
        Row: {
          conditions: Json
          cooldown_seconds: number | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          max_per_day: number | null
          multiplier: number
          name: string
          source_id: string | null
          status: Database["public"]["Enums"]["entity_status"]
          updated_at: string
          xp_value: number
        }
        Insert: {
          conditions?: Json
          cooldown_seconds?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          max_per_day?: number | null
          multiplier?: number
          name: string
          source_id?: string | null
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
          xp_value?: number
        }
        Update: {
          conditions?: Json
          cooldown_seconds?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          max_per_day?: number | null
          multiplier?: number
          name?: string
          source_id?: string | null
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
          xp_value?: number
        }
        Relationships: [
          {
            foreignKeyName: "xp_rules_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "xp_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      xp_sources: {
        Row: {
          created_at: string
          default_xp: number
          description: string | null
          id: string
          name: string
          slug: string
          status: Database["public"]["Enums"]["entity_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          default_xp?: number
          description?: string | null
          id?: string
          name: string
          slug: string
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          default_xp?: number
          description?: string | null
          id?: string
          name?: string
          slug?: string
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
        }
        Relationships: []
      }
      xp_transactions: {
        Row: {
          amount: number
          created_at: string
          id: string
          metadata: Json | null
          reason: string | null
          rule_id: string | null
          source_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          metadata?: Json | null
          reason?: string | null
          rule_id?: string | null
          source_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          metadata?: Json | null
          reason?: string | null
          rule_id?: string | null
          source_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "xp_transactions_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "xp_rules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "xp_transactions_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "xp_sources"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      ams_asset_state:
        | {
            Args: {
              p_claimed: boolean
              p_earned: boolean
              p_min_xp: number
              p_stage: number
              p_user: string
              p_xp: number
            }
            Returns: string
          }
        | {
            Args: {
              p_earned: boolean
              p_min_xp: number
              p_revoked: boolean
              p_stage: number
              p_user: string
              p_verified: boolean
              p_xp: number
            }
            Returns: string
          }
      ams_claim_award: { Args: { p_award_slug: string }; Returns: Json }
      ams_evaluate_user: { Args: { p_user_id: string }; Returns: Json }
      ams_evaluate_user_role: {
        Args: { p_role: string; p_user_id: string }
        Returns: Json
      }
      ams_grant_reward: {
        Args: {
          p_award_ids?: string[]
          p_coins?: number
          p_reason?: string
          p_tokens?: number
          p_xp?: number
        }
        Returns: Json
      }
      ams_ingest_event: {
        Args: {
          p_entity_id?: string
          p_entity_type?: string
          p_event_key: string
          p_occurred_at?: string
          p_payload?: Json
          p_source?: string
          p_user_id: string
          p_value?: number
        }
        Returns: Json
      }
      ams_is_operator: { Args: never; Returns: boolean }
      ams_issue_awards: {
        Args: { p_role: string; p_stage: number; p_user_id: string }
        Returns: number
      }
      ams_recompute: { Args: { p_user_id: string }; Returns: Json }
      ams_role_chain: {
        Args: { p_role: string; p_user_id?: string }
        Returns: Json
      }
      ams_sweep: { Args: never; Returns: Json }
      ams_sync_platform_roles: { Args: { p_user_id: string }; Returns: number }
      ams_verify_credential: { Args: { p_code: string }; Returns: Json }
      assist_audit: {
        Args: {
          p_action: string
          p_new?: Json
          p_old?: Json
          p_reason?: string
          p_result?: string
          p_session_id?: string
          p_severity?: string
          p_target?: string
        }
        Returns: string
      }
      assist_decide_approval: {
        Args: { p_approval_id: string; p_decision: string; p_note?: string }
        Returns: Json
      }
      assist_emergency_stop: {
        Args: { p_all?: boolean; p_reason: string; p_session_id: string }
        Returns: Json
      }
      assist_grant_consent: { Args: { p_session_id: string }; Returns: Json }
      assist_request_from: {
        Args: {
          p_duration_minutes?: number
          p_priority?: string
          p_purpose: string
          p_scope?: string
          p_source_id: string
          p_source_module: string
          p_target_user_id: string
        }
        Returns: Json
      }
      assist_revoke_consent: {
        Args: { p_reason?: string; p_session_id: string }
        Returns: Json
      }
      assist_start_session: { Args: { p_session_id: string }; Returns: Json }
      assist_status_for: {
        Args: { p_module: string; p_record_id: string }
        Returns: Json
      }
      can_post_in_chat: {
        Args: { _conv: string; _user: string }
        Returns: boolean
      }
      has_permission: {
        Args: { _permission: string; _user_id: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
      is_chat_participant: {
        Args: { _conv: string; _user: string }
        Returns: boolean
      }
      is_participant: {
        Args: { _conversation_id: string; _user_id: string }
        Returns: boolean
      }
      legal_gate_status: { Args: { p_user_id?: string }; Returns: Json }
      legal_log: {
        Args: {
          p_action: string
          p_entity_id?: string
          p_entity_type?: string
          p_new?: Json
          p_old?: Json
          p_reason?: string
          p_result?: string
          p_severity?: string
        }
        Returns: string
      }
      legal_pending_acceptances: {
        Args: { p_user_id?: string }
        Returns: {
          agreement_id: string
          agreement_name: string
          agreement_ref: string
          body: string
          body_sha256: string
          reason: string
          version: string
          version_id: string
        }[]
      }
      legal_publish_version: {
        Args: { p_reason?: string; p_version_id: string }
        Returns: Json
      }
      legal_record_acceptance: {
        Args: {
          p_decision?: string
          p_ip?: string
          p_scrolled_to_end?: boolean
          p_session_reference?: string
          p_user_agent?: string
          p_version_id: string
        }
        Returns: Json
      }
      mm_ai_can_approve: { Args: never; Returns: boolean }
      mm_ai_generation_finish: {
        Args: {
          p_error?: Json
          p_generation: string
          p_parsed?: Json
          p_raw?: Json
          p_status: string
          p_usage?: Json
        }
        Returns: Json
      }
      mm_ai_generation_start: {
        Args: {
          p_job?: string
          p_language?: string
          p_product: string
          p_types: string[]
        }
        Returns: Json
      }
      mm_ai_provider_binding: { Args: never; Returns: Json }
      mm_ai_usage_record: {
        Args: {
          p_model: string
          p_provider: string
          p_status: string
          p_usage: Json
        }
        Returns: undefined
      }
      mm_approval_rule_set: {
        Args: { p_key: string; p_patch: Json }
        Returns: Json
      }
      mm_approval_sla_run: { Args: never; Returns: Json }
      mm_approval_sla_set: { Args: { p_patch: Json }; Returns: Json }
      mm_brand_asset_verify: {
        Args: {
          p_key: string
          p_observed_bytes?: number
          p_observed_sha: string
        }
        Returns: Json
      }
      mm_brand_case_escalate: {
        Args: { p_case: string; p_reason: string }
        Returns: Json
      }
      mm_brand_detect: { Args: { p_product: string }; Returns: Json }
      mm_brand_enforce: {
        Args: { p_limit?: number; p_product?: string }
        Returns: Json
      }
      mm_brand_policy_set: { Args: { p_patch: Json }; Returns: Json }
      mm_brand_protection: { Args: { p_query?: Json }; Returns: Json }
      mm_brand_whitelist_decide: {
        Args: { p_id: string; p_reason?: string; p_to: string }
        Returns: Json
      }
      mm_brand_whitelist_expire: { Args: never; Returns: Json }
      mm_brand_whitelist_request: {
        Args: {
          p_expires?: string
          p_product: string
          p_reason: string
          p_rule: string
        }
        Returns: Json
      }
      mm_card_coverage: { Args: never; Returns: Json }
      mm_card_field_set: {
        Args: { p_enabled: boolean; p_key: string }
        Returns: Json
      }
      mm_card_fields: { Args: never; Returns: Json }
      mm_card_reorder: {
        Args: { p_keys: string[]; p_kind: string }
        Returns: Json
      }
      mm_catalog_audit: { Args: { p_limit?: number }; Returns: Json }
      mm_customer_profile: { Args: { p_user: string }; Returns: Json }
      mm_customers: { Args: { p_query?: Json }; Returns: Json }
      mm_customers_overview: { Args: never; Returns: Json }
      mm_dashboard: { Args: never; Returns: Json }
      mm_demo_domains: { Args: { p_query?: Json }; Returns: Json }
      mm_demo_eligibility: { Args: { p_product: string }; Returns: Json }
      mm_demo_expiry_run: { Args: never; Returns: Json }
      mm_demo_operation: {
        Args: { p_demo: string; p_op: string; p_reason?: string }
        Returns: Json
      }
      mm_demo_password_set: {
        Args: { p_demo: string; p_password: string }
        Returns: Json
      }
      mm_demo_provider_status: { Args: never; Returns: Json }
      mm_demo_provision: {
        Args: { p_pattern?: string; p_product: string }
        Returns: Json
      }
      mm_demo_settings_set: { Args: { p_patch: Json }; Returns: Json }
      mm_demo_slug: { Args: { p_product: string }; Returns: Json }
      mm_duplicate_decide: {
        Args: { p_candidate: string; p_decision: string; p_reason?: string }
        Returns: Json
      }
      mm_duplicate_scan: { Args: { p_threshold?: number }; Returns: Json }
      mm_faq_rollback: {
        Args: { p_id: string; p_version: number }
        Returns: Json
      }
      mm_faq_save: { Args: { p_patch: Json }; Returns: Json }
      mm_faq_transition: {
        Args: { p_id: string; p_reason?: string; p_to: string; p_when?: string }
        Returns: Json
      }
      mm_faqs: { Args: { p_query?: Json }; Returns: Json }
      mm_filter_set: { Args: { p_key: string; p_patch: Json }; Returns: Json }
      mm_filter_values: { Args: { p_key: string }; Returns: Json }
      mm_filters: { Args: never; Returns: Json }
      mm_influencers: { Args: { p_query?: Json }; Returns: Json }
      mm_is_operator: { Args: never; Returns: boolean }
      mm_marketing_summary: { Args: never; Returns: Json }
      mm_moderation: { Args: { p_query?: Json }; Returns: Json }
      mm_moderation_policy_set: { Args: { p_patch: Json }; Returns: Json }
      mm_product_checks: { Args: { p_product: string }; Returns: Json }
      mm_product_clone: { Args: { p_id: string }; Returns: Json }
      mm_product_merge: {
        Args: {
          p_candidate?: string
          p_canonical: string
          p_duplicate: string
          p_reason: string
        }
        Returns: Json
      }
      mm_product_moderate: {
        Args: {
          p_evidence?: Json
          p_id: string
          p_lock?: number
          p_reason?: string
          p_to: string
        }
        Returns: Json
      }
      mm_product_moderation_detail: { Args: { p_id: string }; Returns: Json }
      mm_product_purge_execute: { Args: { p_request: string }; Returns: Json }
      mm_product_purge_request: {
        Args: { p_id: string; p_reason: string }
        Returns: Json
      }
      mm_product_report: {
        Args: {
          p_detail?: string
          p_product: string
          p_reason: string
          p_severity?: string
        }
        Returns: Json
      }
      mm_product_share: { Args: { p_product: string }; Returns: Json }
      mm_product_urls: { Args: { p_query?: Json }; Returns: Json }
      mm_products_bulk: {
        Args: {
          p_ids: string[]
          p_op: string
          p_reason?: string
          p_target?: string
        }
        Returns: Json
      }
      mm_qr_create: {
        Args: { p_product: string; p_short_link?: string }
        Returns: Json
      }
      mm_qr_scan: {
        Args: {
          p_browser?: string
          p_campaign?: string
          p_country?: string
          p_device?: string
          p_qr_code: string
          p_visitor_hash?: string
        }
        Returns: Json
      }
      mm_release_overview: { Args: never; Returns: Json }
      mm_report_transition: {
        Args: {
          p_escalate_legal?: boolean
          p_report: string
          p_resolution?: string
          p_to: string
        }
        Returns: Json
      }
      mm_reseller_earnings_release: { Args: { p_id?: string }; Returns: Json }
      mm_reseller_payout_create: {
        Args: { p_id: string; p_reason?: string }
        Returns: Json
      }
      mm_reseller_payout_status: {
        Args: {
          p_payout: string
          p_reason?: string
          p_reference?: string
          p_to: string
        }
        Returns: Json
      }
      mm_reseller_schedule_set: { Args: { p_patch: Json }; Returns: Json }
      mm_sandbox_activity: {
        Args: {
          p_kind?: string
          p_latency?: number
          p_path?: string
          p_sandbox: string
          p_status?: number
        }
        Returns: Json
      }
      mm_sandbox_capabilities: { Args: never; Returns: Json }
      mm_sandbox_cleanup_run: { Args: never; Returns: Json }
      mm_sandbox_create: { Args: { p_demo: string }; Returns: Json }
      mm_sandbox_expiry_run: { Args: never; Returns: Json }
      mm_sandbox_extend: {
        Args: { p_hours: number; p_sandbox: string }
        Returns: Json
      }
      mm_sandbox_reset: {
        Args: { p_sandbox: string; p_trigger?: string }
        Returns: Json
      }
      mm_sandbox_rotate_credential: {
        Args: { p_role: string; p_sandbox: string }
        Returns: Json
      }
      mm_sandbox_settings_set: { Args: { p_patch: Json }; Returns: Json }
      mm_sandbox_sync: { Args: { p_demo: string }; Returns: Json }
      mm_sandboxes: { Args: { p_query?: Json }; Returns: Json }
      mm_section_set_enabled: {
        Args: { p_enabled: boolean; p_key: string }
        Returns: Json
      }
      mm_sections_reorder: { Args: { p_order: Json }; Returns: number }
      mm_security_finding_add: {
        Args: {
          p_category: string
          p_confidence?: number
          p_evidence?: Json
          p_job: string
          p_result: string
          p_severity?: string
          p_source?: string
          p_title: string
        }
        Returns: Json
      }
      mm_security_provider_status: { Args: never; Returns: Json }
      mm_security_quarantine_decide: {
        Args: {
          p_asset: string
          p_discard_payload?: boolean
          p_reason: string
          p_to: string
        }
        Returns: Json
      }
      mm_security_scan_error: {
        Args: { p_category: string; p_detail: string; p_job: string }
        Returns: Json
      }
      mm_security_scan_finish: { Args: { p_job: string }; Returns: Json }
      mm_security_scan_start: {
        Args: { p_asset: string; p_reuse?: boolean }
        Returns: Json
      }
      mm_seller_commission_set: {
        Args: {
          p_currency?: string
          p_fixed?: number
          p_rate: number
          p_reason?: string
          p_seller: string
        }
        Returns: Json
      }
      mm_seller_earnings_release: { Args: { p_seller?: string }; Returns: Json }
      mm_seller_kind: { Args: { p_id: string; p_kind: string }; Returns: Json }
      mm_seller_payout_create: {
        Args: { p_reason?: string; p_seller: string }
        Returns: Json
      }
      mm_seller_payout_status: {
        Args: {
          p_id: string
          p_reason?: string
          p_reference?: string
          p_to: string
        }
        Returns: Json
      }
      mm_seller_schedule_set: { Args: { p_patch: Json }; Returns: Json }
      mm_seller_status: {
        Args: { p_id: string; p_reason?: string; p_to: string }
        Returns: Json
      }
      mm_share_record: {
        Args: { p_channel: string; p_kind?: string; p_product: string }
        Returns: Json
      }
      mm_submission_checks: { Args: { p_submission: string }; Returns: Json }
      mm_submission_create: {
        Args: { p_product: string; p_type?: string; p_version?: string }
        Returns: Json
      }
      mm_submission_detail: { Args: { p_id: string }; Returns: Json }
      mm_submission_evidence_add: {
        Args: {
          p_detail?: string
          p_kind: string
          p_label: string
          p_submission: string
          p_url?: string
        }
        Returns: Json
      }
      mm_submission_risk: { Args: { p_submission: string }; Returns: Json }
      mm_submission_risk_refresh: {
        Args: { p_submission: string }
        Returns: Json
      }
      mm_submission_transition: {
        Args: {
          p_comment?: string
          p_id: string
          p_lock?: number
          p_override?: boolean
          p_reason?: string
          p_to: string
        }
        Returns: Json
      }
      mm_submissions: { Args: { p_query?: Json }; Returns: Json }
      mm_submissions_bulk: {
        Args: { p_ids: string[]; p_reason?: string; p_to: string }
        Returns: Json
      }
      mm_topbar_configure: {
        Args: { p_key: string; p_patch: Json }
        Returns: Json
      }
      mm_topbar_modules: { Args: never; Returns: Json }
      mm_topbar_reorder: { Args: { p_keys: string[] }; Returns: Json }
      mm_trust_badge_set: {
        Args: { p_key: string; p_patch: Json }
        Returns: Json
      }
      mm_trust_badges: { Args: never; Returns: Json }
      mm_url_bulk: {
        Args: {
          p_batch?: number
          p_ids?: string[]
          p_job?: string
          p_scope?: string
        }
        Returns: Json
      }
      mm_url_settings_set: { Args: { p_patch: Json }; Returns: Json }
      mm_vala_tv: { Args: never; Returns: Json }
      mm_vala_tv_save: { Args: { p_patch: Json }; Returns: Json }
      mm_vala_tv_status: {
        Args: { p_id: string; p_reason?: string; p_to: string }
        Returns: Json
      }
      rt_can_app: { Args: { _app: string }; Returns: boolean }
      rt_is_operator: { Args: never; Returns: boolean }
      sf_config_draft: { Args: { p_kind: string }; Returns: Json }
      sf_config_live: { Args: { p_kind: string }; Returns: Json }
      sf_faqs: { Args: never; Returns: Json }
      sf_floating_save: {
        Args: { p_key: string; p_patch: Json }
        Returns: Json
      }
      sf_footer_link_remove: {
        Args: { p_hard?: boolean; p_id: string }
        Returns: Json
      }
      sf_footer_link_save: { Args: { p_patch: Json }; Returns: Json }
      sf_footer_links_reorder: {
        Args: { p_column_id: string; p_ids: string[] }
        Returns: Json
      }
      sf_footer_settings_save: { Args: { p_patch: Json }; Returns: Json }
      sf_legal_href: { Args: { p_policy_type: string }; Returns: string }
      sf_publish: { Args: { p_kind: string; p_note?: string }; Returns: Json }
      sf_rollback: {
        Args: { p_kind: string; p_version: number }
        Returns: Json
      }
      sf_social_save: { Args: { p_patch: Json }; Returns: Json }
      sf_trust_save: { Args: { p_patch: Json }; Returns: Json }
      sf_vala_tv: { Args: never; Returns: Json }
      sf_vala_tv_view: {
        Args: {
          p_completed?: boolean
          p_session: string
          p_video: string
          p_watched_ms?: number
        }
        Returns: Json
      }
      sf_validate: { Args: { p_kind: string }; Returns: Json }
      sf_versions: { Args: { p_kind: string; p_limit?: number }; Returns: Json }
      trust_evaluate: {
        Args: { p_product: string; p_surface?: string }
        Returns: Json
      }
      unlock_trophy: {
        Args: {
          _achievement_name: string
          _achievement_slug: string
          _trophy_name: string
          _trophy_slug: string
          _xp_reward?: number
        }
        Returns: Json
      }
    }
    Enums: {
      ams_chat_channel:
        | "support"
        | "developer"
        | "qa"
        | "boss"
        | "ai"
        | "customer"
      ams_event_kind:
        | "created"
        | "updated"
        | "status_changed"
        | "assigned"
        | "reassigned"
        | "transferred"
        | "commented"
        | "internal_note"
        | "escalated"
        | "resolved"
        | "closed"
        | "reopened"
        | "archived"
        | "restored"
        | "attachment_added"
        | "attachment_removed"
      ams_priority: "low" | "medium" | "high" | "critical"
      ams_status:
        | "draft"
        | "submitted"
        | "assigned"
        | "accepted"
        | "in_progress"
        | "waiting_customer"
        | "waiting_developer"
        | "waiting_qa"
        | "testing"
        | "resolved"
        | "closed"
        | "reopened"
        | "cancelled"
        | "archived"
      app_role:
        | "admin"
        | "boss"
        | "founder"
        | "developer"
        | "employee"
        | "vendor"
        | "author"
        | "affiliate"
        | "influencer"
        | "reseller"
        | "franchise"
        | "seo"
        | "marketing"
        | "sales"
        | "finance"
        | "support"
        | "customer"
        | "marketplace-user"
        | "legal"
        | "super_admin"
        | "boss_owner"
      claim_status: "pending" | "approved" | "rejected" | "fulfilled"
      demo_status: "active" | "inactive" | "maintenance" | "down"
      demo_tech_stack:
        | "php"
        | "node"
        | "java"
        | "python"
        | "react"
        | "angular"
        | "vue"
        | "other"
      entity_status: "active" | "inactive" | "archived" | "draft"
      mission_cadence: "daily" | "weekly" | "monthly" | "seasonal"
      rarity_tier: "common" | "rare" | "epic" | "legendary" | "mythic"
      trophy_tier: "bronze" | "silver" | "gold" | "platinum"
      wallet_kind: "coins" | "tokens" | "rewards"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      ams_chat_channel: [
        "support",
        "developer",
        "qa",
        "boss",
        "ai",
        "customer",
      ],
      ams_event_kind: [
        "created",
        "updated",
        "status_changed",
        "assigned",
        "reassigned",
        "transferred",
        "commented",
        "internal_note",
        "escalated",
        "resolved",
        "closed",
        "reopened",
        "archived",
        "restored",
        "attachment_added",
        "attachment_removed",
      ],
      ams_priority: ["low", "medium", "high", "critical"],
      ams_status: [
        "draft",
        "submitted",
        "assigned",
        "accepted",
        "in_progress",
        "waiting_customer",
        "waiting_developer",
        "waiting_qa",
        "testing",
        "resolved",
        "closed",
        "reopened",
        "cancelled",
        "archived",
      ],
      app_role: [
        "admin",
        "boss",
        "founder",
        "developer",
        "employee",
        "vendor",
        "author",
        "affiliate",
        "influencer",
        "reseller",
        "franchise",
        "seo",
        "marketing",
        "sales",
        "finance",
        "support",
        "customer",
        "marketplace-user",
        "legal",
        "super_admin",
        "boss_owner",
      ],
      claim_status: ["pending", "approved", "rejected", "fulfilled"],
      demo_status: ["active", "inactive", "maintenance", "down"],
      demo_tech_stack: [
        "php",
        "node",
        "java",
        "python",
        "react",
        "angular",
        "vue",
        "other",
      ],
      entity_status: ["active", "inactive", "archived", "draft"],
      mission_cadence: ["daily", "weekly", "monthly", "seasonal"],
      rarity_tier: ["common", "rare", "epic", "legendary", "mythic"],
      trophy_tier: ["bronze", "silver", "gold", "platinum"],
      wallet_kind: ["coins", "tokens", "rewards"],
    },
  },
} as const
