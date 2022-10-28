const env = {
    npm_package_version: '0.0.1'
  };
  
  export const environment = {
    production: false,
    version: env.npm_package_version + '-dev',
    serverUrl: 'http://localhost:4200/',
    defaultLanguage: 'en-US',
    supportedLanguages: ['en-US', 'pt-BR']
  };
  