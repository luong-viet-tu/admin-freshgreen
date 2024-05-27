import { ChangeEvent, useEffect, useState } from "react";
import VoucherForm from "./components/VoucherForm";
import { VoucherTable } from "./components/VoucherTable";
import { Box, CircularProgress } from "@mui/material";
import {
  VoucherActionsType,
  voucherActions,
} from "../../actions/voucherActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import moment from "moment";
import { RootState } from "../../redux/store";
import { VoucherType } from "../../types/voucherType";

export interface VoucherErrType {
  voucher: string;
  discount: string;
  lastDate: string;
}

export interface HandleChangeProps {
  action: string;
  voucher: VoucherActionsType;
}

const initalVoucher: VoucherType = {
  _id: undefined,
  voucher: "",
  discount: 0,
  author: "",
  lastDate: moment().format("YYYY-MM-DD"),
};

const initialErrText: VoucherErrType = {
  voucher: "",
  discount: "",
  lastDate: "",
};

const Vouchers = () => {
  const user = useAppSelector((state: RootState) => state.user.user);
  const [voucher, setVoucher] = useState<VoucherType>(initalVoucher);

  const [voucherErrText, setVoucherErrText] =
    useState<VoucherErrType>(initialErrText);
  const [isPending, setIsPending] = useState(false);
  const [handle, setHandle] = useState<"Create" | "Update">("Create");

  const dispatch = useAppDispatch();
  const vouchers = useAppSelector((state) => state.voucher.vouchers);
  const loading = useAppSelector((state: RootState) => state.voucher.loading);

  useEffect(() => {
    dispatch(voucherActions.gets());
  }, [dispatch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVoucher((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = () => {
    if (moment(voucher.lastDate).format("L") < moment(Date.now()).format("L")) {
      setVoucherErrText((prev) => ({
        ...prev,
        lastDate: "Ngày hết hạn không hợp lệ",
      }));
      return;
    }

    if (
      voucher.discount === null ||
      voucher.discount === undefined ||
      +voucher.discount < 0 ||
      +voucher.discount > 100
    ) {
      setVoucherErrText((prev) => ({
        ...prev,
        discount: "Phần trăm giảm giá không hợp lệ",
      }));
      return;
    }

    setVoucherErrText(initialErrText);
    setIsPending(true);

    if (handle === "Create") {
      dispatch(
        voucherActions.create({
          ...voucher,
          author: user.username,
          discount: +voucher.discount,
        })
      )
        .unwrap()
        .then()
        .catch((err) => {
          err?.errors.forEach((e: any) => {
            switch (e.path) {
              case "voucher":
                setVoucherErrText((prev) => ({
                  ...prev,
                  voucher: e.msg,
                }));
                break;
              case "discount":
                setVoucherErrText((prev) => ({
                  ...prev,
                  discount: e.msg,
                }));
                break;
              default:
                break;
            }
          });
        });

      setIsPending(false);
    }

    if (handle === "Update") {
      dispatch(
        voucherActions.update({
          ...voucher,
          author: user.username,
          discount: voucher?.discount ? voucher?.discount : 0,
        })
      )
        .unwrap()
        .then()
        .catch((err) => {
          err?.errors.forEach((e: any) => {
            switch (e.path) {
              case "voucher":
                setVoucherErrText((prev) => ({
                  ...prev,
                  voucher: e.msg,
                }));
                break;
              case "discount":
                setVoucherErrText((prev) => ({
                  ...prev,
                  discount: e.msg,
                }));
                break;
              default:
                break;
            }
          });
        });

      setIsPending(false);
    }
  };

  const handleCancel = () => {
    setHandle("Create");
    setVoucher(initalVoucher);
  };

  const handleDelete = async (voucher: VoucherType) => {
    dispatch(voucherActions.delete(voucher));
  };
  return (
    <Box display={"flex"} gap={10} padding={10} justifyContent={"center"}>
      <VoucherForm
        handleInputChange={handleInputChange}
        handleCancel={handleCancel}
        voucher={voucher}
        setVoucher={setVoucher}
        onChange={handleChange}
        voucherErrText={voucherErrText}
        isLoading={isPending}
        handle={handle}
      />
      {loading ? (
        <Box display={"flex"} justifyContent={"center"}>
          <CircularProgress />
        </Box>
      ) : (
        <Box minWidth={"80%"}>
          <VoucherTable
            vouchers={vouchers}
            onDelete={handleDelete}
            setVoucher={setVoucher}
            handle={handle}
            setHandle={setHandle}
            isPending={isPending}
          />
        </Box>
      )}
    </Box>
  );
};

export default Vouchers;
