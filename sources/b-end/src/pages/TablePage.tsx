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
    let filteredComments = comments.filter((comment) => comment.id !== data.id);
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
