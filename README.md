# Desafio Front-End Sênior

Desafio Front-End Sênior para Kruzer.io, este template foi iniciado usando o Vite com HMR e regras de ESLint.

Links oficiais das documentações:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) usa [Babel](https://babeljs.io/) para recarregamento rápido
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) use [SWC](https://swc.rs/) para recarregamento rápido

## Instalação

1.  Download ou clone [Challenge-front-end-senior-kruzer](https://github.com/mrLevys/challenge-front-end-senior-kruzer)
2.  Install npm dependencies: run `npm install`

### Desenvolvedo

0.  Requires node `20.x`
1.  Run `npm run dev`
2.  Go to [http://localhost:5173/](http://localhost:5173/)

### Formatando os arquivos com Lint

**Esta etapa requer o ESlint instalado no VSCode**

0. Requer o ESlint, Link do Marketplace do VS: [https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
1. Run `npm run lint`

### Build do projeto para deploy

1. Run `npm run build`

## Configuração do ESLint para deploy

Caso queria reaproveitar esta aplicação para uso em produção, recomendo atualizar a configuração para habilitar regras de lint com reconhecimento de tipo:

- Configure a propriedade `parserOptions` como abaixo:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Substitua `tseslint.configs.recommended` para `tseslint.configs.recommendedTypeChecked` ou `tseslint.configs.strictTypeChecked`
- Adicione opicionalmente `...tseslint.configs.stylisticTypeChecked`
- Instale [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) e atualize a configuração:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```
