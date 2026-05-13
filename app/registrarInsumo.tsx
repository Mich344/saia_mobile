import { View, ScrollView } from 'react-native'
import React from 'react'
import Container from '@/components/Container';
import ColorGrandient from '@/components/GradientP';
import SearchBar from '@/components/SearchBar';
import Button from '@/components/Button';

export default function RegistrarInsumo() {
    return (
        <Container>
            <ScrollView
                className='p-1'
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                <View className="items-center mt-20">
                    <ColorGrandient
                        text="Registro de Insumos"
                        fontWeight="bold"
                        fontSize={24}
                    />
                </View>
                <View className='flex-row w-full items-center gap-3 px-4'>
                    <View className='flex-1 pt-2'>
                        <SearchBar
                            placeholder="Buscar Insumo, reportes etc.."
                        />
                    </View>
                    <View className='mt-5'>
                        <Button
                            mode='circle'
                            iconSize={60}
                            iconName='add-circle'
                            iconColor='#3DE1B9'//3DE1B9
                        />
                    </View>



                </View>

            </ScrollView>
        </Container>
    );
}