# mi-plantilla-react

Plantilla SPA reutilizable: React 19 + TypeScript (strict) + Vite 8.
En construcción: deps instaladas, lógica aún sin conectar.

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
- `verbatimModuleSyntax` → obligatorio `import type` para tipos.
  `erasableSyntaxOnly` → prohibidos enums/namespaces/parámetros con propiedades.
  Los imports TS llevan extensión (`.tsx`).

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
│   │   ├── App.tsx                    #   componente raíz
│   │   ├── providers.tsx              #   QueryClient + Theme + Sonner providers
│   │   └── router.tsx                 #   createBrowserRouter (React Router v8)
│   ├── assets/                        # media, logos
│   ├── components/                    # 🧩 Componentes reutilizables
│   │   ├── ui/                        #   shadcn/ui (button, input, dropdown-menu…)
│   │   └── common/                    #   propios de la plantilla
│   │       ├── theme-provider.tsx     #   contexto de tema (claro/oscuro/sistema)
│   │       ├── mode-toggle.tsx        #   switch con dropdown + lucide icons
│   │       └── app-layout.tsx         #   layout base (Outlet + navbar)
│   ├── features/                      # 📦 Módulos por funcionalidad
│   │   └── example/                   #   feature de demostración (patrón a copiar)
│   │       ├── api/                   #     endpoints axios
│   │       ├── components/            #     componentes de la feature
│   │       ├── hooks/                 #     useExampleQuery/useExampleMutation
│   │       ├── schemas/               #     validación zod
│   │       ├── store.ts               #     estado zustand de la feature
│   │       └── types.ts               #     tipos de la feature
│   ├── hooks/                         # 🪝 Hooks genéricos reutilizables
│   │   └── use-theme.ts               #   hook del tema
│   ├── lib/                           # 🔧 Infraestructura
│   │   ├── api/
│   │   │   ├── client.ts              #   instancia axios + interceptores (JWT, refresh, 401/403/500)
│   │   │   ├── http.ts                #   helpers tipados para TanStack Query
│   │   │   └── types.ts               #   ApiResponse<T> (wrapper del backend)
│   │   ├── env.ts                     #   validación de variables de entorno con Zod
│   │   └── utils.ts                   #   cn() = clsx + tailwind-merge
│   ├── pages/                         # 🖥️ Vistas por ruta
│   │   └── home/index.tsx             #   página demo de la plantilla
│   ├── schemas/                       # esquemas zod compartidos globales
│   ├── stores/                        # stores zustand globales
│   ├── types/                         # tipos TS compartidos
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

## Al pedir "muéstrame la arquitectura"
- Cuando el usuario pida "muéstrame la arquitectura" o "me perdí", mostrar SIEMPRE el árbol
  EXPLÍCITO y completo de la sección `## Arquitectura (Feature-Based)` (sin resumir) y recordar
  el nombre: **Feature-Based** (modular por funcionalidad), patrón *bulletproof-react*.

## Estado actual y gotchas
- Deps instaladas pero SIN conectar: TanStack Query, Zustand, Axios, RHF, Zod, Sonner
  (no hay providers, `lib/`, stores ni router aún).
- `src/` aún plano: `main.tsx` + `App.tsx` + `index.css`. Sin alias `@/`; imports relativos.
- `README.md` es el README por defecto de Vite y cita configs de ESLint inexistentes; ignorarlo
  como fuente de verdad (se reescribirá como doc de la plantilla).
- `.vscode/settings.json` usa id de formatter incorrecto (`biome.biome`; debe ser `biomejs.biome`).