import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

import { LogoutIcon } from "../assets/icons/icons";
import { useDispatch } from "react-redux";
import { auth } from "../firebase/config";
import { logOut } from "../redux/auth/authSlice";

export const LogoutButtonComponent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(logOut());
        navigation.navigate("Login");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <TouchableOpacity onPress={handleLogOut}>
      <LogoutIcon style={{ marginRight: 20 }} />
    </TouchableOpacity>
  );
};
