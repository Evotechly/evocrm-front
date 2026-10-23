import * as React from "react";
import {
  EvoButton,
  EvoBadge,
  EvoAvatar,
  EvoAvatarGroup,
  EvoSeparator,
  EvoSkeleton,
  EvoKbd,
  EvoSpinner,
  EvoTypography,
  EvoIconButton,
  EvoSidebar,
  EvoAppShell,
  EvoResizable,
  EvoScrollArea,
  EvoCard,
  EvoPageHeader,
  EvoTabs,
  EvoAccordion,
  EvoCollapsible,
  EvoBreadcrumb,
  EvoCommand,
  EvoNavigationMenu,
  EvoMenubar,
  EvoPagination,
  EvoStepper,
  EvoInput,
  EvoTextarea,
  EvoSelect,
  EvoCombobox,
  EvoMultiSelect,
  EvoTagsInput,
  EvoCheckbox,
  EvoRadioGroup,
  EvoSwitch,
  EvoSlider,
  EvoDatePicker,
  EvoDateRangePicker,
  EvoTimePicker,
  EvoNumberInput,
  EvoCurrencyInput,
  EvoPhoneInput,
  EvoFileUpload,
  EvoForm,
  EvoInputOtp,
  EvoRichText,
  EvoMentionInput,
  EvoColorPicker,
  EvoRating,
  EvoToggleGroup,
  EvoTooltip,
  EvoHoverCard,
  EvoProgress,
  EvoTimeline,
  EvoTreeView,
  EvoStatus,
  EvoCopyButton,
  EvoRelativeTime,
  EvoDescriptionList,
  EvoImage,
  EvoDataTable,
  EvoTable,
  EvoDataTableFilters,
  EvoColumnVisibility,
  EvoVirtualizedList,
  EvoDataGrid,
  EvoInlineEdit,
  EvoAreaChart,
  EvoBarChart,
  EvoLineChart,
  EvoPieChart,
  EvoFunnelChart,
  EvoRadialChart,
  EvoKpiCard,
  EvoSparkline,
  EvoHeatmap,
  EvoAlert,
  EvoToaster,
  EvoBanner,
  EvoNotificationCenter,
  EvoErrorPage,
  EvoDialog,
  EvoAlertDialog,
  EvoSheet,
  EvoPopover,
  EvoDropdownMenu,
  EvoContextMenu,
  EvoKanban,
  EvoSortableList,
  EvoCalendar,
  EvoEventCalendar,
  EvoGantt,
  EvoActivityFeed,
  EvoChat,
  EvoConversation,
  EvoPromptInput,
  EvoEmailComposer,
  EvoContactCard,
  EvoWorkflowBuilder,
  EvoComments,
  EvoPricingTable,
  EvoInvoice,
  EvoSignIn,
  EvoSignUp,
  EvoForgotPassword,
  EvoTwoFactor,
  EvoAccountButton,
  EvoSettingsPage,
  EvoOrgSwitcher,
  EvoApiKeys,
  EvoEmptyState,
  EvoOnboarding,
  EvoAnnouncement,
  EvoFeatureTour,
  EvoCardTitle,
  EvoTabsList,
  EvoTabsTrigger,
  EvoTabsContent,
  EvoAccordionItem,
  EvoAccordionTrigger,
  EvoAccordionContent,
  EvoCommandInput,
  EvoCommandList,
  EvoCommandItem,
  EvoTableHeader,
  EvoTableBody,
  EvoTableRow,
  EvoTableHead,
  EvoTableCell,
  EvoResizablePanel,
  EvoResizableHandle,
  EvoHeading,
  EvoText,
} from "../src";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section aria-label={title} className="evo-card" style={{ gap: "var(--space-3)", alignItems: "flex-start" }}>
      <p style={{ fontSize: "var(--text-sm)", margin: 0, color: "var(--textMuted)", fontWeight: 500 }}>{title}</p>
      {children}
    </section>
  );
}

