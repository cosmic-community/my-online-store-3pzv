# My Online Store

![My Online Store](https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=300&fit=crop&auto=format)

A modern, responsive e-commerce storefront built with Next.js 16, Tailwind CSS, and Cosmic CMS. Browse products by category, view detailed product pages with customer reviews, and enjoy a seamless shopping experience — all powered by your Cosmic content.

## Features

- 🛍️ **Product Catalog** — Dynamic product listings with images, pricing, and inventory status
- 🏷️ **Category Pages** — Browse products organized by category
- ⭐ **Customer Reviews** — Star ratings with verified purchase badges
- 📱 **Fully Responsive** — Beautiful on every device
- ⚡ **Server-Side Rendering** — Fast loads with Next.js 16 App Router
- 🔍 **SEO Optimized** — Semantic HTML and proper meta tags
- 🎨 **Modern Design** — Clean UI with Tailwind CSS and Inter font

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=69a50e0c33dd5691286459b5&clone_repository=69a50f4e1223a8f601dc7e42)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online store with products (including images, pricing, description, and inventory status), product categories, and customer reviews."

### Code Generation Prompt

> "Build a Next.js application for an online business called 'My Online Store'. The content is managed in Cosmic CMS with the following object types: categories, products, reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [Cosmic CMS](https://www.cosmicjs.com/docs) — Headless content management
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (or Node.js 18+)
- A [Cosmic](https://www.cosmicjs.com) account with bucket configured

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd my-online-store

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Run development server
bun dev
```

## Cosmic SDK Examples

### Fetching Products

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Product with Reviews

```typescript
const { object: product } = await cosmic.objects
  .findOne({ type: 'products', slug: 'my-product' })
  .props(['id', 'title', 'slug', 'metadata', 'content'])
  .depth(1)
```

## Cosmic CMS Integration

This app uses three object types from your Cosmic bucket:

| Object Type | Description |
|---|---|
| **Products** | Product listings with images, pricing, descriptions, and inventory status |
| **Categories** | Product categories with names, descriptions, and images |
| **Reviews** | Customer reviews with star ratings, reviewer names, and verified purchase status |

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add environment variables: `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import the project on [Netlify](https://netlify.com)
3. Set build command to `bun run build` and publish directory to `.next`
4. Add environment variables
5. Deploy

<!-- README_END -->