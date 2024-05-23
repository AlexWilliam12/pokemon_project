import { useContext, useEffect, useRef, useState } from "react";
import { ActivityIndicator, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View, VirtualizedList } from "react-native";
import PokemonCard from "../../components/PokemonCard";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DataContext } from "../../context";
import { TextInput } from "react-native";

export default function HomeScreen({ navigation }) {

    const { data, isDone, page, setPage, totalPages } = useContext(DataContext);

    const [filteredData, setFilteredData] = useState(data);
    const [loadingMore, setLoadingMore] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const filterData = (searchTerm) => {
        const filtered = data.filter(item =>
            item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    };

    useEffect(() => {
        setFilteredData(data);
        filterData(searchValue);
    }, [data]);

    const renderItem = ({ item, key }) => {
        return (
            <PokemonCard
                id={item.id}
                name={item.name}
                images={item.images}
                navigation={navigation}
                key={key}
            />
        );
    }

    const flatListRef = useRef(null);
    const keyExtractor = item => item.id;
    const getItemCount = () => filteredData.length;
    const getItem = (_, index) => filteredData[index];

    useEffect(() => {
        if (flatListRef.current && filteredData.length > 0) {
            flatListRef.current.scrollToIndex({ index: 0 });
        }
    }, [filteredData]);

    const handleLoadMore = () => {
        if (!loadingMore && page < totalPages) {
            setLoadingMore(true);
            setPage(prev => prev + 1);
            setLoadingMore(false);
        }
    };

    const renderFooter = () => {
        if (!loadingMore) return null;
        return (
            <View style={{ padding: 10 }}>
                <ActivityIndicator size="large" />
            </View>
        );
    };

    const handleText = (value) => {
        setSearchValue(value);
        filterData(value);
    };

    return (
        <KeyboardAvoidingView
            style={styles.main}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ImageBackground
                source={require('../../../assets/images/pokemon.jpg')}
                style={styles.backgroundImage}
            >
                <View style={styles.backgroundImageContainer}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Search..."
                            value={searchValue}
                            onChangeText={handleText}
                        />
                        <TouchableOpacity style={styles.searchButton}>
                            <MaterialCommunityIcons name="magnify" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.center}>
                        {!isDone && <ActivityIndicator size={'large'} />}
                        {isDone && <View style={styles.list}>
                            <VirtualizedList
                                ref={flatListRef}
                                data={filteredData}
                                getItemCount={getItemCount}
                                getItem={getItem}
                                renderItem={renderItem}
                                keyExtractor={keyExtractor}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                onEndReached={handleLoadMore}
                                onEndReachedThreshold={0.5}
                                ListFooterComponent={renderFooter}
                            />
                        </View>}
                    </View>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    backgroundImageContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    input: {
        height: 50,
        width: 200,
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    center: {
        width: '100%',
        height: 425,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listButton: {
        backgroundColor: '#d1d1d1',
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    list: {
        width: '80%',
        height: 425,
        marginHorizontal: 5,
    },
    paginationContainer: {
        height: 80,
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    paginationButtons: {
        backgroundColor: 'blue',
        width: 160,
        height: 50,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    paginationText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
    },
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        width: 300,
        borderColor: '#dedede',
        borderWidth: 1,
    },
    textInput: {
        flex: 1,
        marginRight: 10,
    },
    searchButton: {
        width: 40,
        height: 40,
        backgroundColor: '#dedede',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
})