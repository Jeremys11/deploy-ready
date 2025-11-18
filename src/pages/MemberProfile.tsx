import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Mail, MapPin, Calendar, User, FileText, Plus } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";

export default function MemberProfile() {
  const { memberId } = useParams();

  // Mock data - would be fetched based on memberId
  const member = {
    id: "AMI001234",
    name: "John Martinez",
    dob: "1965-03-15",
    age: 59,
    gender: "Male",
    phone: "(555) 123-4567",
    email: "john.martinez@email.com",
    address: "123 Main St, Springfield, IL 62701",
    pcp: {
      name: "Dr. Sarah Chen",
      npi: "1234567890",
      specialty: "Family Medicine",
    },
    medicaidId: "MED123456789",
    status: "active" as const,
    vbc: true,
    conditions: ["Diabetes Type 2", "Hypertension"],
  };

  const outreachHistory = [
    {
      id: 1,
      date: "2024-01-15",
      time: "10:30 AM",
      method: "Phone Call",
      worker: "Sarah Johnson",
      outcome: "Engaged",
      duration: "15 min",
      notes: "Discussed medication adherence. Member reports taking medications as prescribed. Scheduled follow-up appointment with PCP.",
      followUp: "2024-01-22",
    },
    {
      id: 2,
      date: "2024-01-08",
      time: "2:15 PM",
      method: "Home Visit",
      worker: "Sarah Johnson",
      outcome: "Engaged",
      duration: "45 min",
      notes: "Conducted health assessment. Reviewed blood glucose logs. Member needs assistance with transportation to appointments.",
      followUp: "2024-01-15",
    },
    {
      id: 3,
      date: "2024-01-02",
      time: "11:00 AM",
      method: "Phone Call",
      worker: "Mike Rodriguez",
      outcome: "No Response",
      duration: "-",
      notes: "Left voicemail requesting callback to schedule home visit.",
      followUp: "2024-01-05",
    },
  ];

  const utilization = {
    claimCount: 24,
    paidAmount: "$12,450",
    lastClaim: "2024-01-10",
    erVisits: 2,
    admissions: 1,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl font-bold tracking-tight">{member.name}</h2>
            <StatusBadge status={member.status} />
            {member.vbc && (
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                VBC Member
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Member ID: {member.id}</span>
            <span>•</span>
            <span>Age: {member.age}</span>
            <span>•</span>
            <span>{member.gender}</span>
          </div>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Log Outreach
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{member.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">{member.email}</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span>{member.address}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">DOB</span>
                <span className="font-medium">{member.dob}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Medicaid ID</span>
                <span className="font-medium">{member.medicaidId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">PCP</span>
                <span className="font-medium">{member.pcp.name}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Claims</span>
                <span className="font-medium">{utilization.claimCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Paid</span>
                <span className="font-medium">{utilization.paidAmount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">ER Visits (YTD)</span>
                <span className="font-medium">{utilization.erVisits}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="outreach" className="space-y-4">
        <TabsList>
          <TabsTrigger value="outreach">Outreach Timeline</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="utilization">Utilization</TabsTrigger>
        </TabsList>

        <TabsContent value="outreach" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Outreach History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {outreachHistory.map((entry, index) => (
                  <div key={entry.id} className="relative">
                    {index !== outreachHistory.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-px bg-border" />
                    )}
                    <div className="flex gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <p className="font-semibold">{entry.method}</p>
                            <p className="text-sm text-muted-foreground">
                              {entry.date} at {entry.time} • {entry.duration}
                            </p>
                          </div>
                          <Badge variant={entry.outcome === "Engaged" ? "default" : "secondary"}>
                            {entry.outcome}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm">{entry.notes}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Worker: {entry.worker}</span>
                            {entry.followUp && (
                              <>
                                <span>•</span>
                                <span>Follow-up: {entry.followUp}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics">
          <Card>
            <CardHeader>
              <CardTitle>Demographic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <p className="mt-1">{member.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                  <p className="mt-1">{member.dob}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Gender</label>
                  <p className="mt-1">{member.gender}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Medicaid ID</label>
                  <p className="mt-1">{member.medicaidId}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Primary Conditions</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {member.conditions.map((condition) => (
                    <Badge key={condition} variant="outline">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Primary Care Provider</label>
                <div className="mt-2 space-y-1">
                  <p>{member.pcp.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {member.pcp.specialty} • NPI: {member.pcp.npi}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="utilization">
          <Card>
            <CardHeader>
              <CardTitle>Utilization Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Total Claims</p>
                  <p className="text-2xl font-bold">{utilization.claimCount}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Total Paid</p>
                  <p className="text-2xl font-bold">{utilization.paidAmount}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">ER Visits</p>
                  <p className="text-2xl font-bold">{utilization.erVisits}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Admissions</p>
                  <p className="text-2xl font-bold">{utilization.admissions}</p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-sm text-muted-foreground mb-2">Last Claim Date</p>
                <p className="font-medium">{utilization.lastClaim}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
