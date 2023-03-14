import { createBrowserRouter } from "react-router-dom";
// baseLayout - Import Layout dan Pages (5)
// App sudah tidak digunakan di sini, sudah boleh di-comment
// import App from "../App";

// TODO: baseLayout - Import Layout dan Pages (1)
// Di sini kita masih belum menggunakan CounterPage yah !
import BaseLayout from "../layouts/BaseLayout";
import FormPage from "../pages/FormPage";
import TablePage from "../pages/TablePage";

// TODO: counterPage - Create Counter Page (1)
// Di sini kita akan import CounterPage yang barusan dibuat
import CounterPage from "../pages/CounterPage";

// Karena ini akan di-infer (ditebak) secara otomatis, kita tidak perlu menuliskan tipe datanya

// Hanya saja sebagai info router tipe datanya adalah "Router" / "RemixRouter"
// https://reactrouter.com/en/main/routers/create-browser-router#type-declaration

// Kemudian, untuk setiap Object yang didefinisikan di dalam array createBrowserRouter
// tipe datanya bernama "RouteObject"
// https://reactrouter.com/en/main/route/route#type-declaration
const router = createBrowserRouter([
  // TODO: baseLayout - Import Layout dan Pages (2)
  // Karena di sini sudah tidak menggunakan App lagi, maka path ini akan kita comment
  // {
  //   path: "/",
  //   element: <App />,
  // },
  // TODO: baseLayout - Import Layout dan Pages (3)
  // Di sini kita akan menggunakan BaseLayout sebagai element utama,
  // dilanjutkan untuk setiap path yang akan dideclare sebagai children
  // sehingga element FormPage dan TablePage akan dibuat berdasarkan
  // BaseLayout yang ada.

  // (Ingat, pada BaseLayout ada Outlet untuk bisa menerima component children)
  {
    element: <BaseLayout />,
    children: [
      {
        path: "form",
        element: <FormPage />,
      },
      {
        path: "table",
        element: <TablePage />,
      },
      // TODO: counterPage - Create Counter Page (2)
      // Tambahkan path di sini
      {
        path: "counter",
        element: <CounterPage />,
      },
    ],
  },
  // TODO: baseLayout - Import Layout dan Pages (4)
  // Di sini kita menggunakan Catch All / Splats untuk menerima 404
  // Splats / Catch All / Router 404
  {
    path: "*",
    element: <h1>Not Found Oi !</h1>,
  },
]);

export default router;
