export interface GuidePhase {
  title: string;
  steps: string[];
}

const guidePhases: GuidePhase[] = [
  {
    title: 'Fase 1: Instrucción inicial',
    steps: [
      'Unidad lista para fase de instrucción.',
      'Verifica que el interruptor principal esté apagado.',
    ],
  },
  {
    title: 'Fase 2: Preparación técnica',
    steps: [
      'Coloca el multímetro en modo de continuidad.',
    ],
  },
  {
    title: 'Fase 3: Verificación de seguridad',
    steps: [
      'Comprueba que no haya tensión entre fases.',
    ],
  },
  {
    title: 'Fase Final: Cierre de auditoría',
    steps: [
      'GUÍA FINALIZADA. Unidad CM5 lista para la siguiente fase.',
    ],
  },

  {
  title: 'Fase de prueba',
  steps: ['Este paso es solo para verificar que se muestra.'],
}
];

export default guidePhases;