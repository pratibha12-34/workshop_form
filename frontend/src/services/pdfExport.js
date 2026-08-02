import { jsPDF } from 'jspdf';

export const exportCertificatePDF = (arg1, arg2, arg3) => {
  const defaults = {
    userName: 'Aarav Sharma',
    dateStr: new Date().toISOString().split('T')[0],
    lang: 'en',
    type: 'daily',
    badge: null
  };

  const options = typeof arg1 === 'object' && arg1 !== null
    ? { ...defaults, ...arg1 }
    : { ...defaults, userName: arg1 || defaults.userName, dateStr: arg2 || defaults.dateStr, lang: arg3 || defaults.lang };

  const { userName, dateStr, lang, type, badge } = options;
  const isHindi = lang === 'hi';
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  // Background
  doc.setFillColor(15, 23, 42); // Deep Slate
  doc.rect(0, 0, width, height, 'F');

  // Outer Border Gradient Colors (Tiranga)
  doc.setLineWidth(3);
  
  // Saffron top border
  doc.setDrawColor(255, 153, 51);
  doc.line(10, 10, width - 10, 10);
  
  // Green bottom border
  doc.setDrawColor(19, 136, 8);
  doc.line(10, height - 10, width - 10, height - 10);
  
  // White side borders
  doc.setDrawColor(255, 255, 255);
  doc.line(10, 10, 10, height - 10);
  doc.line(width - 10, 10, width - 10, height - 10);

  // Inner Box Border
  doc.setLineWidth(0.8);
  doc.setDrawColor(255, 215, 0); // Gold
  doc.rect(15, 15, width - 30, height - 30);

  const isBadgeCertificate = type === 'badge' && badge;
  const title = isBadgeCertificate
    ? (isHindi ? 'बैज उपलब्धि प्रमाण-पत्र' : 'CERTIFICATE OF BADGE ACHIEVEMENT')
    : (isHindi ? 'दैनिक पूर्णता प्रमाण-पत्र' : 'CERTIFICATE OF DAILY COMPLETION');
  const subtitle = isBadgeCertificate
    ? (isHindi ? `बैज प्राप्त: ${badge.nameHi}` : `BADGE ACHIEVED: ${badge.nameEn}`)
    : (isHindi ? 'सभी कार्य पूरे' : 'ALL TASKS COMPLETED FOR THE DAY');
  const bodyMessage = isBadgeCertificate
    ? (isHindi
      ? `ने ${badge.nameHi} बैज प्राप्त कर अनुशासन, दृढ़ता और निरंतर प्रयासों की प्रतिष्ठा को दर्शाया।`
      : `For achieving the ${badge.nameEn} through discipline, perseverance, and consistent effort.`)
    : (isHindi
      ? 'आज के सभी दैनिक मिशन लक्ष्यों को 100% पूरा करने पर यह प्रमाण-पत्र प्रदान किया जाता है।'
      : 'For completing 100% of today\'s mission goals with dedication and discipline.');
  const closingLine = isHindi ? 'कार्तव्य! अपना कर्तव्य सम्मान के साथ पूरा किया।' : 'KARTAVYA! Duty fulfilled with pride.';

  // Header Title
  doc.setTextColor(255, 153, 51);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text(title, width / 2, 35, { align: 'center' });

  // Subtitle
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(subtitle, width / 2, 48, { align: 'center' });

  // Divider
  doc.setDrawColor(255, 215, 0);
  doc.setLineWidth(1);
  doc.line(width / 2 - 40, 54, width / 2 + 40, 54);

  // Body Text
  doc.setTextColor(203, 213, 225);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('This certificate is proudly awarded to', width / 2, 70, { align: 'center' });

  // User Name
  doc.setTextColor(255, 215, 0); // Gold
  doc.setFontSize(26);
  doc.setFont('helvetica', 'bold');
  doc.text(userName.toUpperCase(), width / 2, 88, { align: 'center' });

  // Message
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'normal');
  doc.text(bodyMessage, width / 2, 106, { align: 'center' });

  doc.setTextColor(19, 136, 8); // Green Accent
  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  doc.text(closingLine, width / 2, 120, { align: 'center' });

  // Date and Seal Section
  doc.setTextColor(148, 163, 184);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Date: ${dateStr}`, 45, 155);

  // Official Badge Seal Emblem
  doc.setDrawColor(255, 215, 0);
  doc.setFillColor(30, 41, 59);
  doc.circle(width / 2, 150, 16, 'FD');
  
  doc.setTextColor(255, 215, 0);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('OFFICIAL', width / 2, 148, { align: 'center' });
  doc.text('SEAL', width / 2, 154, { align: 'center' });

  // Signature
  doc.setDrawColor(255, 255, 255);
  doc.line(width - 85, 152, width - 35, 152);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Freedom Focus Board', width - 60, 158, { align: 'center' });
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('Verified Authority', width - 60, 164, { align: 'center' });

  // Save PDF
  const badgeName = isBadgeCertificate && badge && typeof badge.nameEn === 'string' ? badge.nameEn : 'daily';
  const safeName = badgeName.toLowerCase().replace(/[^a-z0-9]+/g, '_');
  doc.save(`KARTAVYA_${isBadgeCertificate ? `Badge_${safeName}` : 'Daily_Certificate'}_${dateStr}.pdf`);
};
