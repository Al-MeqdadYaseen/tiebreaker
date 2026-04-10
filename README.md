# The Tiebreaker ⚖️

An AI-powered decision-making assistant that helps you break down tough choices. Provide a decision you're trying to make, and let Google's Gemini AI generate concise, highly readable insights to help you weigh your options.

## ✨ Features

*   **Pros & Cons List:** Get a balanced, objective breakdown of the advantages and disadvantages of a specific choice.
*   **Comparison Tables:** Evaluate multiple options side-by-side with scannable criteria.
*   **SWOT Analysis:** Dive deeper into the Strengths, Weaknesses, Opportunities, and Threats of a situation.
*   **Concise AI Outputs:** Prompted specifically to deliver short, punchy, and highly readable markdown formatting without the fluff.
*   **Modern UI:** A clean, responsive, and accessible interface built with Tailwind CSS and Lucide icons.

## 🛠️ Tech Stack

*   **Frontend:** React 19, Vite
*   **Styling:** Tailwind CSS v4, Tailwind Typography
*   **AI Integration:** Google Gemini API (`@google/genai` SDK)
*   **Markdown Rendering:** `react-markdown`, `remark-gfm`
*   **Icons:** `lucide-react`

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or higher recommended)
*   A Google Gemini API Key (Get one from [Google AI Studio](https://aistudio.google.com/))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/the-tiebreaker.git
   cd the-tiebreaker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   VITE_GEMINI_API_KEY="your_api_key_here"
   ```
   *(Note: If you are running this in a standard Vite environment, you may need to update the API key reference in `App.tsx` from `process.env.GEMINI_API_KEY` to `import.meta.env.VITE_GEMINI_API_KEY`, depending on your Vite config).*

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` (or the port provided by Vite).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Al-MeqdadYaseen/tiebreaker/issues).

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
