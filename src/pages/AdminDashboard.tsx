import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LogoRain from "@/components/LogoRain";
import AdminView from "@/components/admin/AdminView";
import ProjectManagerView from "@/components/admin/ProjectManagerView";
import SalesTeamView from "@/components/admin/SalesTeamView";

type UserRole = 'admin' | 'project_manager' | 'sales_team';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      checkUserRole(user.id);
    } else {
      navigate("/auth");
    }
  }, [user, navigate]);

  const checkUserRole = async (userId: string) => {
    try {
      const { data: roles, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error("Error fetching user role:", error);
        toast.error("Access denied. No role assigned.");
        navigate("/");
        return;
      }

      if (roles) {
        setUserRole(roles.role as UserRole);
      } else {
        toast.error("Access denied. No role assigned.");
        navigate("/");
      }
    } catch (error) {
      console.error("Error checking role:", error);
      toast.error("Error checking permissions");
      navigate("/");
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
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="mb-4">You don't have permission to access this area.</p>
        </div>
      </div>
    );
  }

  return (
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
  );
};

export default AdminDashboard;
