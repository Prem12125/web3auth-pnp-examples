import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const PopupMenu = ({ visible, onClose, onItemSelected, position }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalBackground} onPress={onClose}>
        <View style={[styles.menuContainer, position]}>
          <TouchableOpacity style={styles.menuItem} onPress={() => onItemSelected('Option 1')}>
            <Text style={styles.menuItemText}>Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => onItemSelected('Option 2')}>
            <Text style={styles.menuItemText}>Option 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => onItemSelected('Option 3')}>
            <Text style={styles.menuItemText}>Option 3</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    position: 'absolute',
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
  },
  menuItem: {
    padding: 10,
  },
  menuItemText: {
    fontSize: 16,
  },
});

export default PopupMenu;
