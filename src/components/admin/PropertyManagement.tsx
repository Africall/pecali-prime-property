import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Upload, Loader2, X, Image as ImageIcon } from "lucide-react";

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
  const [galleryImages, setGalleryImages] = useState<File[]>([]);

  const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setGalleryImages(Array.from(e.target.files));
    }
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.slug || !formData.location || !formData.price_label) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!coverImage) {
      toast.error("Please upload a cover image");
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload cover image - store in public folder structure
      const coverExt = coverImage.name.split('.').pop();
      const coverFileName = `${formData.slug}-cover.${coverExt}`;
      
      // Upload to property_pdfs bucket under properties folder
      const { error: coverUploadError } = await supabase.storage
        .from('property_pdfs')
        .upload(`properties/${coverFileName}`, coverImage, { upsert: true });

      if (coverUploadError) throw coverUploadError;

      // Upload gallery images if provided
      const galleryPaths: string[] = [];
      if (galleryImages.length > 0) {
        for (let i = 0; i < galleryImages.length; i++) {
          const img = galleryImages[i];
          const ext = img.name.split('.').pop();
          const fileName = `${formData.slug}-${i + 1}.${ext}`;
          
          const { error: galleryUploadError } = await supabase.storage
            .from('property_pdfs')
            .upload(`properties/${fileName}`, img, { upsert: true });

          if (galleryUploadError) throw galleryUploadError;
          
          galleryPaths.push(fileName);
        }
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
            gallery: galleryPaths,
          },
        });

      if (insertError) throw insertError;

      toast.success("Property added successfully! It will now appear in the properties page and home carousel.");
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
      setGalleryImages([]);
      
      // Refresh the page to show the new property
      window.location.reload();
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
            <Label htmlFor="cover_image">Cover Image *</Label>
            <Input
              id="cover_image"
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
              className="mt-2"
              required
            />
            {coverImage && (
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <ImageIcon className="h-4 w-4" />
                <span>{coverImage.name}</span>
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              This will be the main image displayed in property listings
            </p>
          </div>

          <div>
            <Label htmlFor="gallery_images">Gallery Images (Optional)</Label>
            <Input
              id="gallery_images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryImagesChange}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Upload multiple images to showcase property features and interiors
            </p>
            {galleryImages.length > 0 && (
              <div className="mt-3 space-y-2">
                <p className="text-sm font-medium">{galleryImages.length} image(s) selected:</p>
                <div className="space-y-1">
                  {galleryImages.map((img, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                      <span className="text-sm flex items-center gap-2">
                        <ImageIcon className="h-4 w-4" />
                        {img.name}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeGalleryImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
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