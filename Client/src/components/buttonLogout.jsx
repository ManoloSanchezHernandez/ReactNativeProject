import { useContext } from "react";
import { estadoLoginGlobal } from "../context/contextData";
import { Button } from "react-native-paper";

export default function ButtonLogout() {

    const { logout } = useContext(estadoLoginGlobal);

    return <Button
            onPress={() => logout()}
            mode="contained"
            icon="logout"
            style={{ margin: 20, backgroundColor: 'red',  }}
        >
            Cerrar Sesión
        </Button>
}