import React from "react";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";

const Image = styled.Image`
  width:100px;
  height:160px;
  border-radius: 5px;
`;

interface PosterProps {
  path:string;
}

const TrendPoster:React.FC<PosterProps> = ({path}) => (
  <Image source={{uri:makeImgPath(path)}} />
);

export default TrendPoster;