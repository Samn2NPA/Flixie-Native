import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { StackNavigator } from "react-navigation";

import MovieList from "./MovieList.js";
import MovieProfile from "./MovieProfile.js";

const apiKey = "a07e22bc18f5cb106bfe4cc1f83ad8ed";
const url = "https://api.themoviedb.org/3/movie/";

const loadPart = "now_playing"; //use for "now playing" or "top rated" tab

const Routes = StackNavigator({
  MovieList: { screen: MovieList },
  MovieProfile: {
    screen: MovieProfile,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.title}`
    })
  }
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.fetchWithPage = this.fetchWithPage.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      movies: [],
      loading: false,
      page: 1
    };
  }

  fetchWithPage(page) {
    this.setState(
      {
        loading: true
      },
      () => {
        fetch(`${url}${loadPart}?api_key=${apiKey}&page=${page}`)
          .then(data => data.json())
          .then(json => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve(json);
              }, 2000);
            });
          })
          .then(json => {
            const thisSet = new Set([...this.state.movies.map(m => m.id)]);
            const addSet = json.results.filter(m => !thisSet.has(m.id));
            const newResults = this.state.movies.concat(addSet);
            this.setState({
              movies: newResults,
              loading: false
            });
          })
          .catch(error => {
            alert(error);
          });
      }
    );
  }

  loadMore() {
    const newPage = this.state.page + 1;
    this.setState(
      {
        page: newPage
      },
      () => {
        this.fetchWithPage(newPage);
      }
    );
  }

  onRefresh() {
    this.setState(
      {
        page: 1
      },
      () => {
        this.fetchWithPage(1);
      }
    );
  }

  componentWillMount(props) {
    this.fetchWithPage(1);
  }

  render() {
    return (
      <Routes
        screenProps={{
          movies: this.state.movies,
          loading: this.state.loading,
          loadMore: this.loadMore,
          refreshPage: this.onRefresh
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
