import { FileText, Sparkles, CheckCircle, Target, Clock, Zap, ArrowRight } from "lucide-react";
import Nav from "../components/NavBar";
import Footer from "../components/Footer";
import HeroSec from "../components/HeroSec";

export default function home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
      <div className="w-full">
        <Nav />
      </div>

      <HeroSec />

      {/* footer */}
      <Footer />
    </div>
  );
}
