import { Avatar, Box, IconButton, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { getProvince } from "../../utils/api/getProvince";
import { LoadingButton } from "@mui/lab";
import CircularProgress from "@mui/material/CircularProgress";
import { getBaseImage } from "../../utils/handlers/getBaseImage";
import { imageUpload } from "../../utils/handlers/imageUploadClound";
import { userActions } from "../../actions/userActions";
import { useLocation } from "react-router-dom";
import SelectRole from "./components/SelectRole";
import { AddressForm, AddressProps } from "./components/AddressForm";
import { RootState } from "../../redux/store";
import { userChangeAvatar } from "../../redux/slices/userSlice";
import { UserRole, UserType } from "../../types/userType";

const initialErrText: {
  phone: string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  confirmPassword: string;
} = {
  phone: "",
  email: "",
  username: "",
  firstname: "",
  lastname: "",
  password: "",
  confirmPassword: "",
};

const Profile = () => {
  const dispatch = useAppDispatch();
  const isRole = useAppSelector((state) => state.user.user)?.permissions?.name!;
  const { state: userState } = useLocation();
  const user: UserType = useAppSelector((state) => {
    if (userState) {
      return userState.user;
    } else {
      return state.user.user;
    }
  });
  const [isDisable, setIsDisable] = useState(false);
  const [imageSelected, setImageSelected] = useState<string>("");
  const [avatarChanging, setAvatarChanging] = useState(false);
  const [dataAddress, setDataAddress] = useState([]);
  const [address, setAddress] = useState<AddressProps>(
    {
      city: user?.address?.city || "",
      district: user?.address?.district || "",
      ward: user?.address?.ward || "",
      street: user?.address?.street || "",
      more: user?.address?.more || "",
    } || user?.address
  );
  const [locationData, setLocationData] = useState<{
    provinces: { name: string }[];
    districts: { name: string }[];
    wards: { name: string }[];
  }>({
    provinces: [],
    districts: [],
    wards: [],
  });
  const [errText, setErrText] = useState(initialErrText);
  const isLoading = useAppSelector((state: RootState) => state.user.isLoading);

  // get provider
  useEffect(() => {
    const getProvinces = async () => {
      try {
        const data = await getProvince();
        setLocationData((prevData) => ({
          ...prevData,
          provinces: data,
        }));
        setDataAddress(data);
      } catch (e) {
        throw e;
      }
    };
    getProvinces();
  }, [isDisable]);

  // get cities, wards, disticts
  useEffect(() => {
    if (dataAddress && dataAddress.length > 0) {
      const matchingDataCity: any = dataAddress.find(
        (data: any) => data.name === address.city
      );

      if (matchingDataCity) {
        setLocationData((prevData) => ({
          ...prevData,
          districts: matchingDataCity.districts,
        }));
      }
    }

    if (locationData.districts && locationData.districts.length > 0) {
      const matchingDataDistrict: any = locationData.districts.find(
        (data: any) => data.name === address.district
      );

      if (matchingDataDistrict) {
        setLocationData((prevData) => ({
          ...prevData,
          wards: matchingDataDistrict.wards,
        }));
      }
    }
  }, [address, dataAddress, locationData.districts]);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data: UserType = {
      _id: user?._id,
      username: (formData.get("username") as string) || user?.username,
      phone: (formData.get("phone") as string) || user?.phone,
      email: (formData.get("email") as string) || user?.email,
      password: formData.get("password") as string,
      fullname: {
        firstname:
          (formData.get("firstname") as string) || user?.fullname?.firstname,
        lastname:
          (formData.get("lastname") as string) || user?.fullname?.lastname,
      },
      address,
    };

    let err: boolean = false;

    if (data.password !== formData.get("confirmPassword")) {
      setErrText((prev) => ({
        ...prev,
        confirmPassword: "Mật khâu không khớp",
      }));
      err = true;
    }

    if (err) return;
    setErrText(initialErrText);

    dispatch(userActions.userUpdate(data))
      .unwrap()
      .then(() => {
        setIsDisable(false);
      })
      .catch((err) => {
        err?.errors &&
          err?.errors?.forEach((e: any) => {
            switch (e.path) {
              case "fullname.firstname":
                setErrText((prev) => ({
                  ...prev,
                  firstname: e.msg,
                }));
                break;
              case "fullname.lastname":
                setErrText((prev) => ({
                  ...prev,
                  lastname: e.msg,
                }));
                break;
              case "username":
                setErrText((prev) => ({
                  ...prev,
                  username: e.msg,
                }));
                break;
              case "phone":
                setErrText((prev) => ({
                  ...prev,
                  phone: e.msg,
                }));
                break;
              case "email":
                setErrText((prev) => ({
                  ...prev,
                  email: e.msg,
                }));
                break;
              case "password":
                setErrText((prev) => ({
                  ...prev,
                  password: e.msg,
                }));
                break;
              default:
                break;
            }
          });
      });
  };

  const handleUpdateRole = async (permissions: string) => {
    await dispatch(userActions.updateRole({ userId: user._id!, permissions }));
  };

  const handleDisable = useCallback(() => {
    setIsDisable(!isDisable);
  }, [isDisable]);

  const handleChange = (name: string, value: string) => {
    setAddress((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handle update avatar user
  const onChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setAvatarChanging(true);
    const baseImage = await getBaseImage(e);
    if (baseImage && baseImage.length > 0) {
      const result = await imageUpload(baseImage[0].data);
      try {
        await userActions.changeAvatar({
          _id: user?._id,
          image: result,
        });
        dispatch(userChangeAvatar({ _id: user?._id!, avatar: result }));
        setImageSelected(result);
      } catch (error) {
      } finally {
        setAvatarChanging(false);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <input
        accept="image/*"
        id="contained-button-file"
        hidden
        type="file"
        onChange={onChangeImage}
        multiple={false}
      />
      {avatarChanging ? (
        <Box sx={{ mx: "auto", width: 150, height: 160 }}>
          <Typography>Đang cập nhật ảnh đại diện</Typography>
          <CircularProgress />
        </Box>
      ) : (
        <IconButton sx={{ width: "max-content", mx: "auto" }}>
          <label htmlFor="contained-button-file">
            <Avatar
              src={imageSelected || user?.avatar}
              alt={user?.fullname?.firstname}
              sx={{ width: 150, height: 150 }}
            />
          </label>
        </IconButton>
      )}

      <Typography>({user?.permissions?.name})</Typography>

      <Typography fontSize={32}>
        Hello {user?.fullname?.firstname} {user?.fullname?.lastname}
      </Typography>

      <Box
        component={"form"}
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 500,
          justifyContent: "center",
          textAlign: "center",
          mx: "auto",
        }}
      >
        {/* <Typography fontWeight={600} fontSize={25} pt={5}>
          Thông tin tài khoản
        </Typography> */}
        <Box display={"flex"} flex={"row"} justifyContent={"space-between"}>
          <TextField
            name="firstname"
            label="First Name"
            margin="normal"
            required
            disabled={!isDisable}
            defaultValue={user?.fullname?.firstname}
            error={errText.firstname !== ""}
            helperText={errText.firstname}
          />
          <TextField
            name="lastname"
            label="Last Name"
            margin="normal"
            disabled={!isDisable}
            required
            defaultValue={user?.fullname?.lastname}
            error={errText.lastname !== ""}
            helperText={errText.lastname}
          />
        </Box>
        <TextField
          name="username"
          disabled={!isDisable}
          label="Username"
          defaultValue={user?.username}
          margin="normal"
          required
          error={errText.username !== ""}
          helperText={errText.username}
        />
        <TextField
          name="phone"
          label="Phone"
          defaultValue={user?.phone}
          margin="normal"
          required
          disabled={!isDisable}
          error={errText.phone !== ""}
          helperText={errText.phone}
        />
        <TextField
          name="email"
          label="Email"
          defaultValue={user?.email}
          margin="normal"
          required
          disabled={!isDisable}
          error={errText.email !== ""}
          helperText={errText.email}
        />
        {isDisable && (
          <Box>
            <TextField
              name="password"
              label="Password"
              margin="normal"
              fullWidth
              error={errText.password !== ""}
              helperText={errText.password}
            />
            <TextField
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              margin="normal"
              error={errText.confirmPassword !== ""}
              helperText={errText.confirmPassword}
            />
          </Box>
        )}

        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          flexWrap={"wrap"}
          gap={2}
          pt={2}
        >
          <AddressForm
            name="City"
            data={locationData.provinces}
            address={address}
            setAddress={setAddress}
            handleChange={(n, v) => handleChange(n, v)}
            disabled={!isDisable}
          />
          <AddressForm
            name="District"
            data={locationData.districts}
            address={address}
            setAddress={setAddress}
            handleChange={(n, v) => handleChange(n, v)}
            disabled={!isDisable}
          />
          <AddressForm
            name="Ward"
            data={locationData.wards}
            address={address}
            setAddress={setAddress}
            handleChange={(n, v) => handleChange(n, v)}
            disabled={!isDisable}
          />
          <TextField
            label="Street"
            name="street"
            defaultValue={user?.address?.street || address.street}
            onChange={(e) =>
              setAddress((prevData) => ({
                ...prevData,
                street: e.target.value,
              }))
            }
            disabled={!isDisable}
          />
          <TextField
            label="More"
            name="more"
            fullWidth
            defaultValue={address?.more || address.more}
            onChange={(e) =>
              setAddress((prevData) => ({
                ...prevData,
                more: e.target.value,
              }))
            }
            disabled={!isDisable}
          />

          {/* select role */}
          {(isRole === UserRole.admin || isRole === UserRole.superadmin) && (
            <SelectRole
              role={user?.permissions?._id!}
              isDisable={isDisable}
              onUpdateRole={handleUpdateRole}
            />
          )}

          <LoadingButton
            variant="contained"
            color="warning"
            onClick={handleDisable}
            fullWidth
          >
            {!isDisable ? "Edit" : "Cancel"}
          </LoadingButton>
          {isDisable && (
            <LoadingButton
              loading={isLoading}
              variant="contained"
              color="success"
              fullWidth
              type="submit"
            >
              Update
            </LoadingButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
