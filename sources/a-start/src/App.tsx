import { ChangeEvent, useState } from "react";
import NavBar from "./components/NavBar";
import FormPage from "./pages/FormPage";
import TablePage from "./pages/TablePage";
import { PageName } from "./config/constant";

type DuoCounter = {
  firstCounter: number;
  secondCounter: number;
};

const App = () => {
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

  const inputAmountOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
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

  const [currentPage, setCurrentPage] = useState<PageName>(
    PageName.COUNTER_PAGE
  );

  return (
    <>
      <NavBar fnHandler={setCurrentPage} />
      {currentPage === PageName.COUNTER_PAGE && (
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
      )}

      {currentPage === PageName.FORM_PAGE && <FormPage />}
      {currentPage === PageName.TABLE_PAGE && <TablePage />}
    </>
  );
};

export default App;
