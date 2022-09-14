import React, {useState} from "react";
import { ScrollView, RefreshControl } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";

const Tv = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const {isLoading:todayLoading, data:todayData, isRefetching:todayRefetching} = useQuery(
    ["tv", "today"],
     tvApi.airingToday
  );
  const {isLoading:topLoading, data:topData, isRefetching:topRefetching} = useQuery(
    ["tv", "top"],
     tvApi.topRated
  );
  const {isLoading:trendingLoading, data:trendingData, isRefetching:trendingRefetching} = useQuery(
    ["tv", "trending"],
     tvApi.trending
  );
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['tv']);
    setRefreshing(false);
  };
  const loading = todayLoading || topLoading || trendingLoading;
  
  if(loading) {
    return <Loader />;
  }
  return (
    <ScrollView 
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    contentContainerStyle={{paddingVertical:30}}>
      <HList title="인기프로그램" data={trendingData.results}/>
      <HList title="오늘의 프로그램" data={todayData.results}/>
      <HList title="가장 많이 시청한 프로그램" data={topData.results}/>
    </ScrollView>
  );

};

export default Tv;