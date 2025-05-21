import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Truck, AlertTriangle } from 'lucide-react';

interface Location {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

interface NearbyEquipment {
  id: number;
  name: string;
  distance: number;
  status: string;
}

interface MapViewProps {
  location?: Location;
  nearbyEquipment?: NearbyEquipment[];
}

/**
 * Component to display a map view of a rental location and nearby equipment
 * Note: This is a placeholder component that would integrate with a mapping service
 * like Google Maps, Mapbox, or Leaflet in a real implementation
 */
const MapView = ({ location, nearbyEquipment }: MapViewProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!location) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed">
        <AlertTriangle className="h-10 w-10 text-muted-foreground mb-2" />
        <h3 className="text-lg font-medium">No Location Data</h3>
        <p className="text-sm text-muted-foreground">Location information is not available for this rental</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/10 rounded-lg">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-sm text-muted-foreground">Loading map data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative rounded-lg overflow-hidden border bg-muted/10">
      {/* Placeholder for actual map integration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      {/* Main location marker */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-primary/90 text-white p-3 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <div>
              <h3 className="font-medium">{location.name}</h3>
              <p className="text-xs">{location.address}, {location.city}</p>
            </div>
          </div>
        </div>
        <div className="w-4 h-4 bg-primary transform rotate-45 absolute -bottom-2 left-1/2 -translate-x-1/2"></div>
      </div>

      {/* Nearby equipment markers, if any */}
      {nearbyEquipment && nearbyEquipment.length > 0 && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white/90 p-3 rounded-lg shadow-md">
            <h3 className="text-sm font-medium mb-2">Nearby Equipment ({nearbyEquipment.length})</h3>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {nearbyEquipment.map((item) => (
                <div key={item.id} className="flex items-center gap-2 text-xs p-2 bg-muted/30 rounded">
                  <Truck className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  <div className="overflow-hidden">
                    <p className="font-medium truncate">{item.name}</p>
                    <div className="flex items-center text-muted-foreground">
                      <Navigation className="h-3 w-3 mr-1" />
                      <span>{item.distance.toFixed(1)} km away • {item.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Map controls (visual elements only) */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
          <PlusIcon className="h-5 w-5" />
        </button>
        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
          <MinusIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

// Helper icons
const PlusIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const MinusIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export default MapView; 