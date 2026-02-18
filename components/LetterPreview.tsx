
import React, { useMemo } from 'react';
import { PermissionLetterData } from '../types';
import { LOGO_SVG, formatTimeWithAMPM } from '../constants';
import { shareOnWhatsApp, downloadAsPDF } from '../services/actionService';

interface LetterPreviewProps {
  data: PermissionLetterData;
  onEdit: () => void;
}

const LetterPreview: React.FC<LetterPreviewProps> = ({ data, onEdit }) => {
  const handleShare = () => shareOnWhatsApp(data);
  const handleDownload = () => downloadAsPDF('letter-content', `UC_Permission_${data.societyName.replace(/\s+/g, '_')}`);

  const d2dText = data.isDoorToDoor ? " door-to-door" : "";
  const formattedStart = formatTimeWithAMPM(data.startTime);
  const formattedEnd = formatTimeWithAMPM(data.endTime);
  const plateText = data.plateCount ? ` (${data.plateCount} Plates)` : "";

  // Dynamic image logic: different professional service image for every letter
  const footerImageUrl = useMemo(() => {
    const serviceKeywords = ['cleaning', 'repair', 'interior', 'maid', 'salon', 'plumbing', 'electrician', 'painting'];
    // Use the letter ID to consistently pick one keyword
    const seed = data.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const keyword = serviceKeywords[seed % serviceKeywords.length];
    // Return a high-quality relevant image from Unsplash
    return `https://images.unsplash.com/photo-${seed % 2 === 0 ? '1581578731548-c64695cc6958' : '1621905251189-08b45d6a269e'}?auto=format&fit=crop&w=800&q=80&sig=${data.id}`;
  }, [data.id]);

  return (
    <div className="p-4 pb-24 max-w-4xl mx-auto flex flex-col items-center">
      <div className="w-full max-w-[800px] flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Preview Letter</h2>
        <button 
          onClick={onEdit}
          className="text-green-600 font-semibold px-4 py-2 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-sm border border-green-100"
        >
          Edit Details
        </button>
      </div>

      {/* A4 Sheet Container */}
      <div className="w-full overflow-x-auto bg-gray-200 p-4 rounded-xl shadow-inner flex justify-center">
        <div 
          id="letter-content" 
          className="bg-white shadow-2xl text-gray-900 leading-tight overflow-hidden relative flex flex-col"
          style={{ 
            width: '794px',   // A4 Width at 96 DPI
            height: '1123px', // A4 Height at 96 DPI
            minWidth: '794px',
            minHeight: '1123px',
            padding: '60px 80px 30px 80px',
            border: '14px solid #D4AF37', // Royal Golden Border
            boxShadow: 'inset 0 0 0 2px #996515, inset 0 0 0 5px white, inset 0 0 0 7px #D4AF37'
          }}
        >
          {/* Decorative Corner Accents */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#996515] opacity-40"></div>
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#996515] opacity-40"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#996515] opacity-40"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#996515] opacity-40"></div>

          {/* Professional Letterhead */}
          <div className="flex justify-between items-start mb-6 pb-4 border-b-2 border-black shrink-0">
             <div>
               {LOGO_SVG}
             </div>
             <div className="text-right text-[11px] text-gray-500 font-medium leading-tight">
               <p className="font-bold text-gray-700 text-[12px]">Urban Company Headquarters</p>
               <p>Service Excellence Department</p>
               <p>Regus, Cyber City, Gurgaon</p>
               <p>www.urbancompany.com</p>
             </div>
          </div>
          
          {/* Main content */}
          <div className="font-serif text-[14px] text-justify space-y-3 flex-1">
            <p>Dear Sir/Ma'am,</p>
            
            <p>Greetings from <span className="font-bold">Urban Company</span>!</p>

            <p>
              We are excited to introduce our <span className="font-bold">Instant Help Maid Service</span>, now available in your area. 
              As part of our awareness activity, our team will be visiting the society{d2dText} to distribute free samples and share quick information about our service.
            </p>

            <p>
              We kindly request permission to conduct a{d2dText} free sample distribution activity in your society.
            </p>

            {/* Event Details Section */}
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 my-2 shadow-sm">
              <p className="font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1 flex items-center gap-2 text-[14px]">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                Event Details:
              </p>
              <div className="grid grid-cols-[130px_1fr] gap-y-1 text-[13px]">
                <span className="text-gray-600">Society Name:</span> <span className="font-bold text-gray-900">{data.societyName}</span>
                <span className="text-gray-600">Event Date:</span> <span className="font-bold text-gray-900">{data.eventDate}</span>
                <span className="text-gray-600">Timing:</span> <span className="font-bold text-gray-900">{formattedStart} to {formattedEnd}</span>
                <span className="text-gray-600">Duration:</span> <span className="font-bold text-gray-900">{data.eventDuration}</span>
                {data.selectedItems && data.selectedItems.length > 0 && (
                  <>
                    <span className="text-gray-600">Attractions:</span>
                    <span className="font-bold text-gray-900">
                      {data.selectedItems.join(', ')} {data.plateCount ? `(${data.plateCount} Plates)` : ''}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <p className="font-bold text-gray-900">Request:</p>
              <ul className="list-disc pl-5 text-gray-800">
                {data.eventAmount ? (
                  <li>The agreed fee for the event is <span className="font-bold">₹{data.eventAmount}</span>.</li>
                ) : (
                  <li>Kindly share the amount for a 01-day event.</li>
                )}
                <li>Please provide the society account details for payment purposes.</li>
              </ul>
            </div>

            <div>
              <p className="mb-1 font-medium">Residents will receive:</p>
              <ul className="space-y-1 pl-4">
                <li className="flex gap-2.5">
                  <span className="text-green-600 font-bold">•</span>
                  <span><span className="font-bold">Free sample kit</span></span>
                </li>
                <li className="flex gap-2.5">
                  <span className="text-green-600 font-bold">•</span>
                  <span><span className="font-bold">Basic information about Instant Help Maid Service</span></span>
                </li>
                <li className="flex gap-2.5">
                  <span className="text-green-600 font-bold">•</span>
                  <span><span className="font-bold">Assistance on how to book services via the Urban Company App</span></span>
                </li>
                {data.selectedItems?.map((item, idx) => (
                  <li key={idx} className="flex gap-2.5">
                    <span className="text-green-600 font-bold">•</span>
                    <span><span className="font-bold">Complimentary {item} {plateText}</span></span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="pt-1">
              Our team will ensure smooth execution while following all society norms.
            </p>

            <div className="mt-4 flex justify-between items-end">
              <div>
                <p>Warm regards,</p>
                <div className="mt-1">
                  <p className="font-bold text-[17px] text-gray-900 leading-none">{data.bdeName}</p>
                  <p className="font-semibold text-gray-700 text-[14px]">{data.bdeContact}</p>
                  <p className="text-gray-500 font-medium tracking-wide text-[11px]">Team Urban Company</p>
                </div>
              </div>
              <div className="text-right flex flex-col items-end">
                <div className="mb-1 italic font-serif text-[18px] text-gray-800 pr-2 pb-1">Chandan Yadav</div>
                <div className="border-t-2 border-black w-48 mb-1"></div>
                <p className="text-[12px] text-gray-900 font-black leading-tight">CHANDAN YADAV</p>
                <p className="text-[11px] text-gray-600 font-bold">Senior Associate</p>
                <p className="text-[9px] text-gray-400 font-bold mt-1 uppercase tracking-widest">Authorised Signatory</p>
              </div>
            </div>
          </div>

          {/* Clean Original Footer Banner with Dynamic Image */}
          <div className="mt-6 mb-1 shrink-0 overflow-hidden rounded-xl shadow-md relative h-[180px] border border-gray-100">
             <img 
               src={footerImageUrl} 
               alt="Urban Company Services" 
               className="w-full h-full object-cover"
               crossOrigin="anonymous"
             />
             
             {/* Clean Branding Overlay - No dark background color as requested */}
             <div className="absolute top-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-xl border border-gray-200 flex items-center gap-3">
                   <div className="bg-black p-1.5 rounded-md">
                      <svg width="24" height="24" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <text x="25" y="34" textAnchor="middle" fill="white" fontSize="28" fontWeight="900" fontFamily="Inter, sans-serif">uc</text>
                      </svg>
                   </div>
                   <div className="flex flex-col">
                      <span className="text-black font-black text-sm tracking-tight leading-none">Urban Company</span>
                      <span className="text-gray-500 font-bold text-[7px] uppercase tracking-widest mt-0.5">Premier Home Services</span>
                   </div>
                </div>
             </div>
             
             {/* Minimalist Bottom Bar */}
             <div className="absolute bottom-0 left-0 right-0 h-7 bg-white/70 backdrop-blur-md flex items-center px-6 border-t border-gray-100">
                <p className="text-gray-800 text-[8px] font-bold tracking-[0.4em] uppercase">www.urbancompany.com</p>
                <span className="ml-auto text-gray-600 text-[7px] font-black uppercase opacity-60">Authorized Permission Document</span>
             </div>
          </div>
          
          <div className="text-[9px] text-gray-400 border-t border-gray-100 pt-1.5 flex justify-between italic shrink-0 px-2">
             <span>Urban Company Official Document</span>
             <span>Ref ID: {data.id.substring(0,8)} | Date: {new Date(data.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t shadow-lg flex gap-3 z-40 max-w-xl mx-auto rounded-t-2xl">
        <button 
          onClick={handleDownload}
          className="flex-1 bg-gray-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors active:scale-95 shadow-md"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          Download PDF
        </button>
        <button 
          onClick={handleShare}
          className="flex-1 bg-green-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors active:scale-95 shadow-md"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.886.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884 0 2.225.569 3.967 1.594 5.688l-.999 3.65 3.733-.979c.149-.039.149-.039.149-.039z"/></svg>
          Share
        </button>
      </div>
    </div>
  );
};

export default LetterPreview;
