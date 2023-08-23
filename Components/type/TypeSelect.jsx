import { View } from "react-native";
import React from "react";
import { UserTypes } from "../../utils/app_constants";
import { StyleSheet } from "react-native";
import { TypeOption } from "./TypeOptionItem";

export default function TypeSelect({ type, setSelectedType }) {
  return (
    <View style={styles.type}>
        <TypeOption
            label="Student"
            isActive={type === UserTypes.STUDENT}
            onPress={() => setSelectedType(UserTypes.STUDENT)}
        />
        <TypeOption
            label="Employee"
            isActive={type === UserTypes.EMPLOYEE}
            onPress={() => setSelectedType(UserTypes.EMPLOYEE)}
        />
        <TypeOption
            label="Visitor"
            isActive={type === UserTypes.VISITOR}
            onPress={() => setSelectedType(UserTypes.VISITOR)}
        />
    </View>
  )
}


const styles = StyleSheet.create({
	type: { 
	  width: '100%',
    marginTop: 6,
	  display: 'flex', 
	  flexDirection: 'row', 
	  alignItems: 'center', 
	  justifyContent: 'space-between',
	  marginBottom: 15,
	  overflow: 'hidden',
	  borderWidth: 1,
    borderRadius: 10,
    borderColor: "#28CD41",
    }
});
