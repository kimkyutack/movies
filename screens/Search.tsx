import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { moviesApi, tvApi } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";
const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  background-color:white;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin:10px auto;
  margin-bottom:40px;
`;
const Search = () => {
  const [query, setQuery] = useState("");
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery(["searchMovies", query], moviesApi.search, {
    enabled: false,
  });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery(["searchTv", query], tvApi.search, {
    enabled: false,
  });
  const onChangeText = (text: string) => setQuery(text);
  const onSubmit = () => {
    if (query === "") {
      return;
    }
    searchMovies();
    searchTv();
  };
  return (
    <Container>
        <SearchBar 
          placeholder="검색하실 영화나 시리즈명을 입력해주세요"
          placeholderTextColor="gray"
          returnKeyLabel="검색"
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
        />
        {moviesLoading || tvLoading ? <Loader /> : null}
        {moviesData ? (
          <HList title="영화 검색 결과" data={moviesData.results}/>
        ) : null}
        {tvData ? (
          <HList title="시리즈 검색 결과" data={tvData.results}/>
        ) : null}
      </Container>

  );
  };
export default Search;