import React from "react";
import Link from "@mui/material/Link";
import "./login.css";

const Login = () => {
  return (
    <div className="page">
      <Link href="/auth/login" variant="h3">
        Login with Spotify
      </Link>
    </div>
  );
};

export { Login };
