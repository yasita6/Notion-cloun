import { Box } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import authUtils from "../../utils/authUtils";
import Loading from '../common/Loading';
import Sidebar from "../common/Sidebar";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/userSlice";

const AppLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // loadingを定義
  useEffect(() => {
    //JWTを持っているのかを確認する
    const checkAuth = async () => {
      //認証チェック
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate("/login");
      } else {
        //ユーザーを保存する
        dispatch(setUser(user));
        setLoading(false); // 認証が完了したらsetLoading(false)を呼び出す
      }
    };
    checkAuth();
  }, [dispatch, navigate]);

  return loading ? (
    <>
      <Loading fullHeight />
    </>
  ) : (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          p: 1,
          width: "max-content",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
  // return (
  //   <div>
  //     <Box sx={{ display: "flex" }}>
  //       <Sidebar />
  //       <Box sx={{ flexGrow: 1, p: 1, width: "max-content" }}>
  //         <Outlet />
  //       </Box>
  //     </Box>
  //   </div>
  // );
};

export default AppLayout;
