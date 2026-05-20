# AI Flash-Card Sprint 🚀

**AI Flash-Card Sprint** is a modern, high-performance web application designed to help you master complex topics through AI-powered study sessions. Leverage the power of Generative AI to create custom flashcard decks in seconds and track your learning progress with a sleek, intuitive dashboard.

## ✨ Features

-   **🤖 AI Deck Generation**: Instantly generate comprehensive flashcard decks from any topic or prompt using Google's Gemini Pro API.
-   **⏱️ Study Sessions**: Engage in focused study sessions with real-time feedback and progress tracking.
-   **📊 Learning Dashboard**: Monitor your overall proficiency, total cards mastered, and active study sessions at a glance.
-   **🌓 Dark Mode Support**: Fully responsive UI with seamless theme switching (System, Light, and Dark).
-   **🏗️ Demo Mode**: Explore the app's full capabilities instantly without needing to sign up.
-   **🔐 Secure Authentication**: Integrated with Clerk for reliable and secure user management.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
-   **AI Engine**: [Google Generative AI (Gemini Pro)](https://ai.google.dev/)
-   **Authentication**: [Clerk](https://clerk.com/)
-   **State Management**: React Hooks & Server Actions
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Database**: Mock Database (State-persistent during development)
-   **Components**: [Radix UI](https://www.radix-ui.com/) & [Shadcn UI](https://ui.shadcn.com/)

## 🚀 Getting Started

### Prerequisites

-   Node.js 20+
-   An API key for Google Gemini (optional for manual study, required for AI generation)
-   Clerk API keys for authentication

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/ai-decks.git
    cd ai-decks
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env.local` file in the root directory and add your keys:
    ```env
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_pub_key
    CLERK_SECRET_KEY=your_clerk_secret_key
    GOOGLE_GENAI_API_KEY=your_google_ai_key
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

-   `app/`: Next.js App Router pages and layouts.
-   `components/`: Reusable React components (Study engine, Deck cards, UI elements).
-   `lib/`: Core logic, including server actions (`actions/`), database schema (`db.ts`), and mock data (`mock-data.ts`).
-   `public/`: Static assets.

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information (if applicable).
