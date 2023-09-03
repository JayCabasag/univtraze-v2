import { View } from 'react-native';
import React from 'react';
import { UserTypes } from '../../utils/app_constants';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';

export default function TypeSelect({ type, onSelectType }) {
  return (
    <View style={styles.type}>
      <TouchableOpacity
        style={type === UserTypes.STUDENT ? styles.typeOptionActive : styles.typeOption}
        onPress={() => onSelectType(UserTypes.STUDENT)}
      >
        <Text style={type === UserTypes.STUDENT ? styles.typeTextActive : styles.typeText}>
          {UserTypes.STUDENT}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={type === UserTypes.EMPLOYEE ? styles.typeOptionActive : styles.typeOption}
        onPress={() => onSelectType(UserTypes.EMPLOYEE)}
      >
        <Text style={type === UserTypes.EMPLOYEE ? styles.typeTextActive : styles.typeText}>
          {UserTypes.EMPLOYEE}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={type === UserTypes.VISITOR ? styles.typeOptionActive : styles.typeOption}
        onPress={() => onSelectType(UserTypes.VISITOR)}
      >
        <Text style={type === UserTypes.VISITOR ? styles.typeTextActive : styles.typeText}>
          {UserTypes.VISITOR}
        </Text>
      </TouchableOpacity>
    </View>
  );
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
    borderColor: '#28CD41',
  },
  typeOption: {
    backgroundColor: 'white',
    paddingVertical: 14,
    borderWidth: 0.2,
    borderColor: '#28CD41',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeOptionActive: {
    backgroundColor: '#28CD41',
    borderWidth: 0.2,
    paddingVertical: 14,
    flex: 1,
    borderColor: '#28CD41',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeText: {
    fontWeight: '400',
    color: '#364D39',
    textTransform: 'capitalize',
  },
  typeTextActive: {
    fontWeight: '500',
    color: 'white',
    textTransform: 'capitalize',
  },
});
