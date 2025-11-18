import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Settings as SettingsIcon, Database, Shield } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage system configuration and preferences
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              Manage team members, roles, and permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline">Manage Users</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <Database className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Data Import</CardTitle>
            <CardDescription>
              Upload member data and outreach history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline">Import Data</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <SettingsIcon className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>System Configuration</CardTitle>
            <CardDescription>
              Configure outcome lists and contact methods
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline">Configure</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Security & Access</CardTitle>
            <CardDescription>
              Manage authentication and access controls
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline">Security Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
