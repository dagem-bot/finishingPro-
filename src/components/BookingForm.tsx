import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CalendarCheck2, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export function BookingForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    serviceType: "",
    phone: "",
    comments: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/bookings", formData);
      toast({
        title: "Booking Requested",
        description: "We have received your request and will contact you shortly.",
      });
      setFormData({
        location: "",
        serviceType: "",
        phone: "",
        comments: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit booking request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-t-4 border-t-primary">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <CalendarCheck2 className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold font-display text-foreground">Book a Service</CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          Fill out the form below to request a professional finishing service.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-foreground">Location</Label>
              <Input
                id="location"
                placeholder="e.g. Kotebe, Addis Ababa"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                className="bg-white text-black"
                data-testid="input-location"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceType" className="text-foreground">Service Type</Label>
              <Select 
                value={formData.serviceType} 
                onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
              >
                <SelectTrigger id="serviceType" className="bg-white text-black" data-testid="select-service">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gypsum">Gypsum Work</SelectItem>
                  <SelectItem value="painting">Painting</SelectItem>
                  <SelectItem value="decoration">Decoration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="e.g. 0912345678"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="bg-white text-black"
              data-testid="input-phone"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comments" className="text-foreground">Comments / Additional Notes</Label>
            <Textarea
              id="comments"
              placeholder="Tell us more about your project..."
              className="min-h-[100px] bg-white text-black"
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
              data-testid="textarea-comments"
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full h-12 font-bold text-lg" data-testid="button-book-service">
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
            Request Booking
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
