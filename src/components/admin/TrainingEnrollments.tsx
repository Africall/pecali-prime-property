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
import { Eye, Trash2 } from "lucide-react";

interface TrainingEnrollment {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

export const TrainingEnrollments = () => {
  const [enrollments, setEnrollments] = useState<TrainingEnrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEnrollments();
  }, []);

  const loadEnrollments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('training_enrollments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEnrollments(data || []);
    } catch (error) {
      console.error("Error loading enrollments:", error);
      toast.error("Failed to load enrollments");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (enrollmentId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('training_enrollments')
        .update({ status: newStatus })
        .eq('id', enrollmentId);

      if (error) throw error;
      toast.success("Status updated");
      loadEnrollments();
    } catch (error) {
      console.error("Error updating enrollment:", error);
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enrollment?")) return;

    try {
      const { error } = await supabase
        .from('training_enrollments')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success("Enrollment deleted successfully");
      loadEnrollments();
    } catch (error: any) {
      console.error("Error deleting enrollment:", error);
      toast.error("Failed to delete enrollment");
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Training Enrollments</h3>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
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
            ) : enrollments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">No enrollments found</TableCell>
              </TableRow>
            ) : (
              enrollments.map((enrollment) => (
                <TableRow key={enrollment.id}>
                  <TableCell className="font-medium">{enrollment.full_name}</TableCell>
                  <TableCell>{enrollment.email}</TableCell>
                  <TableCell>{enrollment.phone || "-"}</TableCell>
                  <TableCell>
                    <Select
                      value={enrollment.status}
                      onValueChange={(value) => handleStatusUpdate(enrollment.id, value)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="enrolled">Enrolled</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="dropped">Dropped</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{new Date(enrollment.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(enrollment.id)}
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
      </div>
    </div>
  );
};