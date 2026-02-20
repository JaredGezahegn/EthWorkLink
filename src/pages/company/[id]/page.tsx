import { useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { StarRating } from "@/components/star-rating";
import { useApp } from "@/contexts/app-context";
import { MapPin, Briefcase, Star, Banknote, Image as ImageIcon, MessageSquare } from "lucide-react";

export default function CompanyProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { t, companies, services, jobs, currentUser, createServiceRequest, applyForJob, addReview, getCompanyReviews } = useApp();
  const company = companies.find((c) => c.id === id);
  
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestDescription, setRequestDescription] = useState("");

  if (!company) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">Company not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  // Get company's services and jobs
  const companyServices = services.filter(s => s.companyId === company.id);
  const companyJobs = jobs.filter(j => j.companyId === company.id);
  const companyReviews = getCompanyReviews(company.id);

  const handleRecruit = () => {
    if (!currentUser) {
      alert("Please login to request services");
      return;
    }

    if ("companyName" in currentUser) {
      alert("Companies cannot request services");
      return;
    }

    if (companyServices.length === 0) {
      alert("This company has no services available yet");
      return;
    }

    setShowRequestModal(true);
  };

  const handleSubmitRequest = () => {
    if (!currentUser || companyServices.length === 0) return;
    if ("companyName" in currentUser) return;

    if (requestDescription.trim().length < 10) {
      alert("Please describe your requirements (minimum 10 characters)");
      return;
    }

    const service = companyServices[0];
    createServiceRequest({
      serviceId: service.id,
      serviceName: service.title,
      seekerId: currentUser.id,
      seekerName: currentUser.name,
      companyId: company.id,
      companyName: company.companyName,
      description: requestDescription.trim(),
    });

    alert("Service request sent successfully!");
    setShowRequestModal(false);
    setRequestDescription("");
  };

  const handleApplyJob = (job: typeof companyJobs[0]) => {
    if (!currentUser) {
      alert("Please login to apply for jobs");
      return;
    }

    if ("companyName" in currentUser) {
      alert("Companies cannot apply for jobs");
      return;
    }

    applyForJob({
      jobId: job.id,
      jobTitle: job.title,
      seekerId: currentUser.id,
      seekerName: currentUser.name,
      seekerEmail: currentUser.email,
      companyId: job.companyId,
    });

    alert("Application submitted successfully!");
  };

  const handleOpenReviewForm = (serviceId: string) => {
    if (!currentUser) {
      alert("Please login to leave a review");
      return;
    }

    if ("companyName" in currentUser) {
      alert("Companies cannot leave reviews");
      return;
    }

    setSelectedServiceId(serviceId);
    setShowReviewForm(true);
  };

  const handleSubmitReview = () => {
    if (!currentUser || "companyName" in currentUser) return;
    if (!selectedServiceId) return;

    if (reviewComment.trim().length < 10) {
      alert("Please write at least 10 characters in your review");
      return;
    }

    addReview({
      serviceId: selectedServiceId,
      userId: currentUser.id,
      userName: currentUser.name,
      rating: reviewRating,
      comment: reviewComment.trim(),
    });

    alert("Review submitted successfully!");
    setShowReviewForm(false);
    setReviewComment("");
    setReviewRating(5);
    setSelectedServiceId("");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Banner */}
        <div className="bg-gradient-to-r from-sidebar to-primary/80 px-4 py-12 lg:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="text-xs font-medium uppercase tracking-wide text-sidebar-foreground/70">
              {company.category}
            </div>
            <h1 className="mt-1 text-2xl font-bold text-sidebar-foreground lg:text-3xl">
              {company.companyName}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5 text-sm text-sidebar-foreground/80">
                <MapPin className="h-4 w-4" />
                {company.location}
              </div>
              {company.rating && (
                <div className="flex items-center gap-1.5 text-sm text-sidebar-foreground/80">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  {company.rating.toFixed(1)}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Description */}
              <section>
                <h2 className="text-lg font-semibold text-foreground">{t("description")}</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{company.description}</p>
              </section>

              {/* Debug Info - Remove after testing */}
              <div className="mt-4 rounded-lg border border-warning bg-warning/10 p-4">
                <p className="text-sm text-foreground">
                  <strong>Debug:</strong> Company ID: {company.id}
                </p>
                <p className="text-sm text-foreground">
                  Services found: {companyServices.length}
                </p>
                <p className="text-sm text-foreground">
                  Total services in system: {services.length}
                </p>
              </div>

              {/* Portfolio / Services */}
              {companyServices.length > 0 && (
                <section className="mt-8">
                  <h2 className="text-lg font-semibold text-foreground">Portfolio</h2>
                  <div className="mt-3 grid gap-4 sm:grid-cols-2">
                    {companyServices.map((service) => (
                      <div key={service.id} className="rounded-lg border border-border bg-card overflow-hidden">
                        {service.photos && service.photos.length > 0 ? (
                          <img
                            src={service.photos[0]}
                            alt={service.title}
                            className="h-40 w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-40 items-center justify-center bg-muted">
                            <ImageIcon className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                        <div className="p-4">
                          <div className="text-xs font-medium uppercase tracking-wide text-primary">
                            {service.category}
                          </div>
                          <h3 className="mt-1 text-sm font-semibold text-foreground">{service.title}</h3>
                          <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                            {service.description}
                          </p>
                          {service.rating !== undefined && service.rating > 0 && (
                            <div className="mt-2 flex items-center gap-2">
                              <StarRating rating={service.rating} size={12} />
                              <span className="text-xs text-muted-foreground">
                                ({service.reviews?.length || 0} reviews)
                              </span>
                            </div>
                          )}
                          <button
                            onClick={() => handleOpenReviewForm(service.id)}
                            className="mt-3 flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                          >
                            <MessageSquare className="h-3 w-3" />
                            Leave a Review
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Job Posts */}
              {companyJobs.length > 0 && (
                <section className="mt-8">
                  <h2 className="text-lg font-semibold text-foreground">{t("activeJobPosts")}</h2>
                  <div className="mt-3 flex flex-col gap-3">
                    {companyJobs.map((job) => (
                      <div
                        key={job.id}
                        className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-secondary" />
                            <span className="text-sm font-medium text-foreground">{job.title}</span>
                          </div>
                          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Banknote className="h-3.5 w-3.5" />
                            {job.salary}
                          </div>
                        </div>
                        <button
                          onClick={() => handleApplyJob(job)}
                          className="rounded-lg bg-secondary px-4 py-1.5 text-xs font-medium text-secondary-foreground hover:opacity-90"
                        >
                          {t("applyButton")}
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Reviews */}
              {companyReviews.length > 0 && (
                <section className="mt-8">
                  <h2 className="text-lg font-semibold text-foreground">
                    {t("reviews")} ({companyReviews.length})
                  </h2>
                  <div className="mt-3 flex flex-col gap-3">
                    {companyReviews.map((review) => (
                      <div key={review.id} className="rounded-lg border border-border bg-card p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground">{review.userName}</span>
                          <StarRating rating={review.rating} size={14} />
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{review.date}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-24 rounded-xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground">{company.companyName}</h3>
                {company.rating && (
                  <div className="mt-3">
                    <StarRating rating={company.rating} />
                  </div>
                )}
                <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {company.location}
                </div>
                <div className="mt-3 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Owner:</span> {company.ownerName}
                </div>
                <button
                  onClick={handleRecruit}
                  className="mt-6 w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
                >
                  {t("recruitButton")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Service Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-foreground">Request Service</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {company.companyName}
            </p>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-foreground">
                Describe Your Requirements *
              </label>
              <textarea
                value={requestDescription}
                onChange={(e) => setRequestDescription(e.target.value)}
                rows={5}
                placeholder="Please describe what you need, when you need it, and any specific requirements..."
                className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Minimum 10 characters ({requestDescription.length}/10)
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setShowRequestModal(false);
                  setRequestDescription("");
                }}
                className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitRequest}
                disabled={requestDescription.trim().length < 10}
                className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-foreground">Leave a Review</h3>
            <p className="mt-1 text-sm text-muted-foreground">Share your experience with this service</p>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-foreground">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setReviewRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= reviewRating
                          ? "fill-warning text-warning"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-foreground">Your Review</label>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                rows={4}
                placeholder="Tell others about your experience..."
                className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Minimum 10 characters ({reviewComment.length}/10)
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setShowReviewForm(false);
                  setReviewComment("");
                  setReviewRating(5);
                  setSelectedServiceId("");
                }}
                className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                disabled={reviewComment.trim().length < 10}
                className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
