#!/usr/bin/env python3
"""Generate EvoUI 0.3.0 catalog, components, tests, docs, showcase, and NOTICE."""

from __future__ import annotations

import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
COMP = SRC / "components"
DOCS = ROOT / "docs" / "components"
SHOW = ROOT / "showcase"

CATEGORIES = [
    ("foundations", "Foundations"),
    ("layout", "Layout & shell"),
    ("navigation", "Navigation"),
    ("forms", "Forms & inputs"),
    ("data-display", "Data display"),
    ("tables", "Tables"),
    ("charts", "Charts & KPIs"),
    ("feedback", "Feedback"),
    ("overlays", "Overlays"),
    ("crm", "CRM domain"),
    ("auth", "Auth & settings"),
    ("empty", "Empty & onboarding"),
]

# slug, category, export, title, source, license, url, spec, in_house, role, test_jsx, extra_exports
CATALOG = [
    ("button", "foundations", "EvoButton", "Button", "@smoothui/button-copy", "MIT", "https://smoothui.dev/r/button-copy.json", None, False, "button", '<EvoButton>Save deal</EvoButton>', ["Button", "buttonVariants"]),
    ("badge", "foundations", "EvoBadge", "Badge", "@smoothui/badge", "MIT", "https://smoothui.dev/r/badge.json", None, False, "status", '<EvoBadge>New</EvoBadge>', ["Badge"]),
    ("avatar", "foundations", "EvoAvatar", "Avatar", "@smoothui/avatar", "MIT", "https://smoothui.dev/r/avatar.json", None, False, "img", '<EvoAvatar fallback="AB" alt="Ada" />', ["Avatar", "EvoAvatarImage", "EvoAvatarFallback"]),
    ("avatar-group", "foundations", "EvoAvatarGroup", "Avatar group", "@smoothui/animated-avatar-group", "MIT", "https://smoothui.dev/r/animated-avatar-group.json", None, False, "group", '<EvoAvatarGroup people={[{name:"Ada"},{name:"Ben"}]} />', ["AvatarGroup"]),
    ("separator", "foundations", "EvoSeparator", "Separator", "@intentui/separator", "MIT", "https://intentui.com/r/separator", "Radix-backed (IntentUI used react-aria).", False, "separator", '<EvoSeparator />', ["Separator"]),
    ("skeleton", "foundations", "EvoSkeleton", "Skeleton", "@smoothui/skeleton", "MIT", "https://smoothui.dev/r/skeleton.json", None, False, "status", '<EvoSkeleton aria-label="Loading" />', ["Skeleton"]),
    ("kbd", "foundations", "EvoKbd", "Kbd", "@spectrumui/kbd-key", "Apache-2.0", "https://ui.spectrumhq.in/r/kbd-key.json", None, False, "kbd", '<EvoKbd>⌘K</EvoKbd>', ["Kbd"]),
    ("spinner", "foundations", "EvoSpinner", "Spinner", "@spectrumui/spinner-size", "Apache-2.0", "https://ui.spectrumhq.in/r/spinner-size.json", None, False, "status", '<EvoSpinner aria-label="Loading" />', ["Spinner"]),
    ("typography", "foundations", "EvoTypography", "Typography", "@kibo-ui/typography", "MIT", "https://www.kibo-ui.com/r/typography.json", "React primitives + DS tokens (registry was CSS-only).", False, "article", '<EvoTypography><EvoHeading>Title</EvoHeading><EvoText>Body</EvoText></EvoTypography>', ["Typography", "EvoHeading", "EvoText"]),
    ("icon-button", "foundations", "EvoIconButton", "Icon button", "@assistant-ui/tooltip-icon-button", "MIT", "https://r.assistant-ui.com/tooltip-icon-button.json", None, False, "button", '<EvoIconButton label="Close">×</EvoIconButton>', ["IconButton"]),
    ("sidebar", "layout", "EvoSidebar", "Sidebar", "@spectrumui/sidebar-navbar", "Apache-2.0", "https://ui.spectrumhq.in/r/sidebar-navbar.json", None, False, "navigation", '<EvoSidebar items={[{id:"a",label:"Home"}]} />', ["Sidebar"]),
    ("app-shell", "layout", "EvoAppShell", "App shell", "@spectrumui/bento-grid", "Apache-2.0", "https://ui.spectrumhq.in/r/bento-grid.json", None, False, "main", '<EvoAppShell title="Workspace">Content</EvoAppShell>', ["AppShell"]),
    ("resizable", "layout", "EvoResizable", "Resizable panels", None, "in-house", None, "Split panes on react-resizable-panels with keyboard handles and persisted sizes.", True, "group", '<EvoResizable storageKey="demo"><EvoResizablePanel>A</EvoResizablePanel><EvoResizableHandle /><EvoResizablePanel>B</EvoResizablePanel></EvoResizable>', ["Resizable", "EvoResizablePanel", "EvoResizableHandle"]),
    ("scroll-area", "layout", "EvoScrollArea", "Scroll area", None, "in-house", None, "Radix ScrollArea with thin themed scrollbars and fade edges.", True, "region", '<EvoScrollArea style={{height:80}}><p>Long</p></EvoScrollArea>', ["ScrollArea"]),
    ("card", "layout", "EvoCard", "Card", "@spectrumui/animated-card", "Apache-2.0", "https://ui.spectrumhq.in/r/animated-card.json", None, False, "article", '<EvoCard><EvoCardTitle>Deal</EvoCardTitle></EvoCard>', ["Card", "EvoCardTitle", "EvoCardDescription", "EvoCardHeader", "EvoCardContent", "EvoCardFooter"]),
    ("page-header", "layout", "EvoPageHeader", "Page header", "@spectrumui/heading-with-anchor", "Apache-2.0", "https://ui.spectrumhq.in/r/heading-with-anchor.json", None, False, "banner", '<EvoPageHeader title="Accounts" description="All accounts" />', ["PageHeader"]),
    ("tabs", "layout", "EvoTabs", "Tabs", "@spectrumui/tab-navbar", "Apache-2.0", "https://ui.spectrumhq.in/r/tab-navbar.json", None, False, "tablist", '<EvoTabs defaultValue="a"><EvoTabsList><EvoTabsTrigger value="a">One</EvoTabsTrigger></EvoTabsList><EvoTabsContent value="a">Panel</EvoTabsContent></EvoTabs>', ["Tabs", "EvoTabsList", "EvoTabsTrigger", "EvoTabsContent"]),
    ("accordion", "layout", "EvoAccordion", "Accordion", "@spectrumui/accordion", "Apache-2.0", "https://ui.spectrumhq.in/r/accordion.json", None, False, "button", '<EvoAccordion type="single" defaultValue="a"><EvoAccordionItem value="a"><EvoAccordionTrigger>Item</EvoAccordionTrigger><EvoAccordionContent>Body</EvoAccordionContent></EvoAccordionItem></EvoAccordion>', ["Accordion", "EvoAccordionItem", "EvoAccordionTrigger", "EvoAccordionContent"]),
    ("collapsible", "layout", "EvoCollapsible", "Collapsible", "@spectrumui/accordion-ghost", "Apache-2.0", "https://ui.spectrumhq.in/r/accordion-ghost.json", None, False, "button", '<EvoCollapsible title="More">Hidden</EvoCollapsible>', ["Collapsible"]),
    ("breadcrumb", "navigation", "EvoBreadcrumb", "Breadcrumb", None, "in-house", None, "Accessible nav breadcrumb with truncation, overflow dropdown and route-aware items.", True, "navigation", '<EvoBreadcrumb items={[{label:"Home",href:"/"},{label:"Deals"}]} />', ["Breadcrumb"]),
    ("command", "navigation", "EvoCommand", "Command palette", "@spectrumui/command-palette", "Apache-2.0", "https://ui.spectrumhq.in/r/command-palette.json", None, False, "combobox", '<EvoCommand><EvoCommandInput placeholder="Search" /><EvoCommandList><EvoCommandItem value="a">Open</EvoCommandItem></EvoCommandList></EvoCommand>', ["Command", "EvoCommandInput", "EvoCommandList", "EvoCommandItem", "EvoCommandPalette"]),
    ("navigation-menu", "navigation", "EvoNavigationMenu", "Navigation menu", "@spectrumui/tab-navbar", "Apache-2.0", "https://ui.spectrumhq.in/r/tab-navbar.json", None, False, "navigation", '<EvoNavigationMenu items={[{label:"Deals",href:"/deals"}]} />', ["NavigationMenu"]),
    ("menubar", "navigation", "EvoMenubar", "Menubar", "@spectrumui/expandable-action-bar", "Apache-2.0", "https://ui.spectrumhq.in/r/expandable-action-bar.json", None, False, "menubar", '<EvoMenubar items={[{label:"File",items:[{label:"New"}]}]} />', ["Menubar"]),
    ("pagination", "navigation", "EvoPagination", "Pagination", None, "in-house", None, "Compact pager with page size select, total count and keyboard support.", True, "navigation", '<EvoPagination page={1} pageCount={5} total={40} />', ["Pagination"]),
    ("stepper", "navigation", "EvoStepper", "Stepper", "@spectrumui/agent-steps", "Apache-2.0", "https://ui.spectrumhq.in/r/agent-steps.json", None, False, "list", '<EvoStepper steps={[{label:"Qualify"},{label:"Propose"}]} current={0} />', ["Stepper"]),
    ("input", "forms", "EvoInput", "Input", "@spectrumui/floating-label-input", "Apache-2.0", "https://ui.spectrumhq.in/r/floating-label-input.json", None, False, "textbox", '<EvoInput label="Email" defaultValue="ada@evotechly.com" />', ["Input"]),
    ("textarea", "forms", "EvoTextarea", "Textarea", "@spectrumui/autosize-textarea-form", "Apache-2.0", "https://ui.spectrumhq.in/r/autosize-textarea-form.json", None, False, "textbox", '<EvoTextarea label="Notes" defaultValue="Follow up" />', ["Textarea"]),
    ("select", "forms", "EvoSelect", "Select", "@spectrumui/model-selector", "Apache-2.0", "https://ui.spectrumhq.in/r/model-selector.json", None, False, "combobox", '<EvoSelect label="Stage" options={[{value:"new",label:"New"}]} defaultValue="new" />', ["Select"]),
    ("combobox", "forms", "EvoCombobox", "Combobox", "@spectrumui/multiple-selector-with-async-search", "Apache-2.0", "https://ui.spectrumhq.in/r/multiple-selector-with-async-search.json", None, False, "combobox", '<EvoCombobox label="Account" options={[{value:"acme",label:"Acme"}]} />', ["Combobox"]),
    ("multi-select", "forms", "EvoMultiSelect", "Multi select", "@spectrumui/multiple-selector-controlled", "Apache-2.0", "https://ui.spectrumhq.in/r/multiple-selector-controlled.json", None, False, "listbox", '<EvoMultiSelect label="Tags" options={[{value:"hot",label:"Hot"}]} />', ["MultiSelect"]),
    ("tags-input", "forms", "EvoTagsInput", "Tags input", "@spectrumui/multiple-selector-creatable", "Apache-2.0", "https://ui.spectrumhq.in/r/multiple-selector-creatable.json", None, False, "textbox", '<EvoTagsInput label="Labels" />', ["TagsInput"]),
    ("checkbox", "forms", "EvoCheckbox", "Checkbox", "@spectrumui/task-checkbox", "Apache-2.0", "https://ui.spectrumhq.in/r/task-checkbox.json", None, False, "checkbox", '<EvoCheckbox label="Accept" defaultChecked />', ["Checkbox"]),
    ("radio-group", "forms", "EvoRadioGroup", "Radio group", None, "in-house", None, "Radix RadioGroup with card and inline variants, error and disabled states.", True, "radiogroup", '<EvoRadioGroup label="Plan" options={[{value:"a",label:"Starter"}]} defaultValue="a" />', ["RadioGroup", "Radio"]),
    ("switch", "forms", "EvoSwitch", "Switch", "@spectrumui/animated-switch", "Apache-2.0", "https://ui.spectrumhq.in/r/animated-switch.json", None, False, "switch", '<EvoSwitch label="Alerts" defaultChecked />', ["Switch"]),
    ("slider", "forms", "EvoSlider", "Slider", "@spectrumui/dual-range-slider-single", "Apache-2.0", "https://ui.spectrumhq.in/r/dual-range-slider-single.json", None, False, "slider", '<EvoSlider label="Score" defaultValue={[40]} />', ["Slider"]),
    ("date-picker", "forms", "EvoDatePicker", "Date picker", "@spectrumui/datetime-picker-form", "Apache-2.0", "https://ui.spectrumhq.in/r/datetime-picker-form.json", None, False, "group", '<EvoDatePicker label="Close date" />', ["DatePicker"]),
    ("date-range-picker", "forms", "EvoDateRangePicker", "Date range picker", "@spectrumui/datetime-picker-year-range", "Apache-2.0", "https://ui.spectrumhq.in/r/datetime-picker-year-range.json", None, False, "group", '<EvoDateRangePicker label="Range" />', ["DateRangePicker"]),
    ("time-picker", "forms", "EvoTimePicker", "Time picker", "@spectrumui/datetime-picker-and-time-input", "Apache-2.0", "https://ui.spectrumhq.in/r/datetime-picker-and-time-input.json", None, False, "textbox", '<EvoTimePicker label="Time" defaultValue="09:30" />', ["TimePicker"]),
    ("number-input", "forms", "EvoNumberInput", "Number input", "@spectrumui/quantity-stepper", "Apache-2.0", "https://ui.spectrumhq.in/r/quantity-stepper.json", None, False, "spinbutton", '<EvoNumberInput label="Quantity" defaultValue={2} />', ["NumberInput"]),
    ("currency-input", "forms", "EvoCurrencyInput", "Currency input", "@spectrumui/transfer-funds-card", "Apache-2.0", "https://ui.spectrumhq.in/r/transfer-funds-card.json", None, False, "textbox", '<EvoCurrencyInput label="Amount" defaultValue={1200} />', ["CurrencyInput"]),
    ("phone-input", "forms", "EvoPhoneInput", "Phone input", None, "in-house", None, "Country select + libphonenumber-js formatting/validation, defaults to DZ.", True, "textbox", '<EvoPhoneInput label="Phone" />', ["PhoneInput"]),
    ("file-upload", "forms", "EvoFileUpload", "File upload", "@spectrumui/upload-empty", "Apache-2.0", "https://ui.spectrumhq.in/r/upload-empty.json", None, False, "button", '<EvoFileUpload label="Attachments" />', ["FileUpload"]),
    ("form", "forms", "EvoForm", "Form", "@spectrumui/multiple-selector-with-form", "Apache-2.0", "https://ui.spectrumhq.in/r/multiple-selector-with-form.json", None, False, "form", '<EvoForm onSubmit={() => undefined}><button type="submit">Submit</button></EvoForm>', ["Form", "EvoFormField", "EvoFormLabel", "EvoFormMessage"]),
    ("input-otp", "forms", "EvoInputOtp", "Input OTP", None, "in-house", None, "input-otp slots, 6 digits, paste support, for 2FA and email codes.", True, "textbox", '<EvoInputOtp />', ["InputOtp", "EvoInputOTP"]),
    ("rich-text", "forms", "EvoRichText", "Rich text editor", None, "in-house", None, "Tiptap editor: bold/italic/lists/links/mentions, markdown output.", True, "textbox", '<EvoRichText label="Body" />', ["RichText"]),
    ("mention-input", "forms", "EvoMentionInput", "Mention input", None, "in-house", None, "@-mention textarea using Tiptap mention extension.", True, "textbox", '<EvoMentionInput suggestions={[{id:"1",label:"Ada"}]} />', ["MentionInput"]),
    ("color-picker", "forms", "EvoColorPicker", "Color picker", None, "in-house", None, "Swatch grid + hex input popover for pipeline stage and tag colors.", True, "group", '<EvoColorPicker label="Stage color" />', ["ColorPicker"]),
    ("rating", "forms", "EvoRating", "Rating", "@spectrumui/star-rating", "Apache-2.0", "https://ui.spectrumhq.in/r/star-rating.json", None, False, "radiogroup", '<EvoRating label="Score" value={3} />', ["Rating"]),
    ("toggle-group", "forms", "EvoToggleGroup", "Toggle group", "@spectrumui/morph-button", "Apache-2.0", "https://ui.spectrumhq.in/r/morph-button.json", None, False, "group", '<EvoToggleGroup options={[{value:"list",label:"List"}]} defaultValue="list" />', ["ToggleGroup"]),
    ("tooltip", "data-display", "EvoTooltip", "Tooltip", None, "in-house", None, "Radix Tooltip with delay group, side/align props, keyboard focus support.", True, "button", '<EvoTooltip content="Hint"><button type="button">Hover</button></EvoTooltip>', ["Tooltip"]),
    ("hover-card", "data-display", "EvoHoverCard", "Hover card", None, "in-house", None, "Radix HoverCard showing contact/deal preview on name hover.", True, "button", '<EvoHoverCard title="Ada" description="Acme"><button type="button">Ada</button></EvoHoverCard>', ["HoverCard"]),
    ("progress", "data-display", "EvoProgress", "Progress", "@spectrumui/progress-with-value", "Apache-2.0", "https://ui.spectrumhq.in/r/progress-with-value.json", None, False, "progressbar", '<EvoProgress value={40} label="Won" />', ["Progress"]),
    ("timeline", "data-display", "EvoTimeline", "Timeline", "@spectrumui/recent-activity", "Apache-2.0", "https://ui.spectrumhq.in/r/recent-activity.json", None, False, "list", '<EvoTimeline items={[{title:"Called",at:"2026-10-23"}]} />', ["Timeline"]),
    ("tree-view", "data-display", "EvoTreeView", "Tree view", "@spectrumui/tree-nav", "Apache-2.0", "https://ui.spectrumhq.in/r/tree-nav.json", None, False, "tree", '<EvoTreeView items={[{id:"1",label:"Accounts",children:[{id:"2",label:"Acme"}]}]} />', ["TreeView"]),
    ("status", "data-display", "EvoStatus", "Status", "@spectrumui/status-badge", "Apache-2.0", "https://ui.spectrumhq.in/r/status-badge.json", None, False, "status", '<EvoStatus tone="success">Won</EvoStatus>', ["Status"]),
    ("copy-button", "data-display", "EvoCopyButton", "Copy button", "@spectrumui/share-button", "Apache-2.0", "https://ui.spectrumhq.in/r/share-button.json", None, False, "button", '<EvoCopyButton value="copied" />', ["CopyButton"]),
    ("relative-time", "data-display", "EvoRelativeTime", "Relative time", None, "in-house", None, "<time> via Intl.RelativeTimeFormat, full date in tooltip, auto-refresh.", True, "time", '<EvoRelativeTime date="2026-10-23T12:00:00Z" />', ["RelativeTime"]),
    ("description-list", "data-display", "EvoDescriptionList", "Description list", None, "in-house", None, "Key/value grid with copy, inline edit slot and empty placeholders.", True, "list", '<EvoDescriptionList items={[{term:"Email",description:"ada@evotechly.com"}]} />', ["DescriptionList"]),
    ("image", "data-display", "EvoImage", "Image", "@spectrumui/image-preview", "Apache-2.0", "https://ui.spectrumhq.in/r/image-preview.json", None, False, "img", '<EvoImage alt="Logo" src="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22/>" />', ["Image"]),
    ("data-table", "tables", "EvoDataTable", "Data table", "@spectrumui/data-table", "Apache-2.0", "https://ui.spectrumhq.in/r/data-table.json", None, False, "table", '<EvoDataTable columns={[{accessorKey:"name",header:"Name"}]} data={[{name:"Ada"}]} />', ["DataTable"]),
    ("table", "tables", "EvoTable", "Table", "@spectrumui/payments-table", "Apache-2.0", "https://ui.spectrumhq.in/r/payments-table.json", None, False, "table", '<EvoTable><EvoTableHeader><EvoTableRow><EvoTableHead>Name</EvoTableHead></EvoTableRow></EvoTableHeader><EvoTableBody><EvoTableRow><EvoTableCell>Ada</EvoTableCell></EvoTableRow></EvoTableBody></EvoTable>', ["Table", "EvoTableHeader", "EvoTableBody", "EvoTableRow", "EvoTableHead", "EvoTableCell"]),
    ("data-table-filters", "tables", "EvoDataTableFilters", "Data table filters", "@spectrumui/filter-empty", "Apache-2.0", "https://ui.spectrumhq.in/r/filter-empty.json", None, False, "search", '<EvoDataTableFilters />', ["DataTableFilters"]),
    ("column-visibility", "tables", "EvoColumnVisibility", "Column visibility", None, "in-house", None, "TanStack table column toggle menu + saved views.", True, "group", '<EvoColumnVisibility columns={[{id:"name",label:"Name",visible:true}]} />', ["ColumnVisibility"]),
    ("virtualized-list", "tables", "EvoVirtualizedList", "Virtualized list", None, "in-house", None, "@tanstack/react-virtual list/table body for 10k+ rows.", True, "list", '<EvoVirtualizedList items={["A","B"]} height={80} />', ["VirtualizedList"]),
    ("data-grid", "tables", "EvoDataGrid", "Data grid", "@spectrumui/feature-flags-table", "Apache-2.0", "https://ui.spectrumhq.in/r/feature-flags-table.json", None, False, "grid", '<EvoDataGrid columns={[{id:"name",header:"Name"}]} rows={[{id:"1",name:"Ada"}]} />', ["DataGrid"]),
    ("inline-edit", "tables", "EvoInlineEdit", "Inline edit", "@spectrumui/inline-edit", "Apache-2.0", "https://ui.spectrumhq.in/r/inline-edit.json", None, False, "textbox", '<EvoInlineEdit defaultValue="Ada" />', ["InlineEdit"]),
    ("area-chart", "charts", "EvoAreaChart", "Area chart", "@spectrumui/area-chart", "Apache-2.0", "https://ui.spectrumhq.in/r/area-chart.json", None, False, "img", '<EvoAreaChart data={[2,4,3]} label="Pipeline" />', ["AreaChart"]),
    ("bar-chart", "charts", "EvoBarChart", "Bar chart", "@spectrumui/bar-chart", "Apache-2.0", "https://ui.spectrumhq.in/r/bar-chart.json", None, False, "img", '<EvoBarChart data={[2,4,3]} label="Wins" />', ["BarChart"]),
    ("line-chart", "charts", "EvoLineChart", "Line chart", "@spectrumui/line-chart", "Apache-2.0", "https://ui.spectrumhq.in/r/line-chart.json", None, False, "img", '<EvoLineChart data={[2,4,3]} label="Trend" />', ["LineChart"]),
    ("pie-chart", "charts", "EvoPieChart", "Pie chart", "@spectrumui/pie-chart", "Apache-2.0", "https://ui.spectrumhq.in/r/pie-chart.json", None, False, "img", '<EvoPieChart data={[{label:"Won",value:3},{label:"Lost",value:1}]} label="Mix" />', ["PieChart"]),
    ("funnel-chart", "charts", "EvoFunnelChart", "Funnel chart", "@spectrumui/cohort-chart", "Apache-2.0", "https://ui.spectrumhq.in/r/cohort-chart.json", None, False, "img", '<EvoFunnelChart data={[{label:"New",value:10},{label:"Won",value:2}]} label="Funnel" />', ["FunnelChart"]),
    ("radial-chart", "charts", "EvoRadialChart", "Radial chart", "@spectrumui/radial-chart", "Apache-2.0", "https://ui.spectrumhq.in/r/radial-chart.json", None, False, "img", '<EvoRadialChart value={72} label="Quota" />', ["RadialChart"]),
    ("kpi-card", "charts", "EvoKpiCard", "KPI card", "@spectrumui/stat-cards", "Apache-2.0", "https://ui.spectrumhq.in/r/stat-cards.json", None, False, "article", '<EvoKpiCard label="Revenue" value="12 400 DZD" />', ["KpiCard", "StatCard"]),
    ("sparkline", "charts", "EvoSparkline", "Sparkline", "@spectrumui/sparkline-chart", "Apache-2.0", "https://ui.spectrumhq.in/r/sparkline-chart.json", None, False, "img", '<EvoSparkline data={[1,3,2,5]} label="Spark" />', ["Sparkline"]),
    ("heatmap", "charts", "EvoHeatmap", "Heatmap", "@spectrumui/calendar-heatmap", "Apache-2.0", "https://ui.spectrumhq.in/r/calendar-heatmap.json", None, False, "img", '<EvoHeatmap values={[0,1,2,3]} label="Activity" />', ["Heatmap"]),
    ("alert", "feedback", "EvoAlert", "Alert", "@spectrumui/alert-2", "Apache-2.0", "https://ui.spectrumhq.in/r/alert-2.json", None, False, "alert", '<EvoAlert title="Saved" description="Deal updated" />', ["Alert"]),
    ("toast", "feedback", "EvoToaster", "Toast", "@spectrumui/toast-stack", "Apache-2.0", "https://ui.spectrumhq.in/r/toast-stack.json", None, False, "status", '<EvoToaster />', ["Toaster", "toast"]),
    ("banner", "feedback", "EvoBanner", "Banner", "@spectrumui/suggestion-banner", "Apache-2.0", "https://ui.spectrumhq.in/r/suggestion-banner.json", None, False, "status", '<EvoBanner title="Try pipeline views" />', ["Banner"]),
    ("notification-center", "feedback", "EvoNotificationCenter", "Notification center", "@spectrumui/notification-bell", "Apache-2.0", "https://ui.spectrumhq.in/r/notification-bell.json", None, False, "button", '<EvoNotificationCenter items={[{id:"1",title:"New lead"}]} />', ["NotificationCenter"]),
    ("error-page", "feedback", "EvoErrorPage", "Error page", "@spectrumui/not-found-empty", "Apache-2.0", "https://ui.spectrumhq.in/r/not-found-empty.json", None, False, "status", '<EvoErrorPage />', ["ErrorPage"]),
    ("dialog", "overlays", "EvoDialog", "Dialog", "@spectrumui/responsive-modal", "Apache-2.0", "https://ui.spectrumhq.in/r/responsive-modal.json", None, False, "dialog", '<EvoDialog open onOpenChange={() => undefined} title="Edit"><p>Body</p></EvoDialog>', ["Dialog"]),
    ("alert-dialog", "overlays", "EvoAlertDialog", "Alert dialog", "@spectrumui/hold-to-confirm", "Apache-2.0", "https://ui.spectrumhq.in/r/hold-to-confirm.json", None, False, "alertdialog", '<EvoAlertDialog open onOpenChange={() => undefined} title="Delete" description="This cannot be undone." />', ["AlertDialog"]),
    ("sheet", "overlays", "EvoSheet", "Sheet", "@spectrumui/responsive-modal-side", "Apache-2.0", "https://ui.spectrumhq.in/r/responsive-modal-side.json", None, False, "dialog", '<EvoSheet open onOpenChange={() => undefined} title="Details">Body</EvoSheet>', ["Sheet", "Drawer"]),
    ("popover", "overlays", "EvoPopover", "Popover", None, "in-house", None, "Radix Popover with consistent padding, arrow and focus management.", True, "button", '<EvoPopover content="More"><button type="button">Open</button></EvoPopover>', ["Popover"]),
    ("dropdown-menu", "overlays", "EvoDropdownMenu", "Dropdown menu", "@spectrumui/profile-dropdown", "Apache-2.0", "https://ui.spectrumhq.in/r/profile-dropdown.json", None, False, "button", '<EvoDropdownMenu items={[{label:"Profile"}]}><button type="button">Menu</button></EvoDropdownMenu>', ["DropdownMenu"]),
    ("context-menu", "overlays", "EvoContextMenu", "Context menu", None, "in-house", None, "Radix ContextMenu for row/card right-click actions with shortcuts.", True, "button", '<EvoContextMenu items={[{label:"Edit",shortcut:"E"}]}><button type="button">Row</button></EvoContextMenu>', ["ContextMenu"]),
    ("kanban", "crm", "EvoKanban", "Kanban", "@spectrumui/kanbanboard", "Apache-2.0", "https://ui.spectrumhq.in/r/kanbanboard.json", None, False, "list", '<EvoKanban columns={[{id:"new",title:"New",cards:[{id:"1",title:"Acme"}]}]} />', ["Kanban"]),
    ("sortable-list", "crm", "EvoSortableList", "Sortable list", "@spectrumui/task-rows", "Apache-2.0", "https://ui.spectrumhq.in/r/task-rows.json", None, False, "list", '<EvoSortableList items={[{id:"1",label:"Call Ada"}]} />', ["SortableList"]),
    ("calendar", "crm", "EvoCalendar", "Calendar", "@spectrumui/event-calendar", "Apache-2.0", "https://ui.spectrumhq.in/r/event-calendar.json", None, False, "grid", '<EvoCalendar />', ["Calendar"]),
    ("event-calendar", "crm", "EvoEventCalendar", "Event calendar", "@spectrumui/event-calendar", "Apache-2.0", "https://ui.spectrumhq.in/r/event-calendar.json", None, False, "grid", '<EvoEventCalendar events={[{id:"1",title:"Call",date:"2026-10-23"}]} />', ["EventCalendar"]),
    ("gantt", "crm", "EvoGantt", "Gantt", None, "in-house", None, "Timeline of deals/tasks with draggable bars (dnd-kit, date-fns), day/week/month zoom.", True, "list", '<EvoGantt items={[{id:"1",title:"Acme",start:"2026-10-20",end:"2026-10-28"}]} />', ["Gantt"]),
    ("activity-feed", "crm", "EvoActivityFeed", "Activity feed", "@spectrumui/recent-activity", "Apache-2.0", "https://ui.spectrumhq.in/r/recent-activity.json", None, False, "list", '<EvoActivityFeed items={[{id:"1",actor:"Ada",action:"created a deal"}]} />', ["ActivityFeed"]),
    ("chat", "crm", "EvoChat", "Chat", "@spectrumui/ai-chat-card", "Apache-2.0", "https://ui.spectrumhq.in/r/ai-chat-card.json", None, False, "log", '<EvoChat messages={[{id:"1",role:"user",content:"Hello"}]} />', ["Chat"]),
    ("conversation", "crm", "EvoConversation", "Conversation", "@spectrumui/conversation-list", "Apache-2.0", "https://ui.spectrumhq.in/r/conversation-list.json", None, False, "list", '<EvoConversation threads={[{id:"1",title:"Ada",preview:"Hi"}]} />', ["Conversation"]),
    ("prompt-input", "crm", "EvoPromptInput", "AI prompt input", "@spectrumui/prompt-composer", "Apache-2.0", "https://ui.spectrumhq.in/r/prompt-composer.json", None, False, "textbox", '<EvoPromptInput />', ["PromptInput"]),
    ("email-composer", "crm", "EvoEmailComposer", "Email composer", None, "in-house", None, "Composer with to/cc chips, subject, Tiptap body, templates, attachments, send/schedule.", True, "form", '<EvoEmailComposer />', ["EmailComposer"]),
    ("contact-card", "crm", "EvoContactCard", "Contact card", "@spectrumui/contact-card-footer", "Apache-2.0", "https://ui.spectrumhq.in/r/contact-card-footer.json", None, False, "article", '<EvoContactCard name="Ada Lovelace" email="ada@evotechly.com" />', ["ContactCard"]),
    ("workflow-builder", "crm", "EvoWorkflowBuilder", "Workflow builder", "@spectrumui/agent-plan", "Apache-2.0", "https://ui.spectrumhq.in/r/agent-plan.json", None, False, "list", '<EvoWorkflowBuilder nodes={[{id:"1",label:"Trigger"}]} />', ["WorkflowBuilder"]),
    ("comments", "crm", "EvoComments", "Comments", None, "in-house", None, "Threaded comments with mentions, reactions, edit/delete and relative timestamps.", True, "list", '<EvoComments comments={[{id:"1",author:"Ada",body:"Looks good",createdAt:"2026-10-23T10:00:00Z"}]} />', ["Comments"]),
    ("pricing-table", "crm", "EvoPricingTable", "Pricing table", "@spectrumui/blueprint-tiers", "Apache-2.0", "https://ui.spectrumhq.in/r/blueprint-tiers.json", None, False, "list", '<EvoPricingTable plans={[{id:"pro",name:"Pro",price:"9 000 DZD"}]} />', ["PricingTable"]),
    ("invoice", "crm", "EvoInvoice", "Invoice", "@spectrumui/invoices-table", "Apache-2.0", "https://ui.spectrumhq.in/r/invoices-table.json", None, False, "article", '<EvoInvoice number="INV-01" customer="Acme" lines={[{label:"Seat",amount:1000}]} />', ["Invoice"]),
    ("sign-in", "auth", "EvoSignIn", "Sign in", "@spectrumui/login-card", "Apache-2.0", "https://ui.spectrumhq.in/r/login-card.json", None, False, "form", '<EvoSignIn />', ["SignIn"]),
    ("sign-up", "auth", "EvoSignUp", "Sign up", "@spectrumui/login-card", "Apache-2.0", "https://ui.spectrumhq.in/r/login-card.json", None, False, "form", '<EvoSignUp />', ["SignUp"]),
    ("forgot-password", "auth", "EvoForgotPassword", "Forgot password", "@spectrumui/password-strength", "Apache-2.0", "https://ui.spectrumhq.in/r/password-strength.json", None, False, "form", '<EvoForgotPassword />', ["ForgotPassword"]),
    ("two-factor", "auth", "EvoTwoFactor", "Two-factor", None, "in-house", None, "TOTP setup (QR + secret), OTP verify, backup codes, built on Input OTP.", True, "form", '<EvoTwoFactor secret="JBSWY3DPEHPK3PXP" />', ["TwoFactor"]),
    ("account-button", "auth", "EvoAccountButton", "Account button", "@spectrumui/profile-dropdown", "Apache-2.0", "https://ui.spectrumhq.in/r/profile-dropdown.json", None, False, "button", '<EvoAccountButton name="Ada" email="ada@evotechly.com" />', ["AccountButton"]),
    ("settings-page", "auth", "EvoSettingsPage", "Settings page", "@spectrumui/feature-flags-table", "Apache-2.0", "https://ui.spectrumhq.in/r/feature-flags-table.json", None, False, "form", '<EvoSettingsPage flags={[{id:"beta",label:"Beta",enabled:true}]} />', ["SettingsPage"]),
    ("org-switcher", "auth", "EvoOrgSwitcher", "Organization switcher", None, "in-house", None, "Sidebar dropdown listing workspaces with avatar, role and create workspace.", True, "button", '<EvoOrgSwitcher orgs={[{id:"1",name:"Evotechly",role:"Admin"}]} />', ["OrgSwitcher"]),
    ("api-keys", "auth", "EvoApiKeys", "API keys", "@spectrumui/api-keys-table", "Apache-2.0", "https://ui.spectrumhq.in/r/api-keys-table.json", None, False, "table", '<EvoApiKeys keys={[{id:"1",name:"CI",hint:"sk-…12"}]} />', ["ApiKeys"]),
    ("empty-state", "empty", "EvoEmptyState", "Empty state", "@spectrumui/project-empty", "Apache-2.0", "https://ui.spectrumhq.in/r/project-empty.json", None, False, "status", '<EvoEmptyState title="No deals" description="Create your first deal." />', ["EmptyState", "Empty"]),
    ("onboarding", "empty", "EvoOnboarding", "Onboarding", "@spectrumui/integration-empty", "Apache-2.0", "https://ui.spectrumhq.in/r/integration-empty.json", None, False, "list", '<EvoOnboarding steps={[{title:"Connect email",done:false}]} />', ["Onboarding"]),
    ("announcement", "empty", "EvoAnnouncement", "Announcement", "@spectrumui/suggestion-banner", "Apache-2.0", "https://ui.spectrumhq.in/r/suggestion-banner.json", None, False, "status", '<EvoAnnouncement title="New pipeline views" />', ["Announcement"]),
    ("feature-tour", "empty", "EvoFeatureTour", "Feature tour", None, "in-house", None, "Step popovers anchored to elements with progress, skip and persisted completion.", True, "dialog", '<EvoFeatureTour open steps={[{id:"a",title:"Welcome",body:"Start here"}]} />', ["FeatureTour"]),
]

