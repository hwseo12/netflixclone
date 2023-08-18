import { useLocation } from "react-router-dom";
import { searchKeywordMovies, searchKeywordTV } from "../api";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import styled from "styled-components";
import { makeImagePath } from "../utils";

const Title = styled.h1`
  margin-top: 100px;
  margin-left: 50px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  margin-top: 20px;
`;

const Box = styled(motion.div)`
  background-color: white;
  height: 200px;
  font-size: 66px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  cursor: pointer;
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

export function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  console.log(keyword);
  const { data: dataSearchMovies, isLoading: isLoadingSearchMovies } = useQuery(
    ["movies", keyword],
    () => searchKeywordMovies(keyword)
  );
  const { data: dataSearchTV, isLoading: isLoadingSearchTV } = useQuery(
    ["tv", keyword],
    () => searchKeywordTV(keyword)
  );
  console.log(dataSearchTV);
  return (
    <>
      <Title>Movies</Title>
      <Container>
        {isLoadingSearchMovies ? (
          <div>Loading...</div>
        ) : (
          dataSearchMovies.results.map((data, i) => (
            <Box
              key={i}
              whileHover="hover"
              initial="normal"
              variants={boxVariants}
              transition={{ type: "tween" }}
              bgphoto={makeImagePath(data.backdrop_path, "w500")}
              layoutId={data.id + ""}
              // onClick={() => onBoxClicked(data.id)}
            >
              <Info variants={infoVariants}>
                <h4>{data.title}</h4>
              </Info>
            </Box>
          ))
        )}
      </Container>
      <Title>TV Shows</Title>
      <Container>
        {isLoadingSearchTV ? (
          <div>Loading...</div>
        ) : (
          dataSearchTV.results.map((data, i) => (
            <Box
              key={i}
              whileHover="hover"
              initial="normal"
              variants={boxVariants}
              transition={{ type: "tween" }}
              bgphoto={makeImagePath(data.backdrop_path, "w500")}
              layoutId={data.id + ""}
              // onClick={() => onBoxClicked(data.id)}
            >
              <Info variants={infoVariants}>
                <h4>{data.name}</h4>
              </Info>
            </Box>
          ))
        )}
      </Container>
    </>
  );
}
