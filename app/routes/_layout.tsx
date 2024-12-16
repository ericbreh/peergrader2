import { Outlet } from "@remix-run/react";
import { Navigation } from "~/components/navigation";

export default function Layout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}