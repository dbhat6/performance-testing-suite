import React from 'react';
import { H6 } from 'baseui/typography';
import { useTable } from 'react-table';

const TableContent = (props) => {
	const colls = props.cols.map((item) => {
		return { Header: item, accessor: item };
	});
	let co = {};
	const rowws = props.rows[0].map((item, index) => {
		co[colls[index].Header] = item;
		return co;
	});

	const columns = React.useMemo(() => colls, []);

	const data = React.useMemo(() => [ rowws[0] ], []);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

	return (
		<div>
			<H6>{props.heading}</H6>
			<table {...getTableProps()} className="tableFull">
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()} className="tableHead">
									{column.render('Header')}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td {...cell.getCellProps()} className="tableBody">
											{cell.render('Cell')}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default TableContent;
