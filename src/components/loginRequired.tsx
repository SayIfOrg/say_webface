import { ReactNode, useEffect } from "react";
import { IsTokenValidOrRefresh } from "../../lib/wagtail/auth";
import { useRouter } from "next/router";

interface ILoginRequiredProps {
  children: ReactNode;
}

export const LoginRequired = ({ children }: ILoginRequiredProps) => {
  const router = useRouter();

  useEffect(() => {
    let token = localStorage.getItem("JWT");
    let refresh = localStorage.getItem("refreshJWT");
    let loginPath = `/login/?next=${router.asPath}`;
    if (!token || !refresh) {
      router.push(loginPath);
      return;
    }
    IsTokenValidOrRefresh(token, refresh).then((res) => {
      if (res === "invalid") router.push(loginPath);
    });
  }, []);

  return <>{children}</>;
};
