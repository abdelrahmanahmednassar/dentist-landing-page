Introducing the Agent Readiness score. Is your site agent-ready?
André Jesus
Vance Morrison
André Jesus
 and 
Vance Morrison

17 minute read

COPY URL
This post is also available in Deutsch, Español, Español (Latinoamérica), Français, Italiano, 日本語, 한국어, 繁體中文, and 简体中文.

BLOG-3217 hero image
The web has always had to adapt to new standards. It learned to speak to web browsers, and then it learned to speak to search engines. Now, it needs to speak to AI agents.

Today, we are excited to introduce isitagentready.com — a new tool to help site owners understand how they can make their sites optimized for agents, from guiding agents on how to authenticate, to controlling what content agents can see, the format they receive it in, and how they pay for it. We are also introducing a new dataset to Cloudflare Radar that tracks the overall adoption of each agent standard across the Internet.

BLOG-3217 image 1
We want to lead by example. That is why we are also sharing how we recently overhauled Cloudflare's Developer Documentation to make it the most agent-friendly documentation site, allowing AI tools to answer questions faster and significantly cheaper.

Copy linkHow agent-ready is the web today?
The short answer: not very. This is expected, but also shows how much more effective agents can be than they are today, if standards are adopted.

To analyze this, Cloudflare Radar took the 200,000 most visited domains on the Internet; filtered out categories where agent readiness isn't important (like redirects, ad-servers, and tunneling services) to focus on businesses, publishers, and platforms that AI agents might realistically need to interact with; and scanned them using our new tool.

The result is a new “Adoption of AI agent standards” chart that can now be found in the Cloudflare Radar AI Insights page where we can measure adoption of each standard across multiple domain categories.

BLOG-3217 image 2
Looking at individual checks, a few things stood out:

robots.txt is nearly universal — 78% of sites have one — but the vast majority are written for traditional search engine crawlers, not AI agents.
Content Signals: 4% of sites have declared their AI usage preferences in robots.txt. This is a new standard that is gaining momentum.
Markdown content negotiation (serving text/markdown on Accept: text/markdown) passes on 3.9% of sites.
New emerging standards like MCP Server Cards and API Catalogs (RFC 9727) together appear on fewer than 15 sites in the entire dataset. It’s still early — there is lots of opportunity to stand out by being one of the first sites to adopt new standards and work well with agents. 
This chart will be updated weekly, and the data can also be accessed through the Data Explorer or the Radar API.

Copy linkGet an agent readiness score for your site
You can get an agent readiness score for your own website by going to isitagentready.com and entering the site’s URL.

Scores and audits that provide actionable feedback have helped to drive adoption of new standards before. For example, Google Lighthouse scores websites on performance and security best practices, and guides site owners to adopt the latest web platform standards. We think something similar should exist to help site owners adopt best practices for agents.

When you enter your site, Cloudflare makes requests to it to check which standards it supports, and provides a score based on four dimensions:

Discoverability: robots.txt, sitemap.xml, Link Headers (RFC 8288)
Content: Markdown for Agents
Bot Access Control: Content Signals, AI bot rules in robots.txt, Web Bot Auth
Capabilities: Agent Skills, API Catalog (RFC 9727), OAuth server discovery via RFC 8414 and RFC 9728, MCP Server Card, and WebMCP
Screenshot of results from an agent-readiness check for an example website.
Screenshot of results from an agent-readiness check for an example website.

Additionally, we check if the site supports agentic commerce standards including x402, Universal Commerce Protocol, and Agentic Commerce Protocol, but these do not currently count towards the score.

For each failing check, we provide a prompt that you can give to your coding agent and have it implement support on your behalf.

