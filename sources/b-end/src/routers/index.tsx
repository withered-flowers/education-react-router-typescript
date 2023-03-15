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

// TODO: loader - Menggunakan loader di router/index.tsx (1)
// Import type Comment
import { type Comment } from "../schemas/comment";

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
    // TODO: loader - Menggunakan loader di router/index.tsx (2)
    // Sekarang di sini kita akan menggunakan custom errorElement (apabila terjadi error)
    // Error yang dimaksud adalah di luar error route not found
    // Dokumentasi: https://reactrouter.com/en/main/route/error-element
    errorElement: <h1>Terjadi sebuah error</h1>,
    children: [
      {
        path: "form",
        element: <FormPage />,
      },
      {
        path: "table",
        element: <TablePage />,
        // TODO: loader - Menggunakan loader di router/index.tsx (3)
        // Karena di sini kita akan mengambil data terlebih dahulu sebelum page dirender
        // kita akan menggunakan loader

        // loader ini akan menerima sebuah fungsi, yang mana bisa dituliskan secara async / await
        // apabila membutuhkan async / await (seperti fetch)

        // Di sini sebenarnya secara default typescript bisa melakukan infer bahwa tipe data
        // dari request adalah Request

        // tipe data Request adalah bawaan untuk semua web (stanadard data type)
        // untuk spec request bisa dibaca di https://developer.mozilla.org/en-US/docs/Web/API/Request

        // Untuk pembelajaran kita akan mencoba untuk melakukan definisi tipe data secara manual
        // (Perhatikan) ": { request: Request }"
        loader: async ({ request }: { request: Request }) => {
          console.log(request);

          // TODO: loader - Menggunakan loader di router/index.tsx (4)
          // Kita akan memindahkan isi dari useEffect dari TablePage.tsx ke dalam sini
          try {
            const response = await fetch(
              "https://jsonplaceholder.typicode.com/commentssss"
            );

            if (!response.ok) {
              const body = await response.text();
              throw new Error(body);
            }

            const responseJson: Comment[] = await response.json();

            // TODO: loader - Menggunakan loader di router/index.tsx (5)
            // Di sini kita tidak boleh menggunakan state
            // setComments(responseJson);

            // TODO: loader - Menggunakan loader di router/index.tsx (6)
            // Melainkan kita akan return hasilnya
            return responseJson;

            // Apabila tidak ada apapun yang dikembalikan
            // Wajib return null
          } catch (err) {
            if (typeof err === "string") {
              console.log(err);
            }

            // Karena ini dari error, kita tidak wajib mengembalikan apapun ke sini
          }
        },
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
