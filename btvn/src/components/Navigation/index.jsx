import paths from "@/configs/path";
import { NavLink } from "react-router";

const items = [
  {
    path: paths.home,
    title: "Home",
  },
  {
    path: paths.todoApp,
    title: "Todo App",
  },
];

function Navigation() {
  /* Hàm Render Item */

  return (
    <nav>
      <ul
        style={{
          display: "flex",
          gap: 20,
          listStyle: "none",
        }}
      >
        {items.map((item, index) => (
          <li key={index}>
            <NavLink
              className={({ isActive }) => (isActive ? "current" : "")}
              to={item.path}
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
