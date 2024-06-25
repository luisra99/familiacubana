import "../../components/backdrop/backdrop.css";

import { Fragment } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import AnonymousGuard from "../anonymous-guard";
import Box from "@mui/material/Box";
import CallBackUrlController from "../callback-url-controller";
import DashboardLayout from "@/_pwa-framework/layouts/dashboard";
import RestoreSessionController from "../restore-session-controller";
import { getPageHeight } from "./utils";
import routes from "..";
import AuthGuard from "../auth-guard";
import LoginPage from "@/_pwa-framework/sections/login";
import SignUp from "@/_pwa-framework/sections/SignUp/SignUp";
import LandingPage from "@/app/Landing";
import NotFoundView from "@/_pwa-framework/layouts/error";

function Pages() {
  return (
    <Box sx={{ height: (theme) => getPageHeight(theme) }}>
      <Routes>
        <Route
          path="/"
          element={
            <AuthGuard>
              <DashboardLayout>
                <Outlet />
              </DashboardLayout>
            </AuthGuard>
          }
        >
          {Object.values(routes).map(
            ({ path, component: Component, subPath }) => {
              if (Component && path) {
                return (
                  <Route
                    key={path}
                    path={path}
                    element={
                      <AuthGuard>
                        <Component />
                      </AuthGuard>
                    }
                  />
                );
              }

              return (
                subPath &&
                Object.values(subPath).map(
                  ({ path: childPath, component: ChildComponent }) => {
                    if (ChildComponent && path && childPath) {
                      const completePath = `${path}${childPath}`;
                      return (
                        <Fragment key={completePath}>
                          <Route
                            key={completePath}
                            path={completePath}
                            element={
                              <AuthGuard>
                                <ChildComponent />
                              </AuthGuard>
                            }
                          />
                        </Fragment>
                      );
                    }
                    return null;
                  }
                )
              );
            }
          )}
        </Route>
        <Route
          index
          path="sign-in"
          element={
            <AnonymousGuard>
              <LoginPage />
            </AnonymousGuard>
          }
        />
        <Route
          index
          path="sign-up"
          element={
            <AnonymousGuard>
              <SignUp />
            </AnonymousGuard>
          }
        />
        <Route
          index
          path="landing"
          element={
            <AnonymousGuard>
              <Box
                display={"flex"}
                width={"100%"}
                height={"100%"}
                className="backdrop-box"
              >
                <span style={{ margin: "auto" }} className={"loader"} />
              </Box>
              <LandingPage />
            </AnonymousGuard>
          }
        />
        <Route path="/create-session" element={<CallBackUrlController />} />
        <Route path="/restore-session" element={<RestoreSessionController />} />
        <Route path="404" element={<NotFoundView />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Box>
  );
}

export default Pages;
