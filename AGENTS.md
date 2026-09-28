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
  Imports sin extensión (Vite las resuelve; no escribir `.ts`/`.tsx`).
- Iconos: `lucide-react` para iconos UI; `react-icons` (fa6) solo para marcas
  (GitHub/X/LinkedIn) como en `Footer.tsx`.
- Imports: alias `@/` para carpetas ajenas (ej: `@/components/ui/button`);
  relativo para lo que está en la misma carpeta (ej: `./Logo`).

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
│   │   ├── layouts/                   #   layouts de la aplicación: una carpeta por layout (kebab-case)
│   │   │   ├── app/                   #     layout público (Header + Outlet + Footer)
│   │   │   │   └── AppLayout.tsx      #       layout base (PascalCase)
│   │   │   ├── auth/                  #     layout de autenticación (split 2 columnas)
│   │   │   │   └── AuthLayout.tsx     #       (PascalCase)
│   │   │   └── dashboard/             #     layout de panel: solo composición, sin markup atómico
│   │   │       ├── DashboardLayout.tsx        #   estado del sidebar + composición + <Outlet/> (PascalCase)
│   │   │       ├── DashboardSidebar.tsx       #   aside desktop + overlay móvil (PascalCase)
│   │   │       ├── DashboardSidebarContent.tsx#   logo + nav + tarjeta de usuario, a NIVEL DE MÓDULO (PascalCase)
│   │   │       ├── DashboardHeader.tsx        #   hamburger + notificaciones + tema + UserMenu (PascalCase)
│   │   │       └── dashboard-nav.ts           #   config de nav + getNavSections/getUserMenuItems (kebab-case)
│   │   └── common/                    #   componentes UI genéricos y reutilizables (no providers, no layouts) (PascalCase)
│   │       ├── Footer.tsx             #   footer del layout: secciones + marcas sociales (PascalCase)
│   │       ├── FullScreenLoading.tsx  #   spinner a pantalla completa para guards de ruta (PascalCase)
│   │       ├── Header.tsx             #   header sticky: nav, tema, login/register y menú móvil (PascalCase)
│   │       ├── Logo.tsx               #   logo React Starter con variante navbar/footer/auth/dashboard (PascalCase)
│   │       ├── ModeToggle.tsx         #   selector de tema (PascalCase)
│   │       ├── UserAvatar.tsx         #   avatar presentacional con iniciales (sin imports de features) (PascalCase)
│   │       └── UserMenu.tsx           #   menú de usuario presentacional: user + items + onLogout por props (PascalCase)
│   ├── features/                      # 📦 Módulos por funcionalidad
│   │   ├── example/                   #   feature de demostración (patrón a copiar)
│   │   │   ├── api/                   #     endpoints axios (kebab-case)
│   │   │   ├── components/            #     componentes de la feature (PascalCase)
│   │   │   ├── hooks/                 #     hooks específicos de la feature (camelCase)
│   │   │   ├── schemas/               #     validación zod (kebab-case)
│   │   │   ├── store.ts               #     estado zustand de la feature (camelCase)
│   │   │   └── types.ts               #     tipos de la feature (kebab-case)
│   │   └── auth/                      #   feature de auth (ya implementada)
│   │       ├── api/                   #     endpoints axios (kebab-case)
│   │       ├── components/            #     guards de ruta (PascalCase)
│   │       ├── schemas/               #     validación zod (kebab-case)
│   │       ├── store.ts               #     estado zustand: user, tokens, authStatus, hasRole (camelCase)
│   │       └── types.ts               #     tipos de la feature (kebab-case)
│   ├── hooks/                         # 🪝 Hooks genéricos reutilizables globales
│   │   └── useTheme.ts                #   hook del tema (camelCase)
│   ├── lib/                           # 🔧 Infraestructura técnica
│   │   ├── api/
│   │   │   ├── client.ts              #   instancia axios + interceptores (JWT, refresh, 401/403/500) (kebab-case)
│   │   │   ├── http.ts                #   helpers tipados para TanStack Query (kebab-case)
│   │   │   └── types.ts               #   ApiResponse<T> (wrapper del backend) (kebab-case)
│   │   ├── env.ts                     #   validación de variables de entorno con Zod (kebab-case)
│   │   ├── user-formatter.ts           #   helpers puros de presentación de usuario (kebab-case)
│   │   └── utils.ts                   #   cn() = clsx + tailwind-merge (kebab-case)
│   ├── pages/                         # 🖥️ Vistas por ruta
│   │   ├── HomePage.tsx               #   página demo: secciones Hero/Features/Pricing/CTA (PascalCase)
│   │   ├── NotFoundPage.tsx           #   404 standalone con selector de tema propio (PascalCase)
│   │   ├── auth/                      #   vistas de autenticación (login, register)
│   │   ├── user/                      #   vistas de usuario — pendientes
│   │   └── admin/                     #   vistas de administración
│   ├── providers/                     # 🌐 Proveedores de contexto globales (PascalCase)
│   │   └── ThemeProvider.tsx          #   proveedor de tema (PascalCase)
│   ├── schemas/                       # esquemas zod compartidos globales (kebab-case)
│   ├── stores/                        # stores zustand globales (camelCase)
│   ├── types/                         # tipos TS compartidos: user, auth, roles (kebab-case)
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
- `components/` (shared) NUNCA importa de `features/`: si un componente shared necesita lógica
  de negocio, es señal de que pertenece a la feature, o de que debería recibirla por props
  (ej: `UserMenu` es presentacional y recibe `user`/`items`/`onLogout`; el layout, que es la
  capa app, es quien llama a `logout()` y navega).
