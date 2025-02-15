import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import FormData from "../form/FormData";
import InputData from "../form/InputData";
import { useLoginMutation } from "@/redux/feacures/auth/authApi";
import { useAppDispatch } from "@/redux/hook";
import { toast } from "sonner";
import { verifyToken } from "../utils/verifyToken";
import { setUser, TUser } from "@/redux/feacures/auth/authSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");

    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));

      if (user) {
        toast.success("Logged in", { id: toastId, duration: 2000 });
        navigate(`/${user.role}/dashboard`);
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
      console.log(error);
    }
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <FormData onSubmit={onSubmit}>
        <InputData type="text" name="email" label="email:" />
        <InputData type="text" name="password" label="password" />
        <Button htmlType="submit">Login</Button>
      </FormData>
    </Row>
  );
};

export default Login;
