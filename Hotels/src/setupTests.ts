// setupTests.ts

import { TextEncoder, TextDecoder } from 'util'; // Import from 'util' module
global.TextEncoder = TextEncoder; // Polyfill TextEncoder globally
global.TextDecoder = TextDecoder; // Polyfill TextDecoder globally
