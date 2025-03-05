import { i18n } from "~/i18n";
import { Item } from "~/Wheely";
import "./ItemList.css";

type ItemListProps = {
  items: Item[];
  removeItem: (item: Item) => void;
};

export const ItemList = ({ items, removeItem }: ItemListProps) => {
  return (
    <div>
      <h2 className="section-header">{i18n.itemList.title}</h2>
      <div className="item-list">
        {items.map((item) => (
          <div key={item.label} className="item-list-item">
            <button onClick={() => removeItem(item)} className="item-button">
              <img src="/minus-circle-fill.svg" alt="Remove item" />
            </button>
            <div className="item-label">{item.label}</div>
          </div>
        ))}
        {!items.length && (
          <div className="item-list-item">
            <div className="item-button"></div>
            <div className="item-label">{i18n.itemList.noItems}</div>
          </div>
        )}
      </div>
    </div>
  );
};
