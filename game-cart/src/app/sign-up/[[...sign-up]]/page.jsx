import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        <SignUp 
          appearance={{
            elements: {
              card: 'shadow-xl rounded-2xl border border-slate-200',
              headerTitle: 'text-2xl font-bold text-slate-900',
              headerSubtitle: 'text-slate-600',
              socialButtonsBlockButton: 'border-slate-200 hover:bg-slate-50',
              socialButtonsBlockButtonText: 'text-slate-700',
              dividerLine: 'bg-slate-200',
              dividerText: 'text-slate-500',
              formFieldInput: 'border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
              footerActionText: 'text-slate-600',
              footerActionLink: 'text-indigo-600 hover:text-indigo-800',
              formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700',
            },
          }}
          path="/sign-up"
          routing="path"
          signInUrl="/login"
          fallbackRedirectUrl="/"
        />
      </div>
    </div>
  );
}
