import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useTheme } from 'native-base';

import { useAuth } from '@hooks/useAuth';

import { AuthRoutes } from "./auth.routes";
import { AppRoutesStack } from "./appStack.routes";

import { Loading } from "@components/Loading";

export function Routes() {
    const { colors } = useTheme();
    const { user, isLoadingUserStorageData } = useAuth();

    const theme = DefaultTheme;
    theme.colors.background = colors.white

    if (isLoadingUserStorageData) {
        return <Loading />
    }

    return (
        <NavigationContainer
            theme={theme}
        >
            {
                user.id ? <AppRoutesStack /> : <AuthRoutes />
            }
        </NavigationContainer>
    )
}