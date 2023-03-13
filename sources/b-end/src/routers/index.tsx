import { createBrowserRouter } from "react-router-dom";
import App from "../App";

// Karena ini akan di-infer (ditebak) secara otomatis, kita tidak perlu menuliskan tipe datanya

// Hanya saja sebagai info router tipe datanya adalah "Router" / "RemixRouter"
// https://reactrouter.com/en/main/routers/create-browser-router#type-declaration

// Kemudian, untuk setiap Object yang didefinisikan di dalam array createBrowserRouter
// tipe datanya bernama "RouteObject"
// https://reactrouter.com/en/main/route/route#type-declaration
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

export default router;
