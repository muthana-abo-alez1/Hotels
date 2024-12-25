jest.mock('react-leaflet', () => ({
    MapContainer: () => <div>Mocked MapContainer</div>,
    TileLayer: () => <div>Mocked TileLayer</div>,
    Marker: () => <div>Mocked Marker</div>,
  }));
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
    useLocation: jest.fn(() => ({ pathname: '/admin' })),
    Outlet: () => <div>Mocked Outlet</div>,
}));
jest.mock('src/context/AuthContext', () => ({
  useAuth: jest.fn(() => ({ isAuthenticated: true })),
}));
jest.mock('src/context/ThemeContext', () => ({
  useTheme: jest.fn(() => ({ theme: 'light', toggleTheme: jest.fn() })),
}));
