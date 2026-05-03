
// Librerias
import { Link } from "expo-router";
import { View, Image, } from "react-native";



// Componentes
import Input from "@/components/Input";
import ColorGrandient from "@/components/GradientP";
import Button from "@/components/Button";
import Container from "@/components/Container";
import InputOpcion from "@/components/InputOption";
export default function RegistrarCuenta() {
    return (
        <Container>
            <Link href="/"><Image style={{width:25, height:25}}
                        source={require("@/img/left_arrow.png")}/></Link>
            <View className="flex-1">
                <View className="items-center pt-10">
                    <Image
                        className="w-[150px] h-[163px]"
                        source={require("@/img/logo_SAIA.png")}
                    />
                    <ColorGrandient
                        text="REGISTRAR CUENTA"
                        fontWeight="bold"
                        fontSize={24}
                    />
                </View>
                <View className="gap-8 mt-10">
               <InputOpcion />

                    <Input
                        placeholder="Numero de cedula *"
                        inputMode="numeric"
                        keyboardType="numeric"
                    />
                </View>
                <View className="items-center">
                    <Button text="Registrar" />
                </View>
            </View>
        </Container>
    );
}