import {useState, useEffect} from "react";
import axios from "axios";
import CustomPagination from "../components/CustomPagination";
import SingleContent from "../components/SingleContent";
import "../css/Search.css";
import  {Button, Tab, Tabs, TextField, ThemeProvider} from "@material-ui/core";
import {createTheme} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

function Search() {
    const [type, setType] = useState(0);
    const [searchText, setSearchText] = useState("")
    const [page , setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();

    const darkTheme = createTheme({
        palette: {
            type: "dark",
            primary: {
                main: "#fff"
            },
        },
    });

    const fetchSearch = async () => {
        try {
            const {data} = await axios.get(
                `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
                process.env.REACT_APP_API_KEY
                }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
            );
            setContent(data.results);
            setNumOfPages(data.total_pages);
            console.log(`search ${data}`);
        } catch(error) {
            console.log(Error(error));
        }
    };

    useEffect(() => {
        window.scroll(0,0);
        fetchSearch();
    }, [type, page]);

    return (
      <div>
        <ThemeProvider theme={darkTheme}>
          <div className="search">
            <TextField
              style={{ flex: 1 }}
              className="searchBox"
              label="Search"
              variant="filled"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button
              onClick={fetchSearch}
              variant="contained"
              style={{ marginLeft: 10 }}
            >
              <SearchIcon fontSize="large" />
            </Button>
          </div>
          <Tabs
            value={type}
            indicatorColor="primary"
            textColor="primary"
            onChange={(event, newValue) => {
              setType(newValue);
              setPage(1);
            }}
            style={{ paddingBottom: 5 }}
            aria-label="disabled tabs"
          >
            <Tab style={{ width: "50%" }} label="Search Movies" />
            <Tab style={{ width: "50%" }} label="Search TV Series" />
          </Tabs>
        </ThemeProvider>
        <div className="trending">
          {content &&
            content.map((item) => (
              <SingleContent
                key={item.id}
                id={item.id}
                poster={item.poster_path}
                title={item.title || item.name}
                date={item.first_air_date || item.release_date}
                media_type="movie"
                vote_average={item.vote_average}
              />
            ))}
            {searchText &&
                !content &&
                (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)
            }
        </div>
        {numOfPages > 1 && (
          <CustomPagination setPage={setPage} numOfPages={numOfPages} />
        )}
      </div>
    );
}

export default Search;