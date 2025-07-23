import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In or Register - ChatApp',
  description: 'Sign in to your ChatApp account or create a new one to start chatting.',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}