import FormData from "@/components/form/FormData";
import InputData from "@/components/form/InputData";
import { verifyToken } from "@/components/utils/verifyToken";
import { setUser, TUser } from "@/redux/feacures/auth/authSlice";
import { useRegisterMutation } from "@/redux/feacures/public/registerUserApi";
import { useAppDispatch } from "@/redux/hook";
import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmit = async (data: FieldValues) => {
    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: "user",
      };
      const res = await register(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <FormData onSubmit={onSubmit}>
          <InputData type="text" name="name" label="name:" />
          <InputData type="text" name="email" label="email:" />
          <InputData type="text" name="password" label="password" />
          <Button htmlType="submit">Register</Button>
        </FormData>
      </Row>
    </div>
  );
};

export default Register;
