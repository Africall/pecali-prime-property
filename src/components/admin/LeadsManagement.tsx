import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Eye, UserPlus, Trash2 } from "lucide-react";

interface Lead {
  id: string;
  source: string;
  full_name: string;
  phone: string;
  message: string | null;
  status: string;
  assigned_to: string | null;
  created_at: string;
}

interface LeadsManagementProps {
  userRole: 'admin' | 'sales_team';
  userId: string;
}

const LeadsManagement = ({ userRole, userId }: LeadsManagementProps) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeads();
  }, [userRole, userId]);

  const loadLeads = async () => {
    try {
      setLoading(true);
      let query = supabase.from('leads').select('*').order('created_at', { ascending: false });

      if (userRole === 'sales_team') {
        query = query.eq('assigned_to', userId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error("Error loading leads:", error);
      toast.error("Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (leadId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus })
        .eq('id', leadId);

      if (error) throw error;
      toast.success("Lead status updated");
      loadLeads();
    } catch (error) {
      console.error("Error updating lead:", error);
      toast.error("Failed to update lead");
    }
  };

  const handleDelete = async (leadId: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;

    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', leadId);

      if (error) throw error;
      toast.success("Lead deleted successfully");
      loadLeads();
    } catch (error: any) {
      console.error("Error deleting lead:", error);
      toast.error("Failed to delete lead");
    }
  };

  const getSourceLabel = (source: string) => {
    const labels: Record<string, string> = {
      'appointment_get_started': 'Get Started',
      'appointment_sales_team': 'Contact Sales',
      'appointment_management_quote': 'Management Quote',
      'appointment_consulting': 'Consultation',
      'appointment_investment_consultation': 'Investment Consultation',
      'appointment_valuation_request': 'Valuation Request',
      'appointment_legal_team': 'Legal Team',
      'appointment_property_journey': 'Property Journey',
      'home_card': 'Home Page',
      'property_page': 'Property Page',
    };
    return labels[source] || source;
  };

  const getStatusBadgeVariant = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      'new': 'default',
      'assigned': 'secondary',
      'contacted': 'outline',
      'qualified': 'default',
      'converted': 'default',
      'lost': 'destructive',
    };
    return variants[status] || 'default';
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Source</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">Loading...</TableCell>
              </TableRow>
            ) : leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">No leads found</TableCell>
              </TableRow>
            ) : (
              leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <Badge variant="outline">{getSourceLabel(lead.source)}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{lead.full_name}</TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>
                    <Select
                      value={lead.status}
                      onValueChange={(value) => handleStatusUpdate(lead.id, value)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="assigned">Assigned</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="qualified">Qualified</SelectItem>
                        <SelectItem value="converted">Converted</SelectItem>
                        <SelectItem value="lost">Lost</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{new Date(lead.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {userRole === 'admin' && (
                        <>
                          {!lead.assigned_to && (
                            <Button variant="ghost" size="sm">
                              <UserPlus className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(lead.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </>
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

export default LeadsManagement;
