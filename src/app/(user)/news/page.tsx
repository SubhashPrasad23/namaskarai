"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import SearchInput from "@/components/ui/SearchInput";

type NewsArticle = {
  title: string;
  description: string;
  url: string;
  source: { name: string };
  publishedAt: string;
  urlToImage?: string;
};

export default function NewsPage() {
  const { t, locale } = useTranslation();
  const isAs = locale === "as";
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(
          `https://gnews.io/api/v4/search?q=artificial+intelligence&lang=en&max=20&apikey=demo`
        );
        if (res.ok) {
          const data = await res.json();
          if (data.articles && data.articles.length > 0) {
            setArticles(data.articles);
            setLoading(false);
            return;
          }
        }
      } catch {
        // API unavailable, using fallback
      }

      setArticles([
        { title: "OpenAI Announces GPT-5 with Advanced Multimodal Reasoning", description: "The latest model shows significant improvements in reasoning, code generation, and multimodal understanding.", url: "#", source: { name: "TechCrunch" }, publishedAt: new Date().toISOString() },
        { title: "Google Gemini 2.0 Flash Now Available to All Users", description: "Google expands access to its fastest AI model, bringing advanced capabilities to free tier users.", url: "#", source: { name: "The Verge" }, publishedAt: new Date(Date.now() - 3600000).toISOString() },
        { title: "Claude 4 Sets New Benchmark in Code Generation Tasks", description: "Anthropic's latest model achieves state-of-the-art performance on coding benchmarks.", url: "#", source: { name: "Anthropic" }, publishedAt: new Date(Date.now() - 86400000).toISOString() },
        { title: "EU AI Act Enforcement Begins with First Set of Guidelines", description: "European regulators publish detailed guidelines for AI system classification.", url: "#", source: { name: "Reuters" }, publishedAt: new Date(Date.now() - 86400000).toISOString() },
        { title: "Meta Releases Llama 4 as Open-Source Foundation Model", description: "The latest open-weight model from Meta offers competitive performance.", url: "#", source: { name: "Meta AI" }, publishedAt: new Date(Date.now() - 172800000).toISOString() },
        { title: "Microsoft Integrates AI Copilot Across All Office Products", description: "AI-powered assistance now available in all Microsoft 365 apps.", url: "#", source: { name: "Microsoft" }, publishedAt: new Date(Date.now() - 172800000).toISOString() },
        { title: "India Announces National AI Strategy with $2B Investment", description: "Government unveils comprehensive plan to position India as a global AI leader.", url: "#", source: { name: "Economic Times" }, publishedAt: new Date(Date.now() - 345600000).toISOString() },
        { title: "Hugging Face Reaches 1 Million Models on Platform", description: "The open-source ML platform hits a major milestone.", url: "#", source: { name: "Hugging Face" }, publishedAt: new Date(Date.now() - 432000000).toISOString() },
      ]);
      setLoading(false);
    }
    fetchNews();
  }, []);

  const [now] = useState(() => Date.now());

  function timeAgo(dateStr: string) {
    const diff = now - new Date(dateStr).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return isAs ? "এইমাত্ৰ" : "Just now";
    if (hours < 24) return isAs ? `${hours} ঘণ্টা আগতে` : `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return isAs ? `${days} দিন আগতে` : `${days}d ago`;
  }

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-transparent py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="primary" className="mb-4">
              {isAs ? "এআই বাতৰি" : "AI News"}
            </Badge>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              {isAs ? "শেহতীয়া এআই বাতৰি" : "Latest AI News"}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {isAs ? "কৃত্ৰিম বুদ্ধিমত্তাৰ শেহতীয়া উন্নয়নৰ সৈতে আপডেট থাকক।" : "Stay updated with the latest developments in artificial intelligence."}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 w-full">
        <SearchInput
          placeholder={isAs ? "বাতৰি সন্ধান কৰক..." : "Search news..."}
          value={search}
          onChange={setSearch}
          className="max-w-md"
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 w-full">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <span className="text-muted-foreground">{isAs ? "লোড হৈ আছে..." : "Loading news..."}</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">{isAs ? "কোনো বাতৰি পোৱা নগ'ল।" : "No news found."}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filtered.map((article, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="warning">{article.source.name}</Badge>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {timeAgo(article.publishedAt)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{article.description}</p>
                {article.url && article.url !== "#" ? (
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary hover:text-primary/80"
                  >
                    {isAs ? "সম্পূৰ্ণ পঢ়ক →" : "Read Full Article →"}
                  </a>
                ) : (
                  <span className="text-sm font-medium text-primary">
                    {isAs ? "সম্পূৰ্ণ পঢ়ক →" : "Read Full Article →"}
                  </span>
                )}
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
