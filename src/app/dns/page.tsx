import Link from "next/link";

export default function DNSWalkthrough() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-card-border">
        <div className="mx-auto max-w-4xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight text-white hover:text-accent transition-colors">
            ← Back to Portfolio
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col w-full max-w-3xl mx-auto px-6 py-20" data-testid="dns-content">
        <div className="mb-12">
          <p className="text-sm font-mono text-accent mb-4 tracking-wider uppercase">Learning Note</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            How DNS Connects a Domain to a Website
          </h1>
        </div>

        <article className="prose prose-invert prose-slate max-w-none space-y-6 text-muted">
          <p className="text-lg leading-relaxed text-white">
            When you type a domain into your browser, a few fast steps happen behind the scenes to find the actual server hosting the website.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">1. The Browser and the Resolver</h2>
          <p>
            First, your browser needs to know the IP address of the server. It asks a <strong>DNS Resolver</strong> (usually provided by your internet service provider). The resolver acts like a librarian, searching the internet&apos;s address books for the right location.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">2. Authoritative Nameservers</h2>
          <p>
            The resolver traces the request down to the <strong>Authoritative Nameserver</strong> for the domain. This nameserver holds the exact map for that specific domain. It looks at its configured <strong>DNS Records</strong> to see where traffic should go.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">3. DNS Records (Like CNAME)</h2>
          <p>
            Often, modern hosting uses a <strong>CNAME record</strong>. A CNAME does not contain the website itself; instead, it maps one hostname to another hostname. For example, it tells the nameserver, &quot;If someone looks for this custom domain, send them over to the hosting provider&apos;s default domain.&quot;
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">4. The Hosting Provider and HTTPS</h2>
          <p>
            Once the browser finally gets the correct IP address from this lookup process, it makes a connection to the hosting provider&apos;s server. To ensure privacy and security, they establish an encrypted <strong>HTTPS request</strong>. Finally, the hosting provider sends back the website response, and the page loads.
          </p>

          <div className="mt-12 p-6 border border-card-border rounded-lg bg-card text-sm">
            <p>
              <strong>Note:</strong> For this portfolio, I currently use Vercel&apos;s hosted domain, so I do not need to configure a custom domain for this assignment. If I connect a custom domain later, DNS records will tell resolvers where that hostname should lead.
            </p>
          </div>
        </article>
      </main>

      <footer className="border-t border-card-border py-8 mt-auto">
        <div className="max-w-4xl mx-auto px-6 text-center text-sm text-muted">
          <p>Muhammed Emir Aydın — 2026</p>
        </div>
      </footer>
    </div>
  );
}
