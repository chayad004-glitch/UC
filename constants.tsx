
import React from 'react';

export const COLORS = {
  primary: "#141414", // UC Brand Color
  accent: "#2da343",  // UC Green
  background: "#FFFFFF",
};

export const formatTimeWithAMPM = (timeString: string) => {
  if (!timeString) return '';
  const [hours, minutes] = timeString.split(':');
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hours12 = h % 12 || 12;
  
  let period = '';
  if (h >= 4 && h < 12) period = 'Morning';
  else if (h >= 12 && h < 16) period = 'Afternoon';
  else if (h >= 16 && h < 20) period = 'Evening';
  else period = 'Evening Night';
  
  return `${hours12}:${minutes} ${ampm} (${period})`;
};

export const LOGO_SVG = (
  <svg width="180" height="50" viewBox="0 0 180 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* The 'uc' square icon */}
    <rect width="50" height="50" rx="10" fill="black"/>
    <text x="25" y="34" textAnchor="middle" fill="white" fontSize="22" fontWeight="800" fontFamily="Inter, sans-serif">uc</text>
    
    {/* The 'Urban Company' text */}
    <text x="62" y="22" fill="black" fontSize="20" fontWeight="700" fontFamily="Inter, sans-serif">Urban</text>
    <text x="62" y="44" fill="black" fontSize="20" fontWeight="700" fontFamily="Inter, sans-serif">Company</text>
  </svg>
);

export const LOGO_ICON_SVG = (
  <svg width="32" height="32" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="50" height="50" rx="10" fill="black"/>
    <text x="25" y="34" textAnchor="middle" fill="white" fontSize="22" fontWeight="800" fontFamily="Inter, sans-serif">uc</text>
  </svg>
);

export const LETTER_TEMPLATE = (data: any) => {
  const d2dText = data.isDoorToDoor ? " door-to-door" : "";
  const start = formatTimeWithAMPM(data.startTime);
  const end = formatTimeWithAMPM(data.endTime);
  const plateText = data.plateCount ? ` (${data.plateCount} Plates)` : "";
  const itemsText = data.selectedItems && data.selectedItems.length > 0 
    ? `\nSpecial Attractions:\n${data.selectedItems.map((item: string) => `• *${item}*${plateText}`).join('\n')}`
    : "";
  
  const amountText = data.eventAmount 
    ? `The agreed fee for the event is *₹${data.eventAmount}*.`
    : "Kindly share the amount for a 01-day event.";

  return `Dear Sir/Ma'am,

Greetings from *Urban Company*!

We are excited to introduce our *Instant Help Maid Service*, now available in your area. As part of our awareness activity, our team will be visiting the society${d2dText} to distribute free samples and share quick information about our service.

We kindly request permission to conduct a${d2dText} free sample distribution activity in your society.

*Event Details:*
Society Name: *${data.societyName}*
Date: *${data.eventDate}*
Time: *${start}* to *${end}*
Duration: *${data.eventDuration}*
${itemsText}

*Request:*
${amountText}
Please provide the society account details for payment purposes.

Residents will receive:
• *Free sample kit*
• *Basic information about Instant Help Maid Service*
• *Assistance on how to book services via the Urban Company App*
${data.selectedItems?.map((item: string) => `• *Complimentary ${item}*${plateText}`).join('\n')}

Our team will ensure smooth execution while following all society norms.

Warm regards,
*${data.bdeName}*
*${data.bdeContact}*

*Authorised Signatory:*
*Chandan Yadav*
*Senior Associate*
Team Urban Company`;
};
