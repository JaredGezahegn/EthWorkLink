import { useState, ChangeEvent } from 'react';
import { Upload, Check } from 'lucide-react';

interface ProfilePictureSelectorProps {
  currentPicture?: string;
  onSelect: (picture: string) => void;
}

// Preset blue-collar worker images from Unsplash
const presetImages = [
  {
    id: 'electrician',
    url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=400&fit=crop',
    label: 'Electrician'
  },
  {
    id: 'plumber',
    url: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=400&fit=crop',
    label: 'Plumber'
  },
  {
    id: 'construction',
    url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=400&fit=crop',
    label: 'Construction Worker'
  },
  {
    id: 'welder',
    url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=400&fit=crop',
    label: 'Welder'
  },
  {
    id: 'carpenter',
    url: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=400&h=400&fit=crop',
    label: 'Carpenter'
  },
  {
    id: 'cleaner',
    url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=400&fit=crop',
    label: 'Cleaning Service'
  },
  {
    id: 'team1',
    url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=400&fit=crop',
    label: 'Team 1'
  },
  {
    id: 'team2',
    url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=400&fit=crop',
    label: 'Team 2'
  },
];

export function ProfilePictureSelector({ currentPicture, onSelect }: ProfilePictureSelectorProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handlePresetSelect = (url: string) => {
    onSelect(url);
    setError('');
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      setUploading(false);
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('Image size must be less than 2MB');
      setUploading(false);
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      onSelect(base64);
      setUploading(false);
    };
    reader.onerror = () => {
      setError('Failed to read image file');
      setUploading(false);
    };
    reader.readAsDataURL(file);

    // Reset input
    e.target.value = '';
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Profile Picture
        </label>
        <p className="text-xs text-muted-foreground mb-3">
          Choose from preset images or upload your own
        </p>
      </div>

      {/* Current Picture Preview */}
      {currentPicture && (
        <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
          <img
            src={currentPicture}
            alt="Current profile"
            className="h-16 w-16 rounded-full object-cover border-2 border-primary"
          />
          <div className="text-sm">
            <p className="font-medium text-foreground">Current Picture</p>
            <p className="text-xs text-muted-foreground">This will appear on your profile</p>
          </div>
        </div>
      )}

      {/* Preset Images Grid */}
      <div>
        <p className="text-sm font-medium text-foreground mb-2">Choose a preset image:</p>
        <div className="grid grid-cols-4 gap-3">
          {presetImages.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handlePresetSelect(preset.url)}
              className={`relative group rounded-lg overflow-hidden border-2 transition-all ${
                currentPicture === preset.url
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <img
                src={preset.url}
                alt={preset.label}
                className="w-full aspect-square object-cover"
              />
              {currentPicture === preset.url && (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <div className="bg-primary rounded-full p-1">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1 text-xs text-white text-center opacity-0 group-hover:opacity-100 transition-opacity">
                {preset.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      {/* Upload Custom Image */}
      <div>
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 px-6 py-8 hover:bg-muted transition-colors">
          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
          <span className="text-sm font-medium text-foreground">
            {uploading ? 'Uploading...' : 'Upload your own image'}
          </span>
          <span className="mt-1 text-xs text-muted-foreground">
            PNG, JPG up to 2MB
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
