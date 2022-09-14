import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, View, Text } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import HMedia from "../components/HMedia";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";
import {useQueryClient, useQuery, useInfiniteQuery} from "react-query";
import { moviesApi } from "../api";
import { MovieResponse } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");



const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;

const VSeparator = styled.View`
  width:30px;
`;
const HSeparator = styled.View`
  height:20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const {
    isLoading:nowPlayingLoading,
    data :nowPlayingData,
       } = useQuery(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const {
    isLoading:upcomingLoading,
    data :upcomingData,
    hasNextPage,
    fetchNextPage,
    } = useInfiniteQuery(
     ["movies", "upcoming"],
     moviesApi.upcoming, {
        getNextPageParam: (currentPage) => {
          const nextPage = currentPage.page + 1;
          return nextPage > currentPage.total_pages ? null : nextPage;
        },
     });
  const {
    isLoading:trendingLoading,
    data :trendingData,
     } = useQuery(["movies", "trending"], moviesApi.trending);
    // console.log(upcomingData?.pages);
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"])
    setRefreshing(false);
  };
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading
  const loadMore = () => {
   if(hasNextPage){
    fetchNextPage();
   }
  }
  return loading ? (
    <Loader />
  ) : (
     upcomingData ? (
     <FlatList 
        onEndReached={loadMore}
        onRefresh={onRefresh}
        refreshing={refreshing}
        ListHeaderComponent={<>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              marginBottom: 40,
              width: "100%",
              height: SCREEN_HEIGHT / 4,
            }}
          >
            {nowPlayingData?.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path}
                posterPath={movie.poster_path}
                originalTitle={movie.title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
                fullData={movie}
              />
            ))}
          </Swiper>
      {trendingData ? (<HList title="인기영화" data={trendingData.results} />) : null}
      <ComingSoonTitle>개봉예정영화</ComingSoonTitle>
        </>}
        //data={upcomingData.results}
        data={upcomingData?.pages.map((page) => page.results).flat()}
        keyExtractor={(item) => item.id + ""}
        ItemSeparatorComponent={() => <HSeparator/>}
        renderItem={({item}) => (
          <HMedia
            posterPath={item.poster_path}
            originalTitle={item.title}
            overview={item.overview}
            releaseDate={item.release_date}
            fullData={item}
          />
          
        )}
        />
     ) : null
  );
};

export default Movies;