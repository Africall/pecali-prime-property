import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, Users, Briefcase, FolderKanban, BarChart3, Settings, FileText, Building2, GraduationCap, Star, Mail } from "lucide-react";
import UserManagement from "./UserManagement";
import LeadsManagement from "./LeadsManagement";
import ProjectsManagement from "./ProjectsManagement";
import ActivityLogs from "./ActivityLogs";
import { PropertyManagement } from "./PropertyManagement";
import { ServiceInquiries } from "./ServiceInquiries";
import { TrainingEnrollments } from "./TrainingEnrollments";
import GetStartedLeads from "./GetStartedLeads";
import ContactSubmissions from "./ContactSubmissions";

interface AdminViewProps {
  user: User;
  onLogout: () => void;
}

const AdminView = ({ user, onLogout }: AdminViewProps) => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLeads: 0,
    totalProjects: 0,
    newLeadsToday: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Get started leads
      const { count: getStartedCount } = await supabase
        .from('get_started_leads')
        .select('*', { count: 'exact', head: true });

      // Property leads
      const { count: propertyLeadsCount } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true });

      // Total users
      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Total projects
      const { count: projectsCount } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true });

      // New Get Started leads today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const { count: newLeadsCount } = await supabase
        .from('get_started_leads')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString());

      setStats({
        totalUsers: usersCount || 0,
        totalLeads: (getStartedCount || 0) + (propertyLeadsCount || 0),
        totalProjects: projectsCount || 0,
        newLeadsToday: newLeadsCount || 0,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <Badge className="mt-2 bg-red-500">ADMIN</Badge>
        </div>
        <Button onClick={onLogout} variant="outline">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-3xl font-bold">{stats.totalUsers}</p>
            </div>
            <Users className="h-8 w-8 text-primary" />
          </div>
        </div>
        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Leads</p>
              <p className="text-3xl font-bold">{stats.totalLeads}</p>
            </div>
            <Briefcase className="h-8 w-8 text-primary" />
          </div>
        </div>
        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Projects</p>
              <p className="text-3xl font-bold">{stats.totalProjects}</p>
            </div>
            <FolderKanban className="h-8 w-8 text-primary" />
          </div>
        </div>
        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">New Leads Today</p>
              <p className="text-3xl font-bold">{stats.newLeadsToday}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-primary" />
          </div>
        </div>
      </div>

      <Tabs defaultValue="get-started" className="space-y-4">
        <TabsList className="grid grid-cols-3 lg:grid-cols-9 w-full">
          <TabsTrigger value="get-started" className="relative">
            <Star className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Get Started</span>
            <Badge className="ml-2 bg-red-500 text-xs hidden md:inline">Priority</Badge>
          </TabsTrigger>
          <TabsTrigger value="appointments">
            <Briefcase className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Appointments</span>
          </TabsTrigger>
          <TabsTrigger value="contact">
            <Mail className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Contact</span>
          </TabsTrigger>
          <TabsTrigger value="inquiries">
            <Briefcase className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Services</span>
          </TabsTrigger>
          <TabsTrigger value="training">
            <GraduationCap className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Training</span>
          </TabsTrigger>
          <TabsTrigger value="leads">
            <Users className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Prop Leads</span>
          </TabsTrigger>
          <TabsTrigger value="properties">
            <Building2 className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Properties</span>
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Users</span>
          </TabsTrigger>
          <TabsTrigger value="projects">
            <FolderKanban className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Projects</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="get-started">
          <GetStartedLeads />
        </TabsContent>

        <TabsContent value="appointments">
          <ServiceInquiries />
        </TabsContent>

        <TabsContent value="contact">
          <ContactSubmissions />
        </TabsContent>

        <TabsContent value="inquiries">
          <ServiceInquiries />
        </TabsContent>

        <TabsContent value="training">
          <TrainingEnrollments />
        </TabsContent>

        <TabsContent value="leads">
          <LeadsManagement userRole="admin" userId={user.id} />
        </TabsContent>

        <TabsContent value="properties">
          <PropertyManagement />
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        <TabsContent value="projects">
          <ProjectsManagement userRole="admin" userId={user.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminView;
