import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "../../lib/cn";

export function EvoAccordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-evo="accordion" {...props} />;
}
export function EvoAccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item className={cn("evo-accordion-item", className)} {...props} />;
}
export function EvoAccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger className={cn("evo-accordion-trigger", className)} {...props}>
        {children}
        <span aria-hidden>▾</span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}
export function EvoAccordionContent({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return <AccordionPrimitive.Content className={cn("evo-accordion-content", className)} {...props} />;
}

export const Accordion = EvoAccordion;