export function Showcase({ product, theme }: { product: string; theme: string }) {
  return (
    <main className="evo-root" style={{ padding: "var(--space-6)", display: "grid", gap: "var(--space-6)" }}>
      <EvoToaster />
      <header>
        <p className="evo-card-description">
          EvoUI 0.3.0 · data-product="{product}" · data-theme="{theme}"
        </p>
        <h1 style={{ fontSize: "var(--text-3xl)", margin: "var(--space-2) 0 0" }}>All components</h1>
      </header>
      <section aria-label="Foundations"><h2 style={{ fontSize: "var(--text-xl)", margin: 0 }}>Foundations</h2></section>
      <Section title="Button"><EvoButton>Save deal</EvoButton></Section>
      <Section title="Badge"><EvoBadge>New</EvoBadge></Section>
      <Section title="Avatar"><EvoAvatar fallback="AB" alt="Ada" /></Section>
      <Section title="Avatar group"><EvoAvatarGroup people={[{name:"Ada"},{name:"Ben"}]} /></Section>
      <Section title="Separator"><EvoSeparator /></Section>
      <Section title="Skeleton"><EvoSkeleton aria-label="Loading" /></Section>
      <Section title="Kbd"><EvoKbd>⌘K</EvoKbd></Section>
      <Section title="Spinner"><EvoSpinner aria-label="Loading" /></Section>
      <Section title="Typography"><EvoTypography><EvoHeading level={3}>Title</EvoHeading><EvoText>Body</EvoText></EvoTypography></Section>
      <Section title="Icon button"><EvoIconButton label="Close">×</EvoIconButton></Section>
      <section aria-label="Layout and shell"><h2 style={{ fontSize: "var(--text-xl)", margin: 0 }}>Layout & shell</h2></section>
      <Section title="Sidebar"><EvoSidebar title="Product nav" items={[{id:"a",label:"Home"}]} /></Section>
      <Section title="App shell"><EvoAppShell title="Workspace">Content</EvoAppShell></Section>
      <Section title="Resizable panels"><EvoResizable storageKey="demo"><EvoResizablePanel>A</EvoResizablePanel><EvoResizableHandle /><EvoResizablePanel>B</EvoResizablePanel></EvoResizable></Section>
      <Section title="Scroll area"><EvoScrollArea style={{height:80}}><p>Long</p></EvoScrollArea></Section>
      <Section title="Card"><EvoCard><EvoCardTitle>Deal</EvoCardTitle></EvoCard></Section>
      <Section title="Page header"><EvoPageHeader title="Accounts" description="All accounts" level={2} /></Section>
      <Section title="Tabs"><EvoTabs defaultValue="a"><EvoTabsList><EvoTabsTrigger value="a">One</EvoTabsTrigger></EvoTabsList><EvoTabsContent value="a">Panel</EvoTabsContent></EvoTabs></Section>
      <Section title="Accordion"><EvoAccordion type="single" defaultValue="a"><EvoAccordionItem value="a"><EvoAccordionTrigger>Item</EvoAccordionTrigger><EvoAccordionContent>Body</EvoAccordionContent></EvoAccordionItem></EvoAccordion></Section>
      <Section title="Collapsible"><EvoCollapsible title="More">Hidden</EvoCollapsible></Section>
      <section aria-label="Navigation"><h2 style={{ fontSize: "var(--text-xl)", margin: 0 }}>Navigation</h2></section>
      <Section title="Breadcrumb"><EvoBreadcrumb items={[{label:"Home",href:"/"},{label:"Deals"}]} /></Section>
      <Section title="Command palette"><EvoCommand><EvoCommandInput placeholder="Search" /><EvoCommandList><EvoCommandItem value="a">Open</EvoCommandItem></EvoCommandList></EvoCommand></Section>
      <Section title="Navigation menu"><EvoNavigationMenu items={[{label:"Deals",href:"/deals"}]} /></Section>
      <Section title="Menubar"><EvoMenubar items={[{label:"File",items:[{label:"New"}]}]} /></Section>
      <Section title="Pagination"><EvoPagination page={1} pageCount={5} total={40} /></Section>
      <Section title="Stepper"><EvoStepper steps={[{label:"Qualify"},{label:"Propose"}]} current={0} /></Section>
      <section aria-label="Forms and inputs"><h2 style={{ fontSize: "var(--text-xl)", margin: 0 }}>Forms & inputs</h2></section>
      <Section title="Input"><EvoInput label="Email" defaultValue="ada@evotechly.com" /></Section>
      <Section title="Textarea"><EvoTextarea label="Notes" defaultValue="Follow up" /></Section>
      <Section title="Select"><EvoSelect label="Stage" options={[{value:"new",label:"New"}]} defaultValue="new" /></Section>
      <Section title="Combobox"><EvoCombobox label="Account" options={[{value:"acme",label:"Acme"}]} /></Section>
      <Section title="Multi select"><EvoMultiSelect label="Tags" options={[{value:"hot",label:"Hot"}]} /></Section>
      <Section title="Tags input"><EvoTagsInput label="Labels" /></Section>
      <Section title="Checkbox"><EvoCheckbox label="Accept" defaultChecked /></Section>
      <Section title="Radio group"><EvoRadioGroup label="Plan" options={[{value:"a",label:"Starter"}]} defaultValue="a" /></Section>
      <Section title="Switch"><EvoSwitch label="Alerts" defaultChecked /></Section>
      <Section title="Slider"><EvoSlider label="Score" defaultValue={[40]} /></Section>
      <Section title="Date picker"><EvoDatePicker label="Close date" /></Section>
      <Section title="Date range picker"><EvoDateRangePicker label="Range" /></Section>
      <Section title="Time picker"><EvoTimePicker label="Time" defaultValue="09:30" /></Section>
      <Section title="Number input"><EvoNumberInput label="Quantity" defaultValue={2} /></Section>
      <Section title="Currency input"><EvoCurrencyInput label="Amount" defaultValue={1200} /></Section>
      <Section title="Phone input"><EvoPhoneInput label="Phone" /></Section>
      <Section title="File upload"><EvoFileUpload label="Attachments" /></Section>
      <Section title="Form"><EvoForm onSubmit={() => undefined}><button type="submit">Submit</button></EvoForm></Section>
      <Section title="Input OTP"><EvoInputOtp /></Section>
      <Section title="Rich text editor"><EvoRichText label="Body" /></Section>
      <Section title="Mention input"><EvoMentionInput suggestions={[{id:"1",label:"Ada"}]} /></Section>
      <Section title="Color picker"><EvoColorPicker label="Stage color" /></Section>
      <Section title="Rating"><EvoRating label="Score" value={3} /></Section>
      <Section title="Toggle group"><EvoToggleGroup options={[{value:"list",label:"List"}]} defaultValue="list" /></Section>
      <section aria-label="Data display"><h2 style={{ fontSize: "var(--text-xl)", margin: 0 }}>Data display</h2></section>
      <Section title="Tooltip"><EvoTooltip content="Hint"><button type="button">Hover</button></EvoTooltip></Section>
      <Section title="Hover card"><EvoHoverCard title="Ada" description="Acme"><button type="button">Ada</button></EvoHoverCard></Section>
      <Section title="Progress"><EvoProgress value={40} label="Won" /></Section>
      <Section title="Timeline"><EvoTimeline items={[{title:"Called",at:"2026-10-23"}]} /></Section>
      <Section title="Tree view"><EvoTreeView items={[{id:"1",label:"Accounts",children:[{id:"2",label:"Acme"}]}]} /></Section>
      <Section title="Status"><EvoStatus tone="success">Won</EvoStatus></Section>
      <Section title="Copy button"><EvoCopyButton value="copied" /></Section>
      <Section title="Relative time"><EvoRelativeTime date="2026-10-23T12:00:00Z" /></Section>
      <Section title="Description list"><EvoDescriptionList items={[{term:"Email",description:"ada@evotechly.com"}]} /></Section>
      <Section title="Image"><EvoImage alt="Logo" src="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22/>" /></Section>
      <section aria-label="Tables"><h2 style={{ fontSize: "var(--text-xl)", margin: 0 }}>Tables</h2></section>
      <Section title="Data table"><EvoDataTable columns={[{accessorKey:"name",header:"Name"}]} data={[{name:"Ada"}]} /></Section>
      <Section title="Table"><EvoTable><EvoTableHeader><EvoTableRow><EvoTableHead>Name</EvoTableHead></EvoTableRow></EvoTableHeader><EvoTableBody><EvoTableRow><EvoTableCell>Ada</EvoTableCell></EvoTableRow></EvoTableBody></EvoTable></Section>
      <Section title="Data table filters"><EvoDataTableFilters /></Section>
      <Section title="Column visibility"><EvoColumnVisibility columns={[{id:"name",label:"Name",visible:true}]} /></Section>
      <Section title="Virtualized list"><EvoVirtualizedList items={["A","B"]} height={80} /></Section>
      <Section title="Data grid"><EvoDataGrid columns={[{id:"name",header:"Name"}]} rows={[{id:"1",name:"Ada"}]} /></Section>
      <Section title="Inline edit"><EvoInlineEdit defaultValue="Ada" /></Section>
      <section aria-label="Charts and KPIs"><h2 style={{ fontSize: "var(--text-xl)", margin: 0 }}>Charts & KPIs</h2></section>
      <Section title="Area chart"><EvoAreaChart data={[2,4,3]} label="Pipeline" /></Section>
      <Section title="Bar chart"><EvoBarChart data={[2,4,3]} label="Wins" /></Section>
      <Section title="Line chart"><EvoLineChart data={[2,4,3]} label="Trend" /></Section>
      <Section title="Pie chart"><EvoPieChart data={[{label:"Won",value:3},{label:"Lost",value:1}]} label="Mix" /></Section>
      <Section title="Funnel chart"><EvoFunnelChart data={[{label:"New",value:10},{label:"Won",value:2}]} label="Funnel" /></Section>
      <Section title="Radial chart"><EvoRadialChart value={72} label="Quota" /></Section>
      <Section title="KPI card"><EvoKpiCard label="Revenue" value="12 400 DZD" /></Section>
      <Section title="Sparkline"><EvoSparkline data={[1,3,2,5]} label="Spark" /></Section>
      <Section title="Heatmap"><EvoHeatmap values={[0,1,2,3]} label="Activity" /></Section>
      <section aria-label="Feedback"><h2 style={{ fontSize: "var(--text-xl)", margin: 0 }}>Feedback</h2></section>
      <Section title="Alert"><EvoAlert title="Saved" description="Deal updated" /></Section>
      <Section title="Toast"><p className="evo-card-description">Toaster is mounted once at the page root.</p></Section>
      <Section title="Banner"><EvoBanner title="Try pipeline views" /></Section>
      <Section title="Notification center"><EvoNotificationCenter items={[{id:"1",title:"New lead"}]} /></Section>
      <Section title="Error page"><EvoErrorPage /></Section>
      <section aria-label="Overlays"><h2 style={{ fontSize: "var(--text-xl)", margin: 0 }}>Overlays</h2></section>
      <Section title="Dialog"><EvoDialog title="Edit" trigger={<EvoButton variant="outline">Open dialog</EvoButton>}><p>Body</p></EvoDialog></Section>
      <Section title="Alert dialog"><EvoAlertDialog title="Delete" description="This cannot be undone." trigger={<EvoButton variant="outline">Open alert</EvoButton>} /></Section>
      <Section title="Sheet"><EvoSheet title="Details" trigger={<EvoButton variant="outline">Open sheet</EvoButton>}>Body</EvoSheet></Section>
      <Section title="Popover"><EvoPopover content="More"><button type="button">Open</button></EvoPopover></Section>
      <Section title="Dropdown menu"><EvoDropdownMenu items={[{label:"Profile"}]}><button type="button">Menu</button></EvoDropdownMenu></Section>
      <Section title="Context menu"><EvoContextMenu items={[{label:"Edit",shortcut:"E"}]}><button type="button">Row</button></EvoContextMenu></Section>
      <section aria-label="CRM domain"><h2 style={{ fontSize: "var(--text-xl)", margin: 0 }}>CRM domain</h2></section>
      <Section title="Kanban"><EvoKanban columns={[{id:"new",title:"New",cards:[{id:"1",title:"Acme"}]}]} /></Section>
      <Section title="Sortable list"><EvoSortableList items={[{id:"1",label:"Call Ada"}]} /></Section>
      <Section title="Calendar"><EvoCalendar /></Section>
      <Section title="Event calendar"><EvoEventCalendar events={[{id:"1",title:"Call",date:"2026-10-23"}]} /></Section>
      <Section title="Gantt"><EvoGantt items={[{id:"1",title:"Acme",start:"2026-10-20",end:"2026-10-28"}]} /></Section>
      <Section title="Activity feed"><EvoActivityFeed items={[{id:"1",actor:"Ada",action:"created a deal"}]} /></Section>
      <Section title="Chat"><EvoChat messages={[{id:"1",role:"user",content:"Hello"}]} /></Section>
      <Section title="Conversation"><EvoConversation threads={[{id:"1",title:"Ada",preview:"Hi"}]} /></Section>
      <Section title="AI prompt input"><EvoPromptInput /></Section>
      <Section title="Email composer"><EvoEmailComposer /></Section>
      <Section title="Contact card"><EvoContactCard name="Ada Lovelace" email="ada@evotechly.com" /></Section>
      <Section title="Workflow builder"><EvoWorkflowBuilder nodes={[{id:"1",label:"Trigger"}]} /></Section>
      <Section title="Comments"><EvoComments comments={[{id:"1",author:"Ada",body:"Looks good",createdAt:"2026-10-23T10:00:00Z"}]} /></Section>
      <Section title="Pricing table"><EvoPricingTable plans={[{id:"pro",name:"Pro",price:"9 000 DZD"}]} /></Section>
      <Section title="Invoice"><EvoInvoice number="INV-01" customer="Acme" lines={[{label:"Seat",amount:1000}]} /></Section>
      <section aria-label="Auth and settings"><h2 style={{ fontSize: "var(--text-xl)", margin: 0 }}>Auth & settings</h2></section>
      <Section title="Sign in"><EvoSignIn /></Section>
      <Section title="Sign up"><EvoSignUp /></Section>
      <Section title="Forgot password"><EvoForgotPassword /></Section>
      <Section title="Two-factor"><EvoTwoFactor secret="JBSWY3DPEHPK3PXP" /></Section>
      <Section title="Account button"><EvoAccountButton name="Ada" email="ada@evotechly.com" /></Section>
      <Section title="Settings page"><EvoSettingsPage flags={[{id:"beta",label:"Beta",enabled:true}]} /></Section>
      <Section title="Organization switcher"><EvoOrgSwitcher orgs={[{id:"1",name:"Evotechly",role:"Admin"}]} /></Section>
      <Section title="API keys"><EvoApiKeys keys={[{id:"1",name:"CI",hint:"sk-…12"}]} /></Section>
      <section aria-label="Empty and onboarding"><h2 style={{ fontSize: "var(--text-xl)", margin: 0 }}>Empty & onboarding</h2></section>
      <Section title="Empty state"><EvoEmptyState title="No deals" description="Create your first deal." /></Section>
      <Section title="Onboarding"><EvoOnboarding steps={[{title:"Connect email",done:false}]} /></Section>
      <Section title="Announcement"><EvoAnnouncement title="New pipeline views" /></Section>
      <Section title="Feature tour"><EvoFeatureTour steps={[{id:"a",title:"Welcome",body:"Start here"}]} /></Section>
    </main>
  );
}
