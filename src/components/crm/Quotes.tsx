import type { LineItem } from '@/app/providers/CrmProvider';
import { Input } from '@/components/forms/Fields';
import { Button } from '@/components/ui';
import { formatDzd } from '@/lib/format';
import { lineTotal, quoteTotal } from '@/lib/quotes';
export function QuoteLineItem({
  item,
  index,
  onChange,
  onRemove,
  disabled,
}: {
  item: LineItem;
  index: number;
  onChange: (item: LineItem) => void;
  onRemove: () => void;
  disabled?: boolean;
}) {
  return (
    <fieldset className="quote-line">
      <legend>Ligne {index + 1}</legend>
      <Input
        label={`Description ${index + 1}`}
        required
        value={item.description}
        disabled={disabled}
        onChange={(e) => onChange({ ...item, description: e.target.value })}
      />
      <div className="form-grid">
        <Input
          label={`Quantité ${index + 1}`}
          required
          type="number"
          min="0.01"
          max="100000"
          step="0.01"
          value={item.quantity}
          disabled={disabled}
          onChange={(e) => onChange({ ...item, quantity: Number(e.target.value) })}
        />
        <Input
          label={`Prix unitaire ${index + 1} (DA)`}
          required
          type="number"
          min="0"
          max="1000000000"
          step="0.01"
          value={item.unitPrice}
          disabled={disabled}
          onChange={(e) => onChange({ ...item, unitPrice: Number(e.target.value) })}
        />
      </div>
      <div className="inline spread">
        <strong className="money">{formatDzd(lineTotal(item))}</strong>
        <Button
          variant="ghost"
          disabled={disabled}
          onClick={onRemove}
          aria-label={`Supprimer la ligne ${index + 1}`}
        >
          Supprimer
        </Button>
      </div>
    </fieldset>
  );
}
export function QuoteSummary({ items }: { items: LineItem[] }) {
  return (
    <div className="quote-summary">
      <span>Total du devis</span>
      <strong>{formatDzd(quoteTotal(items))}</strong>
      <small>Montants en dinars algériens · sans taxe ni remise.</small>
    </div>
  );
}
