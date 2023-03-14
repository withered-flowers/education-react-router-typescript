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
