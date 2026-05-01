import { Pressable } from "react-native";

interface ButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => {
  return <Pressable>{text}</Pressable>;
};

export default Button;
