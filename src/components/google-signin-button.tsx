import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { useApp } from '@/contexts/app-context';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface GoogleSignInButtonProps {
  mode: 'login' | 'register';
  userType?: 'seeker' | 'company';
}

export function GoogleSignInButton({ mode, userType = 'seeker' }: GoogleSignInButtonProps) {
  const { login, registerSeeker, registerCompany } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (mode === 'login') {
        // Try to login with Google email
        const loginResult = login(user.email!, 'google-oauth');
        
        if (loginResult.success) {
          // Redirect based on role
          if (loginResult.role === 'admin') {
            navigate('/dashboard/admin');
          } else if (loginResult.role === 'company') {
            navigate('/dashboard/company');
          } else {
            navigate('/');
          }
        } else {
          setError('No account found with this Google email. Please register first.');
        }
      } else {
        // Register mode
        let registerResult;
        
        if (userType === 'company') {
          registerResult = registerCompany({
            companyName: user.displayName || 'Company Name',
            ownerName: user.displayName || 'Owner Name',
            email: user.email!,
            password: 'google-oauth',
            category: '',
            location: '',
            description: '',
          });
        } else {
          registerResult = registerSeeker({
            name: user.displayName || 'Google User',
            email: user.email!,
            password: 'google-oauth',
            location: '',
          });
        }
        
        if (registerResult.success) {
          // Auto-login after registration
          login(user.email!, 'google-oauth');
          
          if (userType === 'company') {
            navigate('/dashboard/company');
          } else {
            navigate('/');
          }
        } else {
          setError(registerResult.message);
        }
      }
    } catch (err: any) {
      console.error('Google sign-in error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in cancelled');
      } else if (err.code === 'auth/popup-blocked') {
        setError('Popup blocked. Please allow popups for this site.');
      } else {
        setError('Failed to sign in with Google. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        {loading ? 'Signing in...' : `${mode === 'login' ? 'Sign in' : 'Sign up'} with Google`}
      </button>
      
      {error && (
        <p className="mt-2 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
