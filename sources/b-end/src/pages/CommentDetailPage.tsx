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
