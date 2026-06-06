import { Space, Proposal, User, Community } from './types';

export const CURRENT_USER: User = {
  id: 'u-1',
  name: 'Juan Pérez',
  avatar: 'https://picsum.photos/seed/user1/100/100',
  role: 'Ciudadano',
  residence: 'San Telmo, CABA',
  isVerified: false
};

export const MOCK_COMMUNITIES: Community[] = [
  {
    id: 'c-1',
    name: 'Asamblea San Telmo',
    icon: '🏛️',
    spaces: [
      {
        id: 's-1',
        name: 'Seguridad',
        description: 'Debates sobre prevención y monitoreo barrial.',
        isPrivate: false,
        memberCount: 1240,
        icon: '🛡️'
      },
      {
        id: 's-2',
        name: 'Obras Públicas',
        description: 'Mejoras en infraestructura y espacios comunes.',
        isPrivate: false,
        memberCount: 850,
        icon: '🏗️'
      }
    ],
    settings: {
      allowFreeSpaces: true,
      requireKYC: true
    },
    collaborators: ['admin@santelmo.ar']
  },
  {
    id: 'c-2',
    name: 'Tech Corp S.A.',
    icon: '🏢',
    spaces: [
      {
        id: 's-3',
        name: 'Recursos Humanos',
        description: 'Políticas internas y bienestar del empleado.',
        isPrivate: true,
        memberCount: 150,
        icon: '👥'
      },
      {
        id: 's-4',
        name: 'Innovación',
        description: 'Nuevos proyectos y optimización de procesos.',
        isPrivate: true,
        memberCount: 45,
        icon: '💡'
      }
    ],
    settings: {
      allowFreeSpaces: false,
      requireKYC: false
    },
    collaborators: ['hr@techcorp.com', 'ceo@techcorp.com']
  }
];

export const SINGLE_SPACE: Space = MOCK_COMMUNITIES[0].spaces[0];

export const MOCK_PROPOSALS: Proposal[] = [
  {
    id: 'p-1',
    spaceId: 's-1',
    author: {
      id: 'u-2',
      name: 'Laura Smith',
      avatar: 'https://picsum.photos/seed/laura/100/100',
      role: 'Delegada'
    },
    title: 'Peatonalización Calle Defensa',
    description: 'Extender el horario peatonal los domingos para fomentar el comercio local.',
    status: 'Votación',
    votes: { yes: 452, no: 124, abstain: 32 },
    createdAt: 'hace 2 días',
    ledgerHash: 'c6f3...8a12',
    comments: [
      { id: 'c-1', userId: 'u-3', userName: 'Alex Kim', text: 'Fundamental para la seguridad pública.', timestamp: 'hace 1 día', votes: 12 },
      { id: 'c-2', userId: 'u-5', userName: 'Martina Sol', text: 'Esto afectaría la logística de los comercios locales por la mañana.', timestamp: 'hace 12 horas', votes: 5 }
    ]
  },
  {
    id: 'p-2',
    spaceId: 's-1',
    author: {
      id: 'u-4',
      name: 'Tomás Chen',
      avatar: 'https://picsum.photos/seed/tomas/100/100',
      role: 'Vecino'
    },
    title: 'Luminarias LED en Plaza',
    description: 'Instalación de 15 puntos de luz adicionales en Plaza Dorrego.',
    status: 'Resuelto',
    votes: { yes: 890, no: 12, abstain: 5 },
    createdAt: 'hace 1 semana',
    ledgerHash: 'a1b2...c3d4',
    comments: []
  },
  {
    id: 'p-3',
    spaceId: 's-2',
    author: { id: 'u-1', name: 'Juan Pérez', avatar: '' },
    title: 'Reparación de veredas en calle Chile',
    description: 'Se solicita la reparación urgente de las veredas entre Defensa y Balcarce.',
    status: 'Debate',
    votes: { yes: 10, no: 0, abstain: 0 },
    createdAt: 'hace 3 horas',
    ledgerHash: 'e5f6...g7h8',
    comments: []
  }
];