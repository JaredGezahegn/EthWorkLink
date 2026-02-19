import { useApp } from "@/contexts/app-context";

export default function SeekerReviewsPage() {
  const { t } = useApp();

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground lg:text-2xl">{t("myReviews")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Reviews you've written for completed services
      </p>

      <div className="mt-8 rounded-xl border-2 border-dashed border-border bg-muted/50 p-12 text-center">
        <h3 className="text-lg font-semibold text-foreground">No reviews yet</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          After completing a service, you can leave a review for the provider
        </p>
      </div>
    </div>
  );
}
