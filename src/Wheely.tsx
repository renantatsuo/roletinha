import classNames from "classnames";
import React from "react";
import { i18n } from "~/i18n";
import "./Wheely.css";
import { getContrastingTextColor, randomColor } from "./lib/color";

export type Item = {
  label: string;
  weight: number;
  color: string;
};

type WheelyProps = {
  items: Array<Item>;
  addToBoard: (item: Item) => void;
};

const initialItems = i18n.app.initialItems.map((item) => ({
  label: item,
  weight: 2,
  color: randomColor(),
}));

export const Wheely = ({ items, addToBoard }: WheelyProps) => {
  const [rotation, setRotation] = React.useState(0);
  const [spinning, setSpinning] = React.useState(false);
  const [animateStyles, setAnimateStyles] = React.useState({});
  const derivedItems = items.length > 0 ? items : initialItems;
  const totalCount = derivedItems.length;
  const sliceAngle = 360 / totalCount;

  const cx = 250;
  const cy = 250;
  const radius = 235;

  const sectors = React.useMemo(() => {
    let startAngle = 0;
    return derivedItems.map((item) => {
      const delta = (1 / totalCount) * 2 * Math.PI;
      const endAngle = startAngle + delta;
      const midAngle = startAngle + delta / 2;
      const path = describeArc(
        cx,
        cy,
        radius,
        (startAngle * 180) / Math.PI,
        (endAngle * 180) / Math.PI
      );
      const labelPos = polarToCartesian(
        cx,
        cy,
        radius * 0.7,
        (midAngle * 180) / Math.PI
      );
      startAngle = endAngle;
      return {
        path,
        label: item.label,
        color: item.color,
        labelPos,
        midAngleDeg: (midAngle * 180) / Math.PI,
        labelRotation: startAngle,
      };
    });
  }, [derivedItems, totalCount, cx, cy, radius]);

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    const randomIndex = Math.floor(Math.random() * totalCount);
    const targetSliceCenter = (randomIndex + 0.5) * sliceAngle;
    const currentRotationMod = rotation % 360;
    let offset = (360 - targetSliceCenter - currentRotationMod) % 360;
    if (offset === 0) offset = 360;
    const rotations = Math.max(5, Math.floor(Math.random() * 10));
    const finalRotation = rotation + offset + rotations * 360;
    setAnimateStyles({
      "--start-rot": `${rotation}deg`,
      "--end-rot": `${finalRotation}deg`,
    });
    setTimeout(() => {
      setSpinning(false);
      setAnimateStyles({});
      setRotation(finalRotation % 360);
      addToBoard(derivedItems[randomIndex]);
    }, 8000);
  };

  const wheelClassName = classNames("wheel", {
    spin: spinning,
    "initial-spin": items.length === 0,
  });

  // most likely changing this to canvas
  return (
    <div
      className="wheel"
      style={{
        transform: spinning ? "scale(2) translate(0, 25%)" : "",
        transition: "transform 200ms",
      }}
    >
      <svg
        width="500"
        height="500"
        className={wheelClassName}
        style={
          spinning ? animateStyles : { transform: `rotate(${rotation}deg)` }
        }
      >
        <g id="wheel">
          {sectors.map((sector, idx) => {
            const innerLabelRadius = radius * 0.25;
            const pos = polarToCartesian(
              cx,
              cy,
              innerLabelRadius,
              sector.midAngleDeg
            );
            const textRot = -90 + sector.midAngleDeg;
            return (
              <g key={idx}>
                <path
                  d={sector.path}
                  fill={sector.color}
                  stroke="var(--white)"
                  strokeWidth="2"
                />
                <text
                  transform={`translate(${pos.x},${pos.y}) rotate(${
                    sector.label.length > 20 ? textRot - 5 : textRot
                  })`}
                  x={0}
                  y={0}
                  dominantBaseline="middle"
                  textAnchor="start"
                  fill={getContrastingTextColor(sector.color)}
                  fontSize={totalCount > 10 ? "12" : "16"}
                >
                  {wrapStringFromMaxChar(
                    sector.label,
                    totalCount > 10 ? 30 : 20
                  ).map((line, idx) => (
                    <tspan
                      key={idx}
                      x={idx * (totalCount > 10 ? 35 : 20)}
                      dy={idx > 0 ? "1.2em" : "0"}
                    >
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
      <button
        onClick={handleSpin}
        disabled={spinning || items.length === 0}
        className="wheel-button"
      >
        {i18n.wheely.spinButton.text}
      </button>
    </div>
  );
};

const wrapStringFromMaxChar = (str: string, maxChars: number) => {
  if (str.length <= maxChars) return [str];
  return str.split(" ").reduce(
    (acc, char) => {
      const last = acc[acc.length - 1];
      if (last.length < maxChars && last.length + char.length < maxChars) {
        acc[acc.length - 1] = `${last} ${char}`;
      } else {
        acc.push(char);
      }
      return acc;
    },
    [""]
  );
};

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const describeArc = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${x} ${y} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
};
