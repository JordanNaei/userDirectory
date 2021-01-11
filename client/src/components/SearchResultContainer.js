import React, { Component } from "react";
import SearchForm from "./SearchForm";
import EmployeeCard from "./EmployeeCard";
import API from "../utils/API";
import "../styles/Result.css";

class SearchResultContainer extends Component {
  state = {
    result: [],
    search: "",
    searchName: "",
    checked: "",
    originalLoad: []
  };

  // On mount to get the employees info listed
  componentDidMount() {
    API.search()
      .then(res => {
        this.setState({
          result: res.data.results.map((e) => ({
            firstName: e.name.first,
            lastName: e.name.last,
            picture: e.picture.large,
            email: e.email,
            phone: e.phone,
            key: e.id.value,
          })),
        })
        this.setState({
          originalLoad: [...this.state.result],
        });

        console.log(this.state.originalLoad);

      })
      .catch(error => console.log(error));
  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { value } = event.target;
    // Updating the input's state
    this.setState({
      searchName: value
    });
  };

  // When the form is submitted, search the Giphy API for `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.searchName === "") {
      this.setState({
        result: [...this.state.originalLoad],
        search: "",
        searchName: ""

      })
    } else {
      const pStrg = this.toTitleCase(this.state.searchName);
      this.filterEmployees(pStrg);
    }

  };

  handleReload = event => {
    event.preventDefault();
    this.setState({
      result: [...this.state.originalLoad],
      search: "",
      searchName: ""
    })


  };

  toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  filterEmployees = async (searchkey) => {
    var filterResult = this.state.result.filter(person => person.firstName === searchkey);
    this.setState({
      result: filterResult,
      searchName: ""
    })
  }


  handleSorting = async (e) => {
    const getStateResult = this.state.result;
    if (e.target.checked) {
      const sortedResults = await getStateResult.sort((a, b) => {
        let fa = a.firstName.toLowerCase();
        let fb = b.firstName.toLowerCase();
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      this.setState({
        result: sortedResults,
        checked: true
      })

    } else {

      this.setState({
        result: [...this.state.originalLoad],
        checked: false
      })


    }

  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2>Employee Directory</h2>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-md-6 center-block">
            <SearchForm
              searchName={this.state.searchName}
              handleInputChange={this.handleInputChange}
              handleFormSubmit={this.handleFormSubmit}
              handleReload={this.handleReload}
            />
          </div>
        </div>

        <div className="row">
          <table className="table">
            <tr>
              <th scope="col"> Photo</th>
              <th scope="col"><input className="form-check-input" name="firstName" onChange={event => this.handleSorting(event)} type="checkbox" id="flexCheckDefault1" />FirstName</th>
              <th scope="col"><input className="form-check-input" name="lastName" onChange={event => this.handleSorting(event)} type="checkbox" id="flexCheckDefault2" />LastName </th>
              <th scope="col"><input className="form-check-input" name="email" onChange={event => this.handleSorting(event)} type="checkbox" id="flexCheckDefault3" />Email</th>
              <th scope="col"><input className="form-check-input" name="phone" onChange={event => this.handleSorting(event)} type="checkbox" id="flexCheckDefault4" />Phone</th>
            </tr>
            {this.state.result.length !== 0 || undefined ? (
              this.state.result.map(info => (
                <EmployeeCard
                  picture={info.picture}
                  firstName={info.firstName}
                  lastName={info.lastName}
                  email={info.email}
                  phone={info.phone}
                  key={info.key}
                  handleSorting={this.handleSorting}
                ></EmployeeCard>))) :

              (<EmployeeCard
                picture=""
                firstName=""
                lastName=""
                email=""
                phone=""
                key=""><td><b>No result found, reload employee</b></td></EmployeeCard>)

            }
          </table>
        </div>


      </div>
    );
  }
}

export default SearchResultContainer;