//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from "react-native";

import MovieCard from "./MovieCard.js";
import MovieProfile from "./MovieProfile.js";

// create a component
class MovieList extends Component {
  render() {
    const screenProps = this.props.screenProps;
    const navigate = this.props.navigation.navigate;

    // const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <FlatList
          data={screenProps.movies}
          keyExtractor={movie => movie.id}
          onEndReached={screenProps.loadMore}
          onEndReachedThreshold={0.05}
          refreshing={screenProps.loading}
          onRefresh={screenProps.refreshPage}
          renderItem={movieItem => (
            <MovieCard
              {...movieItem.item}
              loadProfile={() => navigate("MovieProfile", movieItem.item)}
            />
          )}
          ListFooterComponent={() => (
            <View style={styles.loading}>
              <ActivityIndicator />
            </View>
          )}
        />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },

  loading: {
    flex: 1,
    padding: 10
  }
});

//make this component available to the app
export default MovieList;
