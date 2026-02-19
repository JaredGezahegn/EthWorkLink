export function Footer() {
  return (
    <footer className="border-t border-border bg-card px-4 py-8">
      <div className="mx-auto max-w-7xl text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="text-lg font-bold text-primary">Ethio-Work</span>
          <span className="text-lg font-bold text-secondary">Link</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Connecting service seekers with trusted providers across Ethiopia.
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          {"© 2026 Ethio-Work Link. All rights reserved."}
        </p>
      </div>
    </footer>
  );
}
