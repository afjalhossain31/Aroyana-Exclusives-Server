## 📄 TypeScript Configuration (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true
    // "outDir": "./dist"
  },
  "include": ["src/**/*"]
}
```

### Configuration Overview

| Option | Description |
|--------|-------------|
| `target: ES2022` | Compiles TypeScript to modern JavaScript (ES2022). |
| `module: NodeNext` | Uses Node.js native ES Module support. |
| `moduleResolution: NodeNext` | Resolves modules using the Node.js ESM strategy. |
| `esModuleInterop: true` | Enables better compatibility with CommonJS packages. |
| `strict: true` | Enables all strict type-checking options for safer code. |
| `skipLibCheck: true` | Skips type checking of declaration (`.d.ts`) files to improve build performance. |
| `include: ["src/**/*"]` | Includes all TypeScript source files inside the `src` directory. |
| `outDir` *(Optional)* | Uncomment to compile output into the `dist` folder. |

> **Note:** This configuration is recommended for production-ready Express.js + TypeScript applications using the `NodeNext` module system.
