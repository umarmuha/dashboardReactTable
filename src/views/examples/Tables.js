/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";
import { useTable, useRowSelect } from "react-table";
// reactstrap components
import {
	Badge,
	Button,
	Card,
	CardHeader,
	CardFooter,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	DropdownToggle,
	Media,
	Pagination,
	PaginationItem,
	PaginationLink,
	Progress,
	Table,
	Container,
	Row,
	UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const EditableCell = ({
	value: initialValue,
	row: { index },
	column: { id },
	updateMyData, // This is a custom function that we supplied to our table instance
}) => {
	// We need to keep and update the state of the cell normally
	const [value, setValue] = React.useState(initialValue);

	const onChange = (e) => {
		setValue(e.target.value);
	};

	//   We'll only update the external data when the input is blurred
	const onBlur = () => {
		updateMyData(index, id, value);
	};

	// If the initialValue is changed external, sync it up with our state
	React.useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	//removed onBlur={onBlur}

	return <input value={value} onChange={onChange} onBlur={onBlur} />;
};

const IndeterminateCheckbox = React.forwardRef(
	({ indeterminate, ...rest }, ref) => {
		const defaultRef = React.useRef();
		const resolvedRef = ref || defaultRef;
		const [value, setValue] = useState({ ...rest }.checked);
		React.useEffect(() => {
			resolvedRef.current.indeterminate = indeterminate;
		}, [resolvedRef, indeterminate]);

		const handleValue = () => {
			if (value) setValue(false);
			else setValue(true);
		};
		console.log(value);
		return (
			<>
				<Button
					type="checkbox"
					ref={resolvedRef}
					{...rest}
					onClick={handleValue}
					value={value}
				>
					{value ? "CheckedIn" : "Checkout"}
				</Button>
			</>
		);
	}
);
// Be sure to pass our updateMyData and the skipPageReset option
function App({ columns, data, updateMyData }) {
	// For this example, we're using pagination to illustrate how to stop
	// the current page from resetting when our data changes
	// Otherwise, nothing is different here.
	const {
		rows,
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		selectedFlatRows,
		state: { selectedRowIds },
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			updateMyData,
		},
		useRowSelect,
		(hooks) => {
			hooks.visibleColumns.push((columns) => [
				{
					id: "selection",
					Header: () => <div>CheckIn/Checkout</div>,
					Cell: ({ row }) => (
						<div>
							<IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
						</div>
					),
				},
				...columns,
			]);
		}
	);
	console.log(rows);
	return (
		<>
			<Header />
			{/* Page content */}
			<Container className="mt--7" fluid>
				{/* Table */}
				<Row>
					<div className="col">
						<Card className="shadow">
							<CardHeader className="border-0">
								<h3 className="mb-0">Card tables</h3>
							</CardHeader>
							{/* <Container fluid> */}
							<Table bordered hover responsive fluid {...getTableProps()}>
								<thead>
									{headerGroups.map((headerGroup) => (
										<tr {...headerGroup.getHeaderGroupProps()}>
											{/* <th>CheckIn/Out</th> */}
											{headerGroup.headers.map((column) => (
												<th {...column.getHeaderProps()}>
													{column.render("Header")}
												</th>
											))}
										</tr>
									))}
								</thead>
								<tbody {...getTableBodyProps()}>
									{rows.map((row, i) => {
										prepareRow(row);
										return (
											<tr {...row.getRowProps()}>
												{row.cells.map((cell) => {
													return (
														<td {...cell.getCellProps()}>
															{cell.render("Cell")}
														</td>
													);
												})}
											</tr>
										);
									})}
								</tbody>
							</Table>
						</Card>
					</div>
				</Row>
				{/* Dark table */}
			</Container>
		</>
	);
}

function Tables() {
	const columns = React.useMemo(
		() => [
			{
				Header: "Name",
				accessor: "name",
			},
			{
				Header: "UserName",
				accessor: "username",
			},

			{
				Header: "Email",
				accessor: "email",
			},
			{
				Header: "Website",
				accessor: "website",
			},
			{
				Header: "Profile Progress",
				Cell: EditableCell,
			},
		],
		[]
	);

	const [data, setData] = React.useState([]);

	const updateMyData = (rowIndex, columnId, value) => {
		setData((old) =>
			old.map((row, index) => {
				if (index === rowIndex) {
					return {
						...old[rowIndex],
						[columnId]: value,
					};
				}
				return row;
			})
		);
		// console.log(rowIndex, columnId, value);
	};

	React.useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then((res) => res.json())
			.then((res) =>
				setData(
					res.map((item) => {
						return {
							name: item.name,
							username: item.username,
							email: item.email,
							website: item.website,
						};
					})
				)
			);
	}, []);
	return (
		<React.Fragment>
			<App columns={columns} data={data} updateMyData={updateMyData} />
		</React.Fragment>
	);
}

export default Tables;
