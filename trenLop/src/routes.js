import paths from "./configs/path";
import DefaultLayout from "./layouts/DefaultLayout";
import Redux from "./pages/Redux/";

const routes = [
    {
        layout: DefaultLayout,
        children: [{ path: paths.redux, component: Redux }],
    },
];

export default routes;
