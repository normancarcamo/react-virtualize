import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.list,
      columns: Object.getOwnPropertyNames(this.props.list[0]),
      numRows: this.props.list.length,
      tableHeight: this.props.tableHeight || 0,
      rowHeight: this.props.rowHeight || 1,
      scrollTop: 0
    };
  }

  componentDidMount() {
  	let state = this.state;
    state.tableHeight = findDOMNode(this).clientHeight;
    state.rowHeight = this.refs.row.clientHeight;
    this.setState(state);
  }

  onScroll(event) {
    let state = this.state;
    state.scrollTop = event.target.scrollTop;
    this.setState(state);
  }

  render() {
    let {scrollTop, tableHeight, rowHeight, list, numRows, columns} = this.state;

    let scrollBottom = scrollTop + tableHeight;
    let start = Math.floor(scrollTop / rowHeight);
    let end = Math.ceil(scrollBottom / rowHeight);
    let items = [];
    let index = start;

    while (index <= end) {
      index++;

      if (index >= numRows) {
        index = numRows;
        break;
      }

      items.push(<tr key={index} ref="row">{(() => columns.map((column, i) => <td key={i}>{list[index][column]}</td>))()}</tr>);
    }

    let styleContent = {
      paddingTop: (start*rowHeight),
      height: (index+5 >= numRows) ? tableHeight-rowHeight : tableHeight * 2
    };

    return (
      <div className='wrapper'>
        <table>
          <thead>
    				<tr>
    					{columns.map((column, index) => <th key={index}>{column}</th>)}
    				</tr>
    			</thead>
        </table>
        <table className='container' onScroll={this.onScroll.bind(this)}>
          <tbody style={styleContent}>{items}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;
