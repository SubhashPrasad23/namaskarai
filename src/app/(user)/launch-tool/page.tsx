"use client";

import { useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useTranslation } from "@/hooks/useTranslation";

const packages = [
  {
    id: "website-only",
    name: "Website Only",
    nameAs: "à§±à§‡à¦¬à¦›à¦¾à¦‡à¦Ÿ à¦…à¦¨à¦²à¦¿",
    description: "Get your AI tool listed on our website with a dedicated profile page.",
    descriptionAs: "à¦†à¦ªà§‹à¦¨à¦¾à§° à¦à¦†à¦‡ à¦¸à¦à¦œà§à¦²à¦¿ à¦†à¦®à¦¾à§° à§±à§‡à¦¬à¦›à¦¾à¦‡à¦Ÿà¦¤ à¦à¦Ÿà¦¾ à¦¨à¦¿à§°à§à¦¦à¦¿à¦·à§à¦Ÿ à¦ªà§à§°'à¦«à¦¾à¦‡à¦² à¦ªà§ƒà¦·à§à¦ à¦¾à§° à¦¸à§ˆà¦¤à§‡ à¦¤à¦¾à¦²à¦¿à¦•à¦¾à¦­à§à¦•à§à¦¤ à¦•à§°à¦•à¥¤",
    price: "$49",
    features: ["Tool listing on website", "Basic profile page", "Category placement", "30-day visibility"],
    featuresAs: ["à§±à§‡à¦¬à¦›à¦¾à¦‡à¦Ÿà¦¤ à¦¸à¦à¦œà§à¦²à¦¿ à¦¤à¦¾à¦²à¦¿à¦•à¦¾", "à¦®à§Œà¦²à¦¿à¦• à¦ªà§à§°'à¦«à¦¾à¦‡à¦² à¦ªà§ƒà¦·à§à¦ à¦¾", "à¦¶à§à§°à§‡à¦£à§€ à¦¸à§à¦¥à¦¾à¦ªà¦¨", "à§©à§¦ à¦¦à¦¿à¦¨à§° à¦¦à§ƒà¦¶à§à¦¯à¦®à¦¾à¦¨à¦¤à¦¾"],
  },
  {
    id: "maximum-exposure",
    name: "Maximum Exposure",
    nameAs: "à¦¸à§°à§à¦¬à¦¾à¦§à¦¿à¦• à¦ªà§à§°à¦šà¦¾à§°",
    description: "Full promotion across all channels for maximum visibility and reach.",
    descriptionAs: "à¦¸à§°à§à¦¬à¦¾à¦§à¦¿à¦• à¦¦à§ƒà¦¶à§à¦¯à¦®à¦¾à¦¨à¦¤à¦¾ à¦†à§°à§ à¦ªà§°à¦¿à¦¸à§°à§° à¦¬à¦¾à¦¬à§‡ à¦¸à¦•à¦²à§‹ à¦šà§‡à¦¨à§‡à¦²à¦¤ à¦¸à¦®à§à¦ªà§‚à§°à§à¦£ à¦ªà§à§°à¦šà¦¾à§°à¥¤",
    price: "$149",
    features: ["Everything in Website Only", "Featured on homepage", "Social media promotion", "Newsletter feature", "Priority placement", "90-day visibility"],
    featuresAs: ["à§±à§‡à¦¬à¦›à¦¾à¦‡à¦Ÿ à¦…à¦¨à¦²à¦¿à§° à¦¸à¦•à¦²à§‹", "à¦¹à§‹à¦®à¦ªà§‡à¦œà¦¤ à¦¬à§ˆà¦¶à¦¿à¦·à§à¦Ÿà§à¦¯à¦¯à§à¦•à§à¦¤", "à¦›'à¦šà¦¿à¦¯à¦¼à§‡à¦² à¦®à¦¿à¦¡à¦¿à¦¯à¦¼à¦¾ à¦ªà§à§°à¦šà¦¾à§°", "à¦¨à¦¿à¦‰à¦œà¦²à§‡à¦Ÿà¦¾à§° à¦¬à§ˆà¦¶à¦¿à¦·à§à¦Ÿà§à¦¯", "à¦…à¦—à§à§°à¦¾à¦§à¦¿à¦•à¦¾à§° à¦¸à§à¦¥à¦¾à¦ªà¦¨", "à§¯à§¦ à¦¦à¦¿à¦¨à§° à¦¦à§ƒà¦¶à§à¦¯à¦®à¦¾à¦¨à¦¤à¦¾"],
    popular: true,
  },
  {
    id: "custom-launch-plan",
    name: "Custom Launch Plan",
    nameAs: "à¦•à¦¾à¦·à§à¦Ÿà¦® à¦²à¦žà§à¦š à¦ªà§à¦²à§‡à¦¨",
    description: "A tailored launch strategy designed specifically for your tool's needs.",
    descriptionAs: "à¦†à¦ªà§‹à¦¨à¦¾à§° à¦¸à¦à¦œà§à¦²à¦¿à§° à¦ªà§à§°à¦¯à¦¼à§‹à¦œà¦¨à§€à¦¯à¦¼à¦¤à¦¾à§° à¦¬à¦¾à¦¬à§‡ à¦¬à¦¿à¦¶à§‡à¦·à¦­à¦¾à§±à§‡ à¦¡à¦¿à¦œà¦¾à¦‡à¦¨ à¦•à§°à¦¾ à¦à¦Ÿà¦¾ à¦•à¦¾à¦·à§à¦Ÿà¦® à¦²à¦žà§à¦š à¦•à§Œà¦¶à¦²à¥¤",
    price: "Custom",
    features: ["Everything in Maximum Exposure", "Custom marketing strategy", "Dedicated account manager", "Analytics dashboard", "Unlimited visibility"],
    featuresAs: ["à¦¸à§°à§à¦¬à¦¾à¦§à¦¿à¦• à¦ªà§à§°à¦šà¦¾à§°à§° à¦¸à¦•à¦²à§‹", "à¦•à¦¾à¦·à§à¦Ÿà¦® à¦®à¦¾à§°à§à¦•à§‡à¦Ÿà¦¿à¦‚ à¦•à§Œà¦¶à¦²", "à¦¨à¦¿à§°à§à¦¦à¦¿à¦·à§à¦Ÿ à¦à¦•à¦¾à¦‰à¦£à§à¦Ÿ à¦®à§‡à¦¨à§‡à¦œà¦¾à§°", "à¦¬à¦¿à¦¶à§à¦²à§‡à¦·à¦£ à¦¡à§‡à¦šà¦¬'à§°à§à¦¡", "à¦…à¦¸à§€à¦®à¦¿à¦¤ à¦¦à§ƒà¦¶à§à¦¯à¦®à¦¾à¦¨à¦¤à¦¾"],
    isCustom: true,
  },
];

