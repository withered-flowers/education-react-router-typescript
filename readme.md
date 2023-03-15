# Education React Router (TypeScript Version)

## Table of Content

- [Disclaimer & Prerequisites](#disclaimer--prerequisites)
- [Intro](#intro)
- [Let's Learn](#lets-learn)
  - [Langkah 1 - Instalasi dan Inisialisasi React Router pada Project](#langkah-1---instalasi-dan-inisialisasi-react-router-pada-project)
  - [Langkah 2 - Ekstrak Layout Utama](#langkah-2---ekstrak-layout-utama)
  - [Langkah 3 - Membuat Counter Page](#langkah-3---membuat-counter-page)
  - [Langkah 4 - Menggunakan loader dari Data API](#langkah-4---menggunakan-loader-dari-data-api)
  - [Langkah 5 - Menggunakan params](#langkah-5---menggunakan-params)

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

Selanjutnya mari kita mencoba untuk menggunakan Loader yang dimiliki oleh React Router yah.

## Langkah 4 - Menggunakan loader dari Data API

Pada langkah ini kita akan mencoba untuk menggunakan `loader` dari React Router untuk bisa mendapatkan data **SEBELUM** component-nya akan di-render pada halaman `TablePage.tsx`

`loader` adalah sebuah API bawaan dari React Router apabila kita menggunakan cara penulisan router yang baru yang bernama Data APIs

Dokumentasi:

- https://reactrouter.com/en/main/routers/picking-a-router
- https://reactrouter.com/en/main/route/loader
- https://reactrouter.com/en/main/hooks/use-loader-data

Langkah langkahnya adalah sebagai berikut:

1. Membuat sebuah file baru dengan nama `/src/schemas/comment.ts` dan memindahkan `type Comment` dari `/src/pages/TablePage.tsx` ke `comment.ts`.

   Adapun kode pada `comment.ts` adalah sebagai berikut:

   ```ts
   // Export type Comment
   // Mengapa?
   // Karena type Comment ini akan digunakan di router/index.tsx dan pages/TablePage.tsx
   export type Comment = {
     id: number;
     email: string;
     body: string;
   };
   ```

1. Menggunakan Loader pada `/routers/index.tsx`

   ```tsx
   import { createBrowserRouter } from "react-router-dom";
   import BaseLayout from "../layouts/BaseLayout";
   import FormPage from "../pages/FormPage";
   import TablePage from "../pages/TablePage";
   import CounterPage from "../pages/CounterPage";

   // TODO: loader - Menggunakan loader di router/index.tsx (1)
   // Import type Comment
   import { type Comment } from "../schemas/comment";

   const router = createBrowserRouter([
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
         {
           path: "counter",
           element: <CounterPage />,
         },
       ],
     },
     {
       path: "*",
       element: <h1>Not Found Oi !</h1>,
     },
   ]);

   export default router;
   ```

1. Menggunakan useLoaderData pada `/src/pages/TablePage.tsx`.

   ```tsx
   // TODO: loader - Menggunakan useLoaderData (1)
   // Comment useEffect dan useState, sudah tidak dibutuhkan
   // import { useEffect, useState } from "react";

   // TODO: loader - Menggunakan useLoaderData (2)
   // import type Comment dan useLoaderData
   import { type Comment } from "../schemas/comment";
   import { useLoaderData } from "react-router-dom";

   const TablePage = () => {
     // TODO: loader - Menggunakan useLoaderData (3)
     // comment useState karena tidak digunakan lagi
     // const [comments, setComments] = useState<Comment[]>([]);

     // TODO: loader - Menggunakan useLoaderData (5)
     // Menggunakan useLoaderData

     // Karena useLoaderData akan mengembalikan tipe data "unknown",
     // kita tidak bisa langsung mengubah tipe data
     // di sebelah kirinya dengan cara
     // const comments: Comment[]

     // Tapi kita harus meminta agar useLoaderData() memiliki tipe data kembalian adalah Comment[]
     // sehingga di sini kita menggunakan
     // useLoaderData() as Comment[]

     // Dan karena nanti ini bisa diubah (di filter)
     // Maka kita akan menggunakan let, bukan const
     let comments = useLoaderData() as Comment[];

     // TODO: loader - Menggunakan useLoaderData (4)
     // Comment useEffect karena sudah tidak digunakan lagi
     // useEffect(() => {
     //   (async () => {
     //     try {
     //       const response = await fetch(
     //         "https://jsonplaceholder.typicode.com/comments"
     //       );

     //       if (!response.ok) {
     //         const body = await response.text();
     //         throw new Error(body);
     //       }

     //       const responseJson: Comment[] = await response.json();

     //       setComments(responseJson);
     //     } catch (err) {
     //       if (typeof err === "string") {
     //         console.log(err);
     //       }
     //     }
     //   })();
     // }, []);

     // TODO: loader - Menggunakan useLoaderData (6)
     // Modifikasi setComments dari useState
     // langsung melakukan assignment terhadap comments
     const eachRowButtonDeleteOnClickHandler = (data: Comment) => {
       let filteredComments = comments.filter(
         (comment) => comment.id !== data.id
       );
       // setComments(filteredComments);
       comments = filteredComments;
     };

     return (
       <>
         <p>Ini adalah halaman Table</p>

         <table>
           <thead>
             <tr>
               <th>Id</th>
               <th>Email</th>
               <th>Body</th>
               <th>Action</th>
             </tr>
           </thead>
           <tbody>
             {comments.map((comment) => (
               <tr key={comment.id}>
                 <td>{comment.id}</td>
                 <td>{comment.email}</td>
                 <td>{comment.body}</td>
                 <td>
                   <button
                     onClick={() => eachRowButtonDeleteOnClickHandler(comment)}
                   >
                     Delete
                   </button>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </>
     );
   };

   export default TablePage;
   ```

Dan selesai sudah penggunaan loader Data API pada aplikasi yang dibuat, mantap !

## Langkah 5 - Menggunakan params

Selanjutnya kita akan mencoba untuk menggunakan params pada React Router ini.

Requirementnya adalah:

- Halaman Detail akan tampil ketika tombol `Detail` pada halaman `TablePage.tsx` ditekan. tombol `Detail` dibuat di sebelah / di atas tombol `Delete`
- Endpoint yang digunakan adalah `/table/idCommentYangDipilih`.

  Contoh: `/table/1` akan mengarah pada `Comment` dengan id 1

- Nama Page yang dibuat adalah `CommentDetailPage.tsx`

Langkah pengerjaannya adalah sebagai berikut:

1. Membuat pages baru dengan nama `/src/pages/CommentDetailPage.tsx`
1. Menambahkan kode sebagai berikut:

   ```ts
   // TODO: tableDetailPage - Menggunakan params (1)
   // Membuat halaman CommentDetailPage.tsx

   // TODO: tableDetailPage - Menggunakan params (2)
   // Di sini kita akan import semua yang dibutuhkan
   import { useEffect, useState } from "react";
   import { useParams } from "react-router-dom";
   // Perhatikan di sini kita menggunakan Comment lagi di sini
   import { Comment } from "../schemas/comment";

   // TODO: tableDetailPage - Menggunakan params (3)
   // Karena di sini kita sudah akan menggunakan seluruh data dari Comment, dan type Comment tidak memiliki seluruh data yang ada, maka kita akan membuat type yang baru dengan nama CommentDetail

   // Nah karena Comment Detail ini sebenarnya menggunakan isi yang sama dengan Comment
   // dan ditambahkan dengan postId dan name, maka di sini kita bisa "extend" type
   // dengan menggunakan lambang "&"
   type CommentDetail = Comment & {
     postId: number;
     name: string;
   };

   const CommentDetailPage = () => {
     // TODO: tableDetailPage - Menggunakan params (4)
     // Pada halaman ini kita akan mencoba kembali untuk menggunakan useEffect
     // Supaya kita dapat mengetahui: "Apakah loader dari Data API bisa digabungkan dengan useEffect?"

     // Untuk bisa menggunakan params, kita hanya perlu menggunakan useParams
     // Dan secara otomatis akan diambil string yang paling pasnya untuk halaman Page ini

     // Karena page ini dipanggil dari path `/comment/:id`
     // maka secara otomatis paramsnya akan mengarah ke :id <--- string
     const { id } = useParams();

     // Secara otomatis, pada bagian ini, akan diinfer bahwa commentDetail
     // bisa berupa sebuah Object ATAU undefined

     // Kalau sebelumnya, pada saat menggunakan array, kita bisa menggunakan array kosong saja
     // namun pada saat Object, kita tidak bisa menggunakan Object kosongan saja
     const [commentDetail, setCommentDetail] = useState<CommentDetail>();

     useEffect(
       () => {
         (async () => {
           try {
             const response = await fetch(
               `https://jsonplaceholder.typicode.com/comments/${id}`
             );

             if (!response.ok) {
               throw new Error("Terjadi sebuah error !");
             }

             const responseJson: CommentDetail = await response.json();
             setCommentDetail(responseJson);
           } catch (err) {
             // Karena yang di throw di atas berupa error, maka kita harus mengecek
             // apakah typeof err adalah Error

             // Namun typeof tidak bisa mengecek apakah sebuah error itu merupakan
             // "class Error" atau bukan

             // Maka di sini kita tidak menggunakan typeof melainkan instanceof
             if (err instanceof Error) {
               console.log(err.message);
             }
           }
         })();
       },
       // Jangan lupa karena effect ini bergantung dari params, dimasukkan ke dalam deps list
       [id]
     );

     return (
       <>
         {/* // TODO: tableDetailPage - Menggunakan params (5) */}
         {/* // Menampilkan data nya di sini */}
         {/* // Ingat, karena commentDetail bisa undefined, maka harus di-optional-chaining-kan (?) */}
         <p>Id: {commentDetail?.id}</p>
         <p>PostId: {commentDetail?.postId}</p>
         <p>Name: {commentDetail?.name}</p>
         <p>Email: {commentDetail?.email}</p>
         <p>Body: {commentDetail?.body}</p>
       </>
     );
   };

   export default CommentDetailPage;
   ```

   Perhatikan baik baik pada tipe data `CommentDetail` yang dibuat yah !

1. Memodifikasi page `/src/pages/TablePage.jsx` untuk:

   - Menambahkan `useNavigate` (hooks yang digunakan untuk berpindah page)
   - Menambahkan `Outlet` (untuk menambahkan )
   - Menambahkan button dan handler untuk `Detail` (pindah ke halaman detail)

   Adapun modifikasi kodenya adalah sebagai berikut:

   ```tsx
   import { type Comment } from "../schemas/comment";
   import { useLoaderData } from "react-router-dom";

   import { Outlet, useNavigate } from "react-router-dom";

   const TablePage = () => {
     let comments = useLoaderData() as Comment[];

     const eachRowButtonDeleteOnClickHandler = (data: Comment) => {
       let filteredComments = comments.filter(
         (comment) => comment.id !== data.id
       );
       // setComments(filteredComments);
       comments = filteredComments;
     };

     // TODO: tableDetailPage - Menggunakan params (8)
     // Menambahkan handler untuk berpindah halaman
     // Di sini juga kita akan menggunakan hooks useNavigate
     const navigate = useNavigate();
     const eachRowButtonDetailOnClickHandler = (data: Comment) => {
       navigate(`/table/${data.id}`);
     };

     return (
       <>
         <p>Ini adalah halaman Table</p>

         {/* // TODO: tableDetailPage - Menggunakan params (7) */}
         {/* // Menambahkan Outlet */}
         <Outlet />

         <table>
           <thead>
             <tr>
               <th>Id</th>
               <th>Email</th>
               <th>Body</th>
               <th>Action</th>
             </tr>
           </thead>
           <tbody>
             {comments.map((comment) => (
               <tr key={comment.id}>
                 <td>{comment.id}</td>
                 <td>{comment.email}</td>
                 <td>{comment.body}</td>
                 <td>
                   {/* // TODO: tableDetailPage - Menggunakan params (7) */}
                   {/* // Menambahkan Detail button */}
                   <button
                     onClick={() => eachRowButtonDetailOnClickHandler(comment)}
                   >
                     Detail
                   </button>
                   <button
                     onClick={() => eachRowButtonDeleteOnClickHandler(comment)}
                   >
                     Delete
                   </button>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </>
     );
   };

   export default TablePage;
   ```

1. Memodifikasi halaman `/src/routers/index.tsx` untuk bisa menggunakan endpoint `/table/:id`. Adapun modifikasi kodenya adalah sebagai berikut:

   ```tsx
   import { createBrowserRouter } from "react-router-dom";
   import BaseLayout from "../layouts/BaseLayout";
   import FormPage from "../pages/FormPage";
   import TablePage from "../pages/TablePage";

   import CounterPage from "../pages/CounterPage";

   import { type Comment } from "../schemas/comment";

   // TODO: tableDetailPage - Menggunakan params (9)
   // Import CommentDetailPage
   import CommentDetailPage from "../pages/CommentDetailPage";

   const router = createBrowserRouter([
     {
       element: <BaseLayout />,
       errorElement: <h1>Terjadi sebuah error</h1>,
       children: [
         {
           path: "form",
           element: <FormPage />,
         },
         {
           path: "table",
           element: <TablePage />,
           loader: async ({ request }: { request: Request }) => {
             console.log(request);

             try {
               const response = await fetch(
                 "https://jsonplaceholder.typicode.com/comments"
               );

               if (!response.ok) {
                 const body = await response.text();
                 throw new Error(body);
               }

               const responseJson: Comment[] = await response.json();
               return responseJson;

               // Apabila tidak ada apapun yang dikembalikan
               // Wajib return null
             } catch (err) {
               if (typeof err === "string") {
                 console.log(err);
               }
             }
           },

           // TODO: tableDetailPage - Menggunakan params (10)
           // Tambahkan children disini
           children: [
             {
               // TODO: tableDetailPage - Menggunakan params (11)
               // Di sini kita akan menggunakan path children yang menggunakan prefix titik dua (:)
               // dilanjutkan dengan nama parameter dinamis yang akan digunakan

               // Di bawah sini kita menggunakan :id <--- nama parameternya adalah id

               // Sebagai catatan, path ini akan diambil dan diproses dalam bentuk "string"
               // sekalipun yang akan diinput adalah sebuah angka
               path: ":id",
               element: <CommentDetailPage />,
             },
           ],
         },
         {
           path: "counter",
           element: <CounterPage />,
         },
       ],
     },
     {
       path: "*",
       element: <h1>Not Found Oi !</h1>,
     },
   ]);

   export default router;
   ```

Dan sampai di sini seharusnya sudah selesai untuk menambahkan penggunaan params pada router yang digunakan.

Cukup sedikit yah TypeScript yang digunakan !

Jadi pada pembelajaran ini kita sudah belajar untuk menggunakan React Router secara TypeScript yang mana, ternyata, tidak berbeda banyak dengan versi JavaScript-nya yah.

(Kecuali memang kita ingin mendefinisikan data yang ada dengan sangat detail)

Tetap semangat belajar React-nya yah !
