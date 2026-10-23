# Fluid Functionalism — interaction patterns worth adopting (MIT, source in components/fluid-functionalism)

1. **Three spring tiers, never raw durations** (lib/springs): fast 80ms, moderate 160ms (critically damped: tabs, dropdowns, drawers), slow 240ms with 0.12 bounce for big surfaces. Exit = plain tween, one tier quicker → dismissals feel crisp. Adopt as Evotechly motion tokens.
2. **Fluid hover highlight** (hooks/use-fluid-hover + FluidHoverHighlight): one absolutely-positioned fill springs to the item *nearest* the cursor (axis x / y / xy grid); clicks in gaps route to the lit item (opt-out for destructive rows). Use in menus, selects, sidebar, command menu, table rows.
3. **Sliding tab indicator** (tabs / tabs-subtle): selected background/underline animates between tabs with the moderate spring.
4. **Weight change without layout shift** (lib/font-weight): selected labels go semibold using wght+opsz pairing so width stays within ±0.4px. Calibrated for Inter — for Geist either recalibrate or keep weight static and only animate color.
5. **Merged selection backgrounds** (use-merge-split): adjacent checked checkbox/radio rows merge into one continuous highlight.
6. **Keyboard-nav gate & touch-primary** hooks: hover effects suppressed during keyboard navigation and on touch devices; focus ring takes over.
7. **Button press feedback**: small scale-down on press via spring, no decorative motion.
8. **Popup lifecycle** (lib/popup): portals stay mounted until exit animation completes, with a fallback timer for throttled tabs.
9. **Reduced motion**: components call `useReducedMotion()` from motion/react and drop springs → follow this everywhere.
10. **Surface/elevation ladder** (surfaces theme): 8 levels; dark mode uses additive white-opacity + inset highlights. Map onto Brandbook surface tokens rather than importing colors.
11. **Icon slots** (icon-context + icons-phosphor): components render icons via named slots; IconProvider with Phosphor adapter keeps Evotechly on Phosphor without forking components.
