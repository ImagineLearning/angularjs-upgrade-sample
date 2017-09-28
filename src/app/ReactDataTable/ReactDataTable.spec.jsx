import React from 'react';
import ReactDOM from 'react-dom';

import ReactDataTable from './ReactDataTable';

describe('ReactDataTable component', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<ReactDataTable />, div);
	});
});
