"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const tabKeys = ["general", "ordering", "menu", "delivery", "payment"] as const;

const questionsPerTab: Record<string, string[]> = {
  general: ["q1", "q2"],
  ordering: ["q3"],
  menu: ["q2"],
  delivery: ["q4"],
  payment: ["q5"],
};

export function FAQSection() {
  const t = useTranslations("faq");
  const [activeTab, setActiveTab] = useState("general");
  const [openQuestion, setOpenQuestion] = useState<string | null>("q1");

  const toggleQuestion = (key: string) => {
    setOpenQuestion((prev) => (prev === key ? null : key));
  };

  const questions = questionsPerTab[activeTab] || [];

  return (
    <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t("title")}
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {tabKeys.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setOpenQuestion(null);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-bettery-green text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t(`tabs.${tab}` as `tabs.general`)}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            {questions.map((qKey) => (
              <div
                key={qKey}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleQuestion(qKey)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-gray-900 pr-4">
                    {t(`questions.${qKey}` as `questions.q1`)}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                      openQuestion === qKey ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openQuestion === qKey && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-5 text-gray-500 text-sm leading-relaxed">
                        {t(`questions.a${qKey.slice(1)}` as `questions.a1`)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