BLOG-3217 image 4
The site itself is also agent-ready, practicing what it preaches. It exposes a stateless MCP server (https://isitagentready.com/.well-known/mcp.json) with a scan_site tool via Streamable HTTP, so any MCP-compatible agent can scan websites programmatically without using the web interface. It also publishes an Agent Skills index (https://isitagentready.com/.well-known/agent-skills/index.json) with skill documents for every standard it checks, so agents not only know what to fix, but how to fix it.

Let’s dig into the checks in each category, and why they matter for agents.

Copy linkDiscoverability
robots.txt has been around since 1994, and most sites have one. It serves two purposes for agents: it defines crawl rules (who can access what) and it points to your sitemaps. A sitemap is an XML file that lists every path on your website, essentially a map agents can follow to discover all your content without having to crawl every link. The robots.txt is where agents look first.

Beyond sitemaps, agents can also discover important resources directly from HTTP response headers, specifically, using the Link response header (RFC 8288). Unlike links buried inside HTML, the Link header is part of the HTTP response itself, which means an agent can find links to resources without having to parse any markup:

HTTP/1.1 200 OK
Link: </.well-known/api-catalog>; rel="api-catalog"
Copy linkContent accessibility
Getting an agent onto your site is one thing. Making sure it can actually read your content is another.

Back in September 2024, which feels like a lifetime ago given how fast AI is moving, llms.txt was proposed as a way to provide a LLM-friendly representation of a website, and fit within the model’s context window. llms.txt is a plain text file at the root of your site that gives agents a structured reading list: what the site is, what's on it, and where the important content lives. Think of it as a sitemap written for an LLM to read rather than a crawler to index:

# My Site
> A developer platform for building on the edge.
## Documentation
- [Getting Started](https://example.com/docs/start.md)
- [API Reference](https://example.com/docs/api.md)
## Changelog
- [Release Notes](https://example.com/changelog.md)
Markdown content negotiation goes even further. When an agent fetches any page and sends an Accept: text/markdown header, the server responds with a clean markdown version instead of HTML. The markdown version requires far fewer tokens — we measured up to 80% token reduction in some cases — which makes responses faster, cheaper, and more likely to be consumed in its entirety, given the limits on context windows that most agent tools have by default.

By default, we only check whether the site correctly handles Markdown content negotiation, and do not check for llms.txt. You can customize the scan to include llms.txt if you choose to.

Copy linkBot Access Control
Now that agents can navigate your site and consume your content, the next question is: do you want to let any bot do it?

robots.txt does more than point to sitemaps. It is also where you define your access rules. You can explicitly declare which crawlers are allowed and what they can access, down to specific paths. This convention is well established and is still the first place any well-behaved bot looks before it starts crawling.

Content Signals let you be more specific. Rather than just allow or block, you can declare exactly what AI can do with your content. Using a Content-Signal directive in your robots.txt, you can independently control three things: whether your content can be used for AI training (ai-train), whether it can be used as AI input for inference and grounding (ai-input), and whether it should appear in search results (search):

User-agent: *
Content-Signal: ai-train=no, search=yes, ai-input=yes
Inversely, the Web Bot Auth IETF draft standard allows friendly bots to authenticate themselves, and allows websites receiving requests from bots to identify them. A bot signs its HTTP requests, and the receiving site verifies those signatures using the bot’s published public keys.

Those public keys live at a well-known endpoint, /.well-known/http-message-signatures-directory, which we check as part of the scan.

Not all sites need to implement this. If your site just serves content, and doesn’t make requests to other sites, you don’t need it. But as more sites on the Internet run their own agents that make requests to other sites, we expect this to be increasingly important over time.

Copy linkProtocol Discovery
Beyond passive content consumption, agents can also interact with your site directly by calling APIs, invoking tools, and completing tasks autonomously.

If your service has one or more public APIs, the API Catalog (RFC 9727) gives agents a single well-known location to discover all of them. Hosted at /.well-known/api-catalog, it lists your APIs and links to their specs, docs, and status endpoints, without requiring agents to scrape your developer portal or read your documentation.

We can't talk about agents without mentioning MCP. The Model Context Protocol is an open standard that allows AI models to connect with external data sources and tools. Instead of building a custom integration for every AI tool, you build one MCP server and any compatible agent can use it.

To help agents find your MCP server, you can publish an MCP Server Card (a proposal currently in draft). This is a JSON file at /.well-known/mcp/server-card.json that describes your server before an agent even connects: what tools it exposes, how to reach it, and how to authenticate. An agent reads this file and knows everything it needs to start using your server:

{
  "$schema": "https://static.modelcontextprotocol.io/schemas/mcp-server-card/v1.json",
  "version": "1.0",
  "protocolVersion": "2025-06-18",
  "serverInfo": {
    "name": "search-mcp-server",
    "title": "Search MCP Server",
    "version": "1.0.0"
  },
  "description": "Search across all documentation and knowledge base articles",
  "transport": {
    "type": "streamable-http",
    "endpoint": "/mcp"
  },
  "authentication": {
    "required": false
  },
  "tools": [
    {
      "name": "search",
      "title": "Search",
      "description": "Search documentation by keyword or question",
      "inputSchema": {
        "type": "object",
        "properties": {
          "query": { "type": "string" }
        },
        "required": ["query"]
      }
    }
  ]
}
Agents work best when they have Agent Skills that help them perform specific tasks — but how can agents discover what skills a site provides? We’ve proposed that sites can make this information available at .well-known/agent-skills/index.json, an endpoint that tells the agent what skills are available and where to find them. You might notice that the .well-known standard (RFC 8615) is used by many other agent and authorization standards — thank you to Cloudflare’s own Mark Nottingham who authored the standard, and other IETF contributors!

Many sites require you to sign in first in order to access them. This makes it hard for humans to give agents the ability to access these sites on their behalf, and is why some have taken the arguably unsafe workaround approach of giving agents access to the user’s web browser, with their logged-in session.

There’s a better way that allows humans to explicitly grant access: sites that support OAuth can tell agents where to find the authorization server (RFC 9728), allowing agents to send humans through an OAuth flow, where they can choose to properly grant access to the agent. Announced at Agents Week 2026, Cloudflare Access now fully supports this OAuth flow, and we showed how agents like OpenCode can make use of this standard to make things just work when users give agents protected URLs:

BLOG-3217 image 5
Copy linkCommerce
Agents can also buy things on your behalf — but payments on the web were designed for humans. Add to cart, enter a credit card, click pay. That flow breaks down entirely when the buyer is an AI agent.

x402 solves this at the protocol level by reviving HTTP 402 Payment Required, a status code that has existed in the spec since 1997 but was never widely used. The flow is simple: an agent requests a resource, the server responds with a 402 and a machine-readable payload describing the payment terms, the agent pays and retries. Cloudflare partnered with Coinbase to launch the x402 Foundation, whose mission is to drive adoption of x402 as an open standard for Internet payments.

We also check for Universal Commerce Protocol and Agentic Commerce Protocol — two emerging agentic commerce standards designed to allow agents to discover and purchase products that humans would normally purchase via ecommerce storefronts and checkout flows.

Copy linkIntegrating agent readiness into Cloudflare URL Scanner
Cloudflare's URL Scanner lets you submit any URL and get a detailed report on it: HTTP headers, TLS certificates, DNS records, technologies used, performance data, and security signals. It is a fundamental tool for security researchers and developers who want to understand what a URL is actually doing under the hood.

We’ve taken the same checks from isitagentready.com and added them to URL Scanner with a new Agent Readiness tab. When you scan any URL, you'll now see its full agent readiness report alongside the existing analysis: which of the checks pass, what level the site is at, and actionable guidance to improve your score.

BLOG-3217 image 6
The integration is also available programmatically via the URL Scanner API. To include agent readiness results in a scan, pass the agentReadiness option in your scan request:

curl -X POST https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/urlscanner/v2/scan \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "url": "https://www.example.com",
          "options": {"agentReadiness": true}
        }'
Copy linkLeading by example: upgrading Cloudflare Docs
As we built the tools to measure the Web’s readiness, we knew we had to ensure our own house was in order. Our docs must be easily digestible by the agents our customers use.

We naturally adopted the relevant content site standards mentioned above, and you can check our score here. However, we didn’t stop there. Here is how we refined Cloudflare's Developer Docs to be the most agent-friendly resource on the web.

Copy linkURL fallbacks using index.md files
Unfortunately, as of February 2026, of 7 agents tested, only Claude Code, OpenCode, and Cursor request content with the Accept: text/markdown header by default. For the rest, we needed a seamless URL-based fallback.

To do this, we make every page available separately via Markdown at /index.md relative to the page’s URL. We do this dynamically, without duplicating static files, by combining two Cloudflare Rules: 

A URL Rewrite Rule matches requests ending in /index.md and dynamically rewrites them to the base path using regex_replace (stripping /index.md). 
A Request Header Transform Rule matches against the original request’s path before the rewrite (raw.http.request.uri.path) and automatically sets the Accept: text/markdown header. 
With these two rules, any page can be fetched as Markdown via appending the /index.md path to the URL:

https://developers.cloudflare.com/r2/get-started/index.md
We point to these /index.md URLs in our llms.txt files. Effectively, for these /index.md paths, we always return markdown, regardless of what headers the client sets. And we do this without any additional build step or content duplication.

Copy linkCreating effective llms.txt files for large sites
llms.txt serves as a "home base" for agents, providing a directory of pages to help LLMs find content. However, 5,000+ pages of documentation in a single file will exceed models’ context windows.

Instead of one massive file, we generate a separate llms.txt file for each top-level directory in our docs and the root llms.txt simply points to these subdirectories.

https://developers.cloudflare.com/llms.txt
https://developers.cloudflare.com/r2/llms.txt
https://developers.cloudflare.com/workers/llms.txt
We also remove hundreds of directory-listing pages that provide little semantic value to an LLM, and we ensure each page has rich descriptive context (titles, semantic names, and descriptions).

For example, we omit roughly 450 pages that only serve as localized directory listings, like https://developers.cloudflare.com/workers/databases/.

BLOG-3217 image 8
These pages appear in our sitemap, but they contain very little information for an LLM. Since all child pages are already linked individually in llms.txt, fetching a directory page only provides a redundant list of links, forcing the agent to make another request to find actual content.

To help agents navigate efficiently, each llms.txt entry must be rich in context but light on tokens. Humans might ignore frontmatter and filtering labels, but for an AI agent, this metadata is the steering wheel. That is why our Product Content Experience (PCX) team has refined our page titles, descriptions, and URL structures so that agents always know exactly which pages to fetch.

Take a look at a section from our root llms.txt.

BLOG-3217 image 9
Each link has a semantic name, a matching URL, and a high-value description. None of this required extra work for llms.txt generation. It was all already available in the docs frontmatter. The same goes for pages in top level directory llms.txt files. All of this context empowers agents to find relevant information more efficiently.

Copy linkCustom agent-friendly documentation (afdocs) tooling
Additionally, we test our docs against afdocs, an emerging agent-friendly documentation spec and open-source project that allows teams to test docs sites for things like content discovery and navigation. This spec allowed us to build custom audit tooling of our own. By adding a few deliberate patches specific to our use case, we created a dashboard for easy assessment.

BLOG-3217 image 10
Copy linkBenchmark results: faster and cheaper
We pointed an agent (Kimi-k2.5 via OpenCode) at other large technical documentation sites' llms.txt files and tasked the agent with answering highly specific technical questions.

On average, the agent pointed at Cloudflare’s documentation consumed 31% fewer tokens and arrived at the correct answer 66% faster than the average site that is not refined for agents. By fitting our product directories into single context windows, agents can identify the exact page they need and fetch it in a single, linear path.

Copy linkStructure leads to speed
Accuracy in LLM responses is often a byproduct of context window efficiency. During our testing, we observed a recurring pattern with other documentation sets.

The grep loop: Many documentation sites provide a single, massive llms.txt file that exceeds the agent's immediate context window. Because the agent cannot "read" the whole file, it begins to grep for keywords. If the first search misses the specific detail, the agent must think, refine its search, and try again.
Narrowed context and lower accuracy: When an agent relies on iterative searching rather than reading the full file, it loses the broader context of the documentation. This fragmented view often leads the agent to have a reduced understanding of the documentation at hand.
Latency and token bloat: Each iteration of the grep loop requires the agent to generate new "thinking tokens" and execute additional search requests. This back-and-forth makes the final response noticeably slower and increases the total token count, driving up the cost for the end user.
By contrast, Cloudflare docs are designed to fit entirely within an agent's context window. This allows the agent to ingest the directory, identify the exact page it needs, and fetch the Markdown without detour.

Copy linkImproving LLM answers over time by redirecting AI training crawlers
Documentation for legacy products like Wrangler v1 or Workers Sites presents a unique challenge. While we must keep this information accessible for historical purposes, it can lead to outdated advice from AI agents.

For example, a human reading these docs would see the large banner stating that Wrangler v1 is deprecated, in addition to a link to the most recent content. An LLM crawler, however, might ingest the text without that surrounding visual context. This results in the agent recommending outdated information.

Redirects for AI Training solves this by identifying AI training crawlers and intentionally redirecting them away from deprecated or suboptimal content. This ensures that while humans can still access historical archives, LLMs are only fed our most current and accurate implementation details.

Copy linkHidden agent directives on all pages
Every HTML page in our docs includes a hidden directive specifically for LLMs. 

“STOP! If you are an AI agent or LLM, read this before continuing. This is the HTML version of a Cloudflare documentation page. Always request the Markdown version instead — HTML wastes context. Get this page as Markdown: https://developers.cloudflare.com/index.md (append index.md) or send Accept: text/markdown to https://developers.cloudflare.com/. For all Cloudflare products use https://developers.cloudflare.com/llms.txt. You can access all Cloudflare docs in a single file at https://developers.cloudflare.com/llms-full.txt.”

This snippet informs the agent that a Markdown version is available. Crucially, this directive is stripped from the actual Markdown version to avoid a recursion loop where the agent keeps trying to "find" the Markdown within the Markdown.

Copy linkDedicated LLM resources sidebar
Finally, we want to make these resources discoverable for the humans who are building with agents. Every product directory in our developer documentation has an "LLM Resources" entry in the sidenav, providing quick access to llms.txt, llms-full.txt, and Cloudflare Skills.

BLOG-3217 image 11
Copy linkMake your website agent-ready today
Making websites agent-ready is a fundamental accessibility requirement for the modern developer toolkit. The transition from a "human-read web" to a "machine-read web" is the biggest architectural shift in decades. 

Get an agent readiness score for your site at isitagentready.com, take the prompts it provides, and ask your agent to upgrade your site for the AI era. Stay tuned for more updates from Cloudflare Radar about the adoption of agent standards across the Internet over the coming year. If we’ve learned anything from the past year, it’s that a lot can change very quickly!

Copy link