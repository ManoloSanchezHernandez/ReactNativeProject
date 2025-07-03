import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useContext } from 'react';
import { DataTable, Card, IconButton, useTheme } from 'react-native-paper';
import { estadoLoginGlobal } from '../../context/contextData';

export default function ScreenUsuarios() {
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
        numberOfItemsPerPageList[0]
    );

    const { obtenerDatosUser, dataUser, eliminarUser } = useContext(estadoLoginGlobal);
    const theme = useTheme(); // ✅ Usa el tema global

    useEffect(() => {
        obtenerDatosUser();
    }, []);

    const items = dataUser || [];

    const from = page * itemsPerPage;
    const to = Math.min((page + 10) * itemsPerPage, items.length);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    return (
        <ScrollView style={{ padding: 20 }}>
            <Card>
                <DataTable style={{borderWidth: 0.5, borderColor:theme.colors.primary, borderRadius:10}}>
                    <DataTable.Header style={{borderColor:theme.colors.primary}}>
                        <DataTable.Title><Text style={styles.encabezado}>Nombre</Text></DataTable.Title>
                        <DataTable.Title numeric><Text style={styles.encabezado}>Email</Text></DataTable.Title>
                        <DataTable.Title numeric><Text style={styles.encabezado}>Status</Text></DataTable.Title>
                        <DataTable.Title numeric><Text style={styles.encabezado}>Eliminar</Text></DataTable.Title>
                    </DataTable.Header>

                    {items.slice(from, to).map((item) => (
                        <DataTable.Row key={item.id} style={{borderColor:theme.colors.primary}}>
                            <DataTable.Cell><Text style={styles.textoTabla}>{item.nombre}</Text></DataTable.Cell>
                            <DataTable.Cell numeric><Text style={styles.textoTabla}>{item.email}</Text></DataTable.Cell>
                            <DataTable.Cell numeric>
                                <Text
                                    style={[
                                        styles.textoEstado,
                                        { color: item.status ? theme.colors.active : theme.colors.inactive }
                                    ]}
                                >
                                    {item.status ? 'Activo' : 'Inactivo'}
                                </Text>
                            </DataTable.Cell>
                            <DataTable.Cell numeric>
                                <IconButton
                                    icon="trash-can"
                                    iconColor={theme.colors.inactive}
                                    onPress={() => eliminarUser(item.id)}
                                />
                            </DataTable.Cell>
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
                        selectPageDropdownLabel={'Filas por página'}
                    />
                </DataTable>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    textoTabla: {
        fontSize: 10,
    },
    textoEstado: {
        fontSize: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    encabezado: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
