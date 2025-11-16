import Header from "@/components/Header";
import { Outlet } from "react-router";

function AuthLayout() {
    return (
        <div>
            <Header />
            <main>
                {/* Lấy nội dung của Route hiện tại -> đưa vào Outlet */}
                <Outlet />
            </main>
        </div>
    );
}

export default AuthLayout;
