import paths from "./configs/path";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import TodoApp from "./pages/TodoApp";

const routes = [
  {
    layout: DefaultLayout,
    children: [
      { path: paths.home, component: Home },
      { path: paths.todoApp, component: TodoApp },
    ],
  },
];

export default routes;
