import React from "react";

const styles = {
  card: {
    marginLeft: 20,
  }
};

function SearchForm(props) {
  return (
    <form className="form col-12">
      <div className="form-group">
        <label htmlFor="search">Search:</label>
        <input
          onChange={props.handleInputChange}
          value={props.searchName}
          name="firstName"
          type="text"
          className="form-control"
          placeholder="Search By First Name"
          autocomplete="off"
        />
        <button onClick={props.handleFormSubmit} className="btn btn-primary mt-3">
          Search
        </button>
        <button onClick={props.handleReload} style={styles.card} className="btn btn-primary mt-3">
          Reload Employees
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
