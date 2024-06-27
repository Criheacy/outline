declare global {
  interface Window {
    env: Record<string, any>;
  }
}

const env = window.env;

if (!env) {
  throw new Error("Config could not be be parsed.");
}

export default env;
