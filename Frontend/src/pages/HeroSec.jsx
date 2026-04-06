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

  return (
    <>
      <section className="max-w-7xl max-sm:h-100vh mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              AI-Powered Document Generation
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
            Create Perfect
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Presentations & Docs
            </span>
            <br />
            In Minutes
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stop struggling with last-minute assignments. docForU uses advanced
            AI to generate customized presentations and documents that follow
            YOUR template and YOUR rules.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition transform hover:scale-105 flex items-center cursor-pointer space-x-2"
              onClick={() => Navigate("/TopicName")}
            >
              <span>Start Free</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-blue-200 hover:border-blue-400 transition">
              Watch Demo
            </button>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Stop Stressing About Presentations?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students who've already saved hours with docForU
          </p>
          <button
            className="bg-white text-blue-600 px-10 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl transition transform hover:scale-105 inline-flex items-center space-x-2 cursor-pointer"
            onClick={() => Navigate("/TopicName")}
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
