import { Box, LinearProgress } from "@mui/material";
import HomeSwiper from "./components/HomeSwiper";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import Banner from "./components/Banner";
import EmailForm from "./components/EmailForm";
import { useEffect, useState } from "react";
import { settingsActions } from "../../actions/settingActions";
import TokenForm from "./components/TokenForm";

export default function Settings() {
  const data = useAppSelector((state: RootState) => state.settings);
  const user = useAppSelector((state: RootState) => state.user.user);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(settingsActions.getSetting(user._id!)).then(() =>
      setIsLoading(false)
    );
  }, [dispatch, user._id]);

  return isLoading ? (
    <LinearProgress />
  ) : (
    <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} gap={3}>
      <HomeSwiper settings={data.settings} user={user} />

      <Banner />

      <EmailForm {...data.settings.emailSendPort} />

      <TokenForm tokenGPT={data.settings.tokenGPT} />
    </Box>
  );
}