- `pages/` solo orquesta features; `features/` contiene la lógica de negocio.
- Cada layout va en su propia carpeta (`layouts/app/`, `layouts/auth/`, `layouts/dashboard/`) y
  su archivo `XLayout.tsx` es SOLO composición: el markup atómico va en archivos siblings.
  Los componentes que se usan en varios layouts (Header, Logo, ModeToggle, UserAvatar) van en
  `common/`, no duplicados dentro de cada layout.
- Componentes de layout a NIVEL DE MÓDULO, nunca definidos dentro del componente padre: definirlos
  inline los recrea en cada render y remonta el subárbol (regla `react-hooks/static-components`).
- Componentes de shadcn sobre Base UI: NUNCA anides un `<button>`/`<div>` dentro de
  `DropdownMenuTrigger` (ya renderiza un `<button>`) ni un `<a>` dentro de `DropdownMenuItem`
  (ya es `role="menuitem"`). Usá la prop `render`: `render={<Button ... />}`,
  `render={<Link to="..." />}`. `DropdownMenuLabel` requiere un `DropdownMenuGroup` ancestor o
  lanza "MenuGroupContext is missing".
- Páginas que NO orquestan features (demo, 404, mero enrutado) van como archivos directos
  `${Nombre}Page.tsx` en `pages/` (ej: `HomePage.tsx`); las que orquestan features van en
  subcarpetas (`pages/auth/login.tsx`, etc.).
- Estado servidor (TanStack Query) y HTTP viven en `features/<name>/hooks/` y `api/`;
  `lib/api/` solo define infraestructura del cliente.
- README.md del árbol objetivo: aún es el README por defecto de Vite; pendiente de reemplazar
  por la doc real de la plantilla.

## Al pedir "muéstrame la arquitectura"
- Cuando el usuario pida "muéstrame la arquitectura" o "me perdí", mostrar SIEMPRE el árbol
  EXPLÍCITO y completo de la sección `## Arquitectura (Feature-Based)` (sin resumir) y recordar
  el nombre: **Feature-Based** (modular por funcionalidad), patrón *bulletproof-react*.

## Estado actual y gotchas
- Lista: HTTP (cliente axios + refresh + helpers), env (validación zod), shadcn base
  (button, avatar, badge, card, dropdown-menu, input, label), husky/lint-staged, providers raíz
  (TanStack Query + tema + Sonner), theme, feature auth completa (login/register/logout/me +
  guards `AuthenticatedRoute`/`AdminRoute`/`NotAuthenticatedRoute`), router v8 con los 3 layouts
  (`app/`, `auth/`, `dashboard/`), HomePage demo, Login/RegisterPage, AdminDashboardPage,
  NotFoundPage, react-icons (fa6).
- `layouts/dashboard/`: la nav se configura SOLO en `dashboard-nav.ts` con un campo opcional
  `roles?: UserRole[]` por item (sin `roles` = visible para todos). Los selectores
  `getNavSections(user)` / `getUserMenuItems(user`) filtran por rol; agregar un rol nuevo NO
  requiere tocar flags: alcanza con escribir el nombre del rol en los items correspondientes.
  No usar booleanos tipo `adminOnly` (no escala a N roles) ni filtrar por `label` (frágil).
- Roles del backend (por ahora): `user`, `admin`, `super-user` — const `ROLES` + tipo `UserRole`
  en `src/types/roles.ts` (un solo lugar para agregar/renombrar roles). `Role.name` es `UserRole`.
- El store de auth expone el getter genérico `hasRole: (...roles: UserRole[]) => boolean`
  (devuelve true si el rol del usuario está entre los pasados). Para proteger una ruta/manu
  se llama `hasRole("admin")` etc.; agregar un rol no implica tocar el store. Si el backend
  evoluciona a múltiples roles por usuario (`roles: string[]`), solo cambia la implementación
  interna de `hasRole`.
- Pendiente: feature ejemplo (falta el endpoint demo del backend para conectar la query),
  README como doc propio, `errorElement` en el router (hoy React Router muestra su pantalla de
  error cruda).
- Bugs conocidos sin arreglar: los `href` de la nav (`/dashboard*`) no están registrados en
  `Router.tsx` (caen en NotFound) ni `/user/dashboard` en `Header.tsx`; `animate-slide-in-right`
  y `animate-fade-in` no están definidos en `index.css`; `User` no tiene campo de avatar, por eso
  `UserAvatar` recibe `imageUrl` y hoy siempre muestra iniciales; `Header.tsx` tiene el typo
  `lodaing`.
- `README.md` es el README por defecto de Vite y cita configs de ESLint inexistentes; ignorarlo
  como fuente de verdad (se reescribirá como doc de la plantilla).
