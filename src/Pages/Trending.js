import {useState, useEffect} from "react";
import SingleContent from "../components/SingleContent";
import CustomPagination from "../components/CustomPagination"
import axios from "axios";
import "../css/Trending.css";

function Trending() {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);

    const fetchTrending = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
        ).catch(function(error) {
            console.log(Error(error));
        });
        setContent(data.results);
    }

    useEffect(() => {
        window.scroll(0 , 0);
        fetchTrending();
    }, [page]);

    return (
        <>
            <div>
                <span className="pageTitle">Trending Today</span>
                <div className="trending">
                    {content &&
                        content.map((item) => (
                            <SingleContent
                                key={item.id}
                                id={item.id}
                                poster={item.poster_path}
                                title={item.title || item.name}
                                date={item.first_air_date || item.release_date}
                                media_type={item.media_type}
                                vote_average={item.vote_average}
                            />
                        ))}
                </div>
                <CustomPagination setPage={setPage}/>
            </div>
        </>
    );
}

export default Trending;