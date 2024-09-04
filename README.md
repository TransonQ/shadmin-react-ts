# shadmin

> admin built with shadcn/ui -> shadmin :)

## preview stie:

- https://shadmin.vercel.app
- https://shadmin.netlify.app

## roadmap

- [x] `<FrameProvider/>` - global assets (eg. logo)
- [x] `<Frame/>`, `useFrameConfig` - app layout base components
- [x] `<AppShell/>` - the app layout, built with Frame
- [x] `<BlockStack/>`, `<InlineStack/>` - base on flex
- [x] `<Page/>` - app content layout
- [x] `<Layout/>` - layout in page
- [x] `<FormLayout/>`
- [x] `<PageBreadcrumb/>`
- [x] `<PageHeader/>`
- [x] `shadmin` (custom tools eg. shadmin.toast.success())
- [x] `<RowAction/>`
- [x] `<ContextualSaveBar/>`
- [x] `<Icon/>`
- [x] `<LegendCard/>`
- [x] `<LegendSelect/>`
- [x] `<Loading/>`
- [x] `<MenuItem/>`
- [x] `<Navigation/>`
- [x] `<NavigationCollapsed/>`
- [x] `<NavigationBlocker/>`
- [x] `<Show/>`
- [x] `<StatusDot/>`
- [x] `<Text/>`
- [x] `<IndexTable/>`
  - [x] `<TableFilters/>`
  - [x] `<TableTabs/>`
  - [x] `<TableColumnHeader/>`
  - [ ] `<TableColumnOptions/>`
  - [x] `<TablePagination/>`
  - [x] `tableConfig`
  - [x] `<BulkActions/>`
  - [x] `<FilterCheckbox/>`
  - [ ] `<FilterDate/>`
  - [ ] `useTableTabs`

### under construction

- [ ] [storybook](https://storybook.js.org/docs) / [reactcosmos](https://reactcosmos.org/)
- [ ] docs

## reference

- [Multipart Namespace Components:Addressing RSC and Dot Notation Issues](https://ivicabatinic.from.hr/posts/multipart-namespace-components-addressing-rsc-and-dot-notation-issues) (eg. `<Page.Header/>` -> `<PageHeader/>`)

## structure

```bash
src
├───📁 api/
├───📁 assets/
├───📁 components/
│   ├───📁 errors/
│   ├───📁 lib/
│   ├───📁 shared/  # custom components
│   └───📁 ui/      # shadcn components
├───📁 configs/
├───📁 hooks/
├───📁 layouts/
├───📁 lib/
├───📁 mocks/
├───📁 pages/
│   ├───📁 example/ # demo
│   ├───📁 login/
│   └───📁 root/
├───📁 schemas/
├───📄 App.tsx
├───📄 global.css
├───📄 main.tsx
├───📄 routes.tsx
└───📄 vite-env.d.ts

```

## packages

- [pnpm](https://pnpm.io/)
- [shadcn](https://ui.shadcn.com/)
- [class-variance-authority](https://cva.style/docs)
- [axios](https://github.com/axios/axios)
- [swr](https://swr.vercel.app/)
- [@tanstack/react-table](https://tanstack.com/table/latest)
- [react-router-dom](https://reactrouter.com/en/main)
- [react-use](https://github.com/streamich/react-use)
- [recharts](https://recharts.org/)
- [react-error-boundary](https://github.com/bvaughn/react-error-boundary)
- [dnd-kit](https://dndkit.com/)
- [jotai](https://jotai.org/)
- [date-fns](https://date-fns.org/)
- [msw.js](https://mswjs.io/)
- [vite](https://vitejs.dev/)
- [typescript](https://www.typescriptlang.org/)
- [knip](https://knip.dev/)
