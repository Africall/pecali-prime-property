import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Upload, Loader2 } from "lucide-react";

export const PropertyManagement = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    location: "",
    price_label: "",
    description: "",
    property_type: "",
    bedrooms: "",
    bathrooms: "",
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.slug || !formData.location || !formData.price_label) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload cover image if provided
      let coverImagePath = null;
      if (coverImage) {
        const fileExt = coverImage.name.split('.').pop();
        const fileName = `${formData.slug}-cover.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('property_pdfs')
          .upload(`covers/${fileName}`, coverImage, { upsert: true });

        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('property_pdfs')
          .getPublicUrl(`covers/${fileName}`);
        
        coverImagePath = publicUrl;
      }

      // Insert property into database
      const { error: insertError } = await supabase
        .from('properties')
        .insert({
          title: formData.title,
          slug: formData.slug,
          location: formData.location,
          price_label: formData.price_label,
          meta: {
            description: formData.description,
            property_type: formData.property_type,
            bedrooms: formData.bedrooms ? formData.bedrooms.split(',').map(b => parseInt(b.trim())) : [],
            bathrooms: formData.bathrooms ? formData.bathrooms.split(',').map(b => parseInt(b.trim())) : [],
            cover_image: coverImagePath,
          },
        });

      if (insertError) throw insertError;

      toast.success("Property added successfully!");
      setIsAdding(false);
      setFormData({
        title: "",
        slug: "",
        location: "",
        price_label: "",
        description: "",
        property_type: "",
        bedrooms: "",
        bathrooms: "",
      });
      setCoverImage(null);
    } catch (error: any) {
      console.error('Error adding property:', error);
      toast.error(error.message || "Failed to add property");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAdding) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Property Management</h3>
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Property
          </Button>
        </div>
        <p className="text-muted-foreground">
          Click "Add New Property" to list a new property on the website.
        </p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Property</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Property Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Elitz Residency"
                required
              />
            </div>
            <div>
              <Label htmlFor="slug">URL Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="e.g., elitz-residency"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Kilimani, Nairobi"
                required
              />
            </div>
            <div>
              <Label htmlFor="price_label">Price Label *</Label>
              <Input
                id="price_label"
                value={formData.price_label}
                onChange={(e) => setFormData({ ...formData, price_label: e.target.value })}
                placeholder="e.g., From Ksh 8.5M"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Property description..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="property_type">Property Type</Label>
              <Input
                id="property_type"
                value={formData.property_type}
                onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
                placeholder="e.g., Apartment"
              />
            </div>
            <div>
              <Label htmlFor="bedrooms">Bedrooms (comma-separated)</Label>
              <Input
                id="bedrooms"
                value={formData.bedrooms}
                onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                placeholder="e.g., 1,2,3,4"
              />
            </div>
            <div>
              <Label htmlFor="bathrooms">Bathrooms (comma-separated)</Label>
              <Input
                id="bathrooms"
                value={formData.bathrooms}
                onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                placeholder="e.g., 1,2,3"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="cover_image">Cover Image</Label>
            <div className="flex items-center gap-2">
              <Input
                id="cover_image"
                type="file"
                accept="image/*"
                onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
              />
              {coverImage && (
                <span className="text-sm text-muted-foreground">{coverImage.name}</span>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Add Property
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};