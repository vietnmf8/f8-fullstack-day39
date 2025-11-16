import { Outlet } from "react-router";
import React from "react";
import Header from "@/components/Header";
function DefaultLayout() {
  return (
    <div>
      <Header />
      <main
        style={{
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        {/* Lấy nội dung của Route hiện tại -> đưa vào Outlet */}
        <Outlet />
      </main>

      <footer></footer>
    </div>
  );
}

export default DefaultLayout;
