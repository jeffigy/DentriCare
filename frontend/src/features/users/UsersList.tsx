import { useGetUsersQuery } from "./usersApiSlice";
import UserRow from "./UserRow";
import { Spinner } from "@chakra-ui/react";
import DataTable, { TableColumn } from "react-data-table-component";

// type DataRow = {
//   id: number;
//   title: string;
//   year: string;
// };
// const columns: TableColumn<DataRow>[] = [
//   {
//     name: "ID",
//     selector: (row) => row.id,
//   },
//   {
//     name: "Title",
//     selector: (row) => row.title,
//   },
//   {
//     name: "Year",
//     selector: (row) => row.year,
//   },
// ];

// const data = [
//   {
//     id: 1,
//     title: "Beetlejuice",
//     year: "1988",
//   },
//   {
//     id: 2,
//     title: "Ghostbusters",
//     year: "1984",
//   },
// ];

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("userslist", {
    pollingInterval: 6000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  }); //! observe if the 'undefined' is a problem
  let content;
  if (isLoading) content = <Spinner />;
  if (isError) {
    content = <p>{error.toString()}</p>;
  }
  if (isSuccess) {
    const { ids } = users;
    const tableContent = ids?.length
      ? ids.map((userId) => <UserRow key={userId} userId={String(userId)} />)
      : null;
    content = (
      <table className="table table--users">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__username">
              First Name
            </th>
            <th scope="col" className="table__th user__username">
              Last Name
            </th>
            <th scope="col" className="table__th user__username">
              Email
            </th>
            <th scope="col" className="table__th user__roles">
              Roles
            </th>
            <th scope="col" className="table__th user__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }
  return content;
  // return <DataTable columns={columns} data={data} />;
};
export default UsersList;
