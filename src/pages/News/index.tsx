import { Box, LinearProgress, SpeedDial } from "@mui/material";
import NewsModel from "./components/NewsModel";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import NewsList from "./components/NewsList";
import { useCallback, useEffect, useMemo, useState } from "react";
import { newsActions } from "../../actions/newsActions";
import Search from "../../components/common/Search";
import { setNewsModel } from "../../redux/slices/newsSlice";
import { RootState } from "../../redux/store";

const News = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dispatch = useAppDispatch();
  const { newsList, isLoading } = useAppSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    dispatch(newsActions.gets());
  }, [dispatch]);

  const handleOpenModel = useCallback(() => {
    dispatch(setNewsModel({ open: true }));
  }, [dispatch]);

  const filterNewsList = useMemo(
    () =>
      newsList.filter((news) =>
        news.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [newsList, searchQuery]
  );

  return (
    <Box>
      <Search
        placeholder="news..."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Box my={1}>
        {isLoading ? (
          <LinearProgress />
        ) : (
          <NewsList newsList={filterNewsList} />
        )}
      </Box>
      <SpeedDial
        ariaLabel="Create an news"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
        icon={<SpeedDialIcon />}
        onClick={handleOpenModel}
      />
      <NewsModel />
    </Box>
  );
};

export default News;
