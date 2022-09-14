import React from "react";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur";
import { useColorScheme, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Poster from "./Poster";
import { Movie } from "../api";

const BgImg = styled.Image``;



const Wrapper = styled.View`
  flex-direction:row;
  height:100%;
  jistify-content:center;
  align-items:center;
`;
const Column = styled.View`
  width:40%;
  left:50%;
`;

const Title = styled.Text<{isDark: boolean}>`
  font-size:11px;
  font-weight:600;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)}
`;

const Overview = styled.Text<{isDark: boolean}>`
  font-size:9px; 
  margin-top: 5%;
  color: ${(props) => (props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0,0,0,0.8)")}
`;

const Votes = styled(Overview)`
  font-size:10px;
`;
interface SlideProps {
  backdropPath:string;
  posterPath:string;
  originalTitle:string;
  voteAverage:number;
  overview:string;
  fullData: Movie;
}

const Slide:React.FC<SlideProps> = ({
    backdropPath,
    posterPath,
    originalTitle,
    voteAverage,
    overview,
    fullData,
  }) => {
  const isDark = useColorScheme() === 'dark';
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", {screen: "Detail",
     params: {
      ...fullData
      
    }});
  };
  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
  <View style={{flex:1}}>
      <BgImg 
        style={StyleSheet.absoluteFill}
        source={{uri:makeImgPath(backdropPath) }}
      />
      <BlurView 
        tint={isDark ? "dark" : "light"}
        intensity={95}
        style={StyleSheet.absoluteFill}
      >
        <Wrapper>
          <Poster path={posterPath} />
          <Column>
            <Title isDark={isDark}>{originalTitle}</Title>
            {voteAverage > 0? (
            <Votes isDark={isDark}>⭐{voteAverage}/10</Votes>
            ) : null}
            <Overview isDark={isDark}>{overview.slice(0, 70)}...</Overview>
          </Column>
        </Wrapper>
      </BlurView>
     </View>
     </TouchableWithoutFeedback>
  )
};

export default Slide;