export default function LaunchToolPage() {
  const { t, locale } = useTranslation();
  const isAs = locale === "as";

  const [toolUrl, setToolUrl] = useState("");
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (!toolUrl.trim()) {
      setErrorMessage(isAs ? "à¦…à¦¨à§à¦—à§à§°à¦¹ à¦•à§°à¦¿ à¦†à¦ªà§‹à¦¨à¦¾à§° à¦¸à¦à¦œà§à¦²à¦¿à§° URL à¦¦à¦¿à¦¯à¦¼à¦•à¥¤" : "Please enter your tool URL.");
      setSubmitStatus("error");
      return;
    }

    try {
      new URL(toolUrl);
    } catch {
      setErrorMessage(isAs ? "à¦…à¦¨à§à¦—à§à§°à¦¹ à¦•à§°à¦¿ à¦à¦Ÿà¦¾ à¦¬à§ˆà¦§ URL à¦¦à¦¿à¦¯à¦¼à¦• (à¦¯à§‡à¦¨à§‡, https://your-tool.com)à¥¤" : "Please enter a valid URL (e.g., https://your-tool.com).");
      setSubmitStatus("error");
      return;
    }

    if (!selectedPackage) {
      setErrorMessage(isAs ? "à¦…à¦¨à§à¦—à§à§°à¦¹ à¦•à§°à¦¿ à¦à¦Ÿà¦¾ à¦ªà§‡à¦•à§‡à¦œ à¦¬à¦¾à¦›à¦¨à¦¿ à¦•à§°à¦•à¥¤" : "Please select a package.");
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    const res = await fetch("/api/tool-submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: toolUrl.trim(),
        package: selectedPackage,
        release_date: new Date().toISOString(),
        status: "pending",
      }),
    });
    const error = !res.ok ? await res.json() : null;

    setIsSubmitting(false);

    if (error) {
      setErrorMessage(isAs ? "à¦œà¦®à¦¾ à¦¦à¦¿à¦¬ à¦¨à§‹à§±à¦¾à§°à¦¿à¦²à§‡à¥¤ à¦…à¦¨à§à¦—à§à§°à¦¹ à¦•à§°à¦¿ à¦ªà§à¦¨à§° à¦šà§‡à¦·à§à¦Ÿà¦¾ à¦•à§°à¦•à¥¤" : "Failed to submit. Please try again.");
      setSubmitStatus("error");
    } else {
      setSubmitStatus("success");
      setToolUrl("");
      setSelectedPackage(null);
    }
  };

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-transparent py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              ðŸš€ {isAs ? "à¦†à¦ªà§‹à¦¨à¦¾à§° à¦¸à¦à¦œà§à¦²à¦¿ à¦²à¦žà§à¦š à¦•à§°à¦•" : "Launch Your Tool"}
            </div>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              {isAs ? "à¦†à¦ªà§‹à¦¨à¦¾à§° à¦à¦†à¦‡ à¦¸à¦à¦œà§à¦²à¦¿ à¦¹à¦¾à¦œà¦¾à§° à¦¹à¦¾à¦œà¦¾à§° à¦¬à§à¦¯à§±à¦¹à¦¾à§°à¦•à¦¾à§°à§€à¦²à§ˆ à¦²à¦žà§à¦š à¦•à§°à¦•" : "Launch Your AI Tool to Thousands of Users"}
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              {isAs ? "à¦†à¦ªà§‹à¦¨à¦¾à§° à¦¸à¦à¦œà§à¦²à¦¿à§° URL à¦¦à¦¿à¦¯à¦¼à¦•, à¦à¦Ÿà¦¾ à¦ªà§‡à¦•à§‡à¦œ à¦¬à¦¾à¦›à¦¨à¦¿ à¦•à§°à¦•, à¦†à§°à§ à¦†à¦®à¦¾à§° à¦¡à¦¿à§°à§‡à¦•à§à¦Ÿà§°à§€à¦¤ à¦ªà§à§°à¦•à¦¾à¦¶ à¦•à§°à¦•à¥¤" : "Submit your tool URL, select a package, and get published in our directory."}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8 w-full">
        <div className="max-w-md">
          <label htmlFor="tool-url" className="block text-sm font-medium text-foreground mb-2">
            {isAs ? "à¦¸à¦à¦œà§à¦²à¦¿à§° URL" : "Tool URL"}
          </label>
          <input
            id="tool-url"
            type="url"
            placeholder="https://your-ai-tool.com"
            value={toolUrl}
            onChange={(e) => { setToolUrl(e.target.value); setSubmitStatus("idle"); }}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 w-full">
        <h2 className="text-2xl font-bold text-foreground mb-8">
          {isAs ? "à¦ªà§‡à¦•à§‡à¦œ à¦¬à¦¾à¦›à¦¨à¦¿ à¦•à§°à¦•" : "Select Package"}
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => { if (!pkg.isCustom) setSelectedPackage(pkg.id); }}
              className={`relative rounded-2xl border-2 bg-white p-6 transition-all duration-200 cursor-pointer ${
                selectedPackage === pkg.id
                  ? "border-primary shadow-lg shadow-primary/10 scale-[1.02]"
                  : pkg.popular
                  ? "border-primary/30 hover:border-primary/60"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-white shadow-md">
                    â­ {isAs ? "à¦†à¦Ÿà¦¾à¦‡à¦¤à¦•à§ˆ à¦œà¦¨à¦ªà§à§°à¦¿à¦¯à¦¼" : "Most Popular"}
                  </span>
                </div>
              )}

              {selectedPackage === pkg.id && (
                <div className="absolute top-4 right-4">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                    âœ“
                  </div>
                </div>
              )}

              <div className="text-center pt-2">
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {isAs ? pkg.nameAs : pkg.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-5 min-h-[40px]">
                  {isAs ? pkg.descriptionAs : pkg.description}
                </p>
                <div className="text-4xl font-bold text-primary mb-6">{pkg.price}</div>
                <ul className="text-sm text-muted-foreground space-y-3 text-left">
                  {(isAs ? pkg.featuresAs : pkg.features).map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <span className="text-primary font-bold shrink-0">âœ“</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {pkg.isCustom && (
                  <Link href="/launch-tool/contact" className="mt-6 block">
                    <Button variant="outline" className="w-full">
                      {isAs ? "à¦¯à§‹à¦—à¦¾à¦¯à§‹à¦— à¦•à§°à¦•" : "Contact Us"}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {submitStatus === "error" && (
          <div className="mt-6 text-center text-sm text-red-500 font-medium">
            {errorMessage}
          </div>
        )}
        {submitStatus === "success" && (
          <div className="mt-6 text-center text-sm text-slate-700 font-medium bg-slate-50 rounded-lg p-4">
            ðŸš€ {isAs ? "à¦†à¦ªà§‹à¦¨à¦¾à§° à¦¸à¦à¦œà§à¦²à¦¿ à¦¸à¦«à¦²à¦¤à¦¾à§°à§‡ à¦œà¦®à¦¾ à¦¦à¦¿à¦¯à¦¼à¦¾ à¦¹à§ˆà¦›à§‡! à¦…à¦¨à§à¦®à§‹à¦¦à¦¨à§° à¦ªà¦¿à¦›à¦¤ à¦‡ à¦¦à§ƒà¦¶à§à¦¯à¦®à¦¾à¦¨ à¦¹'à¦¬à¥¤" : "Your tool has been submitted successfully! It will be visible after admin approval."}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Button
            variant="primary"
            size="lg"
            className="px-12"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? (isAs ? "à¦œà¦®à¦¾ à¦¦à¦¿à¦¯à¦¼à¦¾ à¦¹à§ˆà¦›à§‡..." : "Submitting...")
              : (isAs ? "à¦ªà§‡ à¦•à§°à¦• à¦†à§°à§ à¦¸à¦à¦œà§à¦²à¦¿ à¦²à¦žà§à¦š à¦•à§°à¦•" : "Pay and Launch Tool")}
          </Button>
        </div>
      </section>
    </div>
  );
}
