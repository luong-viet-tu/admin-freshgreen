import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { memo } from "react";
import { NewsType } from "../../../types/newsType";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAppDispatch } from "../../../redux/hooks";
import moment from "moment";
import { setNewsModel } from "../../../redux/slices/newsSlice";
import { useNavigate } from "react-router-dom";
import { newsActions } from "../../../actions/newsActions";

interface NewsItemProps {
  news: NewsType;
}

const NewsItem = memo((props: NewsItemProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleView = () => {
    dispatch(setNewsModel({ open: true, data: props.news }));
  };

  const handleDelete = async () => {
    dispatch(newsActions.delete(props.news._id as string));
  };

  return (
    <Card
      variant="outlined"
      sx={{
        px: 2,
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        // bgcolor: "#ddd",
      }}
    >
      <CardMedia image={props.news.thumbnail} sx={{ height: 300 }} />
      <CardContent sx={{ width: 300, height: 200 }}>
        <Typography
          sx={{
            wordWrap: "break-word",
            textAlign: "center",
            fontWeight: 600,
            fontSize: 22,
            textTransform: "uppercase",
          }}
        >
          {props.news.title}
        </Typography>
        <div
          style={{ wordWrap: "break-word", opacity: 0.8 }}
          dangerouslySetInnerHTML={{ __html: props.news.content }}
        ></div>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          backdropFilter: "blur(10px)",
          flexDirection: "column",
          mt: "auto",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography>
            Category: <b>{props.news.category}</b>
          </Typography>
          <Typography>
            View: <b>{props.news.tags.map((tag) => tag.name).join(", ")}</b>
          </Typography>
          <Typography>
            Author:{" "}
            <b
              style={{ cursor: "pointer", color: "green" }}
              onClick={() =>
                navigate(
                  `/users/${props.news.author ? props.news.author?._id : ""}`,
                  {
                    state: { user: props.news?.author },
                  }
                )
              }
            >
              {props.news.author?.username}
            </b>
          </Typography>
          <Typography>
            View: <b>{props.news.viewCount}</b>
          </Typography>
          <Typography>
            Created: <b>{moment(props.news.createdAt).format("llll")}</b>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <IconButton color="error" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
          <IconButton color="primary" onClick={handleView}>
            <VisibilityIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
});

export default NewsItem;
