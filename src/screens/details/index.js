import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DetailScreen({ route }) {

    const { id, name, images } = route.params;

    const [index, setIndex] = useState(0);
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const setPrevious = () => {
        setIndex(prev => prev === 0 ? prev : (prev - 1));
    }

    const setNext = () => {
        setIndex(prev => prev === images.length - 1 ? prev : (prev + 1));
    }

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const json = await response.json();
        setData(Object.keys(json).map(key => ({ key, value: json[key] })));
        setIsLoaded(true);
    }

    function formatKey(value) {
        return value
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    function formatValue(key, value) {
        switch (key) {
            case 'abilities':
                return value.map((item, index) => (`${index + 1} - ${item.ability.name}`)).join('\n');
            case 'cries':
                return `${Object.keys(value).length}`;
            case 'forms':
                return value.map((item, index) => (`${index + 1} - ${item.name}`)).join('\n');
            case 'game_indices':
                return `${value.length}`;
            case 'held_items':
                return `${value.length}`;
            case 'moves':
                return value.map((item, index) => (`${index + 1} -  ${item.move.name}`)).join('\n');
            case 'past_abilities':
                return `${value.length}`;
            case 'past_types':
                return `${value.length}`;
            case 'species':
                return `${value.name}`;
            case 'sprites':
                return `${Object.keys(value).length}`;
            case 'stats':
                return value.map((item) => (`${item.stat.name}: ${item.base_stat}`)).join('\n');
            case 'types':
                return value.map((item, index) => (`${index + 1} - ${item.type.name}`)).join('\n');
            default:
                return `${value}`;
        }
    }

    return (
        <View style={styles.main}>
            <ImageBackground
                source={require('../../../assets/images/pokemon.jpg')}
                style={styles.backgroundImage}
            >
                <View style={styles.backgroundImageContainer}>
                    <View style={{
                        width: '90%',
                        height: '90%',
                        borderColor: '#ed0000',
                        borderWidth: 1.5,
                        borderRadius: 41.5,
                    }}>
                        <View style={styles.firstContainer}>
                            <TouchableOpacity
                                style={styles.listButton}
                                onPress={setPrevious}
                            >
                                <MaterialCommunityIcons name="skip-previous" size={20} color={'#000'} />
                            </TouchableOpacity>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{ uri: images[index] }}
                                    style={styles.image}
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.listButton}
                                onPress={setNext}
                            >
                                <MaterialCommunityIcons name="skip-next" size={20} color={'#000'} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.body}>
                            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                                <Text style={styles.name}>{name}</Text>
                                {!isLoaded && <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <ActivityIndicator size={20} />
                                </View>}
                                {isLoaded && data.map((item, key) => (
                                    <View style={styles.attributeContainer} key={key}>
                                        <View style={styles.attributeSubContainer}>
                                            <TouchableOpacity
                                                style={styles.infoButton}
                                                onPress={() => {
                                                    Alert.alert(
                                                        formatKey(item.key),
                                                        formatValue(item.key, item.value),
                                                        [
                                                            {
                                                                text: 'Exit',
                                                                style: 'cancel',
                                                            }
                                                        ],
                                                        { cancelable: true }
                                                    );
                                                }}
                                            >
                                                <Text style={styles.infoText}>{formatKey(item.key)} - </Text>
                                                <MaterialCommunityIcons name="information" size={25} color={'#ffb700'} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        marginTop: 2,
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    backgroundImageContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    firstContainer: {
        flex: 0.8,
        backgroundColor: '#ffa200',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
    },
    imageContainer: {
        width: '75%',
        height: 300,
        backgroundColor: '#ffa200',
        paddingBottom: 10,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
    },
    listButton: {
        backgroundColor: '#f0f0f0',
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    body: {
        flex: 1,
        backgroundColor: '#005bf7',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    image: {
        flex: 1,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 28,
        marginVertical: 20,
        textAlign: 'center',
        overflow: 'hidden',
        color: '#ffb700',
        textShadowColor: '#f20000',
        textShadowRadius: 8,
        textShadowOffset: { width: 3, height: 3 },
    },
    attributeContainer: {
        width: '90%',
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    attributeSubContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 50,
        paddingVertical: 15,
    },
    infoText: {
        fontWeight: 'bold',
        fontSize: 20,
        overflow: 'hidden',
        color: '#ffb700',
        textShadowColor: '#f20000',
        textShadowRadius: 8,
        textShadowOffset: { width: 3, height: 3 },
    },
    infoButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
})