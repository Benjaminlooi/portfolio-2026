import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import { PostHogPageView } from "./posthog-pageview";
import { CSPostHogProvider } from "./posthog-provider";
import { ScrollDepthTracker } from "./scroll-depth-tracker";

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
