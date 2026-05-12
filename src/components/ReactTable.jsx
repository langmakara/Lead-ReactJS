import { Box } from "@chakra-ui/react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { columns as columnDefs } from "./Columns";
import { getAllProduct } from "../api/product";
import { useEffect, useState, useMemo } from "react";

export const BasicTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllProduct()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const columns = useMemo(() => columnDefs, []);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <Box>Loading...</Box>;
  if (error) return <Box color="red.500">Error: {error.message}</Box>;

  return (
    <Box shadow="2xl" p={2}>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

export default BasicTable;
