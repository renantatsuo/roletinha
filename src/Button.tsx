import "./Button.css";
type ButtonProps = React.ComponentProps<"button">;

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button className="button" {...props}>
      {children}
    </button>
  );
};
