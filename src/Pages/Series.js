import axios from "axios";
import { useState, useEffect } from "react";
import ContentModal from "../components/ContentModal";
import CustomPagination from "../components/CustomPagination";
import Genres from "../components/Geners";
import useGenre from "../hooks/useGenre";

function Series() {
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const genreForURL = useGenre(selectedGenres);

    const fetchSeries = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`
        );
        setContent(data.results);
        setNumOfPages(data.total_pages);
    }

    useEffect(() => {
      window.scroll(0, 0);
      fetchSeries();
      // eslint-disable-next-line
    }, [genreForURL, page]);

  return (
    <div>
      <span className="pageTitle">Discover Tv Series</span>
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setpage={setPage}
      />
      <div className="trending">
        {content &&
          content.map((item) => (
            <ContentModal
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              title={item.title || item.name}
              date={item.first_air_date || item.release_date}
              media_type="tv"
              vote_average={item.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
}

export default Series;
