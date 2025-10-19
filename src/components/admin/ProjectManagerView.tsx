import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, FolderKanban, CheckCircle, Clock } from "lucide-react";
import ProjectsManagement from "./ProjectsManagement";

interface ProjectManagerViewProps {
  user: User;
  onLogout: () => void;
}

const ProjectManagerView = ({ user, onLogout }: ProjectManagerViewProps) => {
  const [stats, setStats] = useState({
    activeProjects: 0,
    completedTasks: 0,
    upcomingDeadlines: 0,
  });

  useEffect(() => {
    loadStats();
  }, [user.id]);

  const loadStats = async () => {
    try {
      const { data: assignments } = await supabase
        .from('project_assignments')
        .select('project_id')
        .eq('user_id', user.id);

      if (assignments && assignments.length > 0) {
        const projectIds = assignments.map(a => a.project_id);
        const { count } = await supabase
          .from('projects')
          .select('id', { count: 'exact', head: true })
          .in('id', projectIds)
          .eq('status', 'active');

        setStats(prev => ({ ...prev, activeProjects: count || 0 }));
      }
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">My Projects Dashboard</h1>
          <Badge className="mt-2 bg-blue-500">PROJECT MANAGER</Badge>
        </div>
        <Button onClick={onLogout} variant="outline">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Projects</p>
              <p className="text-3xl font-bold">{stats.activeProjects}</p>
            </div>
            <FolderKanban className="h-8 w-8 text-primary" />
          </div>
        </div>
        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Completed Tasks</p>
              <p className="text-3xl font-bold">{stats.completedTasks}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Upcoming Deadlines</p>
              <p className="text-3xl font-bold">{stats.upcomingDeadlines}</p>
            </div>
            <Clock className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg border shadow-sm">
        <h2 className="text-2xl font-bold mb-4">My Assigned Projects</h2>
        <ProjectsManagement userRole="project_manager" userId={user.id} />
      </div>
    </div>
  );
};

export default ProjectManagerView;
