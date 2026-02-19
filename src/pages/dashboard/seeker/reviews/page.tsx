import { useApp } from "@/contexts/app-context";
import { StarRating } from "@/components/star-rating";

const myReviews = [
  { id: 1, company: "Ethio Electric Solutions", service: "Residential Wiring", rating: 5, comment: "Excellent work, very professional team. Would highly recommend!", date: "2026-01-28" },
  { id: 2, company: "Clean & Shine Services", service: "Office Deep Cleaning", rating: 4, comment: "Good service, office looks great after the cleaning.", date: "2026-02-10" },
];

export default function SeekerReviewsPage() {
  const { t } = useApp();

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground lg:text-2xl">{t("myReviews")}</h1>
      <div className="mt-6 flex flex-col gap-4">
        {myReviews.map((review) => (
          <div key={review.id} className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-foreground">{review.company}</h3>
                <p className="text-xs text-muted-foreground">{review.service}</p>
              </div>
              <span className="text-xs text-muted-foreground">{review.date}</span>
            </div>
            <div className="mt-2">
              <StarRating rating={review.rating} size={14} />
            </div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


