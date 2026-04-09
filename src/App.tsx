import { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Loader2, Scale, Table as TableIcon, Target, ArrowRight, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type AnalysisType = 'pros-cons' | 'comparison' | 'swot';

const ANALYSIS_TYPES: { id: AnalysisType; label: string; icon: React.ElementType; description: string }[] = [
  {
    id: 'pros-cons',
    label: 'Pros & Cons',
    icon: Scale,
    description: 'A balanced list of advantages and disadvantages.',
  },
  {
    id: 'comparison',
    label: 'Comparison Table',
    icon: TableIcon,
    description: 'A side-by-side comparison of your options.',
  },
  {
    id: 'swot',
    label: 'SWOT Analysis',
    icon: Target,
    description: 'Strengths, Weaknesses, Opportunities, and Threats.',
  },
];

export default function App() {
  const [decision, setDecision] = useState('');
  const [analysisType, setAnalysisType] = useState<AnalysisType>('pros-cons');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!decision.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      let systemInstruction = '';
      if (analysisType === 'pros-cons') {
        systemInstruction = 'You are an expert decision-making assistant. The user will provide a decision they are trying to make. Provide a concise, highly readable Pros and Cons list. Use markdown formatting with clear headings and short, punchy bullet points. Avoid long paragraphs. Be objective and get straight to the point.';
      } else if (analysisType === 'comparison') {
        systemInstruction = 'You are an expert decision-making assistant. The user will provide a decision involving multiple options. Provide a concise, easy-to-read comparison table of the available options. Use markdown formatting with a table. Keep the text in the table cells very brief and scannable. If the user only provides one option, compare it against the status quo or common alternatives. Avoid long introductory or concluding paragraphs.';
      } else if (analysisType === 'swot') {
        systemInstruction = 'You are an expert decision-making assistant. The user will provide a decision or situation. Provide a concise, highly readable SWOT (Strengths, Weaknesses, Opportunities, Threats) analysis. Use markdown formatting with clear headings and short, punchy bullet points. Avoid long paragraphs. Be objective and get straight to the point.';
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Decision to analyze: ${decision}`,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      setResult(response.text || 'No analysis generated.');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while generating the analysis.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 pb-20">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-2xl mb-6 shadow-sm">
            <Sparkles className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            The Tiebreaker
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Make decisions with confidence. Describe what you're trying to decide, and let AI break it down for you.
          </p>
        </header>

        <main className="space-y-8">
          {/* Input Section */}
          <section className="bg-white rounded-3xl shadow-sm border border-slate-200/60 p-6 sm:p-8 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
            
            <div className="space-y-8">
              <div>
                <label htmlFor="decision" className="block text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">
                  What's on your mind?
                </label>
                <textarea
                  id="decision"
                  rows={4}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none text-lg"
                  placeholder="e.g., Should I buy a used car or lease a new one? Should we move to the suburbs or stay in the city?"
                  value={decision}
                  onChange={(e) => setDecision(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">
                  Analysis Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {ANALYSIS_TYPES.map((type) => {
                    const Icon = type.icon;
                    const isSelected = analysisType === type.id;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setAnalysisType(type.id)}
                        className={cn(
                          "relative flex flex-col items-start p-5 rounded-2xl border-2 text-left transition-all duration-200",
                          isSelected
                            ? "border-indigo-600 bg-indigo-50/50 shadow-sm"
                            : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50"
                        )}
                      >
                        <div className="flex items-center justify-between w-full mb-3">
                          <Icon className={cn("w-6 h-6", isSelected ? "text-indigo-600" : "text-slate-400")} />
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-600" />}
                        </div>
                        <span className={cn("font-semibold mb-1", isSelected ? "text-indigo-900" : "text-slate-700")}>
                          {type.label}
                        </span>
                        <span className="text-sm text-slate-500 line-clamp-2">
                          {type.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleGenerate}
                  disabled={!decision.trim() || isLoading}
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-2xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Help Me Decide
                      <ArrowRight className="w-6 h-6 ml-3" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* Error Section */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-start shadow-sm">
              <AlertCircle className="w-6 h-6 text-red-600 mt-0.5 mr-4 flex-shrink-0" />
              <p className="text-red-800 text-base">{error}</p>
            </div>
          )}

          {/* Result Section */}
          {result && (
            <section className="bg-white rounded-3xl shadow-sm border border-slate-200/60 p-6 sm:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="prose prose-slate prose-lg max-w-none prose-headings:font-semibold prose-a:text-indigo-600 hover:prose-a:text-indigo-500 prose-table:w-full prose-th:bg-slate-50 prose-th:p-4 prose-td:p-4 prose-tr:border-b prose-tr:border-slate-200">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {result}
                </ReactMarkdown>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
