import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileSpreadsheet } from "lucide-react";
import { useState } from "react";
import { handleXlsxFileUpload, RowData, updateCell, exportToXlsx } from "@/utils/xlsxHelpers";

export default function MainPage() {
  const [xlsxData, setXlsxData] = useState<RowData[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [displayCount, setDisplayCount] = useState<number>(20);
  const [editingCell, setEditingCell] = useState<{ rowIndex: number; key: string } | null>(null);
  const [editingRows, setEditingRows] = useState<Set<number>>(new Set());
  const [editableColumnKey, setEditableColumnKey] = useState<string | null>(null);

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 20);
  };

  const handleCellEdit = (rowIndex: number, key: string, value: string) => {
    const updatedData = updateCell(xlsxData, rowIndex, key, value);
    setXlsxData(updatedData);
    setEditingCell(null);
  };

  const handleExport = () => {
    const exportFileName = fileName.replace('.xlsx', '').replace('.xls', '') + '_modified';
    exportToXlsx(xlsxData, exportFileName);
  };

  const toggleRowEditMode = (rowIndex: number) => {
    const newEditingRows = new Set(editingRows);
    if (newEditingRows.has(rowIndex)) {
      newEditingRows.delete(rowIndex);
    } else {
      newEditingRows.add(rowIndex);
      // Set the editable column to the first column (index 0)
      if (xlsxData.length > 0 && !editableColumnKey) {
        const firstColumnKey = Object.keys(xlsxData[0])[0];
        setEditableColumnKey(firstColumnKey);
      }
    }
    setEditingRows(newEditingRows);
    setEditingCell(null);
  };

  const isColumnEditable = (rowIndex: number, key: string): boolean => {
    return editingRows.has(rowIndex) && key === editableColumnKey;
  };

  const hasMore = displayCount < xlsxData.length;
  const displayedData = xlsxData.slice(0, displayCount);

  return (
  <div className="container mx-auto p-8 space-y-8">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            XLSX Data Viewer
          </CardTitle>
          <CardDescription>Upload an Excel file and view all rows</CardDescription>
        </div>
        {xlsxData.length > 0 && (
          <Button onClick={handleExport} variant="outline" size="sm">
            Export Modified Data
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="xlsx-file">Upload Excel File</Label>
          <Input 
            id="xlsx-file" 
            type="file" 
            accept=".xlsx,.xls"
            onChange={(e) => handleXlsxFileUpload(e, (data, name) => {
              setXlsxData(data);
              setFileName(name);
              setDisplayCount(20);
            })}
          />
          {fileName && (
            <p className="text-sm text-muted-foreground">
              Loaded: {fileName} ({xlsxData.length} rows)
              {editingRows.size > 0 && editableColumnKey && (
                <span className="ml-2 text-primary font-semibold">
                  • Editing {editingRows.size} row(s): {editableColumnKey}
                </span>
              )}
            </p>
          )}
        </div>

        {xlsxData.length > 0 && (
          <div className="space-y-2">
            <Label>All Rows (Showing {displayedData.length} of {xlsxData.length})</Label>
            <div className="space-y-3">
              {displayedData.map((row, index) => (
                <Card key={index} className="bg-muted/50">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                    <CardTitle className="text-sm">Row {index + 1}</CardTitle>
                    <Button 
                      onClick={() => toggleRowEditMode(index)} 
                      variant={editingRows.has(index) ? "default" : "outline"}
                      size="sm"
                    >
                      {editingRows.has(index) ? "Exit Edit" : "Edit"}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {Object.entries(row).map(([key, value]) => (
                        <div key={key} className="space-y-1">
                          <Label className="text-xs font-semibold">{key}</Label>
                          {editingCell?.rowIndex === index && editingCell?.key === key && isColumnEditable(index, key) ? (
                            <Input
                              defaultValue={String(value)}
                              onBlur={(e) => handleCellEdit(index, key, e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleCellEdit(index, key, e.currentTarget.value);
                                }
                              }}
                              autoFocus
                              className="h-9"
                            />
                          ) : (
                            <div
                              onClick={() => isColumnEditable(index, key) && setEditingCell({ rowIndex: index, key })}
                              className={`text-sm text-muted-foreground p-2 border rounded min-h-[36px] flex items-center ${
                                isColumnEditable(index, key) ? 'cursor-pointer hover:bg-muted/50' : 'cursor-default'
                              }`}
                            >
                              {String(value)}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {hasMore && (
              <div className="flex justify-center pt-4">
                <Button onClick={handleLoadMore} variant="outline">
                  Load More ({xlsxData.length - displayCount} remaining)
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  </div>
  );
}
