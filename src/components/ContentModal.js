import { useState, useEffect } from "react";
import {Fade, Modal, Backdrop} from "@mui/material";
import {makeStyles} from "@material-ui/core/styles";
import { Button, Badge} from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import {
  img_300,
  img_500,
  unavailable,
  unavailableLandscape,
} from "../config/config";
import axios from "axios";
import  Carousel from "./Carousel";
import "../css/ContentModal.css";

const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      width: "90%",
      height: "80%",
      backgroundColor: "#39445a",
      border: "1px solid #282c34",
      borderRadius: 10,
      color: "white",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(1,1,3),
    },
}));


function TransitionsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState([]);
  const [video, setVideo] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const fetehData = async () => {
    const { data } = await axios.get(
        `https://api.themoviedb.org/3/${props.media_type}/${props.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      
    setContent(data);
  }

  const fetehVideo = async () => {
    const { data } = await axios.get(
          `https://api.themoviedb.org/3/${props.media_type}/${props.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };


  useEffect(() => {
    fetehData();
    fetehVideo();
    // eslint-disable-next-line
  }, []);


  return (
    <>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        <Badge
          badgeContent={props.vote_average}
          color={props.vote_average > 6 ? "primary" : "secondary"}
          overlap="rectangular"
        />
        <img
          className="poster"
          src={props.poster ? `${img_300}${props.poster}` : unavailable}
          alt={props.title}
        />
        <b className="title">{props.title}</b>
        <span className="subTitle">
          {props.media_type === "tv" ? "TV Series" : "Movie"}
          <span className="subTitle">{props.date}</span>
        </span>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <div className={classes.paper}>
              <div className="ContentModal">
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {content.overview}
                  </span>

                  <div>
                    <Carousel id={props.id} media_type={props.media_type} />
                  </div>

                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}

export default TransitionsModal;
