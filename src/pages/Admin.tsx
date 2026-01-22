import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock, Save, Loader2, ListOrdered, Settings2, Calendar } from "lucide-react";
import { useServices } from "@/hooks/use-services";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";
import { type Booking } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: services, isLoading: isLoadingServices } = useServices();
  const { data: bookings, isLoading: isLoadingBookings } = useQuery<Booking[]>({
    queryKey: ["/api/bookings"],
    enabled: isLoggedIn,
  });
  const { toast } = useToast();
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsLoggedIn(true);
      toast({ title: "Login Successful", description: "Welcome back, Admin." });
    } else {
      toast({ title: "Access Denied", description: "Invalid password.", variant: "destructive" });
    }
  };

  const handleUpdateRate = async (id: number, newRate: string) => {
    const rate = newRate === "" ? null : parseInt(newRate);
    if (rate !== null && isNaN(rate)) return;

    setUpdatingId(id);
    try {
      await apiRequest("PATCH", `/api/services/${id}/rate`, { rate });
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      toast({ title: "Success", description: "Price updated successfully." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to update price.", variant: "destructive" });
    } finally {
      setUpdatingId(null);
    }
  };

  if (!isLoggedIn) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 flex justify-center items-center min-h-[60vh]">
          <Card className="w-full max-w-md shadow-xl border-t-4 border-t-primary">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold font-display text-foreground">Admin Portal</CardTitle>
              <CardDescription className="text-muted-foreground">Secure access for finishing services management</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter admin password" value={password} onChange={(e) => setPassword(e.target.value)} required data-testid="input-password" />
                </div>
                <Button type="submit" className="w-full font-bold h-11" data-testid="button-login">Sign In</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <header className="mb-10 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold font-display text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your service rates and project bookings</p>
            </div>
            <Button variant="outline" onClick={() => setIsLoggedIn(false)}>Logout</Button>
          </header>

          <Tabs defaultValue="services" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
              <TabsTrigger value="services" className="flex items-center gap-2">
                <Settings2 className="w-4 h-4" />
                Services
              </TabsTrigger>
              <TabsTrigger value="bookings" className="flex items-center gap-2">
                <ListOrdered className="w-4 h-4" />
                Bookings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="services" className="space-y-6">
              <div className="grid gap-6">
                {isLoadingServices ? (
                  <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
                ) : (
                  services?.map((service) => (
                    <Card key={service.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-32 h-32 md:h-auto bg-muted">
                          <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover" />
                        </div>
                        <CardContent className="flex-1 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                          <div>
                            <h3 className="text-xl font-bold text-foreground mb-1">{service.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-1">{service.description}</p>
                          </div>
                          <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="flex-1 md:w-32">
                              <Label className="text-xs text-muted-foreground mb-1 block">Rate (Birr/{service.unit || 'unit'})</Label>
                              <Input 
                                type="number" 
                                defaultValue={service.rate || 0}
                                className="h-10"
                                onBlur={(e) => {
                                  if (parseInt(e.target.value) !== service.rate) {
                                    handleUpdateRate(service.id, e.target.value);
                                  }
                                }}
                              />
                            </div>
                            <Button 
                              size="icon" 
                              variant="secondary"
                              disabled={updatingId === service.id}
                              className="mt-5"
                            >
                              {updatingId === service.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="bookings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Project Bookings
                  </CardTitle>
                  <CardDescription>View all service requests submitted by customers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="font-bold">Name/Location</TableHead>
                          <TableHead className="font-bold">Service Type</TableHead>
                          <TableHead className="font-bold">Phone Number</TableHead>
                          <TableHead className="font-bold">Notes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoadingBookings ? (
                          <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                              <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" />
                            </TableCell>
                          </TableRow>
                        ) : bookings && bookings.length > 0 ? (
                          bookings.map((booking) => (
                            <TableRow key={booking.id} className="hover:bg-muted/30 transition-colors">
                              <TableCell className="font-medium">{booking.location}</TableCell>
                              <TableCell className="capitalize">{booking.serviceType}</TableCell>
                              <TableCell>{booking.phone}</TableCell>
                              <TableCell className="max-w-[300px] truncate text-muted-foreground italic">
                                {booking.comments || "No notes"}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                              No booking requests received yet.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
