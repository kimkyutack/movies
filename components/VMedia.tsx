import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import TrendPoster from "./TrendPoster";
import Votes from "./Votes";
import { TouchableOpacity } from "react-native";
import { Movie } from "../api";

const Container = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

interface VMediaProps {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  fullData: Movie;
}

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
  fullData,
}) =>{
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", {screen: "Detail",
     params: {
      ...fullData
    }});
  };
  return  (
    <TouchableOpacity onPress={goToDetail}>
      <Container>
        <TrendPoster path={posterPath} />
        <Title>
          {originalTitle.slice(0, 10)}
          {originalTitle.length > 10 ? "..." : null}
        </Title>
        <Votes votes={voteAverage} />
      </Container>
    </TouchableOpacity>
    )
};

export default VMedia;