import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Eye, Edit } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string | null;
  status: string;
  progress: number;
  budget: number | null;
  spent: number | null;
  deadline: string | null;
  created_at: string;
}

interface ProjectsManagementProps {
  userRole: 'admin' | 'project_manager';
  userId: string;
}

const ProjectsManagement = ({ userRole, userId }: ProjectsManagementProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, [userRole, userId]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      let query = supabase.from('projects').select('*').order('created_at', { ascending: false });

      if (userRole === 'project_manager') {
        // Get assigned projects
        const { data: assignments } = await supabase
          .from('project_assignments')
          .select('project_id')
          .eq('user_id', userId);

        if (assignments && assignments.length > 0) {
          const projectIds = assignments.map(a => a.project_id);
          query = query.in('id', projectIds);
        } else {
          setProjects([]);
          setLoading(false);
          return;
        }
      }

      const { data, error } = await query;

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error loading projects:", error);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      'active': 'default',
      'completed': 'default',
      'archived': 'secondary',
      'on_hold': 'destructive',
    };
    return variants[status] || 'default';
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">Loading...</TableCell>
              </TableRow>
            ) : projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  {userRole === 'project_manager' ? 'No projects assigned' : 'No projects found'}
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{project.title}</div>
                      {project.description && (
                        <div className="text-sm text-muted-foreground truncate max-w-xs">
                          {project.description}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(project.status)}>
                      {project.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Progress value={project.progress} className="w-24" />
                      <div className="text-xs text-muted-foreground">{project.progress}%</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {project.budget ? (
                      <div className="text-sm">
                        <div>${project.spent?.toLocaleString() || 0}</div>
                        <div className="text-xs text-muted-foreground">
                          of ${project.budget.toLocaleString()}
                        </div>
                      </div>
                    ) : '-'}
                  </TableCell>
                  <TableCell>
                    {project.deadline ? new Date(project.deadline).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {userRole === 'project_manager' && (
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProjectsManagement;
