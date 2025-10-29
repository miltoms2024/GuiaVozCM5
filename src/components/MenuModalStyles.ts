// Archivo: src/components/MenuModalStyles.ts

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    width: '90%', 
    maxHeight: '80%', 
    backgroundColor: '#1E1E1E', 
    borderRadius: 15,
    overflow: 'hidden', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#2A2A2A', 
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF4500', 
  },
  closeButton: {
    padding: 5,
  },
  optionsScroll: {
    padding: 15,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  menuIcon: {
    marginRight: 15,
  },
  menuOptionText: {
    fontSize: 18,
    color: '#FFFFFF', 
    fontWeight: '500',
    
  },
  separator: {
    height: 1,
    backgroundColor: '#333333',
    marginVertical: 10,
  }
});

export default styles;