import { useEffect, useRef, useState } from "react";

interface Post {
  id: string;
  data: {
    title: string;
    pubDate: Date;
    heroImage: string;
  };
}

interface BlogListProps {
  initialPosts: Post[];
  loadMorePosts: (page: number) => Promise<Post[]>;
}

export default function BlogList({
  initialPosts,
  loadMorePosts,
}: BlogListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [loading]);

  const loadMore = async () => {
    setLoading(true);
    try {
      const newPosts = await loadMorePosts(page + 1);
      if (newPosts.length > 0) {
        setPosts((prev) => [...prev, ...newPosts]);
        setPage((prev) => prev + 1);
      }
    } finally {
      setLoading(false);
    }
  };

  // Función para generar márgenes aleatorios
  const getRandomMargin = () => {
    const margins = ["mt-0", "mt-10", "mt-20", "mt-32", "mt-40", "mt-52"];
    return margins[Math.floor(Math.random() * margins.length)];
  };

  return (
    <section className="overflow-auto max-h-screen py-20 max-w-[1000px] mx-auto px-6 no-scrollbar">
      <div className="grid grid-cols-2 gap-x-8">
        {/* Columna izquierda */}
        <ul className="space-y-8">
          {posts
            .filter((_, index) => index % 2 === 0)
            .map((post) => (
              <li key={post.id} className={getRandomMargin()}>
                <a
                  href={`/blog/${post.id}/`}
                  className="relative flex flex-col gap-6 p-6 block hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={post.data.heroImage}
                    alt=""
                    className="max-w-96 w-full h-auto"
                  />
                  <h4 className="title absolute rotate-90 -right-12 top-16 text-3xl font-bold">
                    {post.data.title}
                  </h4>
                  <p className="date font-semibold">
                    <FormattedDate date={post.data.pubDate} />
                  </p>
                </a>
              </li>
            ))}
        </ul>

        {/* Columna derecha */}
        <ul className="space-y-8">
          {posts
            .filter((_, index) => index % 2 !== 0)
            .map((post) => (
              <li key={post.id} className={getRandomMargin()}>
                <a
                  href={`/blog/${post.id}/`}
                  className="relative flex flex-col gap-6 p-6 block hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={post.data.heroImage}
                    alt=""
                    className="max-w-96 w-full h-auto"
                  />
                  <h4 className="title absolute rotate-90 -right-12 top-16 text-3xl font-bold">
                    {post.data.title}
                  </h4>
                  <p className="date font-semibold">
                    <FormattedDate date={post.data.pubDate} />
                  </p>
                </a>
              </li>
            ))}
        </ul>
      </div>

      {/* Elemento observador para el infinite scroll */}
      <div ref={containerRef} className="h-20 py-4">
        {loading && (
          <div className="text-center text-gray-500">Cargando más posts...</div>
        )}
      </div>
    </section>
  );
}

const FormattedDate = ({ date }: { date: Date }) => {
  return (
    <time dateTime={date.toISOString()}>
      {date.toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}
    </time>
  );
};
