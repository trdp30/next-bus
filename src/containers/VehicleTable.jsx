import CustomTable from '@/components/CustomTable/CustomTable'
import moment from 'moment';
import React from 'react';
import {
    createColumnHelper,
  } from '@tanstack/react-table'
import { dummyVehicleData } from '@/utils/dummyVehicleData';
const VehicleTable = () => {

    const columnHelper = createColumnHelper()
    const columns = React.useMemo(
      () => [
        columnHelper.accessor(row => row.id, {
            id: 'id',
            // cell: info => <i>{info.getValue()}</i>,
            header: () => <span className='text-red-600'>ID</span>,
            // footer: info => info.column.id,
          }),
          columnHelper.accessor('name', {
            header: () => 'Name',
            cell: info => info.renderValue(),
          }),
          columnHelper.accessor('registration_number', {
            header: () => 'Registration Number',
            cell: info => info.renderValue(),
          }),
        {
          header: "Chassis Number",
          accessorKey: "chassis_number",
          width: 200,
        },
        {
          header: "Engine Numbernder",
          accessorKey: "engine_numbernder",
          width: 50,
        },

        {
          header: "Owner",
          accessorKey: "owner",
          width: 40,
        },
        {
          header: "Action",
          accessorKey: "actions",
          width: 30,
          disableSortBy: true,
          cell: ({ row }) => (
            <div className="flex space-x-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => handleEdit(row.original)}
              >
                Edit
              </button>
            </div>
          ),
        },
      ],
      []
    );

    const handleEdit = (row) => {
      navigate("/vehicle-reg-form", { state: { data: row } });
    };

    const actions = [
      {
        name: "Edit",
        onClick: handleEdit,
        buttonClass: "bg-blue-500 text-white",
        icon: "edit",
      },
    ];
  return (
    <CustomTable columns={columns} data={dummyVehicleData} actions={actions} />
  )
}

export default VehicleTable