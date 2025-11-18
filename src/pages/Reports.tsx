import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar } from "lucide-react";

export default function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Reports & Analytics</h2>
        <p className="text-muted-foreground">
          Generate and export outreach reports
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg">Outreach Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Overall outreach activities, outcomes, and engagement rates
            </p>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Generate
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg">Worker Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Individual worker statistics and caseload metrics
            </p>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Generate
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg">Monthly Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Month-over-month comparison and trend analysis
            </p>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Generate
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
