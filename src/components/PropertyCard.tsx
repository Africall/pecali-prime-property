import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MapPin, BedDouble, Bath, Square, Eye, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: string;
    type: string;
    bedrooms: number;
    bathrooms: number;
    area: string;
    image: string;
    featured?: boolean;
    status: "For Sale" | "For Rent" | "Sold";
  };
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  return (
    <Card 
      className={cn(
        "group overflow-hidden border-0 shadow-card hover:shadow-luxury transition-all duration-300 transform hover:-translate-y-2",
        "bg-card hover:bg-card-hover"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
        
        {/* Overlay */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-70"
        )} />

        {/* Status Badge */}
        <Badge 
          className={cn(
            "absolute top-4 left-4 font-semibold",
            property.status === "For Sale" && "bg-success text-white",
            property.status === "For Rent" && "bg-primary text-white",
            property.status === "Sold" && "bg-muted-foreground text-white"
          )}
        >
          {property.status}
        </Badge>

        {/* Featured Badge */}
        {property.featured && (
          <Badge className="absolute top-4 right-4 bg-gradient-gold text-foreground font-semibold">
            Featured
          </Badge>
        )}

        {/* Like Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={cn(
            "absolute top-4 right-4 p-2 rounded-full transition-all duration-200",
            property.featured ? "right-20" : "right-4",
            isLiked ? "bg-red-500 text-white" : "bg-white/90 text-foreground hover:bg-white"
          )}
        >
          <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
        </button>

        {/* Action Buttons (always shown on mobile, shown on hover for desktop) */}
        <div className={cn(
          "absolute bottom-4 left-4 right-4 flex gap-2 transition-all duration-300",
          isMobile || isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}>
          <Button size="sm" variant="secondary" className="flex-1 bg-white/90 hover:bg-white text-foreground">
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button size="sm" className="flex-1 bg-gradient-primary hover:bg-gradient-luxury">
            <Phone className="h-4 w-4 mr-1" />
            Call
          </Button>
        </div>

        {/* Price */}
        <div className="absolute bottom-4 left-4 text-white">
          <div className="text-2xl font-bold">{property.price}</div>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-6">
        <div className="space-y-3">
          {/* Title */}
          <h3 className="text-xl font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.location}</span>
          </div>

          {/* Property Details */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <BedDouble className="h-4 w-4 mr-1" />
                <span>{property.bedrooms}</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                <span>{property.bathrooms}</span>
              </div>
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1" />
                <span>{property.area}</span>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              {property.type}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;