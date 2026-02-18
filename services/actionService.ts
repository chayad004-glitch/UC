
import { LETTER_TEMPLATE } from '../constants';
import { PermissionLetterData } from '../types';

declare const jspdf: any;
declare const html2canvas: any;

export const shareOnWhatsApp = (data: PermissionLetterData) => {
  const text = encodeURIComponent(LETTER_TEMPLATE(data));
  const url = `https://wa.me/${data.bdeContact}?text=${text}`;
  window.open(url, '_blank');
};

export const downloadAsPDF = async (elementId: string, fileName: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Use a fixed width for capture to maintain aspect ratio
  const canvas = await html2canvas(element, {
    scale: 2, // High resolution
    useCORS: true,
    width: 794,  // Capture at fixed A4 width
    height: 1123, // Capture at fixed A4 height
    windowWidth: 794,
    windowHeight: 1123
  });
  
  const imgData = canvas.toDataURL('image/png');
  const { jsPDF } = (window as any).jspdf;
  
  // Create A4 PDF
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });
  
  const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
  const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm
  
  // Force image to fit entire A4 page
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(`${fileName}.pdf`);
};
