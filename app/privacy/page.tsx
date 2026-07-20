import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Sadugudu Studios",
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-20 max-w-3xl mx-auto px-6">
      <h1
        className="text-4xl font-black text-white mb-8"
        style={{ fontFamily: "Space Grotesk, sans-serif" }}
      >
        Privacy <span className="gradient-text">Policy</span>
      </h1>
      <div className="prose prose-invert max-w-none text-white/60 space-y-4">
        <p>Last updated: July 2026</p>
        <p>
          Sadugudu Studios (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting
          your privacy. This Privacy Policy explains how we collect, use, and safeguard information.
        </p>
        <h2 className="text-white text-xl font-bold mt-8 mb-4">Information We Collect</h2>
        <p>
          We collect information you provide directly to us, such as when you contact us via our
          contact form, including your name, email address, and message content.
        </p>
        <h2 className="text-white text-xl font-bold mt-8 mb-4">How We Use Your Information</h2>
        <p>
          We use the information we collect to respond to your inquiries and communicate with you
          about our games and services.
        </p>
        <h2 className="text-white text-xl font-bold mt-8 mb-4">Contact Us</h2>
        <p>For any privacy questions, contact us at hello@sadugudustudios.com</p>
      </div>
    </div>
  );
}
