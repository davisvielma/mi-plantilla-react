# mi-plantilla-react

Plantilla SPA reutilizable: React 19 + TypeScript (strict) + Vite 8.
En construcción: infraestructura base lista (shadcn, husky, env, HTTP); lógica de negocio aún sin conectar.

## Comandos (gestor: Yarn v1 — `yarn.lock`)
- `yarn dev`
- `yarn build` — corre `tsc -b && vite build`; puerta de typecheck + build
- `yarn run check` — `biome check --write .`: formatea, ordena imports y aplica fixes. **Modifica archivos** (usar `yarn run check`, no `yarn check`: en Yarn v1 es un comando reservado)
- `yarn lint` — biome lint read-only
- `npx tsc -b` — solo typecheck
- No hay test runner configurado.

## Commits
- NO commitear NADA a menos que el usuario lo pida explícitamente.
- Cuando lo pida: mensaje SIEMPRE en inglés, formato Conventional Commits
  (`feat:`, `fix:`, `chore:`, `docs:`, `build:`).
- Usar la skill `git-commit` (staging inteligente + generación de mensaje).
- SIEMPRE en UNA sola línea (sin cuerpo ni footer).

## Tooling
- Biome es el ÚNICO linter/formatter (no existe ESLint ni Prettier). Config: `biome.json`
  (preset `recommended` + `domains.react: recommended`), indent tab, comillas dobles.
- Tailwind v4 CSS-first: no hay `tailwind.config.js`; el tema se define en `src/index.css`
  con `@theme`. Plugin `@tailwindcss/vite` ya registrado en `vite.config.ts`.
- React Router v8: paquete `react-router`; APIs DOM (RouterProvider, Link, useNavigate) desde
  `react-router/dom`. **`react-router-dom` ya no existe**: no instalarlo ni importarlo.
- shadcn/ui (base-nova) ya inicializado (`components.json` + `button`). El resto de componentes
  (dropdown-menu, sonner, input…) se descargan **según se necesiten** con `npx shadcn add <name>`
  (los primitivos de `@base-ui/react` y `cn` ya están como deps).
- `verbatimModuleSyntax` → obligatorio `import type` para tipos.
  `erasableSyntaxOnly` → prohibidos enums/namespaces/parámetros con propiedades.
  Los imports TS llevan extensión (`.tsx`).

## Reglas de Nomenclatura (File Casing)
- **PascalCase**: Reservado para componentes y archivos de React (`.tsx`) creados por nosotros (ej: `App.tsx`, `Providers.tsx`, `ThemeProvider.tsx`, `ModeToggle.tsx`). *Excepción: componentes de terceros como shadcn/ui que vienen por defecto en kebab-case.*
- **camelCase**: Reservado para custom hooks de React (`.ts` o `.tsx`) (ej: `useTheme.ts`).
- **kebab-case**: Reservado exclusivamente para archivos puros de TypeScript que no son componentes de React ni hooks (`.ts` de configuración, api, schemas, utilidades, ej: `src/lib/api/client.ts`, `src/lib/env.ts`, `vite.config.ts`).

## Arquitectura (Feature-Based) — regla de oro
Patrón: **Feature-Based** (modular por funcionalidad), estándar de la industria, estilo *bulletproof-react*.
Cada feature es autocontenida (api + componentes + hooks + esquemas + estado). Árbol objetivo:

