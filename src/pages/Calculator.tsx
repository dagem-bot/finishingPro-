import { Layout } from "@/components/Layout";
import { useServices } from "@/hooks/use-services";
import { useState, useMemo } from "react";
import { Calculator as CalcIcon, RefreshCw, DollarSign, Ruler } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Calculator() {
  const { data: services, isLoading } = useServices();
  
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");

  const selectedService = services?.find(s => s.id === selectedServiceId);
  
  // Filter only services that have a rate
  const calculableServices = services?.filter(s => s.rate !== null) || [];

  const area = useMemo(() => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    if (isNaN(l) || isNaN(w)) return 0;
    return l * w;
  }, [length, width]);

  const estimate = useMemo(() => {
    if (!selectedService?.rate) return 0;
    return area * selectedService.rate;
  }, [area, selectedService]);

  const handleReset = () => {
    setLength("");
    setWidth("");
    setSelectedServiceId(null);
  };

  return (
    <Layout>
      <div className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4 uppercase tracking-wider">
                <CalcIcon className="w-4 h-4" /> Cost Estimator
              </span>
              <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-4">
                Calculate Your Project Cost
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Get an instant estimate for your gypsum or painting project. Simply select a service and enter your room dimensions.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Calculator Form */}
              <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-black/5 border border-border">
                <div className="space-y-8">
                  {/* Step 1: Select Service */}
                  <div className="space-y-4">
                    <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                      1. Select Service
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {isLoading ? (
                        <div className="col-span-2 text-center py-4 text-muted-foreground">Loading services...</div>
                      ) : (
                        calculableServices.map((service) => (
                          <div
                            key={service.id}
                            onClick={() => setSelectedServiceId(service.id)}
                            className={cn(
                              "cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group hover:shadow-md",
                              selectedServiceId === service.id
                                ? "border-primary bg-primary/5 shadow-inner"
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            <div>
                              <div className="font-bold text-foreground">{service.name}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {service.rate} Birr / {service.unit}
                              </div>
                            </div>
                            <div className={cn(
                              "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                              selectedServiceId === service.id ? "border-primary" : "border-muted-foreground/30"
                            )}>
                              {selectedServiceId === service.id && (
                                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Step 2: Dimensions */}
                  <div className="space-y-4">
                    <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                      2. Enter Dimensions (Meters)
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Length (m)</label>
                        <div className="relative">
                          <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            type="number"
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                            placeholder="0.00"
                            className="w-full pl-10 pr-4 py-3 bg-muted/20 border-2 border-border rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-mono text-lg"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Width (m)</label>
                        <div className="relative">
                          <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            type="number"
                            value={width}
                            onChange={(e) => setWidth(e.target.value)}
                            placeholder="0.00"
                            className="w-full pl-10 pr-4 py-3 bg-muted/20 border-2 border-border rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-mono text-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleReset}
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reset Calculator
                  </button>
                </div>
              </div>

              {/* Result Card */}
              <div className="lg:col-span-5">
                <div className="sticky top-24 bg-foreground text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  
                  <h3 className="text-xl font-bold font-display mb-6 relative z-10">Estimated Cost</h3>
                  
                  <div className="space-y-6 relative z-10">
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                      <span className="text-gray-400">Total Area</span>
                      <span className="text-xl font-mono font-bold">{area.toFixed(2)} m²</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                      <span className="text-gray-400">Rate</span>
                      <span className="text-xl font-mono">
                        {selectedService ? `${selectedService.rate} Birr` : '---'}
                      </span>
                    </div>

                    <div className="pt-4">
                      <div className="text-sm text-gray-400 mb-2">Total Estimate</div>
                      <div className="flex items-start gap-1">
                        <span className="text-2xl font-bold text-primary mt-1">ETB</span>
                        <AnimatePresence mode="wait">
                          <motion.span 
                            key={estimate}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-6xl font-bold font-display tracking-tight"
                          >
                            {estimate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="bg-white/10 rounded-xl p-4 text-sm text-gray-300">
                      <p className="flex gap-2">
                        <span className="text-primary font-bold">Note:</span>
                        This is an estimation. Final price may vary based on site conditions and specific requirements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
