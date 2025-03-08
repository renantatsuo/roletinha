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
  const appId = crypto.randomUUID();
  const [_board, setBoard] = React.useState<Item[]>([]);
  const [items, setItems] = React.useState<Item[]>([]);

  const explodedItems = React.useMemo(() => {
    return prepareItems(...items);
  }, [items]);

  const addToBoard = (item: Item) => {
    setBoard((board) => [item, ...board]);
  };

  const addItem = (item: Item) => {
    setItems((items) => Array.from(items).concat(item));
  };

  const removeItem = (item: Item) => {
    setItems((items) => items.filter((i) => i.label !== item.label));
  };

  const importItems = (items: Item[]) => {
    setItems(items);
  };

  const exportItems = () => {
    if (items.length === 0) return;
    const data = JSON.stringify(items);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `items-${appId}.json`;
    a.click();
  };

  return (
    <div className="wheely-wrapper">
      <h1>{i18n.app.title}</h1>
      <div className="wheel-wrapper">
        <Wheely items={explodedItems} addToBoard={addToBoard} />
      </div>
      <div className="setup-wrapper">
        <WheelySetup
          addItem={addItem}
          importItems={importItems}
          exportItems={exportItems}
        />
        <ItemList items={items} removeItem={removeItem} />
      </div>
    </div>
  );
}

export default App;
