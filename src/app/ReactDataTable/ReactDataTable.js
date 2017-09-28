import React from 'react';

export default props => {
	const columns = props.columns;
	const data = props.data;
	const headers = columns.map(column => <th key={column.name}>{column.display}</th>);
	const body = data.map((row, index) => {
		const rowData = columns.map(column => <td key={column.name}>{row[column.name]}</td>);
		return <tr key={index}>{rowData}</tr>;
	});
	return (
		<div className="data-table card">
			<div className="card-divider">
				<h2>React Data Table Component</h2>
			</div>
			<table>
				<thead>
					<tr>{headers}</tr>
				</thead>
				<tbody>{body}</tbody>
			</table>
		</div>
	);
};
