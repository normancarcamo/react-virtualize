import React, {Component} from 'react';
import {render} from 'react-dom';
import Table from './Table.js';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

  randomstring() {
    return Math.random().toString(20).substring(20);
  }

	render() {
    let index = 0;
    let records = 5000;
    let collection = [];

    while (index < records) {
      collection.push({id: index, firstName: this.randomstring(), lastName: this.randomstring(), age: Math.ceil((Math.random()*80))});
      index++;
    }

		return (
      <div>
        <h1>Records: {new Intl.NumberFormat().format(collection.length)}</h1>
        <Table list={collection} />
      </div>
    );
	}
}

render(<App />, document.getElementById('app'));
