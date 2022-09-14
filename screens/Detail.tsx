import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Share, Platform, TouchableOpacity, Linking } from "react-native";
import styled from "styled-components/native";
import { Movie, moviesApi, TV, tvApi } from "../api";
import TrendPoster from "../components/TrendPoster";
import { makeImgPath } from "../utils";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from 'expo-web-browser';

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: #1e272e;
`;
const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content:flex-end;
  padding: 0px 20px;
`;
const Column = styled.View`
  width:80%;
  flex-direction:row;
  `;

const Title = styled.Text`
  color:white;
  font-size:36px;
  align-self:flex-end;
  margin-left:15px;
  font-weight:bold;
`;
const Data = styled.View`
  padding: 0px 20px;
`;

const Overview = styled.Text`
  color:white;
  margin: 20px 0px;
`;

const Background = styled.Image``;

const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;

const BtnText = styled.Text`
  color:white;
  font-weight: 600;
  margin-bottom: 10px;
  line-height:24px;
  margin-left:10px;
`;
type RootStackParamList = {
  Detail: Movie | TV;

};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">

const Detail:React.FC<DetailScreenProps> = ({
  navigation: {setOptions},
  route: { params },
}) => {
  const isMovie = "original_title" in params
  const {isLoading, data} = useQuery(
    [isMovie ? "movies" : "tv", params.id],
    isMovie ? moviesApi.detail : tvApi.detail,
  );
  const shareMedia = async () => {
    const isAndroid = Platform.OS === "android";
    const homepage = isMovie
      ? `https://www.imdb.com/title/${data.imdb_id}/`
      : data.homepage;
    if (isAndroid) {
      await Share.share({
        message: `${params.overview}\nCheck it out: ${homepage}`,
        title:
          "original_title" in params
            ? params.title
            : params.name,
      });
    } else {
      await Share.share({
        url: homepage,
        title:
          "original_title" in params
            ? params.title
            : params.name,
      });
    }
  };
  const ShareButton = () => (
    <TouchableOpacity onPress={shareMedia}>
      <Ionicons name="share-outline" color="black" size={24} />
    </TouchableOpacity>
  );

  useEffect(() => {
    setOptions({
      title: "original_title" in params ? "영화" : "시리즈",
    });
  }, []);
  useEffect(() => {
    if (data) {
      setOptions({
        headerRight: () => <ShareButton />,
      });
    }
  }, [data]);
  const openYTLink = async(videoID:string) => {
    //const baseUrl = `http://m.youtube.com/watch?v=${videoID}`;
    const baseUrl = `https://m.youtube.com/embed/${videoID}`;
    //const baseUrl = data.homepage;
    await Linking.openURL(baseUrl);
    //await WebBrowser.openBrowserAsync(baseUrl);
  }
  return (
    <Container>
      <Header>
        <Background style={StyleSheet.absoluteFill} source={{uri:makeImgPath(params.backdrop_path || "")}}/>
        <LinearGradient 
         colors={["transparent", "black"]}
         style={StyleSheet.absoluteFill}
        />
        <Column>
        <TrendPoster path={params.poster_path || ""}/>
        <Title>
          {"original_title" in params
            ? params.title
            : params.name
          }
        </Title>
        </Column>
      </Header>
      <Data>
      <Overview>{params.overview}</Overview>
      {isLoading ? <Loader /> : null}
      {data?.videos?.results?.map((video) => (
        <VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
          <Ionicons name="logo-youtube" color="red" size={24}/>
          <BtnText>{video.name}</BtnText>
        </VideoBtn>
      ))}
      </Data>
    </Container>
  );
};
export default Detail;