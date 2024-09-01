import React from "react";
// import {
//   useTable,
//   usePagination,
//   useGlobalFilter,
//   useSortBy,
// } from "react-table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
// import CircularPagination from "../Pagination/CircularPagination";



// const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
//   return (
//     <input
//       value={globalFilter || ""}
//       onChange={(e) => setGlobalFilter(e.target.value || undefined)}
//       placeholder="Type to search..."
//       className="px-2 py-1 border rounded"
//     />
//   );
// };

const CustomTable = ({ columns, data, actions }) => {
  const navigate = useNavigate();
  const [sorting, setSorting] = React.useState([]);
  const [filtering, setFiltering] = React.useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,

  })

  return (
    <div className="h-screen">
      <Input
        value={filtering}
        onChange={e => setFiltering(e.target.value)}
        placeholder="Search..."
        className="px-2 py-1 border rounded w-96 my-5 ml-5"
      />
      <div className="bg-blue-gray-300 p-3 flex flex-row justify-between items-center">
        {/* <GlobalFilter
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        /> */}
      </div>
      {data?.length ? (
        <>
          <div className={`overflow-x-scroll overflow-y-scroll max-h-[550px] w3-container`}>
            <table className="w-full w3-table-all">
              <thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th key={header.id} onClick={header.column.getToggleSortingHandler()} className="cursor-pointer" style={{ width: header.getSize() }}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        {
                        { asc: '▲', desc: '▼' }[header?.column.getIsSorted () ?? null]
                        }
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                {table.getFooterGroups().map(footerGroup => (
                  <tr key={footerGroup.id}>
                    {footerGroup.headers.map(header => (
                      <th key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                      </th>
                    ))}
                  </tr>
                ))}
              </tfoot>
            </table>

          </div>
          <div className="w-full flex justify-center gap-3">
            <Button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              First Page
            </Button>
            <Button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous Page
            </Button>
            <Button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next Page
            </Button>
            <Button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              Last Page
            </Button>
          </div>
          {/* <div className="flex justify-center items-center mt-4">
            <CircularPagination
              pageIndex={pageIndex}
              canPreviousPage={canPreviousPage}
              canNextPage={canNextPage}
              pageOptions={pageOptions}
              nextPage={nextPage}
              previousPage={previousPage}
              gotoPage={gotoPage}
            />
          </div> */}
        </>
      ) : (
        <div className="flex items-center justify-center font-extrabold text-3xl text-gray-300 h-32">
          No events to show
        </div>
      )}
    </div>
  );
};

export default CustomTable;
