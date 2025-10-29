// Archivo: src/screens/GuideScreenStyles.ts

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000', paddingTop: 40, paddingHorizontal: 20, justifyContent: 'space-between' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, width: '100%', },
  headerButtons: { flexDirection: 'row', alignItems: 'center', gap: 10, },
  phaseTitle: { fontSize: 20, fontWeight: 'bold', color: '#FF4500', flexShrink: 1, marginRight: 15, },
  timerBox: { backgroundColor: '#333333', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 5, marginRight: 0, },
  timerText: { color: '#00FF00', fontWeight: 'bold', fontSize: 18, },
  menuButton: { backgroundColor: '#333333', padding: 8, borderRadius: 5, },
  textContainer: { flex: 1, justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: 0 },
  guideText: { fontSize: 28, color: '#FFFFFF', textAlign: 'left', lineHeight: 40 },
  buttonRowWrapper: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 40, paddingTop: 20 },
  arrowButton: { backgroundColor: '#FF4500', width: 60, height: 60, borderRadius: 12, justifyContent: 'center', alignItems: 'center', },
  nextButton: { backgroundColor: '#007BFF', flex: 1, marginHorizontal: 10, paddingVertical: 15, borderRadius: 12, },
  nextButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 20, textAlign: 'center', }, 
  reportBox: { marginTop: 40, padding: 20, backgroundColor: '#333333', borderRadius: 10, alignSelf: 'stretch', alignItems: 'center', },
  reportTitle: { fontSize: 16, color: '#AAAAAA', marginBottom: 5, },
  reportTime: { fontSize: 48, fontWeight: 'bold', color: '#00FF00', },
});

export default styles;