import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import type { Service } from "@shared/schema";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link href={`/services`}>
      <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
          <img
            src={service.imageUrl}
            alt={service.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute bottom-4 left-4 z-20">
            <span className="bg-primary/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Service
            </span>
          </div>
        </div>
        
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold font-display text-foreground mb-2 group-hover:text-primary transition-colors">
            {service.name}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
            {service.description}
          </p>
          
          <div className="flex items-center justify-between mt-auto">
            {service.rate ? (
              <div>
                <span className="text-xs text-muted-foreground block font-medium">Starting from</span>
                <span className="text-lg font-bold text-primary">
                  {service.rate} Birr<span className="text-sm font-normal text-muted-foreground">/{service.unit}</span>
                </span>
              </div>
            ) : (
              <span className="text-sm font-bold text-muted-foreground">Custom Quote</span>
            )}
            
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
