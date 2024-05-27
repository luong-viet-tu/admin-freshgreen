import { useEffect, useState } from "react";
import RoleForm from "./components/RoleForm";
import { RoleTable } from "./components/RoleTable";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { RoleActionsType, roleActions } from "../../actions/roleActions";
import { initialRole } from "../../types/roleType";

const Roles = () => {
  const [role, setRole] = useState<string>("");
  const [roleErrText, setRoleErrText] = useState<string>("");
  const [isPending, setIsPending] = useState(false);

  const loading = useAppSelector((state: RootState) => state.role.isLoading);
  const roles = useAppSelector((state: RootState) => state.role.roles);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(roleActions.gets());
  }, [dispatch]);

  const handleChange = async () => {
    if (role === "") {
      setRoleErrText("Bạn chưa nhập role");
      return;
    }
    dispatch(roleActions.create({ ...initialRole, name: role }));
    setRole("");
  };

  const handleDelete = async (role: RoleActionsType) => {
    setIsPending(true);
    dispatch(roleActions.delete(role));
    setIsPending(false);
  };

  return (
    <Box display={"flex"} gap={10} justifyContent={"center"}>
      <RoleForm
        role={role}
        setRole={setRole}
        onChange={handleChange}
        roleErrText={roleErrText}
        isLoading={loading}
      />
      <Box width={"50%"}>
        <RoleTable
          roles={roles}
          onDelete={handleDelete}
          isPending={isPending}
        />
      </Box>
    </Box>
  );
};

export default Roles;
