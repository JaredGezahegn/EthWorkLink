import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/app-context";
import { Upload, X, Plus, Image as ImageIcon } from "lucide-react";

export default function NewServicePage() {
  const { t, addService, currentUser } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    clientName: "",
    completedDate: "",
  });
  const [photos, setPhotos] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  const categories = ["Electrician", "Plumbing", "Construction", "IT Services", "Cleaning", "Tutoring"];

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newPhotos: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError(`${file.name} is not an image file`);
        continue;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError(`${file.name} is too large. Max size is 5MB`);
        continue;
      }

      // Convert to base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
      });

      const base64 = await base64Promise;
      newPhotos.push(base64);
    }

    setPhotos([...photos, ...newPhotos]);
    setUploading(false);
    setError("");
    
    // Reset input
    e.target.value = "";
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (photos.length === 0) {
      setError("Please add at least one photo of your completed work");
      return;
    }

    if (!currentUser) {
      setError("You must be logged in");
      return;
    }

    const companyName = "companyName" in currentUser ? currentUser.companyName : "Unknown";
    const companyId = currentUser.id;

    addService({
      title: formData.title,
      category: formData.category,
      location: formData.location,
      companyId,
      companyName,
      description: formData.description,
      photos,
      completedDate: formData.completedDate,
      clientName: formData.clientName || undefined,
      rating: 0,
      reviews: [],
    });

    setSuccess(true);
    setTimeout(() => {
      navigate("/dashboard/company/services");
    }, 2000);
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground lg:text-2xl">Showcase Completed Work</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Share photos and details of your completed projects to build your portfolio
      </p>

      {success && (
        <div className="mt-4 rounded-lg bg-success/15 px-4 py-3 text-sm text-success">
          Portfolio item added successfully! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 max-w-2xl flex flex-col gap-6">
        {error && (
          <div className="rounded-lg bg-destructive/15 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Project Title */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Project Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="e.g. Modern Office Electrical Installation"
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Category *</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
            className="w-full appearance-none rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Location *</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
            className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="e.g. Addis Ababa"
          />
        </div>

        {/* Photos Upload */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Project Photos * (Upload from your device)
          </label>
          
          <div className="mt-2">
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 px-6 py-8 hover:bg-muted">
              <ImageIcon className="h-12 w-12 text-muted-foreground" />
              <span className="mt-2 text-sm font-medium text-foreground">
                {uploading ? "Uploading..." : "Click to upload photos"}
              </span>
              <span className="mt-1 text-xs text-muted-foreground">
                PNG, JPG, WEBP up to 5MB each
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>

          {/* Photo Preview */}
          {photos.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img
                    src={photo}
                    alt={`Project ${index + 1}`}
                    className="h-32 w-full rounded-lg object-cover border border-border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(index)}
                    className="absolute -right-2 -top-2 rounded-full bg-destructive p-1.5 text-destructive-foreground shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  <div className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 text-xs text-white">
                    {index + 1} of {photos.length}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <p className="mt-2 text-xs text-muted-foreground">
            {photos.length > 0 
              ? `${photos.length} photo${photos.length > 1 ? 's' : ''} uploaded. You can add more.`
              : "Upload photos showing your completed work. You can select multiple files at once."}
          </p>
        </div>

        {/* Description */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Project Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={5}
            className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Describe the project, challenges faced, solutions provided, and results achieved..."
          />
        </div>

        {/* Optional Fields */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Client Name (Optional)
            </label>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Client or company name"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Completion Date
            </label>
            <input
              type="date"
              value={formData.completedDate}
              onChange={(e) => setFormData({ ...formData, completedDate: e.target.value })}
              className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          <Upload className="h-4 w-4" />
          Add to Portfolio
        </button>
      </form>
    </div>
  );
}


