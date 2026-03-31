import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { currentUser } from "@clerk/nextjs/server";
import { connectToDB } from "@/lib/mongoose";
import User from "@/lib/models/user.model";
import { redirect } from "next/navigation";
import { LoadingProvider } from "@/lib/LoadingContext";
import { Toaster } from "sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clerkUser = await currentUser();

  // Sync user sa database at check onboarding
  if (clerkUser) {
    try {
      await connectToDB();

      let user = await User.findOne({ clerkId: clerkUser.id });

      if (!user) {
        // Gumawa ng bagong user
        user = await User.create({
          clerkId: clerkUser.id,
          name:
            `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
            "Unnamed User",
          email: clerkUser.emailAddresses?.[0]?.emailAddress || "",
          avatar: clerkUser.imageUrl,
          username: clerkUser.username,
          onboarded: false,
        });
        console.log("✅ New user created");
      }

      // **Important**: Huwag mag-redirect kung nasa /onboarding page na
      const isOnboardingPage =
        children &&
        (children as any)?.props?.childProp?.segmentPath?.[0] === "onboarding";

      // Redirect to onboarding kung hindi pa nakakapag-onboard at hindi pa nasa onboarding page
      if (!user.onboarded && !isOnboardingPage) {
        redirect("/onboarding");
      }
    } catch (error: any) {
      // Huwag i-throw ang NEXT_REDIRECT error
      if (error.message !== "NEXT_REDIRECT") {
        console.error("Error in RootLayout user sync:", error.message);
      }
    }
  }

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen scroll-smooth bg-background font-sans antialiased",
            fontSans.variable,
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <LoadingProvider>
              <ClientLayout>{children}</ClientLayout>
            </LoadingProvider>
            <Toaster position="top-center" theme="dark" />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
