import { KPICard } from "@/components/KPICard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Phone, Clock, TrendingUp, Plus, User, Calendar } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";

export default function Dashboard() {
  // Function to calculate engagement rate as percentage of contacts that became engagements
  const calculateEngagementRate = (contactsToday: number, engagementsToday: number): string => {
    if (contactsToday === 0) return "0%";
    const rate = (engagementsToday / contactsToday) * 100;
    return `${rate.toFixed(1)}%`;
  };

  // Example data - replace with actual data from your API/state
  const contactsToday = 0;
  const engagementsToday = 0;
  const engagementRate = calculateEngagementRate(contactsToday, engagementsToday);

  const recentActivity = [
    /*
    {
      id: 1,
      member: "John Martinez",
      memberId: "AMI001234",
      action: "Phone outreach completed",
      worker: "Sarah Johnson",
      time: "15 minutes ago",
      outcome: "active" as const,
    }
      */
  ];

  const priorityMembers = [
    /*
    {
      id: 1,
      name: "Maria Garcia",
      memberId: "AMI004123",
      condition: "Diabetes",
      lastContact: "5 days ago",
      reason: "High utilization - 3 ER visits this month",
    }
      */
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            SAMPLE TEXT P TEXT-MUTED-FOREGROUND
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Outreach
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Active Members"
          value="0"
          icon={Users}
          //trend={{ value: "+12% from last month", positive: true }}
        />
        <KPICard
          title="Contacts Today"
          value={contactsToday.toString()}
          icon={Phone}
          //trend={{ value: "+8% from yesterday", positive: true }}
        />
        <KPICard
          title="Open Cases"
          value="0"
          icon={Clock}
          //description="23 require follow-up today"
        />
        <KPICard
          title="Engagement Rate"
          value={engagementRate}
          icon={TrendingUp}
          //trend={{ value: "+3% from last week", positive: true }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 pb-4 border-b last:border-b-0 last:pb-0"
                >
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{activity.member}</p>
                        <p className="text-sm text-muted-foreground">{activity.memberId}</p>
                      </div>
                      <StatusBadge status={activity.outcome} />
                    </div>
                    <p className="text-sm mt-1">{activity.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      by {activity.worker} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-warning" />
              Priority Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {priorityMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-start gap-3 pb-4 border-b last:border-b-0 last:pb-0"
                >
                  <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center shrink-0">
                    <User className="h-5 w-5 text-warning" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.memberId}</p>
                      </div>
                      <Button size="sm" variant="outline">Contact</Button>
                    </div>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">Condition:</span> {member.condition}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Last contact:</span> {member.lastContact}
                      </p>
                      <p className="text-xs text-warning font-medium mt-1">{member.reason}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
