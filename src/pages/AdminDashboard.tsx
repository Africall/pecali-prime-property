import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LogoRain from "@/components/LogoRain";
import AdminView from "@/components/admin/AdminView";
import ProjectManagerView from "@/components/admin/ProjectManagerView";
import SalesTeamView from "@/components/admin/SalesTeamView";
import { AuthGuard } from "@/components/AuthGuard";

type UserRole = 'admin' | 'project_manager' | 'sales_team';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current user once on mount
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user);
        checkUserRole(user.id);
      }
    });
  }, []);

  const checkUserRole = async (userId: string) => {
    try {
      const { data: roles, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching user role:", error);
        toast.error("Error checking permissions: " + error.message);
        setLoading(false);
        return;
      }

      if (roles && roles.role) {
        setUserRole(roles.role as UserRole);
      } else {
        console.log("No role found for user:", userId);
        toast.error("Access denied. Please contact an administrator to assign you a role.");
        setTimeout(() => navigate("/"), 3000);
      }
    } catch (error) {
      console.error("Error checking role:", error);
      toast.error("Unexpected error checking permissions");
      setTimeout(() => navigate("/"), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
    toast.success("Logged out successfully");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!userRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4 max-w-md mx-auto p-8 bg-card rounded-lg border">
          <h2 className="text-2xl font-bold">Access Denied</h2>
          <p className="text-muted-foreground">
            You don't have permission to access this area. Please contact an administrator to assign you a role.
          </p>
          <div className="flex gap-2 justify-center">
            <Button onClick={() => navigate("/")} variant="outline">
              Go Home
            </Button>
            <Button onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Navbar />
        <LogoRain />
        
        <div className="container mx-auto px-4 py-8">
          {userRole === 'admin' && <AdminView user={user!} onLogout={handleLogout} />}
          {userRole === 'project_manager' && <ProjectManagerView user={user!} onLogout={handleLogout} />}
          {userRole === 'sales_team' && <SalesTeamView user={user!} onLogout={handleLogout} />}
        </div>

        <Footer />
      </div>
    </AuthGuard>
  );
};

export default AdminDashboard;
