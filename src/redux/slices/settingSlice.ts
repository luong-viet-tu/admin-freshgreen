import { createSlice } from "@reduxjs/toolkit";
import { settingsActions } from "../../actions/settingActions";
import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from "../../types/silceType";
import { SettingsType } from "../../types/settingsType";

interface InitialProps {
  settings: SettingsType;
  loading: boolean;
}

const initialState: InitialProps = {
  settings: {
    banners: {
      images: [],
    },
    tokenGPT: "",
    emailSendPort: {
      email: "",
      password: "",
    },
  },
  loading: false,
};

const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(settingsActions.getSetting.fulfilled, (state, action) => {
      state.settings = action.payload;
    });
    builder
      .addCase(settingsActions.updateSetting.fulfilled, (state, action) => {
        state.settings._id = action.payload._id;
        state.settings.banners = action.payload.banners;
      })
      .addCase(settingsActions.emailPortAction.fulfilled, (state, action) => {
        state.settings.emailSendPort = action.payload;
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("pending"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher<FulfilledAction | RejectedAction>(
        (action) =>
          action.type.endsWith("fulfilled") || action.type.endsWith("rejected"),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export default settingSlice.reducer;
