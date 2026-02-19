import { Star } from "lucide-react";

export function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={star <= Math.round(rating) ? "fill-warning text-warning" : "text-muted-foreground/30"}
          style={{ width: size, height: size }}
        />
      ))}
      <span className="ml-1 text-sm font-medium text-muted-foreground">{rating.toFixed(1)}</span>
    </div>
  );
}
