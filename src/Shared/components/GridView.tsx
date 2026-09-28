import { useEffect, useState, type JSX } from "react";

export interface GridViewProps<T> {
  data: Record<string, any>;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  className?: string;
  pageSize?: number;
}

function GridView<T>({
  data,
  onEdit,
  onDelete,
  className = "",
  pageSize = 10,
}: GridViewProps<T>) {
  if (!data || data.length == 0)
    return <p className="p-4">No Data is available</p>;
  const columns = Object.keys(data[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setpaginatedData] = useState<Record<string, any>[]>([]);
  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setpaginatedData(data.slice(startIndex, endIndex));
  }, [data, currentPage, pageSize]);
  return (
    <div className="{`overflow-auto ${className}`}">
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th className="px-4 py-2  text-left text-sm font-bold text-gray-600">
                {col.toUpperCase()}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="px-4 py-2  text-left text-sm font-bold text-gray-600">
                ACTIONS
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-t hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col} className="px-4 py-2 text-sm text-gray-700">
                  {String(row[col])}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-4 py-2 text-sm flex gap-2">
                  {onEdit && <button onClick={() => onEdit(row)}>Edit</button>}
                  {onDelete && (
                    <button onClick={() => onDelete(row)}>Delete</button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end gap-2 mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-2 py-1">
          Page {currentPage} of {Math.ceil(data.length / pageSize)}
        </span>

        <button
          disabled={currentPage === Math.ceil(data.length / pageSize)}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default GridView;
