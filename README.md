This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Google Maps API Quick Setup

## Required APIs (3 APIs needed)

1. **Maps JavaScript API** - For displaying maps
2. **Geocoding API** - For address search functionality  
3. **Places API** - For location autocomplete (optional but recommended)

## Step 1: Enable APIs

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **APIs & Services** > **Library**
4. Search and enable these 3 APIs:
   - Maps JavaScript API
   - Geocoding API
   - Places API (optional)

## Step 2: Create API Key

1. Go to **APIs & Services** > **Credentials**
2. Click **+ CREATE CREDENTIALS** > **API key**
3. Copy the API key

## Step 3: Add to Your Project

Run this command in your project root:

```bash
echo "NEXT_PUBLIC_GOOGLE_MAPS_API=your_api_key_here" >> .env.local
```

Replace `your_api_key_here` with your actual API key.

---

## Detailed Configuration (Skip if the above works)

<details>
<summary>Click here if you need more detailed setup or encounter issues</summary>

### API Key Restrictions (Recommended for security)

1. Click **RESTRICT KEY** after creating the API key
2. Under **Application restrictions**:
   - Select **HTTP referrers**
   - Add: `localhost:3000/*`
3. Under **API restrictions**:
   - Select **Restrict key**
   - Choose: Maps JavaScript API, Geocoding API, Places API
4. Click **Save**

### Manual Environment File Setup

If the echo command doesn't work, manually create `.env.local` file:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API=your_api_key_here
```

### Add to .gitignore

Make sure `.env.local` is in your `.gitignore`:

```gitignore
.env.local
```