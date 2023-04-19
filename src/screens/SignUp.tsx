import { Box, Center, Heading, ScrollView, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from 'react-hook-form';

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

import MiniLogoSvg from '@assets/miniLogo.svg'

import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useState } from "react";


type FormDataProps = {
    name: string;
    email_login: string;
    password: string;
    confirm_password: string;
    phone: string;
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const signUpSchema = yup.object({
    name: yup.string().required('Digite o nome completo.'),
    email_login: yup.string().required('Informe o email.').email('Email digitado errado.'),
    password: yup.string().required('Informe a senha.'),
    confirm_password: yup.string().required('Confirme a senha.').oneOf([yup.ref('password')], 'A confirmação de senha não confere.'),
    phone: yup.string().required('Informe o número de telefone').matches(phoneRegExp, 'Número de telefone inválido.')
})

export function SignUp() {
    const [isLoading, setIsLoading] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    })

    const navigation = useNavigation<AuthNavigatorRoutesProps>();

    function handleSignUp({ confirm_password, email_login, name, password, phone }: FormDataProps) {
        try {
            setIsLoading(true)
            console.log({
                'name: ': name,
                'email: ': email_login,
                'phone: ': phone,
                'password: ': password,
                'confirm password: ': confirm_password
            })

        } catch (error) {

        }
    }

    function handleSignIn() {
        navigation.goBack()
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            bg="gray.6"
        >
            <VStack
                py={10}
                px={12}
            >
                <Center
                    mt={4}
                >
                    <MiniLogoSvg />

                    <Heading
                        mt={4}
                        fontSize="lg"
                        fontWeight="bold"
                        fontFamily="heading"
                        color="gray.1"
                        letterSpacing="2xl"
                    >
                        Boas vindas!
                    </Heading>

                    <Text
                        mt={2}
                        textAlign="center"
                        color="gray.2"
                    >
                        Crie sua conta e use o espaço para comprar itens variados e vender seus produtos
                    </Text>

                    <Box
                        mt={7}
                    >
                        <UserPhoto
                            source={{ uri: 'https://img.assinaja.com/upl/lojas/mundosinfinitos/imagens/foto-one-piece.png' }}
                            alt="Foto de Perfil"
                            size={24}
                        />
                    </Box>

                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                mt={4}
                                placeholder="Nome"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.name?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="email_login"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="E-mail"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.email_login?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="phone"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="telefone"
                                keyboardType="number-pad"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.phone?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Senha"
                                iconName="eye-outline"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="confirm_password"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Confirmar senha"
                                iconName="eye-outline"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.confirm_password?.message}
                            />
                        )}
                    />

                    <Button
                        mt={2}
                        title="Criar"
                        variant="gray1"
                        onPress={handleSubmit(handleSignUp)}
                        isLoading={isLoading}
                    />

                    <Text
                        mt={12}
                    >
                        Já tem uma conta?
                    </Text>

                    <Button
                        mt={4}
                        title="Ir para o login"
                        variant="gray5"
                        onPress={handleSignIn}
                    />
                </Center>
            </VStack>

        </ScrollView>
    )
}