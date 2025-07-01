import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useContext } from 'react'
import { DataTable, Card, IconButton, Icon } from 'react-native-paper'
import { estadoLoginGlobal } from '../../context/contextData'; // Importa el contexto de login

export default function ScreenUsuarios() {
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
        numberOfItemsPerPageList[0]);

    const { obtenerDatosUser, dataUser, eliminarUser } = useContext(estadoLoginGlobal);

    // console.log('usuarios:', dataUser)

    React.useEffect(() => {
        obtenerDatosUser();
    }, [])


    const items = dataUser || [];


    const from = page * itemsPerPage;
    const to = Math.min((page + 10) * itemsPerPage, items.length);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    return (
        <ScrollView style={{ margin: 20, padding: 20 }}>
            <Card>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Nombre</DataTable.Title>
                        <DataTable.Title numeric>Email</DataTable.Title>
                        <DataTable.Title numeric>Status</DataTable.Title>
                        <DataTable.Title numeric>Eliminar</DataTable.Title>
                    </DataTable.Header>

                    {items.slice(from, to).map((item) => (
                        <DataTable.Row key={item.id}>
                            <DataTable.Cell>{item.nombre}</DataTable.Cell>
                            <DataTable.Cell numeric>{item.email}</DataTable.Cell>
                            <DataTable.Cell numeric>{item.status}</DataTable.Cell>
                            <DataTable.Cell numeric><IconButton icon="trash-can" iconColor="red" onPress={() => eliminarUser(item.id)}></IconButton></DataTable.Cell>
                        </DataTable.Row>
                    ))}

                    <DataTable.Pagination
                        page={page}
                        numberOfPages={Math.ceil(items.length / itemsPerPage)}
                        onPageChange={(page) => setPage(page)}
                        label={`${from + 1}-${to} of ${items.length}`}
                        numberOfItemsPerPageList={numberOfItemsPerPageList}
                        numberOfItemsPerPage={itemsPerPage}
                        onItemsPerPageChange={onItemsPerPageChange}
                        showFastPaginationControls
                        selectPageDropdownLabel={'Rows per page'}
                    />
                </DataTable>
            </Card>
        </ScrollView>
    )
}