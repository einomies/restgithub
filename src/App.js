import React, { Component } from 'react';
import './App.css';
import ReactTable from "react-table";
import 'react-table/react-table.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { keyword: '', data: [] };
  }

  fetchData = () => {
    // REST API call comes here
    const url = `https://api.github.com/search/repositories?q=${this.state.keyword}`;

    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ data: responseData.items });
      });
  }

  handleChange = (e) => {
    this.setState({ keyword: e.target.value });
  }

  render() {

    // We will define our columns by creating the array of column objects into
    // the render() method. In a column object, you have to define at least the header
    // of the column and the data accessor. The data accessor values come from our
    // REST API response data. You can see that our response data contains an object
    // called owner, and we can show these values using the owner.field_name
    // syntax:
    const columns = [
      {
        Header: 'Name', // Header of the column
        accessor: 'full_name' // Value accessor
      },
      {
        Header: 'URL',
        accessor: 'html_url'
      },
      {
        Header: 'Owner',
        accessor: 'owner.login'
      }
    ]

    return (
      <div className="App">
        <input type="text" onChange={this.handleChange} />
        <button onClick={this.fetchData} value={this.state.keyword}>Fetch</button>

        {/* To fill React Table with data, you have to pass the data prop to the component.
        Data can be an array or object and therefore we can use our state, called data.
        Columns are defined using the columns prop and that prop is required. */}
        {/* Filtering is disabled by default but you can enable it using the filterable prop in
        the ReactTable component. You can also set the page size of the table. */}
        <ReactTable
          data={this.state.data}
          columns={columns}
          filterable={true}
          defaultPageSize={10}
        />
      </div>
    );
  }
}

export default App;
