# 🌌 Trinetra - Cosmic Wakapi FrontendThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



A mystical, cosmic-themed frontend for [Wakapi](https://github.com/muety/wakapi) - your personal WakaTime-compatible time tracking server.## Getting Started



![Trinetra Dashboard](https://img.shields.io/badge/Theme-Cosmic-purple?style=for-the-badge)First, run the development server:

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)

![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)```bash

![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

npm run dev

## ✨ Features# or

yarn dev

### 🎨 Cosmic Design System# or

- **Dark cosmic background** with animated starfieldpnpm dev

- **Neon color palette** (purple, blue, pink, cyan)# or

- **Glass morphism cards** with hover effectsbun dev

- **Smooth animations** using Framer Motion```

- **Custom cosmic buttons** with glow effects

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 🚀 Frontend Features

- **Mystical Landing Page** with cosmic animationsYou can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

- **Login/Register** with authentication

- **Dashboard** displaying real-time coding statisticsThis project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

- **Responsive Design** for all screen sizes

- **Real-time API integration** with Wakapi backend## Learn More



### 🔧 Technical StackTo learn more about Next.js, take a look at the following resources:

- **Next.js 15** with TypeScript and App Router

- **Tailwind CSS** with custom cosmic theme- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

- **Framer Motion** for animations- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

- **Axios** for API communication

- **API Proxy** to handle CORS with Wakapi backendYou can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!



## 🚀 Getting Started## Deploy on Vercel



### PrerequisitesThe easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

- Node.js 18+ installed

- A running Wakapi instance (see main project README)Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure API endpoint:**
   The frontend is configured to proxy API requests to `http://localhost:8080` by default.
   If your Wakapi instance runs on a different port, update `next.config.js`:
   ```javascript
   async rewrites() {
     return [
       {
         source: '/api/wakapi/:path*',
         destination: 'http://localhost:YOUR_PORT/api/:path*',
       },
     ];
   },
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Visit [http://localhost:3000](http://localhost:3000) to see the cosmic interface!

## 🌟 Usage

### Authentication
1. **Create Account**: Visit `/login` and create a new user account
2. **Sign In**: Use your credentials to access the dashboard
3. **Dashboard**: View your coding statistics in the cosmic interface

### WakaTime Integration
Configure your WakaTime plugins to send data to your Wakapi instance:

```ini
# ~/.wakatime.cfg
[settings]
api_url = http://localhost:8080/api
api_key = your-wakapi-api-key
```

## 🎯 API Integration

The frontend integrates with Wakapi's WakaTime-compatible API:

- **Authentication**: Form-based login/signup via `/login` and `/signup`
- **Statistics**: `/api/v1/users/current/stats/{range}`
- **Summaries**: `/compat/wakatime/v1/users/current/summaries`
- **Proxy**: Next.js rewrites handle CORS via `/api/wakapi/*`

## 🎨 Customization

### Theme Colors
Update cosmic colors in `tailwind.config.ts`:
```typescript
cosmic: {
  purple: { /* your purple shades */ },
  blue: { /* your blue shades */ },
  pink: { /* your pink shades */ },
  cyan: { /* your cyan shades */ },
}
```

### Animations
Modify animations in `src/app/globals.css`:
```css
.cosmic-card:hover {
  /* your custom hover effects */
}
```

## 📱 Pages

- **`/`** - Landing page with cosmic hero section
- **`/login`** - Authentication (login/register)
- **`/dashboard`** - Coding statistics dashboard

## 🔧 Development

### Build for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 🌌 The Cosmic Experience

Trinetra transforms your coding analytics into a mystical journey through the cosmos of development. Track your progress as you navigate through the starfields of code, with each language and project represented as celestial bodies in your personal coding universe.

---

**May your code shine bright in the cosmic void** ⭐✨🌟