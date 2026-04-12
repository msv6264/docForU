import {
  FileText,
  Sparkles,
  CheckCircle,
  Target,
  Clock,
  Zap,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeroSec() {
  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Custom Templates",
      description:
        "Choose your own template or let AI create one based on your requirements",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Generation",
      description:
        "Advanced AI fills your documents with relevant, well-structured content",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Lightning Fast",
      description:
        "Generate complete presentations and documents in minutes, not hours",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Multiple Formats",
      description: "Support for presentations, and various document",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Flexible Structure",
      description:
        "Define intro, contents, body, conclusion - complete control over your document",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Rule-Based",
      description:
        "Set specific rules and guidelines for AI to follow during generation",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Enter Topic",
      description:
        "Start by telling us what your presentation or document is about",
    },
    {
      number: "02",
      title: "Select Document Type & Size",
      description:
        "Choose your document type and specify how many slides you need.",
    },
  ];

  const Navigate = useNavigate();

  const tools = [
    {
      id: 1,
      icon: FileText,
      disabled: false,
      iconColor: "#2563EB",
      iconBg: "linear-gradient(135deg, #EFF6FF, #CFFAFE)",
      accentGradient: "linear-gradient(90deg, #3B82F6, #06B6D4)",
      badge: "Most popular",
      badgeStyle: { background: "#EFF6FF", color: "#1D4ED8" },
      name: "Generate Document",
      desc: "Specify a topic, number of slides or pages, and section titles — AI handles the rest.",
      highlights: [
        "Custom structure & slide count",
        "PPTX & DOCX output",
        "Rule-based content control",
      ],
      button: "Start generating",
      dotColor: "#3B82F6",
      route: "/TopicName",
    },
    {
      id: 2,
      icon: Zap,
      disabled: false,
      iconColor: "#7C3AED",
      iconBg: "linear-gradient(135deg, #F5F3FF, #FDF2F8)",
      accentGradient: "linear-gradient(90deg, #8B5CF6, #EC4899)",
      badge: "Upload & fill",
      badgeStyle: { background: "#F5F3FF", color: "#6D28D9" },
      name: "Template Injection",
      desc: "Upload your own DOCX or PPT template — AI reads the structure and fills every section intelligently.",
      highlights: [
        "Preserves your formatting",
        "Supports DOCX & PPT",
        "Topic-aware content fill",
      ],
      button: "Upload template",
      dotColor: "#8B5CF6",
      route: "/TemplateUpload",
    },
  ];

  return (
    <>
      <section className="max-w-7xl max-sm:h-100vh mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              AI-Powered Document Generation
            </span>
          </div>

          <h1 className="text-7xl md:text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">
            Create Perfect &nbsp;
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Presentations & Docs &nbsp;
            </span>
            in Seconds
          </h1>

          <p className="text-lg text-gray-600 max-w-full mx-auto">
            Stop struggling with last-minute assignments. docForU uses advanced
            AI to generate customized presentations and documents that follow
            YOUR template and YOUR rules.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto mt-10">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.id}
                  className="relative bg-white rounded-2xl border border-gray-100 p-7 flex flex-col gap-4 overflow-hidden hover:-translate-y-1 hover:shadow-blue-100 hover:shadow-xl transition-all duration-200 cursor-pointer"
                  style={{
                    borderTop: `3px solid transparent`,
                    backgroundImage: `linear-gradient(white, white), ${tool.accentGradient}`,
                    backgroundOrigin: "border-box",
                    backgroundClip: "padding-box, border-box",
                  }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: tool.iconBg }}
                    >
                      <Icon
                        style={{ color: tool.iconColor }}
                        className="w-6 h-6"
                      />
                    </div>
                    <span
                      className="text-xs font-medium px-3 py-1 rounded-full"
                      style={tool.badgeStyle}
                    >
                      {tool.badge}
                    </span>
                  </div>

                  {/* Text */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-1">
                      {tool.name}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>

                  {/* Highlights */}
                  <ul className="flex flex-col gap-1.5">
                    {tool.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-500"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: tool.dotColor }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <button
                    disabled={tool.disabled}
                    onClick={() => {
                      localStorage.removeItem("docData");
                      Navigate(tool.route);
                    }}
                    className={`mt-auto flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-white transition 
  ${tool.disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}`}
                    style={{ background: tool.accentGradient }}
                  >
                    <span>{tool.disabled ? "Coming Soon 🚧" : tool.button}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600 pt-8">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>5 free documents</span>
            </div>
          </div>
        </div>

        {/* Hero Image/Mockup */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl blur-3xl opacity-20"></div>
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-blue-100">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                  <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Topic</p>
                    <p className="font-semibold text-gray-900">
                      Climate Change Impact
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-cyan-50 rounded-lg">
                  <div className="bg-cyan-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Slides</p>
                    <p className="font-semibold text-gray-900">12 slides</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                  <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="font-semibold text-gray-900">
                      Academic Presentation
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-6 text-white">
                  <FileText className="w-12 h-12 mb-4 opacity-80" />
                  <h3 className="text-xl font-bold mb-2">
                    Your Custom Template
                  </h3>
                  <p className="text-blue-100">
                    Upload your template or define structure: intro (2 slides),
                    content (8 slides), conclusion (2 slides)
                  </p>
                </div>
                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm">
                    AI generating your perfect document...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 max-sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-blue-600">docForU</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The only tool that truly adapts to your needs, not the other way
              around
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50"
      >
        <div className="max-w-7xl mx-auto px-4 max-sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple. Smart. <span className="text-blue-600">Effective.</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create professional documents in 5 easy steps
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
              >
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-lg">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden md:block w-6 h-6 text-blue-400 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 max-sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Stop Stressing About Presentations?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students who've already saved hours with docForU
          </p>
          <button
            className="bg-white text-blue-600 px-10 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl transition transform hover:scale-105 inline-flex items-center space-x-2 cursor-pointer"
            onClick={() => {
              localStorage.removeItem("docData");
              Navigate("/TopicName");
            }}
          >
            <span>Start Creating Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-blue-100 mt-4">
            No credit card required • 5 free documents
          </p>
        </div>
      </section>
    </>
  );
}
