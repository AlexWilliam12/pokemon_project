import { Button, Image, ImageBackground, StyleSheet, Text, View } from "react-native";

export default function IntroScreen({ navigation }) {
    return (
        <View style={styles.mainContainer}>
            <ImageBackground
                source={require('../../../assets/images/pokemon.jpg')}
                style={styles.backgroundImage}
            >
                <View style={styles.container}>
                    <Image
                        source={require('../../../assets/images/logo.png')}
                        style={{ width: 200, height: 100 }}
                    />
                    <Text style={styles.text}>
                        Pokémon é uma franquia de mídia criada pela Nintendo, Game Freak e Creatures.
                        Ela gira em torno de criaturas chamadas Pokémon, que são capturadas e treinadas por treinadores para batalhar uns contra os outros.
                        O objetivo principal dos treinadores é se tornar um Mestre Pokémon, completando a Pokédex (uma enciclopédia de Pokémon) e vencendo as ligas Pokémon.
                        A franquia inclui jogos de videogame, desenhos animados, filmes, trading card game, brinquedos e uma variedade de outros produtos.
                        Pokémon é uma das franquias mais populares e lucrativas do mundo, cativando fãs de todas as idades desde sua criação em 1996.
                    </Text>
                    <Button
                        title="Conhecer Pokémons!!"
                        onPress={() => {
                            navigation.navigate('Home')
                        }}
                    />
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: 40,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        flex: 0.8,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: 20,
    },
    textContainer: {
        alignItems: 'center',
    },
    text: {
        textAlign: 'justify',
        fontSize: 18,
        fontWeight: '600',
    },
});
