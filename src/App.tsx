import React from "react";
import "~/App.css";
import { i18n } from "~/i18n";
import { LastSpinsBoard } from "~/LastSpinsBoard";
import { randomPastelColor } from "~/lib/color";
import { Item, Wheely } from "~/Wheely";
import { WheelySetup } from "~/WheelySetup";

const prepareItems = (...items: Array<Item>) => {
  return items
    .map((item) => Array(item.weight).fill({ ...item, weight: 1 }))
    .flat()
    .sort(() => Math.random() - 0.5);
};

function App() {
  const [board, setBoard] = React.useState<Item[]>([]);
  const [items, setItems] = React.useState<Item[]>([]);

  const addToBoard = (item: Item) => {
    if (item.color === "") {
      item.color = randomPastelColor();
    }
    setBoard((board) => [item, ...board]);
  };

  const addItem = (item: Item) => {
    setItems((items) => prepareItems(...items, item));
  };

  return (
    <div className="wheely-wrapper">
      <h1>{i18n.app.title}</h1>
      <div className="wheel-wrapper">
        <Wheely items={items} addToBoard={addToBoard} />
      </div>
      <div className="board-wrapper">
        <WheelySetup addItem={addItem} />
        <LastSpinsBoard items={board} />
      </div>
    </div>
  );
}

export default App;
