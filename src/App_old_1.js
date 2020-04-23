import React from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./App.css";
import { Table } from "react-bootstrap";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      perPage: 5,
      currentPage: 0,
      pageCount: null,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  componentDidMount() {
    this.receivedData();
  }
  receivedData() {
    axios.get(`https://jsonplaceholder.typicode.com/photos`).then((res) => {
      const count = res.length;
      const slice = res.data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      const postData = slice.map((pd) => (
        <Table size="sm">
          <tbody>
            <tr>
              <td class="text-xs-left">{pd.id}</td>
              <td class="text-xs-left">{pd.title}</td>
              <td class="text-xs-left">{pd.url}</td>
              {/* <td>
                <img src={pd.thumbnailUrl} alt="" />
              </td> */}
            </tr>
          </tbody>
        </Table>
        // <React.Fragment>
        //   <p>{pd.title}</p>
        //   <img src={pd.thumbnailUrl} alt="" />
        // </React.Fragment>
      ));
      this.setState({
        pageCount: Math.ceil(res.data.length / this.state.perPage),
        postData,
      });
    });
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.receivedData();
      }
    );
  };
  render() {
    return (
      <div>
        {this.state.postData}
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    );
  }
}
export default App;
