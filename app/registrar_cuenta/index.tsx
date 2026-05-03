import { View, Image, Text } from "react-native";

// Librerias

// Componentes
import Input from "@/components/Inputs";
import ColorGrandient from "@/components/GradientP";
import Button from "@/components/Button";
import Container from "@/components/Container";
export default function page() {
    return (
        <Container>
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
                {/*reemplazar input por inputOption cuando este listo*/}
                {/*
                    <View className="gap-8 mt-10">
                        <InputOption
                            placeholder="Tipo de documento *"
                            inputMode="numeric"
                            keyboardType="numeric"
                        />
                    </View>
                */}
                <View className="gap-8 mt-10">
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