import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Sadugudu Studios",
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20 max-w-3xl mx-auto px-6">
      <h1
        className="text-4xl font-black text-white mb-8"
        style={{ fontFamily: "Space Grotesk, sans-serif" }}
      >
        Terms of <span className="gradient-text">Service</span>
      </h1>
      <div className="prose prose-invert max-w-none text-white/60 space-y-4">
        <p>Last updated: July 2026</p>
        <p>
          By accessing and using the Sadugudu Studios website and services, you accept and agree to
          be bound by the terms and provisions of this agreement.
        </p>
        <h2 className="text-white text-xl font-bold mt-8 mb-4">Use of Site</h2>
        <p>
          This site is provided for informational purposes about Sadugudu Studios, our games, and
          services. All content is owned by Sadugudu Studios unless otherwise stated.
        </p>
        <h2 className="text-white text-xl font-bold mt-8 mb-4">Intellectual Property</h2>
        <p>
          All game concepts, artwork, stories, characters, and brand assets on this site are the
          intellectual property of Sadugudu Studios.
        </p>
        <h2 className="text-white text-xl font-bold mt-8 mb-4">Contact</h2>
        <p>For any questions regarding these terms, contact us at hello@sadugudustudios.com</p>
      </div>
    </div>
  );
}
