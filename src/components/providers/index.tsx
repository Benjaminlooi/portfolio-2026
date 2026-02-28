import { Toaster } from "sonner";
import { CSPostHogProvider } from "./posthog-provider";
import { PostHogPageView } from "./posthog-pageview";
import { ScrollDepthTracker } from "./scroll-depth-tracker";
import NextTopLoader from "nextjs-toploader";

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <CSPostHogProvider>
      <PostHogPageView />
      <ScrollDepthTracker />
      <NextTopLoader color="#eb5200" showSpinner={false} zIndex={99999} />
      <Toaster richColors />
      {children}
    </CSPostHogProvider>
  );
};
export default Providers;

