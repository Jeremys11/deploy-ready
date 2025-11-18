import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus, Phone, Mail, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Members() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const members = [
    {
      id: "AMI001234",
      name: "John Martinez",
      dob: "1965-03-15",
      phone: "(555) 123-4567",
      condition: "Diabetes",
      pcp: "Dr. Sarah Chen",
      status: "active" as const,
      lastContact: "2024-01-15",
      vbc: true,
    },
    {
      id: "AMI001567",
      name: "Emily Chen",
      dob: "1972-08-22",
      phone: "(555) 234-5678",
      condition: "Hypertension",
      pcp: "Dr. Michael Ross",
      status: "pending" as const,
      lastContact: "2024-01-14",
      vbc: false,
    },
    {
      id: "AMI002891",
      name: "Robert Williams",
      dob: "1958-11-30",
      phone: "(555) 345-6789",
      condition: "COPD",
      pcp: "Dr. Jennifer Lee",
      status: "active" as const,
      lastContact: "2024-01-16",
      vbc: true,
    },
    {
      id: "AMI003445",
      name: "Lisa Thompson",
      dob: "1980-05-18",
      phone: "(555) 456-7890",
      condition: "Asthma",
      pcp: "Dr. David Park",
      status: "no-response" as const,
      lastContact: "2024-01-10",
      vbc: false,
    },
    {
      id: "AMI004123",
      name: "Maria Garcia",
      dob: "1969-09-25",
      phone: "(555) 567-8901",
      condition: "CHF",
      pcp: "Dr. Sarah Chen",
      status: "active" as const,
      lastContact: "2024-01-12",
      vbc: true,
    },
  ];

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Member Directory</h2>
          <p className="text-muted-foreground">
            Search and manage member information
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Member
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, ID, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => navigate(`/members/${member.id}`)}
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-lg font-semibold text-primary">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                
                <div className="flex-1 min-w-0 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.id}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span>{member.phone}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">DOB: {member.dob}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Condition:</span> {member.condition}
                    </p>
                    <p className="text-sm text-muted-foreground">PCP: {member.pcp}</p>
                  </div>
                  
                  <div className="flex flex-col items-start gap-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={member.status === "active" ? "default" : "secondary"}>
                        {member.status}
                      </Badge>
                      {member.vbc && (
                        <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                          VBC
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Last: {member.lastContact}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  <Button size="sm" variant="outline" onClick={(e) => {
                    e.stopPropagation();
                    // Handle call action
                  }}>
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={(e) => {
                    e.stopPropagation();
                    // Handle email action
                  }}>
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
