import React from "react";
import CustomTable from "./components/CustomTable/CustomTable";
import moment from 'moment';
import VehicleRegForm from "./components/Forms/VehicleRegForm";
import { useNavigate } from "react-router";
import Login from "./containers/Login";
import Register from "./components/Register/Register";
import Singin from "./components/Signin/Singin";
const App = () => {
//  const navigate = useNavigate()
//   const data = [
//     {
//       UserID: "1",
//       userName: "Dhiraj Kumar Verma ",
//       gender: "Male",
//       email: "vermainfo95@gmail.com",
//       phone: "9837860539",
//       dob: "20-02-1995",
//     },
//     {
//       UserID: "2",
//       userName: "Ujjal Kumar Danta ",
//       gender: "Male",
//       email: "Ujjal@gmail.com",
//       phone: "9837860539",
//       dob: "01-02-2000",
//     }
//   ]

//   const columns = React.useMemo(
//     () => [
//       {
//         Header: "ID",
//         accessor: "UserID",
//         width: 10,
//       },
//       {
//         Header: "Name",
//         accessor: "userName",
//         width: 350,
//       },
//       {
//         Header: "Gender",
//         accessor: "gender",
//         width: 200,
//       },
//       {
//         Header: "Email",
//         accessor: "email",
//         width: 50,
//       },
  
//       {
//         Header: "Phone",
//         accessor: "phone",
//         width: 40,
//       },
//       {
//         Header: "Date of Birth",
//         accessor: "dob",
//         width: 250,
//         sortType: (rowA, rowB, id, desc) => {
//           const dateA = moment(rowA?.values[id], "DD-MM-YYYY HH:mm:ss");
//           const dateB = moment(rowB?.values[id], "DD-MM-YYYY HH:mm:ss");
//           return dateA - dateB;
//         },
//       },
//       {
//         Header: "Action",
//         accessor: "actions",
//         width: 30,
//         disableSortBy: true,
//         Cell: ({ row }) => (
//           <div className="flex space-x-2">
//             <button
//               className="bg-blue-500 text-white px-2 py-1 rounded"
//               onClick={() => handleEdit(row.original)}
//             >
//               Edit
//             </button>
//           </div>
//         ),
//       },
//     ],
//     []
//   );

//   const handleEdit = (row) => {
//     navigate("/vehicle-reg-form", { state: { data: row } });
//   };

//   const actions = [
//     {
//       name: "Edit",
//       onClick: handleEdit,
//       buttonClass: "bg-blue-500 text-white",
//       icon: "edit",
//     },
//   ];



  return (
    <div>
      {/* <Login/> */}
      <Singin />
      {/* <Register /> */}
      {/* <VehicleRegForm/> */}
      {/* <CustomTable columns={columns} data={data} actions={actions} /> */}
    </div>
    );
};

export default App;
