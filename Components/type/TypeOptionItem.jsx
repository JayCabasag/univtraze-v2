import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";

export const TypeOption = ({ label, isActive, onPress }) => (
	<TouchableOpacity
	  style={isActive ? styles.typeOptionActive : styles.typeOption}
	  onPress={onPress}
	>
	  <Text style={isActive ? styles.typeTextActive : styles.typeText}>{label}</Text>
	</TouchableOpacity>
  );

  
  const styles = StyleSheet.create({
	typeOption: {
	  backgroundColor: 'white',
	  paddingVertical: 14,
	  borderWidth: .2,
	  borderColor: "#28CD41",
	  flex: 1,
	  display: 'flex',
	  alignItems: 'center',
	  justifyContent: 'center'
	},
	typeOptionActive: {
		backgroundColor: '#28CD41',
		borderWidth: .2,
		paddingVertical: 14,
		flex: 1,
		borderColor: "#28CD41",
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	  },
	typeText: {
		fontWeight: '400',
		color: "#364D39",
		textTransform: 'capitalize'
	},
	typeTextActive: {
		fontWeight: '500',
		color: "white",
		textTransform: 'capitalize'
	}
});
