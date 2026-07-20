import type { Metadata } from "next";
import ContactContent from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us | Sadugudu Studios",
  description:
    "Get in touch with Sadugudu Studios. Let's build something amazing together. Located in Madurai, Tamil Nadu, India.",
};

export default function ContactPage() {
  return <ContactContent />;
}
