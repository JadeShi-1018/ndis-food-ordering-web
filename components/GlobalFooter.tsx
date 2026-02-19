// components/GloberFooter.tsx
import { Mail, Phone, Ear } from 'lucide-react';

const GloberFooter = () => {
    const year = new Date().getFullYear();
  return (
    <footer className="bg-white text-slate-700 border-t border-slate-200 text-sm py-6 flex flex-col items-center space-y-2">
      <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-2 text-sm">

        {/* Contact Us */}
        <div className="flex items-center gap-1.5">
          <span className="font-semibold">Contact Us</span>
        </div>

        {/* Email */}
        <div className="flex items-center gap-1.5">
          <Mail size={16} />
          <a href="mailto:NDIS0988000000@gmail.com" className="hover:underline">
            NDIS0988000000@gmail.com
          </a>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-1.5">
          <Phone size={16} />
          <a href="tel:+61000000000" className="hover:underline">
            +61 000 000 000
          </a>
        </div>

        {/* Accessible Features */}
        <div className="flex items-center gap-1.5">
          <span className="font-semibold">Accessible Features</span>
        </div>

        {/* Audio Service */}
        <div className="flex items-center gap-1.5">
          <Ear size={16} />
          <span>Audio Service</span>
        </div>

      </div>

      <div className="text-xs text-center pt-2">
        © {year} NDIS Service System.
      </div>
    </footer>
  );
};

export default GloberFooter;
