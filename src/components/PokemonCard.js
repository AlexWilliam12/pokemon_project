import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";

export default function PokemonCard({ id, name, images, navigation }) {

    const [loading, setLoading] = useState(true);

    const handleImageLoaded = () => {
        setLoading(false);
    }

    return (
        <TouchableOpacity
            style={{
                marginHorizontal: 15,
                width: 300,
                borderRadius: 41.5,
                backgroundColor: '#FFF',
                flexDirection: 'column',
                borderColor: '#ed0000',
                borderWidth: 1.5,
            }} onPress={() => navigation.navigate('Details', {
                id: id,
                name: name,
                images: images,
            })}
        >
            <View
                style={{
                    flex: 1.3,
                    backgroundColor: '#ffa200',
                    borderTopRightRadius: 40,
                    borderTopLeftRadius: 40,
                    paddingBottom: 10,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {loading &&<ActivityIndicator size='large' />}
                <Image
                    source={{ uri: images[0] }}
                    style={{
                        width: '100%',
                        height: '100%',
                        borderTopRightRadius: 40,
                        borderTopLeftRadius: 40,
                    }}
                    onLoad={handleImageLoaded}
                />
            </View>
            <View
                style={{
                    flex: 0.7,
                    alignItems: 'center',
                    backgroundColor: '#005bf7',
                    borderBottomLeftRadius: 40,
                    borderBottomRightRadius: 40,
                    borderTopWidth: 1.5,
                    borderTopColor: '#ed0000',
                }}
            >
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 25,
                        marginTop: 35,
                        textAlign: 'center',
                        overflow: 'hidden',
                        color: '#ffb700',
                        textShadowColor: '#f20000',
                        textShadowRadius: 8,
                        textShadowOffset: { width: 3, height: 3 },
                    }}
                >{name}</Text>
                <Text style={{
                    margin: 4,
                    color: '#FFF',
                    textDecorationLine: 'underline',
                    textAlign: 'center',
                    opacity: 0.5,
                }}>Tap to details</Text>
            </View>
        </TouchableOpacity>
    );
}