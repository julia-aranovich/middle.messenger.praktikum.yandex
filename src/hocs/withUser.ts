import withStore from "./withStore";
import {User} from "../api/AuthAPI";

export interface PropsWithUser extends User {
  isLoading?: boolean,
  error?: string
}

const withUser = withStore((state) => {
  const userData = { ...state.user?.data } as PropsWithUser;
  userData.isLoading = state.user?.isLoading;
  userData.error = state.user?.error;
  return userData;
});

export default withUser;
