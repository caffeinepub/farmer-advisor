import { MessageSquare } from "lucide-react";
import { motion } from "motion/react";
import { AdvisorChat } from "../components/AdvisorChat";

export function AdvisorPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Advisor Chat</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Get instant AI-powered answers to all your farming questions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AdvisorChat />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="space-y-4">
            <div className="bg-card rounded-xl border border-border shadow-card p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Suggested Questions
              </h3>
              <div className="space-y-2">
                {[
                  "When is the best time to plant tomatoes?",
                  "How do I treat aphid infestations?",
                  "What's the ideal soil pH for corn?",
                  "How often should I water pepper plants?",
                  "What fertilizers work best for leafy greens?",
                  "How do I prevent powdery mildew?",
                ].map((q) => (
                  <div
                    key={q}
                    className="text-xs text-muted-foreground p-2.5 rounded-lg bg-muted/50 border border-border hover:border-primary/30 hover:text-foreground transition-colors cursor-default"
                  >
                    {q}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-accent/30 rounded-xl border border-accent p-4">
              <h3 className="text-sm font-semibold text-foreground mb-2">
                About FarmAdvisor AI
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                FarmAdvisor AI is trained on agricultural best practices, crop
                science, and pest management techniques to give you reliable,
                actionable advice.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
