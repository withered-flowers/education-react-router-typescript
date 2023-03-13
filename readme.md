# Education React Router (TypeScript Version)

## Table of Content

- [Disclaimer & Prerequisites](#disclaimer--prerequisites)
- Intro
- [Let's Learn](#lets-learn)
  - [Langkah 1 - Instalasi dan Inisialisasi React Router pada Project](#langkah-1---instalasi-dan-inisialisasi-react-router-pada-project)
  - Langkah 2

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
