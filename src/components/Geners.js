import {Chip} from "@material-ui/core"
import axios from "axios";
import { useEffect } from "react";

function Genres(props) {

  const handleAdd = (genre) => {
    props.setSelectedGenres([...props.selectedGenres, genre]);
    props.setGenres(props.genres.filter((g) => g.id !== genre.id));
    if (typeof props.setPage === 'function') {
      props.setPage(1);
    }
  };

  const handleRemove = (genre) => {
    props.setSelectedGenres(
      props.selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    props.setGenres([...props.genres, genre]);
    if (typeof props.setPage === "function") {
      props.setPage(1);
    }
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${props.type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    
    props.setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();
    
    return () => {
      props.setGenres([]);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
      {props.selectedGenres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          color="primary"
          clickable
          size="small"
          onDelete={() => handleRemove(genre)}
        />
      ))}
      {props.genres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          clickable
          size="small"
          onClick={() => handleAdd(genre)}
        />
      ))}
    </div>
  );
};

export default Genres;
