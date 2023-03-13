import { SyntheticEvent } from "react";
import { PageName } from "../config/constant";

interface Props {
  fnHandler: (pageName: PageName) => void;
}

const NavBar = ({ fnHandler }: Props) => {
  const anchorOnClickHandler = (event: SyntheticEvent, pageName: PageName) => {
    event.preventDefault();
    fnHandler(pageName);
  };

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
            <a
              href="#"
              onClick={(e) => anchorOnClickHandler(e, PageName.COUNTER_PAGE)}
            >
              Counter
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => anchorOnClickHandler(e, PageName.FORM_PAGE)}
            >
              Form
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => anchorOnClickHandler(e, PageName.TABLE_PAGE)}
            >
              Table
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
