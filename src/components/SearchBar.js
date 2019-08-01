import React, { Component } from "react";
import Select from "react-select";
import { graphql } from "react-apollo";
import { allTags } from "../queries/query";
import MainComponent from "./MainComponent";
import queryString from "query-string";

const cityFromApi = [];
const parsed = queryString.parse(location.search);

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      data_fetched: false,
      run_func: true,
      query: parsed.city
    };
  }

  handleSearchChange = e => {
    this.setState({
      query: e.value
    });

    var push_link = "/?city=" + e.value;
    this.props.history.push(push_link);
  };

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    if (this.state.run_func) {
      var data = this.props.data;
      if (!data.loading) {
        for (var i = 0; i < data.allStories.length; i++) {
            var tag = this.capitalizeFirstLetter(data.allStories[i].tags);

          if (
            typeof cityFromApi[
              cityFromApi.findIndex(x => x.label === tag)
            ] === "undefined"
          ) {
            cityFromApi.push({
              label: tag,
              value: data.allStories[i].tags
            });
          }
        }

        this.setState({
          data_fetched: true,
          run_func: false
        });
      }
    }

    return (
      <div>
        {this.state && this.state.data_fetched && (
          <Select
            placeholder="Discover Incredible Places"
            options={cityFromApi}
            onChange={e => this.handleSearchChange(e)}
          />
        )}

        <MainComponent city={this.state.query} />
      </div>
    );
  }
}

export default graphql(allTags)(SearchBar);
