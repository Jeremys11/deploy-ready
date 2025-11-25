import * as XLSX from 'xlsx';

// Type for a row of data from the spreadsheet
export type RowData = Record<string, any>;

/**
 * Reads an XLSX file and returns all rows as an array of objects
 * @param file - The Excel file to read
 * @returns Promise that resolves to an array of row objects
 */
export const readXlsxFile = async (file: File): Promise<RowData[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        
        // Get the first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert sheet to JSON (array of objects)
        const jsonData: RowData[] = XLSX.utils.sheet_to_json(worksheet);
        
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file);
  });
};

/**
 * Randomly selects one row from an array of rows
 * @param rows - Array of row objects
 * @returns A randomly selected row, or null if array is empty
 */
export const getRandomRow = (rows: RowData[]): RowData | null => {
  if (!rows || rows.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * rows.length);
  return rows[randomIndex];
};

/**
 * Updates a specific row in the data array
 * @param data - Array of row objects
 * @param rowIndex - Index of the row to update
 * @param updatedRow - The updated row data
 * @returns New array with the updated row
 */
export const updateRow = (data: RowData[], rowIndex: number, updatedRow: RowData): RowData[] => {
  const newData = [...data];
  newData[rowIndex] = updatedRow;
  return newData;
};

/**
 * Updates a specific cell value in a row
 * @param data - Array of row objects
 * @param rowIndex - Index of the row to update
 * @param columnKey - The column/field name to update
 * @param newValue - The new value for the cell
 * @returns New array with the updated cell
 */
export const updateCell = (
  data: RowData[],
  rowIndex: number,
  columnKey: string,
  newValue: any
): RowData[] => {
  const newData = [...data];
  newData[rowIndex] = {
    ...newData[rowIndex],
    [columnKey]: newValue
  };
  return newData;
};

/**
 * Deletes a row from the data array
 * @param data - Array of row objects
 * @param rowIndex - Index of the row to delete
 * @returns New array with the row removed
 */
export const deleteRow = (data: RowData[], rowIndex: number): RowData[] => {
  return data.filter((_, index) => index !== rowIndex);
};

/**
 * Adds a new row to the data array
 * @param data - Array of row objects
 * @param newRow - The new row to add
 * @returns New array with the new row added
 */
export const addRow = (data: RowData[], newRow: RowData): RowData[] => {
  return [...data, newRow];
};

/**
 * Exports data to an XLSX file and triggers download
 * @param data - Array of row objects to export
 * @param fileName - Name of the file to download (without extension)
 */
export const exportToXlsx = (data: RowData[], fileName: string = 'modified_data') => {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();
  
  // Convert data to worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
  // Generate XLSX file and trigger download
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

/**
 * Handles file upload event and processes the Excel file
 * @param event - File input change event
 * @param onSuccess - Callback function when file is successfully loaded with data and filename
 * @param onError - Optional callback function when an error occurs
 */
export const handleXlsxFileUpload = async (
  event: React.ChangeEvent<HTMLInputElement>,
  onSuccess: (data: RowData[], fileName: string) => void,
  onError?: (error: unknown) => void
) => {
  const file = event.target.files?.[0];
  if (file) {
    try {
      const data = await readXlsxFile(file);
      onSuccess(data, file.name);
    } catch (error) {
      console.error("Error reading file:", error);
      if (onError) {
        onError(error);
      } else {
        alert("Failed to read the Excel file");
      }
    }
  }
};
