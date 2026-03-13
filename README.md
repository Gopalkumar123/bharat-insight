# Bharat Insight - AI-Driven Data Platform

A professional multi-tenant analytics platform using Indian public data with AI-powered insights.

## 🚀 Live Demo
**[Live Demo Link](https://bharat-insight.vercel.app)**

## � GitHub Repository
**[GitHub Repository](https://github.com/yourusername/bharat-insight)**

---

## 🎯 Project Overview

Bharat Insight is a comprehensive data analytics platform designed for Indian government departments, featuring real-time AI insights, high-performance data visualization, and multi-tenant architecture.

---

## 🏗️ Technical Architecture

### **Tech Stack**
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **State Management**: Zustand + TanStack Query
- **Authentication**: Supabase Auth (ready for integration)
- **AI Integration**: Google Gemini SDK
- **Deployment**: Vercel

---
  estimateSize: () => 50,
  overscan: 10,
})
```

- **Windowing**: Only renders visible rows
- **Overscanning**: Pre-loads adjacent rows for smooth scrolling
- **Dynamic Sizing**: Estimates row heights for performance
- **Memory Efficient**: Maintains constant memory usage regardless of dataset size

## 🏢 Multi-Tenant Architecture

### Department Switching
Each department has unique theming and datasets:

```typescript
export const departmentConfigs: Record<Department, DepartmentConfig> = {
  health: {
    name: 'Ministry of Health',
    theme: { primary: 'rgb(34, 197, 94)', secondary: 'rgb(134, 239, 172)' },
    icon: '🏥',
  },
  agriculture: {
    name: 'Ministry of Agriculture', 
    theme: { primary: 'rgb(251, 146, 60)', secondary: 'rgb(254, 215, 170)' },
    icon: '🌾',
  },
  education: {
    name: 'Ministry of Education',
    theme: { primary: 'rgb(59, 130, 246)', secondary: 'rgb(147, 197, 253)' },
    icon: '📚',
  }
}
```

### State Management
Zustand manages global state without page refreshes:
- Current department and theme
- User role and permissions
- UI state (sidebar, panels)
- Filters and search queries

## 🤖 AI Prompt Design

The AI system uses context-aware prompts:

```typescript
const enhancedPrompt = `
You are an AI assistant analyzing Indian government data. 
Provide concise, data-driven insights in bullet points.

Current Context:
- Department: ${department}
- Filters: ${filterContext}
- User Question: ${query}

Response Format:
• Key trend 1
• Key trend 2  
• Notable insight
• Actionable recommendation
`
```

### Streaming Implementation
- Token-by-token response streaming
- Real-time UI updates
- Error handling with fallback responses
- Context preservation across queries

## 🔐 Access Control

### Role-Based Permissions
```typescript
if (userRole === 'admin') {
  // Can edit, delete rows
  return <EditButton />
}
// Viewer - read only
return <ReadOnlyCell />
```

### Dynamic UI Components
- Admin: Edit/Delete buttons, admin-only menu items
- Viewer: Read-only interface, limited navigation

## 📁 Project Structure

```
/app
  ├── page.tsx          # Landing page
  ├── layout.tsx         # Root layout
  └── dashboard/
      └── page.tsx       # Analytics dashboard

/components
  ├── Hero.tsx          # Landing hero section
  ├── BentoGrid.tsx      # Feature grid
  ├── AnimatedChart.tsx   # Live chart preview
  ├── Navbar.tsx         # Top navigation
  ├── Sidebar.tsx        # Side navigation
  ├── DataGrid.tsx       # Virtualized table
  ├── AIInsightPanel.tsx # AI chat panel
  ├── DepartmentSwitcher.tsx # Dept selector
  ├── CommandPalette.tsx  # Cmd+K palette
  └── SkeletonLoader.tsx # Loading states

/lib
  ├── gemini.ts         # Google Gemini API
  └── supabase.ts       # Auth integration

/store
  └── useStore.ts       # Zustand state

/data
  └── dataset.json       # Mock 100K rows
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd "Bharat-Insight – AI-Driven Data Platform"
npm install
```

2. **Environment variables:**
```bash
# .env.local
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

3. **Run development server:**
```bash
npm run dev
```

4. **Open browser:**
Navigate to `http://localhost:3000`

## 🎯 Usage

### Landing Page
- View platform features and capabilities
- Interactive chart previews
- Navigate to dashboard

### Dashboard
- **Data Grid**: Sort, filter, search 100K+ records
- **AI Panel**: Ask questions about your data
- **Command Palette**: Press Cmd+K for quick actions
- **Department Switch**: Change ministry context

### AI Insights
Ask natural language questions:
- "What are the population trends in Maharashtra?"
- "Which states have the highest health index?"
- "Analyze agriculture output by year"

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Other Platforms
```bash
npm run build
npm start
```

The application is fully optimized for:
- ✅ Vercel deployment
- ✅ Static site generation
- ✅ Edge runtime compatibility
- ✅ Mobile responsiveness

## 🎨 Design System

### Colors
- **Primary**: Dynamic per department
- **Background**: Dark slate gradients
- **Glass**: Backdrop blur effects
- **Text**: High contrast white

### Typography
- **Font**: Inter (system fallback)
- **Weights**: 400, 500, 600, 700
- **Sizes**: Responsive scaling

### Animations
- **Micro-interactions**: Hover states, transitions
- **Page transitions**: Framer Motion
- **Loading states**: Skeleton shimmers
- **Chart animations**: Smooth data updates

## 🔧 Performance Optimizations

### Data Grid
- Virtual rendering for 100K+ rows
- Memoized cell components
- Efficient filtering algorithms
- Debounced search inputs

### Bundle Size
- Tree-shaking enabled
- Dynamic imports for heavy components
- Optimized image loading
- Minimal third-party dependencies

### Runtime Performance
- React 18 concurrent features
- State management optimizations
- Efficient re-render patterns
- Memory leak prevention

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make your changes
4. Add tests if applicable
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
- Create GitHub issue
- Check documentation
- Review examples

---

**Built with ❤️ for Indian data analytics**
