import { DownloadIcon, UploadIcon } from "@radix-ui/react-icons";
import React from "react";
import { Button } from "~/Button";
import { Item } from "~/Wheely";
import "~/WheelySetup.css";
import { i18n } from "~/i18n";
import { randomColor } from "~/lib/color";

type WheelySetupProps = {
  addItem: (item: Item) => void;
  importItems: (items: Item[]) => void;
  exportItems: () => void;
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

export const WheelySetup = ({
  addItem,
  importItems,
  exportItems,
}: WheelySetupProps) => {
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

  const handleImport = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const file = document.createElement("input");
    file.type = "file";
    file.accept = ".json";
    file.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const json = JSON.parse(e?.target?.result as string);
        importItems(json);
      };
      reader.readAsText(file);
    };
    file.click();
  };

  return (
    <div>
      <div className="wheel-setup-actions">
        <Button title={i18n.wheelySetup.share.import} onClick={handleImport}>
          <DownloadIcon />
        </Button>
        <Button title={i18n.wheelySetup.share.export} onClick={exportItems}>
          <UploadIcon />
        </Button>
      </div>
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
