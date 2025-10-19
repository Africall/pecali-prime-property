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

interface ContactSubmission {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editedSubmission, setEditedSubmission] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error: any) {
      console.error("Error loading contact submissions:", error);
      toast.error("Failed to load contact submissions");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      toast.success("Status updated");
      loadSubmissions();
    } catch (error: any) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success("Submission deleted successfully");
      loadSubmissions();
    } catch (error: any) {
      console.error("Error deleting submission:", error);
      toast.error("Failed to delete submission");
    }
  };

  const handleUpdate = async () => {
    if (!editedSubmission) return;

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({
          full_name: editedSubmission.full_name,
          email: editedSubmission.email,
          phone: editedSubmission.phone,
          subject: editedSubmission.subject,
          message: editedSubmission.message,
        })
        .eq('id', editedSubmission.id);

      if (error) throw error;
      toast.success("Submission updated successfully");
      setEditOpen(false);
      loadSubmissions();
    } catch (error: any) {
      console.error("Error updating submission:", error);
      toast.error("Failed to update submission");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Contact Form Submissions</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">Loading...</TableCell>
            </TableRow>
          ) : submissions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">No submissions found</TableCell>
            </TableRow>
          ) : (
            submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell className="font-medium">{submission.full_name}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{submission.email}</div>
                    {submission.phone && <div className="text-muted-foreground">{submission.phone}</div>}
                  </div>
                </TableCell>
                <TableCell>{submission.subject || '-'}</TableCell>
                <TableCell>
                  <Select
                    value={submission.status}
                    onValueChange={(value) => handleStatusUpdate(submission.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{new Date(submission.created_at).toLocaleDateString()}</div>
                    <div className="text-muted-foreground">
                      {new Date(submission.created_at).toLocaleTimeString()}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedSubmission(submission);
                        setViewOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditedSubmission(submission);
                        setEditOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(submission.id)}
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
            <DialogTitle>Contact Submission Details</DialogTitle>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <p className="font-medium">{selectedSubmission.full_name}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="font-medium">{selectedSubmission.email}</p>
                </div>
                <div>
                  <Label>Phone</Label>
                  <p className="font-medium">{selectedSubmission.phone || '-'}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge>{selectedSubmission.status}</Badge>
                </div>
                <div>
                  <Label>Submitted</Label>
                  <p className="font-medium">
                    {new Date(selectedSubmission.created_at).toLocaleString()}
                  </p>
                </div>
                <div>
                  <Label>Last Updated</Label>
                  <p className="font-medium">
                    {new Date(selectedSubmission.updated_at).toLocaleString()}
                  </p>
                </div>
              </div>
              {selectedSubmission.subject && (
                <div>
                  <Label>Subject</Label>
                  <p className="font-medium">{selectedSubmission.subject}</p>
                </div>
              )}
              <div>
                <Label>Message</Label>
                <p className="mt-2 p-3 bg-muted rounded-md whitespace-pre-wrap">
                  {selectedSubmission.message}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Contact Submission</DialogTitle>
            <DialogDescription>Update submission information</DialogDescription>
          </DialogHeader>
          {editedSubmission && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <Input
                    value={editedSubmission.full_name}
                    onChange={(e) =>
                      setEditedSubmission({ ...editedSubmission, full_name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={editedSubmission.email}
                    onChange={(e) =>
                      setEditedSubmission({ ...editedSubmission, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={editedSubmission.phone || ''}
                    onChange={(e) =>
                      setEditedSubmission({ ...editedSubmission, phone: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Subject</Label>
                  <Input
                    value={editedSubmission.subject || ''}
                    onChange={(e) =>
                      setEditedSubmission({ ...editedSubmission, subject: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <Label>Message</Label>
                <Textarea
                  value={editedSubmission.message}
                  onChange={(e) =>
                    setEditedSubmission({ ...editedSubmission, message: e.target.value })
                  }
                  rows={6}
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

export default ContactSubmissions;