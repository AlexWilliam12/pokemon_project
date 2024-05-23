import { Image } from "react-native";

export default function Header() {
    return (
        <Image
            source={require('../../assets/images/logo.png')}
            style={{ width: 100, height: 50 }}
        />
    );
}