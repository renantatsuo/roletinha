import React from "react";
import "~/App.css";
import { i18n } from "~/i18n";
import { ItemList } from "~/ItemList";
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
    setBoard((board) => [item, ...board]);
  };

  const addItem = (item: Item) => {
    setItems((items) => prepareItems(...items, item));
  };

  const removeItem = (item: Item) => {
    setItems((items) => items.filter((i) => i.label !== item.label));
  };

  return (
    <div className="wheely-wrapper">
      <h1>{i18n.app.title}</h1>
      <div className="wheel-wrapper">
        <Wheely items={items} addToBoard={addToBoard} />
      </div>
      <div className="board-wrapper">
        <WheelySetup addItem={addItem} />
        <ItemList items={items} removeItem={removeItem} />
      </div>
    </div>
  );
}

export default App;
