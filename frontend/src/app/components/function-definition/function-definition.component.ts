import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-function-definition',
	templateUrl: './function-definition.component.html',
	styleUrls: ['./function-definition.component.scss'],
})
export class FunctionDefinitionComponent implements OnInit {
	typeDropdownOptions = [
		{ label: 'Integer', value: 'Int' },
		{ label: 'Binary Tree', value: 'BTree' },
		{ label: 'Non-Empty Binary Tree', value: 'NEBTree' },
	];

	constructor() {}

	ngOnInit(): void {}
}
