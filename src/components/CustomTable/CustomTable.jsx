import React from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
} from "react-table";
import { useNavigate } from "react-router";
import CircularPagination from "../Pagination/CircularPagination";



const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  return (
    <input
      value={globalFilter || ""}
      onChange={(e) => setGlobalFilter(e.target.value || undefined)}
      placeholder="Type to search..."
      className="px-2 py-1 border rounded"
    />
  );
};

const CustomTable = ({ columns, data, actions }) => {
  const navigate = useNavigate();
  const sortees = React.useMemo(
    () => [
      {
        id: "CreatedDate",
        desc: true,
      },
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setGlobalFilter,
    gotoPage,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      disableSortRemove: true,
      initialState: { pageIndex: 0, pageSize: 10, sortBy: sortees }, // Initial page index and page size
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );



  return (
    <div className="h-screen">
      <div className="bg-blue-gray-300 p-3 flex flex-row justify-between items-center">
        <GlobalFilter
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      {data?.length ? (
        <>
        <div className={`overflow-x-scroll overflow-y-scroll max-h-[550px]`}>
          <table className="h-fit w-fit" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr className="border-2" {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      key={column.id}
                      className="border-2 h-14 px-2 cursor-pointer"
                      style={{ maxWidth: column.width }} 
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className={`border-2 h-14 ${i % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } hover:bg-blue-200`}
                  >
                    {row.cells.map((cell) => (
                      <td
                        key={cell.column.id}
                        className="border-2 px-5"
                        style={{ width: cell.column.width }} 
                        {...cell.getCellProps()}
                      >
                        {cell.column.id === "actions" ? (
                          <div className="flex space-x-1">
                            {actions.map((action) => (
                              <button
                                key={action.name}
                                className={`px-2 py-1 rounded ${action.buttonClass}`}
                                onClick={() => action.onClick(row.original)}
                              >
                                {action.icon && (
                                  <action.icon className="mr-1" />
                                )}
                              </button>
                            ))}
                          </div>
                        ) : (
                          cell.render("Cell")
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
      
        </div>
            <div className="flex justify-center items-center mt-4">
            <CircularPagination
              pageIndex={pageIndex}
              canPreviousPage={canPreviousPage}
              canNextPage={canNextPage}
              pageOptions={pageOptions}
              nextPage={nextPage}
              previousPage={previousPage}
              gotoPage={gotoPage}
            />
          </div>
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