```
mi-plantilla-react/
├── .husky/
│   └── pre-commit                     # corre lint-staged (biome check --write)
├── .vscode/settings.json              # Biome como formatter
├── public/                            # favicon, icons
├── src/
│   ├── app/                           # ⚙️ Composición raíz
│   │   ├── App.tsx                    #   componente raíz (PascalCase)
│   │   ├── Providers.tsx              #   QueryClient + Theme + Sonner providers (PascalCase)
│   │   └── Router.tsx                 #   createBrowserRouter (React Router v8) (PascalCase)
│   ├── assets/                        # media, logos
│   ├── components/                    # 🧩 Componentes UI globales (PascalCase)
│   │   ├── ui/                        #   shadcn/ui (button, input, dropdown-menu…) (kebab-case nativo)
│   │   ├── layouts/                   #   layouts compartidos de la aplicación (PascalCase)
│   │   │   └── AppLayout.tsx          #   layout base (Outlet + navbar) (PascalCase)
│   │   └── common/                    #   componentes UI genéricos y reutilizables (no providers, no layouts) (PascalCase)
│   │       └── ModeToggle.tsx         #   selector de tema (PascalCase)
│   ├── features/                      # 📦 Módulos por funcionalidad
│   │   └── example/                   #   feature de demostración (patrón a copiar)
│   │       ├── api/                   #     endpoints axios (kebab-case)
│   │       ├── components/            #     componentes de la feature (PascalCase)
│   │       ├── hooks/                 #     hooks específicos de la feature (camelCase)
│   │       ├── schemas/               #     validación zod (kebab-case)
│   │       ├── store.ts               #     estado zustand de la feature (camelCase)
│   │       └── types.ts               #     tipos de la feature (kebab-case)
│   ├── hooks/                         # 🪝 Hooks genéricos reutilizables globales
│   │   └── useTheme.ts                #   hook del tema (camelCase)
│   ├── lib/                           # 🔧 Infraestructura técnica
│   │   ├── api/
│   │   │   ├── client.ts              #   instancia axios + interceptores (JWT, refresh, 401/403/500) (kebab-case)
│   │   │   ├── http.ts                #   helpers tipados para TanStack Query (kebab-case)
│   │   │   └── types.ts               #   ApiResponse<T> (wrapper del backend) (kebab-case)
│   │   ├── env.ts                     #   validación de variables de entorno con Zod (kebab-case)
│   │   └── utils.ts                   #   cn() = clsx + tailwind-merge (kebab-case)
│   ├── pages/                         # 🖥️ Vistas por ruta
│   │   └── home/index.tsx             #   página demo de la plantilla
│   ├── providers/                     # 🌐 Proveedores de contexto globales (PascalCase)
│   │   └── ThemeProvider.tsx          #   proveedor de tema (PascalCase)
│   ├── schemas/                       # esquemas zod compartidos globales (kebab-case)
│   ├── stores/                        # stores zustand globales (camelCase)
│   ├── types/                         # tipos TS compartidos (kebab-case)
│   ├── index.css                      # Tailwind v4 + tokens oklch + dark variant
│   └── main.tsx                       # entry point
├── components.json                    # configuración shadcn/ui
├── biome.json                         # Biome (preset recommended)
├── .env.example                       # variables de entorno documentadas
├── index.html
├── package.json                       # scripts, lint-staged, husky
├── tsconfig*.json                     # paths @/*
├── vite.config.ts                     # alias @ → src
└── README.md                          # documentación de la plantilla
```

Reglas del patrón (verificación):
- Las features NO importan entre sí (solo capas comunes). Si dos features comparten algo,
  sube a `components/`, `lib/`, `hooks/`, `stores/`, `schemas/` o `types/`.
- `pages/` solo orquesta features; `features/` contiene la lógica de negocio.
- Estado servidor (TanStack Query) y HTTP viven en `features/<name>/hooks/` y `api/`;
  `lib/api/` solo define infraestructura del cliente.
- README.md del árbol objetivo: aún es el README por defecto de Vite; pendiente de reemplazar
  por la doc real de la plantilla.

## Al pedir "muéstrame la arquitectura"
- Cuando el usuario pida "muéstrame la arquitectura" o "me perdí", mostrar SIEMPRE el árbol
  EXPLÍCITO y completo de la sección `## Arquitectura (Feature-Based)` (sin resumir) y recordar
  el nombre: **Feature-Based** (modular por funcionalidad), patrón *bulletproof-react*.

## Estado actual y gotchas
- Lista: HTTP (cliente axios + refresh + helpers), env (validación zod), shadcn base, husky/lint-staged.
- Pendiente: providers raíz (TanStack Query + tema + Sonner), router v8, theme, feature ejemplo (falta
  el endpoint demo del backend para conectar la query), README como doc propio.
- `README.md` es el README por defecto de Vite y cita configs de ESLint inexistentes; ignorarlo
  como fuente de verdad (se reescribirá como doc de la plantilla).
