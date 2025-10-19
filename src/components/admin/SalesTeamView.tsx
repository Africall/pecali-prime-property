import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, Briefcase, TrendingUp, Calendar, Target } from "lucide-react";
import LeadsManagement from "./LeadsManagement";

interface SalesTeamViewProps {
  user: User;
  onLogout: () => void;
}

const SalesTeamView = ({ user, onLogout }: SalesTeamViewProps) => {
  const [stats, setStats] = useState({
    myLeads: 0,
    appointmentsToday: 0,
    convertedLeads: 0,
    conversionRate: 0,
  });

  useEffect(() => {
    loadStats();
  }, [user.id]);

  const loadStats = async () => {
    try {
      const { data: leads, count: totalCount } = await supabase
        .from('leads')
        .select('*', { count: 'exact' })
        .eq('assigned_to', user.id);

      const converted = leads?.filter(l => l.status === 'converted').length || 0;
      const conversionRate = totalCount ? Math.round((converted / totalCount) * 100) : 0;

      setStats({
        myLeads: totalCount || 0,
        appointmentsToday: 0, // TODO: Calculate from appointments
        convertedLeads: converted,
        conversionRate,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Sales Dashboard</h1>
          <Badge className="mt-2 bg-green-500">SALES TEAM</Badge>
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
              <p className="text-sm text-muted-foreground">My Leads</p>
              <p className="text-3xl font-bold">{stats.myLeads}</p>
            </div>
            <Briefcase className="h-8 w-8 text-primary" />
          </div>
        </div>
        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Appointments Today</p>
              <p className="text-3xl font-bold">{stats.appointmentsToday}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Converted</p>
              <p className="text-3xl font-bold">{stats.convertedLeads}</p>
            </div>
            <Target className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
              <p className="text-3xl font-bold">{stats.conversionRate}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg border shadow-sm">
        <h2 className="text-2xl font-bold mb-4">My Leads & Inquiries</h2>
        <LeadsManagement userRole="sales_team" userId={user.id} />
      </div>
    </div>
  );
};

export default SalesTeamView;
