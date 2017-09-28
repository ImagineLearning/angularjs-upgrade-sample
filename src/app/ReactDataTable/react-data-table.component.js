import { react2angular } from 'react2angular';
import ReactDataTable from './ReactDataTable';

angular
	.module('app.reactDataTable')
	.component('reactDataTable', react2angular(ReactDataTable, ['columns', 'data']));
