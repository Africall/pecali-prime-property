import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Users, Mail, Building, Loader2, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LogoRain from "@/components/LogoRain";
import type { User, Session } from "@supabase/supabase-js";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [getStartedLeads, setGetStartedLeads] = useState<any[]>([]);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session) {
          navigate("/auth");
        } else {
          // Defer admin check with setTimeout
          setTimeout(() => {
            checkAdminStatus(session.user.id);
          }, 0);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate("/auth");
      } else {
        checkAdminStatus(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAdminStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase.rpc('has_role', {
        _user_id: userId,
        _role: 'admin'
      });

      if (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
        return;
      }

      setIsAdmin(data === true);
      
      if (data === true) {
        // Load admin data
        loadLeads();
        loadGetStartedLeads();
      }
    } catch (error) {
      console.error('Error in checkAdminStatus:', error);
      setIsAdmin(false);
    }
  };

  const loadLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Error loading leads:', error);
    }
  };

  const loadGetStartedLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('get_started_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGetStartedLeads(data || []);
    } catch (error) {
      console.error('Error loading get started leads:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      toast({
        title: "Logged out",
        description: "You've been successfully logged out.",
      });
      
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <LogoRain />
        <Navbar />
        <main className="pt-nav relative z-10 container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-destructive" />
                Access Denied
              </CardTitle>
              <CardDescription>
                You don't have admin privileges to access this page.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Your account: {user?.email}
              </p>
              <div className="flex gap-2">
                <Button onClick={() => navigate("/")} variant="outline" className="flex-1">
                  Go Home
                </Button>
                <Button onClick={handleLogout} variant="destructive" className="flex-1">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <LogoRain />
      <Navbar />
      
      <main className="pt-nav relative z-10 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Logged in as: {user?.email}</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="property-leads" className="space-y-6">
          <TabsList>
            <TabsTrigger value="property-leads">
              <Building className="w-4 h-4 mr-2" />
              Property Leads
            </TabsTrigger>
            <TabsTrigger value="get-started-leads">
              <Mail className="w-4 h-4 mr-2" />
              Get Started Leads
            </TabsTrigger>
          </TabsList>

          <TabsContent value="property-leads">
            <Card>
              <CardHeader>
                <CardTitle>Property Inquiry Leads</CardTitle>
                <CardDescription>
                  Leads from property detail pages and contact forms
                </CardDescription>
              </CardHeader>
              <CardContent>
                {leads.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No property leads yet.</p>
                ) : (
                  <div className="space-y-4">
                    {leads.map((lead) => (
                      <Card key={lead.id}>
                        <CardContent className="pt-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-semibold">Name</p>
                              <p className="text-sm text-muted-foreground">{lead.full_name || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm font-semibold">Phone</p>
                              <p className="text-sm text-muted-foreground">{lead.phone || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm font-semibold">Property</p>
                              <p className="text-sm text-muted-foreground">{lead.property_slug || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm font-semibold">Source</p>
                              <p className="text-sm text-muted-foreground">{lead.source || 'N/A'}</p>
                            </div>
                            {lead.message && (
                              <div className="col-span-2">
                                <p className="text-sm font-semibold">Message</p>
                                <p className="text-sm text-muted-foreground">{lead.message}</p>
                              </div>
                            )}
                            <div className="col-span-2">
                              <p className="text-sm font-semibold">Submitted</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(lead.created_at).toLocaleString('en-KE')}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="get-started-leads">
            <Card>
              <CardHeader>
                <CardTitle>Get Started Form Leads</CardTitle>
                <CardDescription>
                  Comprehensive leads from the Get Started wizard
                </CardDescription>
              </CardHeader>
              <CardContent>
                {getStartedLeads.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No get started leads yet.</p>
                ) : (
                  <div className="space-y-4">
                    {getStartedLeads.map((lead) => (
                      <Card key={lead.id}>
                        <CardContent className="pt-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-semibold">Name</p>
                              <p className="text-sm text-muted-foreground">{lead.full_name}</p>
                            </div>
                            <div>
                              <p className="text-sm font-semibold">Email</p>
                              <p className="text-sm text-muted-foreground">{lead.email}</p>
                            </div>
                            <div>
                              <p className="text-sm font-semibold">Phone</p>
                              <p className="text-sm text-muted-foreground">{lead.phone || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm font-semibold">Preferred Contact</p>
                              <p className="text-sm text-muted-foreground">{lead.channel}</p>
                            </div>
                            <div>
                              <p className="text-sm font-semibold">Looking For</p>
                              <p className="text-sm text-muted-foreground">{lead.looking_for}</p>
                            </div>
                            <div>
                              <p className="text-sm font-semibold">Budget Range</p>
                              <p className="text-sm text-muted-foreground">{lead.budget_range || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm font-semibold">Preferred Location</p>
                              <p className="text-sm text-muted-foreground">{lead.preferred_location || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm font-semibold">Submitted</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(lead.created_at).toLocaleString('en-KE')}
                              </p>
                            </div>
                            {lead.message && (
                              <div className="col-span-2">
                                <p className="text-sm font-semibold">Additional Message</p>
                                <p className="text-sm text-muted-foreground">{lead.message}</p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
