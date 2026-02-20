import { useState, FormEvent, ChangeEvent, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApp } from "@/contexts/app-context";
import { X, Image as ImageIcon, Calendar } from "lucide-react";

export default function EditServicePage() {
  const { id } = useParams<{ id: string }>();
  const { currentUser, services, updateService } = useApp();
  const navigate = useNavigate();
  const dateInputRef = useRef<HTMLInputElement>(null);
  
  const service = services.find(s => s.id === id);
  
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

  const categories = ["Electrician", "Plumbing", "Construction", "Cleaning", "Welding", "Carpentry"];

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title,
        category: service.category,
        description: service.description,
        location: service.location,
        clientName: service.clientName || "",
        completedDate: service.completedDate || "",
      });
      setPhotos(service.photos || []);
    } else {
      setError("Service not found");
    }
  }, [service]);

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newPhotos: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      if (!file.type.startsWith('image/')) {
        setError(`${file.name} is not an image file`);
        continue;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError(`${file.name} is too large. Max size is 5MB`);
        continue;
      }

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

    if (!currentUser || !service) {
      setError("Service not found");
      return;
    }

    updateService(service.id, {
      title: formData.title,
      category: formData.category,
      location: formData.location,
      description: formData.description,
      photos,
      completedDate: formData.completedDate,
      clientName: formData.clientName || undefined,
    });

    setSuccess(true);
    setTimeout(() => {
      navigate("/dashboard/company/services");
    }, 2000);
  };

  if (!service) {
    return (
      <div>
        <h1 className="text-xl font-bold text-foreground lg:text-2xl">Service Not Found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The service you're trying to edit doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground lg:text-2xl">Edit Portfolio Item</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Update your completed project details
      </p>

      {success && (
        <div className="mt-4 rounded-lg bg-success/15 px-4 py-3 text-sm text-success">
          Portfolio item updated successfully! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 max-w-2xl flex flex-col gap-6">
        {error && (
          <div className="rounded-lg bg-destructive/15 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

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

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Project Photos *
          </label>
          
          <div className="mt-2">
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 px-6 py-8 hover:bg-muted">
              <ImageIcon className="h-12 w-12 text-muted-foreground" />
              <span className="mt-2 text-sm font-medium text-foreground">
                {uploading ? "Uploading..." : "Click to upload more photos"}
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
        </div>

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
              Completion Date (Optional)
            </label>
            <div className="relative">
              <input
                ref={dateInputRef}
                type="date"
                value={formData.completedDate}
                onChange={(e) => setFormData({ ...formData, completedDate: e.target.value })}
                max={new Date().toISOString().split('T')[0]}
                className="w-full rounded-lg border border-input bg-card px-4 py-2.5 pr-10 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Select date"
              />
              <button
                type="button"
                onClick={() => dateInputRef.current?.showPicker()}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Open calendar"
              >
                <Calendar className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              When was this project completed? Click the calendar icon to select a date.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate("/dashboard/company/services")}
            className="flex-1 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={uploading}
            className="flex-1 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            Update Portfolio
          </button>
        </div>
      </form>
    </div>
  );
}
