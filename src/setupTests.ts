// src/setupTests.ts
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// declare global {
//     namespace NodeJS {
//       interface Global {
//         // Define the expect function for TypeScript
//         expect: jest.Expect;
//       }
//     }
//   }
// Object.defineProperty(window, 'matchMedia', {
//     value: jest.fn(() => ({
//       matches: false,
//       addListener: jest.fn(),
//       removeListener: jest.fn(),
//     })),
//   });
