import React from "react";
import { Item } from "~/Wheely";
import "~/WheelySetup.css";
import { i18n } from "~/i18n";
import { randomColor } from "~/lib/color";

type WheelySetupProps = {
  addItem: (item: Item) => void;
};

function isItem(item: unknown): item is Item {
  return (
    typeof item === "object" &&
    item !== null &&
    "label" in item &&
    "weight" in item &&
    "color" in item
  );
}

export const WheelySetup = ({ addItem }: WheelySetupProps) => {
  const color = React.useRef(randomColor());
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const item = Object.fromEntries(formData);
    if (!isItem(item)) {
      console.error("Invalid item", item);
      return;
    }
    addItem({ label: item.label, weight: +item.weight, color: item.color });
    form.reset();
    const label = form.elements.namedItem("label");
    if (label instanceof HTMLInputElement) {
      label.focus();
    }
    color.current = randomColor();
  };
  return (
    <div>
      <h2 className="wheel-setup-header">{i18n.wheelySetup.title}</h2>
      <form onSubmit={handleSubmit} className="wheel-setup">
        <label>
          <span>{i18n.wheelySetup.form.label.label}</span>
          <input
            type="text"
            name="label"
            required
            placeholder={i18n.wheelySetup.form.label.placeholder}
          />
        </label>
        <label>
          <span>{i18n.wheelySetup.form.weight.label}</span>
          <input
            type="number"
            name="weight"
            required
            placeholder={i18n.wheelySetup.form.weight.placeholder}
          />
        </label>
        <label>
          <span>{i18n.wheelySetup.form.color.label}</span>
          <input type="color" name="color" defaultValue={color.current} />
        </label>
        <button type="submit">{i18n.wheelySetup.form.submit.text}</button>
      </form>
    </div>
  );
};
