import * as React from "react";

export function EvoRating({
  label = "Rating",
  value = 0,
  onChange,
  max = 5,
}: {
  label?: string;
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
}) {
  return (
    <div data-evo="rating" role="radiogroup" aria-label={label} className="evo-rating">
      {Array.from({ length: max }, (_, index) => {
        const score = index + 1;
        return (
          <button
            key={score}
            type="button"
            role="radio"
            aria-checked={value === score}
            aria-label={`${score} of ${max}`}
            className="evo-star"
            data-on={score <= value}
            onClick={() => onChange?.(score)}
          >
            <span aria-hidden="true">★</span>
          </button>
        );
      })}
    </div>
  );
}

export const Rating = EvoRating;
