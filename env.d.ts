/// <reference types="vite/client" />

/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_AI_API_KEY: string;
  }
}
