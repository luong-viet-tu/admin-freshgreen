import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NewsType } from "../../types/newsType";
import { newsActions } from "../../actions/newsActions";
import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from "../../types/silceType";

interface InitialProps {
  newsList: NewsType[];
  totalNews: number;
  isLoading: boolean;
  modal: {
    open: boolean;
    data?: NewsType;
  };
}

const initialState: InitialProps = {
  newsList: [],
  totalNews: 0,
  isLoading: false,
  modal: {
    open: false,
    data: undefined,
  },
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNewsModel: (
      state,
      action: PayloadAction<{ open: boolean; data?: NewsType }>
    ) => {
      state.modal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newsActions.gets.fulfilled, (state, action) => {
        state.newsList = action.payload.newsList;
        state.totalNews = action.payload.totalNews;
      })
      .addCase(newsActions.create.fulfilled, (state, action) => {
        state.newsList.push(action.payload);
      })
      .addCase(newsActions.update.fulfilled, (state, action) => {
        state.newsList.find((news, index) => {
          if (news._id === action.payload._id) {
            state.newsList[index] = action.payload;
            return true;
          }
          return false;
        });
      })
      .addCase(newsActions.delete.fulfilled, (state, action) => {
        const newsIndex = state.newsList.findIndex(
          (news) => news._id === action.meta.arg
        );
        state.newsList.splice(newsIndex, 1);
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher<FulfilledAction | RejectedAction>(
        (action) =>
          action.type.endsWith("/fulfilled") ||
          action.type.endsWith("/rejected"),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export const { setNewsModel } = newsSlice.actions;
export default newsSlice.reducer;
