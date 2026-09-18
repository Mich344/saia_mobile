import {Text} from "react-native";
type Signo = {
    signo: string;
}
const Obligatorio = ({signo}:Signo ) => {
    return (
        <Text className="text-red-500">
            {signo}
        </Text>
    );
};

export default Obligatorio;