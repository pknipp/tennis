import { Platform } from "react-native";
const MyModal = Platform.OS === 'web' ? require('./WebModal').default : require('react-native').Modal;
export default MyModal;
