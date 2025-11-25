import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Users, UserPlus, Trash2 } from "lucide-react";
import { useState } from "react";
import { RowData } from "@/utils/xlsxHelpers";

interface Employee {
  id: string;
  name: string;
  email: string;
}

interface Assignment {
  rowIndex: number;
  employeeId: string;
  employeeName: string;
}

export default function Admin() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [newEmployeeName, setNewEmployeeName] = useState("");
  const [newEmployeeEmail, setNewEmployeeEmail] = useState("");
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [xlsxData] = useState<RowData[]>([]); // This would be loaded from your data source
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleAddEmployee = () => {
    if (newEmployeeName && newEmployeeEmail) {
      const newEmployee: Employee = {
        id: Date.now().toString(),
        name: newEmployeeName,
        email: newEmployeeEmail,
      };
      setEmployees([...employees, newEmployee]);
      setNewEmployeeName("");
      setNewEmployeeEmail("");
    }
  };

  const handleDeleteEmployee = (employeeId: string) => {
    if (confirm("Are you sure you want to delete this employee? This will remove all their assignments.")) {
      setEmployees(employees.filter(emp => emp.id !== employeeId));
      setAssignments(assignments.filter(assignment => assignment.employeeId !== employeeId));
    }
  };

  const handleAssignRows = () => {
    if (selectedEmployee && selectedRows.length > 0) {
      const employee = employees.find(emp => emp.id === selectedEmployee);
      if (employee) {
        const newAssignments = selectedRows.map(rowIndex => ({
          rowIndex,
          employeeId: employee.id,
          employeeName: employee.name,
        }));
        setAssignments([...assignments, ...newAssignments]);
        setSelectedRows([]);
        setSelectedEmployee("");
      }
    }
  };

  const handleToggleRow = (rowIndex: number) => {
    if (selectedRows.includes(rowIndex)) {
      setSelectedRows(selectedRows.filter(r => r !== rowIndex));
    } else {
      setSelectedRows([...selectedRows, rowIndex]);
    }
  };

  const handleUnassignRow = (rowIndex: number) => {
    setAssignments(assignments.filter(assignment => assignment.rowIndex !== rowIndex));
  };

  const getAssignmentForRow = (rowIndex: number): Assignment | undefined => {
    return assignments.find(assignment => assignment.rowIndex === rowIndex);
  };

  return (
    <div className="container mx-auto p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage employees and assign rows</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Employee Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Employees
            </CardTitle>
            <CardDescription>Add and manage employees</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="employee-name">Employee Name</Label>
                <Input
                  id="employee-name"
                  placeholder="John Doe"
                  value={newEmployeeName}
                  onChange={(e) => setNewEmployeeName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employee-email">Email</Label>
                <Input
                  id="employee-email"
                  type="email"
                  placeholder="john@example.com"
                  value={newEmployeeEmail}
                  onChange={(e) => setNewEmployeeEmail(e.target.value)}
                />
              </div>
              <Button onClick={handleAddEmployee} className="w-full">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Current Employees</Label>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {employees.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No employees added yet</p>
                ) : (
                  employees.map((employee) => {
                    const assignmentCount = assignments.filter(a => a.employeeId === employee.id).length;
                    return (
                      <Card key={employee.id} className="p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{employee.name}</p>
                            <p className="text-sm text-muted-foreground">{employee.email}</p>
                            <Badge variant="secondary" className="mt-1">
                              {assignmentCount} row(s) assigned
                            </Badge>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteEmployee(employee.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </Card>
                    );
                  })
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Row Assignment */}
        <Card>
          <CardHeader>
            <CardTitle>Assign Rows</CardTitle>
            <CardDescription>Select employee and rows to assign</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Select Employee</Label>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Selected Rows: {selectedRows.length}</Label>
              {selectedRows.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {selectedRows.map(rowIndex => (
                    <Badge key={rowIndex} variant="secondary">
                      Row {rowIndex + 1}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <Button
              onClick={handleAssignRows}
              className="w-full"
              disabled={!selectedEmployee || selectedRows.length === 0}
            >
              Assign Selected Rows
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Row Selection Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Data Rows</CardTitle>
          <CardDescription>Click rows to select for assignment</CardDescription>
        </CardHeader>
        <CardContent>
          {xlsxData.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No data loaded. Please load data from the main page first.
            </p>
          ) : (
            <div className="space-y-2">
              {xlsxData.map((row, index) => {
                const assignment = getAssignmentForRow(index);
                const isSelected = selectedRows.includes(index);
                
                return (
                  <Card
                    key={index}
                    className={`p-3 cursor-pointer transition-colors ${
                      isSelected ? 'border-primary bg-primary/5' : ''
                    } ${assignment ? 'border-green-500 bg-green-500/5' : ''}`}
                    onClick={() => !assignment && handleToggleRow(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Row {index + 1}</span>
                          {assignment && (
                            <Badge variant="default">
                              Assigned to {assignment.employeeName}
                            </Badge>
                          )}
                          {isSelected && !assignment && (
                            <Badge variant="secondary">Selected</Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {Object.entries(row).slice(0, 3).map(([key, value], i) => (
                            <span key={i} className="mr-3">
                              <span className="font-semibold">{key}:</span> {String(value)}
                            </span>
                          ))}
                        </div>
                      </div>
                      {assignment && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUnassignRow(index);
                          }}
                        >
                          Unassign
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
