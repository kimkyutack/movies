import React from "react";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";

const Image = styled.Image`
  width:20%;
  height:80%;
  border-radius: 5px;
  left:40%;
`;

interface PosterProps {
  path:string;
}

const Poster:React.FC<PosterProps> = ({path}) => (
  <Image source={{uri:makeImgPath(path)}} />
);

export default Poster;