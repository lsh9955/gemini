import styled from "styled-components";

export const GalleryWrapper = styled.div`
  width: 100%;
  height: auto;
  padding-left: 10%;
  padding-right: 10%;
  padding-bottom: 5%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

export const GalleryItem = styled.img`
  width: 250px;
  height: 333px;
  border-radius: 10%;
  padding: 5px;
`;

export const GalleryTitle = styled.p`
  width: 100%;
  height: 5%;
  padding-left: 20%;
  padding-bottom: 2%;
`;
