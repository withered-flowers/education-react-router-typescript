# Education React Router (TypeScript Version)

## Table of Content

- [Disclaimer & Prerequisites](#disclaimer--prerequisites)
- Intro
- [Let's Learn](#lets-learn)
  - [Langkah 1 - Instalasi dan Inisialisasi React Router pada Project](#langkah-1---instalasi-dan-inisialisasi-react-router-pada-project)
  - [Langkah 2 - Ekstrak Layout Utama](#langkah-2---ekstrak-layout-utama)
  - [Langkah 3 - Membuat Counter Page](#langkah-3---membuat-counter-page)

## Disclaimer & Prerequisites

Dalam mempelajari ini Anda diharapkan sudah:

- Mengerti penggunaan git dan node
- Mengerti dasar dari React
- Mengerti penggunaan React Router
- Sudah mengerti "sedikit" tentang dasar Typescript
- [OPTIONAL] Sudah mencoba untuk membaca pembelajaran sebelumnya (https://education.withered-flowers.dev/education-react-typescript/)

Pada pembelajaran kita tidak akan:

- Mempelajari React Router terlalu dalam, dalam artian, bila Anda ingin menggunakan pembelajaran ini untuk mempelajari **Data API** (`Loader` / `Action`) dengan dalam, maka sebaiknya Anda mencari pembelajaran yang lain.

Pembelajaran ini cukup panjang, jadi mohon siapkan otak yang cukup dingin dalam mempelajari ini yah !

## Intro

Pada pembelajaran kali ini, kita akan mencoba untuk menggunakan React Router versi TypeScript yah.

## Let's Learn

### Langkah 1 - Instalasi dan Inisialisasi React Router pada Project

1. Clone project yang digunakan untuk pembelajaran kali ini: [Repository](https://github.com/withered-flowers/education-react-router-typescript)

1. Pindah ke directory `sources/a-start` kemudian install package yang digunakan dengan perintah:

   - [npm] npm install
   - [yarn] yarn add
   - [pnpm] pnpm install

1. Menambahkan package `react-router`dom` dengan menggunakan perintah:

   - [npm] npm install react-router-dom
   - [yarn] yarn add react-router-dom
   - [pnpm] pnpm add react-router-dom

1. Membuat sebuah file dengan nama `/src/routers/index.tsx` (Kenapa `tsx` dan bukan `ts`? karena pada router nanti kita akan import Component, dan untuk Component kita akan membutuhkan `tsx` bukan `ts`)

1. Menambahkan kode pada file `/src/routers/index.tsx` Untuk menggunakan `App.tsx` sebagai Component utama (nanti akan kita modifikasi lagi). Kode yang dituliskan adalah sebagai berikut:

   ```tsx
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
   ```

1. Modifikasi file `main.tsx` untuk menggunakan Router via `RouterProvider`. Adapun modifikasi kodenya adalah sebagai berikut:

   ```tsx
   import React from "react";
   import ReactDOM from "react-dom/client";
   // import App from "./App";
   // import './index.css'

   import { RouterProvider } from "react-router-dom";
   import router from "./routers";

   ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
     <React.StrictMode>
       <RouterProvider router={router} />
     </React.StrictMode>
   );
   ```

Sampai pada tahapan ini artinya route pertama kita sudah berjalan dengan baik, dan apabila kita melihat kodenya, tidak ada yang berbeda dengan kita menggunakan React Router versi JavaScript bukan?

Ya ! karena dalam TypeScript, terdapat suatu fitur yang bernama `infer`. Jadi TypeScript secara otomatis, bisa menebak tipe data yang harus digunakan oleh sebuah variabel tersebut, berdasarkan fungsi / value yang digunakan / di-assign terhadap variabel tersebut.

_Keren yah ?_

Namun hal ini sebisa mungkin, untuk hal hal yang sangat spesifik, harus dihindari, karena bisa saja, TypeScript salah untuk meng-`infer` tipe data yang digunakan pada variabel tersebut, dan hanya menjadikannya sebagai `any` saja.

(`any` artinya mirip dengan javascript, apapun bisa masuk sebagai variabelnya)

Sekarang mari kita coba untuk mengekstrak halaman utama menjadi sebuah layout yah.

## Langkah 2 - Ekstrak Layout Utama

Karena dalam setiap halaman yang ada di sini adalah memiliki sebuah NavigationBar (component `NavBar.tsx`), maka sekarang kita ingin ekstrak menjadi sebuah layout utama.

Layout Utama ini adalah sebuah halaman yang memiliki sebuah NavBar yang akan berisi anakan (`outlet`) untuk konten yang ada, entah konten tersebut berupa `CounterPage`, `FormPage` maupun `TablePage`

Asumsi untuk Routing yang akan didefinisikan adalah sebagai berikut:

- `/counter` akan mengarahkan pada halaman `CounterPage` (_akan dibuat nanti_)
- `/form` akan mengarahkan pada halaman `FormPage`
- `/table` akan mengarahkan pada halaman `TablePage`

Langkah langkahnya adalah sebagai berikut:

1. Membuat sebuah file baru dengan nama `/src/layouts/BaseLayout.tsx`. Pada halaman ini kita akan memanfaatkan `Link` dan `Outlet` yang ada pada React Router.

   Secara kasarnya `Link` adalah `anchor` yang berisi `href` menuju halaman yang sudah didefinisikan pada `routers/index.tsx` dan `Outlet` adalah `children` pada React.

1. Memodifikasi kode pada `/src/components/NavBar.tsx` untuk menggunakan `Link`

   ```ts
   // TODO: baseLayout - Menggunakan Link (6)
   // Ternyata, baik SyntheticEvent dan PageName sudah tidak digunakan lagi !
   // import { SyntheticEvent } from "react";
   // import { PageName } from "../config/constant";

   // TODO: baseLayout - Menggunakan Link (1)
   import { Link } from "react-router-dom";

   // TODO: baseLayout - Menggunakan Link (2)
   // Sekarang ini kita akan menggunakan navigate dari react-router-dom
   // sehingga interface ini sudah tidak digunakan
   // interface Props {
   //   fnHandler: (pageName: PageName) => void;
   // }

   // TODO: baseLayout - Menggunakan Link (3)
   // fnHandler sudah tidak digunakan, sehingga bisa kita kosongkan terlebih dahulu
   const NavBar = () => {
     // TODO: baseLayout - Menggunakan Link (4)
     // Untuk sekarang ini dicomment terlebih dahulu, karena nanti kita
     // akan ganti dengan navigate
     // const anchorOnClickHandler = (event: SyntheticEvent, pageName: PageName) => {
     //   event.preventDefault();
     //   fnHandler(pageName);
     // };

     return (
       <>
         <nav>
           <ul
             style={{
               display: "flex",
               flexDirection: "row",
               gap: "1em",
               listStyle: "none",
               paddingLeft: "0",
             }}
           >
             <li>
               {/* TODO: baseLayout - Menggunakan Link (5a) */}
               {/* Mengganti anchor dengan Link */}
               {/* asumsikan /counter ini sudah ada terlebih dahulu yah */}
               {/* <a
                  href="#"
                  onClick={(e) => anchorOnClickHandler(e, PageName.COUNTER_PAGE)}
                >
                  Counter
                </a> */}
               <Link to="counter">Counter</Link>
             </li>
             <li>
               {/* TODO: baseLayout - Menggunakan Link (5b) */}
               {/* Mengganti anchor dengan Link */}
               {/* asumsikan /form ini sudah ada terlebih dahulu yah */}
               {/* <a
                  href="#"
                  onClick={(e) => anchorOnClickHandler(e, PageName.FORM_PAGE)}
                >
                  Form
                </a> */}
               <Link to="form">Form</Link>
             </li>
             <li>
               {/* <a
                  href="#"
                  onClick={(e) => anchorOnClickHandler(e, PageName.TABLE_PAGE)}
                >
                  Table
                </a> */}
               {/* TODO: baseLayout - Menggunakan Link (5c) */}
               {/* Mengganti anchor dengan Link */}
               {/* asumsikan /table ini sudah ada terlebih dahulu yah */}
               <Link to="table">Table</Link>
             </li>
           </ul>
         </nav>
       </>
     );
   };

   export default NavBar;
   ```

   Ketika file ini selesai diketik dan di-save, maka akan muncul error pada file `App.tsx`, hal ini karena `App.tsx` masih menggunakan NavBar yang memiliki Props dan akan langsung muncul error (_menakjubkan yah?_, kalau dengan javascript pasti akan diabaikan saja !)

   Untuk error ini sementara akan diabaikan terlebih dahulu yah karena kita akan memperbaikinya nanti !

1. Selanjutnya kita akan memodifikasi file `/src/BaseLayout.tsx` untuk menggunakan `NavBar` yang sudah dimodikasi dan menggunakan `Outlet`. Adapun kodenya adalah sebagai berikut:

   ```tsx
   import { Outlet } from "react-router-dom";
   import NavBar from "../components/NavBar";

   const BaseLayout = () => {
     return (
       <>
         <NavBar />
         <Outlet />
       </>
     );
   };

   export default BaseLayout;
   ```

1. Selanjutnya kita akan memodifikasi file `/src/routers/index.tsx` untuk bisa menggunakan `BaseLayout.tsx` yang sudah dibuat sebelumnya, serta menambahkan route untuk `/form` dan `/table`.

   Adapun modifikasi kodenya adalah sebagai berikut:

   ```tsx
   import { createBrowserRouter } from "react-router-dom";
   // baseLayout - Import Layout dan Pages (5)
   // App sudah tidak digunakan di sini, sudah boleh di-comment
   // import App from "../App";

   // TODO: baseLayout - Import Layout dan Pages (1)
   // Di sini kita masih belum menggunakan CounterPage yah !
   import BaseLayout from "../layouts/BaseLayout";
   import FormPage from "../pages/FormPage";
   import TablePage from "../pages/TablePage";

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
   ```

Sampai pada langkah ini artinya kita sudah berhasil menggunakan `BaseLayout` dan sudah berhasil menambahkan route / endpoint `/form` dan `/table` pada aplikasi yang dibuat.

Selanjutnya kita akan mengekstrak `CounterPage` dari `App.tsx` sehingga `App.tsx` bisa jadi tidak perlu digunakan lagi

## Langkah 3 - Membuat Counter Page

Selanjutnya kita akan membuat `CounterPage` berdasarkan `App.tsx` yang sudah dibuat.

Hal ini akan kita lakukan karena pada akhirnya, kita sudah tidak akan menggunakan `App.tsx` lagi (full on `pages`).

Langkah dalam membuat Counter Page adalah sebagai berikut:

1. Membuat sebuah pages dengan nama `/src/pages/CounterPage.tsx`
1. Mengambil kode dari `App.tsx` dan memodifikasinya, dan memasukkannya ke `CounterPage.tsx`. Adapun kode yang dimasukkan ke dalam `CounterPage.tsx` adalah sebagai berikut:

   ```tsx
   // counterPage - Create Counter Page (0)
   // Memindahkan kode dari App.tsx ke sini

   // Dengan sedikit modifikasi
   // Karena:
   // 1. Kita sudah tidak menggunakan enum (PageState)
   // 2. Kita sudah tidak menggunakan Conditional Rendering, karena sudah menggunakan
   //    konsep routing dari react router
   import { ChangeEvent, useState } from "react";

   type DuoCounter = {
     firstCounter: number;
     secondCounter: number;
   };

   const CounterPage = () => {
     const [duoCounter, setDuoCounter] = useState<DuoCounter>({
       firstCounter: 0,
       secondCounter: 0,
     });

     const buttonFirstIncrementOnClickHandler = () => {
       setDuoCounter({
         ...duoCounter,
         firstCounter: duoCounter.firstCounter + 1,
       });
     };

     const [amount, setAmount] = useState<number>(0);

     const inputAmountOnChangeHandler = (
       event: ChangeEvent<HTMLInputElement>
     ) => {
       const amountValue = event.currentTarget.value;
       const amounValueInNumber = parseInt(amountValue);
       setAmount(amounValueInNumber);
     };

     const buttonSecondIncrementOnClickHandler = () => {
       setDuoCounter({
         ...duoCounter,
         secondCounter: duoCounter.secondCounter + amount,
       });
     };

     return (
       <>
         <section className="Duo Counter">
           <p>Value dari firstCounter adalah: {duoCounter.firstCounter}</p>
           <p>Value dari secondCounter adalah: {duoCounter.secondCounter}</p>

           <div style={{ marginBottom: "1em" }}>
             <button onClick={buttonFirstIncrementOnClickHandler}>
               Tambah (firstCounter)
             </button>
           </div>

           <div>
             <input
               style={{ marginRight: "1em" }}
               type="number"
               placeholder="Amount"
               value={amount}
               onChange={inputAmountOnChangeHandler}
             />

             <button onClick={buttonSecondIncrementOnClickHandler}>
               Tambah (secondCounter)
             </button>
           </div>
         </section>
       </>
     );
   };

   export default CounterPage;
   ```

1. Selanjutnya kita akan memodifikasi `/src/routers/index.tsx` untuk menambahkan routing `/counter` dan menggunakan `CounterPage.tsx`. Adapun modifikasi kodenya adalah sebagai berikut:

   ```tsx
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
   ```

1. Sampai pada tahap ini, artinya kita sudah boleh untuk menghapus file `App.tsx` karena sudah tidak digunakan lagi. Menakjubkan bukan? Ternyata React bisa dibuat tanpa `App.jsx` !

Pada tahap ini artinya kita sudah berhasil untuk menggunakan React Router dan memecahnya menjadi 3 page:

- `/counter` untuk `CounterPage.tsx`
- `/form` untuk `FormPage.tsx`
- `/table` untuk `TablePage.tsx`

Dan apakah kalian sadar? Dari tadi, kita sudah menggunakan React Router, versi TypeScript, tapi, secara kode, kita tidak menuliskan sedikitpun kode TypeScriptnya sama sekali loh. (Tidak ada `Type`, tidak ada `Interface`, tidak ada `Enum` dan lain lain)

Hal ini bisa dilakukan karena sekali lagi, TypeScript bisa melakukan `infer` terhadap tipe data yang dibutuhkan secara otomatis, dan ter-cover disini.

Keren yah !
