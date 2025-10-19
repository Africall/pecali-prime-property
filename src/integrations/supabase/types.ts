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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: string | null
          target_id: string | null
          target_type: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          target_id?: string | null
          target_type?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          target_id?: string | null
          target_type?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          message: string
          phone: string | null
          status: string
          subject: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          message: string
          phone?: string | null
          status?: string
          subject?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          message?: string
          phone?: string | null
          status?: string
          subject?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      get_started_leads: {
        Row: {
          budget_range: string | null
          channel: string | null
          consent: boolean
          created_at: string | null
          email: string
          full_name: string
          id: string
          looking_for: string
          message: string | null
          page_url: string | null
          phone: string | null
          preferred_location: string | null
          referrer: string | null
          utm: Json | null
        }
        Insert: {
          budget_range?: string | null
          channel?: string | null
          consent?: boolean
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          looking_for: string
          message?: string | null
          page_url?: string | null
          phone?: string | null
          preferred_location?: string | null
          referrer?: string | null
          utm?: Json | null
        }
        Update: {
          budget_range?: string | null
          channel?: string | null
          consent?: boolean
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          looking_for?: string
          message?: string | null
          page_url?: string | null
          phone?: string | null
          preferred_location?: string | null
          referrer?: string | null
          utm?: Json | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          assigned_to: string | null
          created_at: string | null
          full_name: string | null
          id: string
          message: string | null
          phone: string | null
          property_slug: string | null
          source: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          assigned_to?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          message?: string | null
          phone?: string | null
          property_slug?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          assigned_to?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          message?: string | null
          phone?: string | null
          property_slug?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      permissions: {
        Row: {
          created_at: string | null
          id: string
          module: string
          permission_description: string | null
          permission_name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          module: string
          permission_description?: string | null
          permission_name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          module?: string
          permission_description?: string | null
          permission_name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          created_by: string | null
          department: string | null
          full_name: string
          id: string
          last_login: string | null
          phone: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          department?: string | null
          full_name: string
          id: string
          last_login?: string | null
          phone?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          department?: string | null
          full_name?: string
          id?: string
          last_login?: string | null
          phone?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      project_assignments: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          id: string
          project_id: string | null
          role_in_project: string | null
          user_id: string | null
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          project_id?: string | null
          role_in_project?: string | null
          user_id?: string | null
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          project_id?: string | null
          role_in_project?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_assignments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          budget: number | null
          created_at: string | null
          created_by: string | null
          deadline: string | null
          description: string | null
          id: string
          progress: number | null
          spent: number | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          budget?: number | null
          created_at?: string | null
          created_by?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          progress?: number | null
          spent?: number | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          budget?: number | null
          created_at?: string | null
          created_by?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          progress?: number | null
          spent?: number | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          cover_page: number | null
          created_at: string | null
          floorplan_pages: number[] | null
          gallery_pages: number[] | null
          id: string
          location: string
          meta: Json | null
          pdf_path: string | null
          price_label: string
          slug: string
          title: string
        }
        Insert: {
          cover_page?: number | null
          created_at?: string | null
          floorplan_pages?: number[] | null
          gallery_pages?: number[] | null
          id?: string
          location: string
          meta?: Json | null
          pdf_path?: string | null
          price_label: string
          slug: string
          title: string
        }
        Update: {
          cover_page?: number | null
          created_at?: string | null
          floorplan_pages?: number[] | null
          gallery_pages?: number[] | null
          id?: string
          location?: string
          meta?: Json | null
          pdf_path?: string | null
          price_label?: string
          slug?: string
          title?: string
        }
        Relationships: []
      }
      service_inquiries: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string
          id: string
          message: string | null
          phone: string | null
          service_type: string
          source: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name: string
          id?: string
          message?: string | null
          phone?: string | null
          service_type: string
          source: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string
          id?: string
          message?: string | null
          phone?: string | null
          service_type?: string
          source?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      training_enrollments: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          message: string | null
          phone: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          message?: string | null
          phone?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          message?: string | null
          phone?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      insert_contact_submission: {
        Args: {
          p_email: string
          p_full_name: string
          p_message: string
          p_phone: string
          p_subject: string
        }
        Returns: string
      }
      insert_get_started_lead: {
        Args: {
          p_budget_range: string
          p_channel: string
          p_consent: boolean
          p_email: string
          p_full_name: string
          p_looking_for: string
          p_message: string
          p_page_url: string
          p_phone: string
          p_preferred_location: string
          p_referrer: string
          p_utm: Json
        }
        Returns: string
      }
      insert_lead: {
        Args: {
          p_full_name: string
          p_message: string
          p_phone: string
          p_property_slug: string
          p_source: string
        }
        Returns: string
      }
      insert_service_inquiry: {
        Args: {
          p_email: string
          p_full_name: string
          p_message: string
          p_phone: string
          p_service_type: string
          p_source: string
        }
        Returns: string
      }
      insert_training_enrollment: {
        Args: {
          p_email: string
          p_full_name: string
          p_message: string
          p_phone: string
        }
        Returns: string
      }
    }
    Enums: {
      app_role:
        | "admin"
        | "moderator"
        | "user"
        | "project_manager"
        | "sales_team"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
      app_role: ["admin", "moderator", "user", "project_manager", "sales_team"],
    },
  },
} as const
