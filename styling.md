# UI/UX & CSS Styling Rules (Finalized: Tailwind Dark Mode)

You must strictly adhere to the following styling rules for all UI components and HTML/JSX generation. Do not deviate from this visual language unless explicitly asked.

## 1. Tech Stack & Libraries
* **CSS Framework:** Tailwind CSS (Utility-first)
* **Icons:** Lucide React
* **Theme:** Strict Dark Mode (`bg-slate-950` as the root canvas)

## 2. Design System & Palette
* **Primary/Brand Color:** Indigo (`indigo-500` for interactive states, `indigo-400` for vibrant accents)
* **Backgrounds:** * Main Canvas: `bg-slate-950`
  * Cards / Modals / Layers: `bg-slate-900`
  * Dropdowns / Tooltips: `bg-slate-850`
* **Text Colors:** * Primary Text: `text-slate-100`
  * Secondary / Muted Text: `text-slate-400`
  * Disabled Text: `text-slate-600`
* **Borders & Radii:** * Radii: `rounded-xl` (12px) for cards, `rounded-lg` (8px) for buttons/inputs
  * Borders: Thin `border border-slate-800`

---

## 3. Component Specifications

### Tables
* **Header (`<thead>`):** `bg-slate-900/50 text-slate-400 text-xs font-semibold uppercase tracking-wider text-left border-b border-slate-800`
* **Rows (`<tr>`):** `border-b border-slate-900 hover:bg-slate-900/40 transition-colors`
* **Padding:** `px-6 py-4` for standard cells, `px-6 py-3` for headers.
* **Layout:** `w-full text-left border-collapse table-auto`

### Buttons
* **Primary:** `bg-indigo-600 text-white font-medium text-sm px-4 py-2 rounded-lg transition-all hover:bg-indigo-500 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950`
* **Secondary:** `border border-slate-700 bg-slate-900 text-slate-200 font-medium text-sm px-4 py-2 rounded-lg transition-all hover:bg-slate-800 hover:text-white active:scale-95`
* **Ghost:** `text-slate-400 hover:text-slate-100 hover:bg-slate-900 px-3 py-2 rounded-lg transition-colors`

### Forms & Inputs
* **Styling:** `w-full bg-slate-900 text-slate-100 border border-slate-800 rounded-lg px-3.5 py-2 text-sm placeholder-slate-500 transition-colors focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500`
* **Spacing:** Stacked vertically with `space-y-4`. Labels are always positioned above inputs using `block text-sm font-medium text-slate-300 mb-1.5`.

---

## 4. Layout & Spacing
* **Page Layout:** Max-width application wrapper (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full`)
* **Section Spacing:** Consistent vertical separation (`py-8` or layout blocks separated by `space-y-8`)
* **Flex/Grid:** Use `flex` and `items-center` for linear alignments/toolbars; use `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` for responsive dashboard layouts.