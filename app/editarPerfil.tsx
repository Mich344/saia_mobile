import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import Container from '@/components/Container';
import ColorGrandient from '@/components/GradientP';
import ImagenSelector from '@/components/ImagenSelector';
import Input from '@/components/Input';
import Button from '@/components/Button';
import css from '@/styles/StylesComponent';

export default function EditarPerfil() {
    return (
        <Container>
            <ScrollView
                className='p-6'
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }} // Añade espacio al final para que no quede pegado
            >
                <View className="items-center mt-20">
                    <ColorGrandient
                        text="Editar Perfil"
                        fontWeight="bold"
                        fontSize={24}
                    />

                </View>
                <View className="items-center mt-6">
                    <ImagenSelector placeholder='avatar' />
                </View>
                <View className='mt-8'>
                    <Text className="font-bold text-lg">Nombre Completo</Text>
                    <Input
                        placeholder="Nombres y Apellidos"
                        inputMode="text"
                        keyboardType="default"
                        disable />
                </View>

                <View className='mt-4'>
                    <Text className="font-bold text-lg">Tipo de Documento</Text>
                    <Input
                        placeholder="Cedula de ciudadania"
                        inputMode="text"
                        keyboardType="default"
                        disable />
                </View>
                <View className='mt-4'>
                    <Text className="font-bold text-lg">Numero de Documento</Text>
                    <Input
                        placeholder="Numero de Identificacion"
                        inputMode="numeric"
                        keyboardType="numeric"
                        disable />
                </View>
                <View className='mt-4'>
                    <Text className="font-bold text-lg">Celular *</Text>
                    <Input
                        placeholder="1234567890"
                        inputMode="tel"
                        keyboardType="phone-pad"
                    />
                </View>
                <View className='mt-4'>
                    <Text className="font-bold text-lg">Correo Electronico *</Text>
                    <Input
                        placeholder="ejemplo@misena.edu.co"
                        inputMode="email"
                        keyboardType="email-address" />
                </View>
                <View className='mt-4'>
                    <Text className="font-bold text-lg">Tipo de Sangre *</Text>
                    <Input
                        placeholder="Tipo Sanguineo"
                        inputMode="text"
                        keyboardType="default" />
                </View>
                <View className='mt-4'>
                    <Text className="font-bold text-lg">EPS *</Text>
                    <Input
                        placeholder="EPS"
                        inputMode="text"
                        keyboardType="default" />
                </View>
                <View className='mt-4'>
                    <Text className="font-bold text-lg">Genero *</Text>
                    <Input
                        placeholder="Genero"
                        inputMode="text"
                        keyboardType="default" />
                </View>
                <View className="mt-4 items-center" >
                    <Button
                        text='Actualizar'
                        size='sm'
                    />
                </View>
            </ScrollView>
        </Container>
    )
}