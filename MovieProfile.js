//import liraries
import React, { Component } from "react";
import { Image, ScrollView, View, Text, StyleSheet } from "react-native";
import Dimensions from "Dimensions";

// create a component
class MovieProfile extends Component {
  render() {
    const props = this.props.navigation.state.params;

    const img = {
      uri: `https://image.tmdb.org/t/p/original/${props.poster_path}`
    };

    return (
      <View>
        <Image style={styles.image} source={img} />
        <ScrollView style={styles.textContainer}>
          <View>
            <Text style={styles.title}> {props.title}</Text>
            <Text style={styles.overview}>{props.overview}</Text>
            <Text style={styles.overview}>{props.vote_average}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  image: {
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "nowrap",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  textContainer: {
    backgroundColor: "rgba(0,0,0,0.4)",
    position: "absolute",
    bottom: 0
  },
  title: {
    color: "rgb(200,200,200)",
    fontSize: 18,
    fontWeight: "600"
  },
  overview: {
    color: "rgb(200,200,200)"
  }
});

//make this component available to the app
export default MovieProfile;