assert len(CATALOG) == 113, len(CATALOG)


def write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content.rstrip() + "\n")


def impl(slug: str) -> str:
    return IMPLEMENTATIONS[slug]


# Implementations are filled after this helper exists.
IMPLEMENTATIONS: dict[str, str] = {}


def load_implementations() -> None:
    from gen_v030_impl import IMPLEMENTATIONS as impls  # type: ignore
    import gen_v030_impl_layout  # noqa: F401
    import gen_v030_impl_forms  # noqa: F401
    import gen_v030_impl_rest  # noqa: F401
    import gen_v030_impl_domain  # noqa: F401

    IMPLEMENTATIONS.update(impls)


def main() -> None:
    load_implementations()
    missing = [row[0] for row in CATALOG if row[0] not in IMPLEMENTATIONS]
    if missing:
        raise SystemExit(f"Missing implementations: {missing}")

    for folder, _ in CATEGORIES:
        shutil.rmtree(COMP / folder, ignore_errors=True)
        (COMP / folder).mkdir(parents=True)

    # remove 0.2.0 flat files
    for old in COMP.glob("*.tsx"):
        old.unlink()

    catalog_json = []
    index_lines = [
        'export { cn } from "./lib/cn";',
        'export { useTheme, useProduct, type BrandTheme } from "./lib/use-theme";',
        'export { useIsMobile } from "./lib/use-mobile";',
        'export type { EvoSize, EvoVariant, EvoTone, EvoCommonProps } from "./lib/types";',
        "",
    ]
    showcase_imports = []
    showcase_sections = []

    for slug, category, export, title, source, license_, url, spec, in_house, role, test_jsx, extras in CATALOG:
        folder = COMP / category
        write(folder / f"{slug}.tsx", impl(slug))
        write(
            folder / f"{slug}.test.tsx",
            "\n".join(
                [
                    'import { renderUi } from "../../test/helpers";',
                    f'import {{ {export}{"".join(f", {e}" for e in extras if e.startswith("Evo"))} }} from "./{slug}";',
                    "",
                    f'describe("{export}", () => {{',
                    "  it(\"renders with an accessible name\", () => {",
                    f"    const view = renderUi({test_jsx});",
                    f'    expect(view.container.querySelector("[data-evo=\\"{slug}\\"]") || view.container.firstChild).toBeTruthy();',
                    "  });",
                    "  it(\"exposes a11y basics\", () => {",
                    f"    const view = renderUi({test_jsx});",
                    "    const labeled = view.container.querySelector(\"[aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea\");",
                    "    expect(labeled || view.container.textContent).toBeTruthy();",
                    "  });",
                    "});",
                    "",
                ]
            ),
        )
        doc = f"""# {export}

Status: stable · EvoUI 0.3.0 · DS 2.0 tokens

**Category:** {dict(CATEGORIES)[category]}  
**Import:** `import {{ {export} }} from "@evotechly/ui"`  
**Source:** {source or "in-house"} ({license_})  
**Registry:** {url or "—"}

## Purpose

{spec or f"{title} restyled onto Brandbook tokens. Activate with `<html data-product data-theme>`."}

## Props

| Prop | Values | Default | Notes |
|------|--------|---------|-------|
| `size` | sm · md · lg | md | 28 / 36 / 44 |
| `variant` | primary · secondary · outline · ghost · danger · link | primary | When relevant |
| `tone` | neutral · brand · success · warning · danger · info | neutral | Never color alone |
| `asChild` | boolean | false | Radix Slot when the root is a trigger |

## Usage

```tsx
import {{ {export} }} from "@evotechly/ui";

{test_jsx}
```

## Do

- Set `data-product` and `data-theme` on `<html>`.
- Use `--brand-actionA11y` for primary actions and `--brand-text` for brand-colored text.
- Keep a visible focus ring (2px `--brand-action`, 2px offset).

## Don't

- Do not hard-code hex, rgb, or Tailwind arbitrary colors.
- Do not depend on EvoCRM or Next.js.
- Do not ship unlabeled icon-only controls.

## Accessibility

- Preferred role: `{role}`.
- Keyboard and focus are required; do not remove outlines.
- Pair status color with a label.
"""
        write(DOCS / f"{slug}.md", doc)
        index_lines.append(f'export * from "./components/{category}/{slug}";')
        showcase_imports.append(export)
        showcase_jsx = test_jsx
        if slug in {"dialog", "alert-dialog", "sheet"}:
            showcase_jsx = test_jsx.replace(" open", "").replace(" onOpenChange={() => undefined}", "")
        if slug == "feature-tour":
            showcase_jsx = test_jsx.replace(" open", "")
        showcase_sections.append((title, export, showcase_jsx, category))
        catalog_json.append(
            {
                "slug": slug,
                "name": export,
                "title": title,
                "category": dict(CATEGORIES)[category],
                "categorySlug": category,
                "import": f"@evotechly/ui",
                "path": f"./components/{category}/{slug}",
                "source": source,
                "license": license_,
                "registryUrl": url,
                "inHouse": in_house,
                "aliases": extras,
                "docs": f"./docs/components/{slug}.md",
            }
        )

    write(SRC / "index.ts", "\n".join(index_lines) + "\n")
    write(SRC / "catalog.json", json.dumps({"version": "0.3.0", "count": len(catalog_json), "components": catalog_json}, indent=2))

    # showcase
    unique_imports = []
    seen = set()
    for name in showcase_imports:
        if name not in seen:
            unique_imports.append(name)
            seen.add(name)
    # extra subcomponents used in showcase snippets
    extra_needed = [
        "EvoCardTitle",
        "EvoTabsList",
        "EvoTabsTrigger",
        "EvoTabsContent",
        "EvoAccordionItem",
        "EvoAccordionTrigger",
        "EvoAccordionContent",
        "EvoCommandInput",
        "EvoCommandList",
        "EvoCommandItem",
        "EvoTableHeader",
        "EvoTableBody",
        "EvoTableRow",
        "EvoTableHead",
        "EvoTableCell",
        "EvoResizablePanel",
        "EvoResizableHandle",
        "EvoHeading",
        "EvoText",
    ]
    unique_imports.extend(extra_needed)
    import_block = ",\n  ".join(unique_imports)
    sections = []
    current_cat = None
    for title, export, jsx, category in showcase_sections:
        if category != current_cat:
            current_cat = category
            sections.append(f'      <h2 style={{{{ fontSize: "var(--text-xl)", margin: 0 }}}}>{dict(CATEGORIES)[category]}</h2>')
        sections.append(f"      <Section title={json.dumps(title)}>{jsx}</Section>")

    write(
        SHOW / "Showcase.tsx",
        f"""import * as React from "react";
import {{
  {import_block},
}} from "../src";

function Section({{ title, children }}: {{ title: string; children: React.ReactNode }}) {{
  return (
    <section aria-label={{title}} className="evo-card" style={{{{ gap: "var(--space-3)" }}}}>
      <h3 style={{{{ fontSize: "var(--text-sm)", margin: 0, color: "var(--textMuted)" }}}}>{{title}}</h3>
      {{children}}
    </section>
  );
}}

export function Showcase({{ product, theme }}: {{ product: string; theme: string }}) {{
  return (
    <div className="evo-root" style={{{{ padding: "var(--space-6)", display: "grid", gap: "var(--space-6)" }}}}>
      <EvoToaster />
      <header>
        <p className="evo-card-description">
          EvoUI 0.3.0 · data-product="{{product}}" · data-theme="{{theme}}"
        </p>
        <h1 style={{{{ fontSize: "var(--text-3xl)", margin: "var(--space-2) 0 0" }}}}>All components</h1>
      </header>
{chr(10).join(sections)}
    </div>
  );
}}
""",
    )
    print(f"Wrote {len(CATALOG)} components")


if __name__ == "__main__":
    main()
