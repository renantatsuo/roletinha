import React from "react";
import { i18n } from "~/i18n";
import "./LastSpinsBoard.css";
import { Item } from "./Wheely";

type BoardProps = {
  items: Array<Item>;
};

export const LastSpinsBoard = ({ items }: BoardProps) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.maxHeight =
        window.screen.height - ref.current.offsetTop - 32 + "px";
    }
    const listener = () => {
      if (ref.current) {
        ref.current.style.maxHeight =
          window.screen.height - ref.current.offsetTop - 32 + "px";
      }
    };
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  return (
    <div>
      <h2 className="section-header">{i18n.lastSpinsBoard.title}</h2>
      <div className="last-spins" ref={ref}>
        {items.map((item, index) => (
          <div key={index} className="last-spins-item">
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};
