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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Trash2, Edit } from "lucide-react";
import { toast } from "sonner";

interface GetStartedLead {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  looking_for: string;
  budget_range: string | null;
  preferred_location: string | null;
  message: string | null;
  channel: string | null;
  created_at: string;
  status?: string;
}

export const GetStartedLeads = () => {
  const [leads, setLeads] = useState<GetStartedLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<GetStartedLead | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editedLead, setEditedLead] = useState<GetStartedLead | null>(null);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('get_started_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error: any) {
      console.error("Error loading leads:", error);
      toast.error("Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;

    try {
      const { error } = await supabase
        .from('get_started_leads')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success("Lead deleted successfully");
      loadLeads();
    } catch (error: any) {
      console.error("Error deleting lead:", error);
      toast.error("Failed to delete lead");
    }
  };

  const handleUpdate = async () => {
    if (!editedLead) return;

    try {
      const { error } = await supabase
        .from('get_started_leads')
        .update({
          full_name: editedLead.full_name,
          email: editedLead.email,
          phone: editedLead.phone,
          looking_for: editedLead.looking_for,
          budget_range: editedLead.budget_range,
          preferred_location: editedLead.preferred_location,
          message: editedLead.message,
        })
        .eq('id', editedLead.id);

      if (error) throw error;
      toast.success("Lead updated successfully");
      setEditOpen(false);
      loadLeads();
    } catch (error: any) {
      console.error("Error updating lead:", error);
      toast.error("Failed to update lead");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Get Started Leads</h2>
          <p className="text-sm text-muted-foreground">Highest priority - Complete client information</p>
        </div>
        <Badge className="bg-red-500 text-lg px-4 py-2">PRIORITY</Badge>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Looking For</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Channel</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center">Loading...</TableCell>
            </TableRow>
          ) : leads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center">No leads found</TableCell>
            </TableRow>
          ) : (
            leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">{lead.full_name}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{lead.email}</div>
                    {lead.phone && <div className="text-muted-foreground">{lead.phone}</div>}
                  </div>
                </TableCell>
                <TableCell>{lead.looking_for}</TableCell>
                <TableCell>{lead.budget_range || '-'}</TableCell>
                <TableCell>{lead.preferred_location || '-'}</TableCell>
                <TableCell>
                  <Badge variant="outline">{lead.channel || 'Email'}</Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{new Date(lead.created_at).toLocaleDateString()}</div>
                    <div className="text-muted-foreground">
                      {new Date(lead.created_at).toLocaleTimeString()}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedLead(lead);
                        setViewOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditedLead(lead);
                        setEditOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(lead.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* View Dialog */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <p className="font-medium">{selectedLead.full_name}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="font-medium">{selectedLead.email}</p>
                </div>
                <div>
                  <Label>Phone</Label>
                  <p className="font-medium">{selectedLead.phone || '-'}</p>
                </div>
                <div>
                  <Label>Looking For</Label>
                  <p className="font-medium">{selectedLead.looking_for}</p>
                </div>
                <div>
                  <Label>Budget Range</Label>
                  <p className="font-medium">{selectedLead.budget_range || '-'}</p>
                </div>
                <div>
                  <Label>Preferred Location</Label>
                  <p className="font-medium">{selectedLead.preferred_location || '-'}</p>
                </div>
                <div>
                  <Label>Channel</Label>
                  <p className="font-medium">{selectedLead.channel || 'Email'}</p>
                </div>
                <div>
                  <Label>Submitted</Label>
                  <p className="font-medium">
                    {new Date(selectedLead.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              {selectedLead.message && (
                <div>
                  <Label>Message</Label>
                  <p className="mt-2 p-3 bg-muted rounded-md">{selectedLead.message}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Lead</DialogTitle>
            <DialogDescription>Update lead information</DialogDescription>
          </DialogHeader>
          {editedLead && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <Input
                    value={editedLead.full_name}
                    onChange={(e) =>
                      setEditedLead({ ...editedLead, full_name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={editedLead.email}
                    onChange={(e) =>
                      setEditedLead({ ...editedLead, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={editedLead.phone || ''}
                    onChange={(e) =>
                      setEditedLead({ ...editedLead, phone: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Looking For</Label>
                  <Input
                    value={editedLead.looking_for}
                    onChange={(e) =>
                      setEditedLead({ ...editedLead, looking_for: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Budget Range</Label>
                  <Input
                    value={editedLead.budget_range || ''}
                    onChange={(e) =>
                      setEditedLead({ ...editedLead, budget_range: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Preferred Location</Label>
                  <Input
                    value={editedLead.preferred_location || ''}
                    onChange={(e) =>
                      setEditedLead({ ...editedLead, preferred_location: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <Label>Message</Label>
                <Textarea
                  value={editedLead.message || ''}
                  onChange={(e) =>
                    setEditedLead({ ...editedLead, message: e.target.value })
                  }
                  rows={4}
                />
              </div>
              <Button onClick={handleUpdate} className="w-full">
                Save Changes
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GetStartedLeads;