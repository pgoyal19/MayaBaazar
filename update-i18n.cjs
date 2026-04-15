const fs = require('fs');
const path = require('path');

const i18nPath = './server/i18n';

const dicts = {
  en: {
    "comp.title": "Grants & Competitions",
    "comp.sub": "Discover and apply for national awards, government schemes, and private fellowships to elevate your craft and scale your business.",
    "comp.prize": "Prize / Grant",
    "comp.apply": "Apply Now →",
    "comp.closed": "Applications Closed",

    "grants.title1": "Grants, Fellowships &",
    "grants.title2": "Sponsorships",
    "grants.sub": "Elevate your craft and secure your future. Explore hand-picked fellowships, corporate sponsorships, and transformative grants designed for visionary artisans.",
    "grants.prize": "Award / Prize",
    "grants.apply": "Apply for Program 🚀",

    "ngos.csr": "CSR & IMPACT",
    "ngos.title1": "Partner with",
    "ngos.title2": "NGOs",
    "ngos.sub": "We collaborate with grassroots organizations across India to empower artisans, preserve dying crafts, and ensure fair trade practices. Support their mission today.",
    "ngos.impact": "Impacted",
    "ngos.est": "Established",
    "ngos.donate": "Donate ❤️",
    "ngos.volunteer": "Volunteer",

    "auc.title": "The Elite Auction",
    "auc.quote": "\"Mogambo khush hua...\"",
    "auc.quote2": "\"Dedh sau rupaiya dega!\"",
    "auc.desc1": "when he saw these priceless artifacts! Bid on rare, one-of-a-kind heritage pieces directly from the hands of master craftsmen.",
    "auc.desc2": "- Keep the Hera Pheri for the movies. Serious bids only.",
    "auc.origin": "Craft origin:",
    "auc.cbid": "Current Bid",
    "auc.bmade": "Bids Made",
    "auc.closed": "Auction Closed",
    "auc.bid": "Bid",
    "auc.sold": "SOLD"
  },
  hi: {
    "comp.title": "अनुदान और प्रतियोगिताएं",
    "comp.sub": "राष्ट्रीय पुरस्कारों, सरकारी योजनाओं और निजी फैलोशिप के लिए खोजें और आवेदन करें।",
    "comp.prize": "पुरस्कार / अनुदान",
    "comp.apply": "अभी आवेदन करें →",
    "comp.closed": "आवेदन बंद",

    "grants.title1": "अनुदान, फैलोशिप व",
    "grants.title2": "प्रायोजन",
    "grants.sub": "अपने शिल्प को आगे बढ़ाएं। दूरदर्शी कारीगरों के लिए डिज़ाइन किए गए अनुदान खोजें।",
    "grants.prize": "पुरस्कार",
    "grants.apply": "आवेदन करें 🚀",

    "ngos.csr": "सी.एस.आर और प्रभाव",
    "ngos.title1": "एनजीओ (NGO) के साथ",
    "ngos.title2": "साझेदारी",
    "ngos.sub": "हम कारीगरों को सशक्त बनाने के लिए जमीनी संगठनों के साथ सहयोग करते हैं।",
    "ngos.impact": "प्रभावित",
    "ngos.est": "स्थापित",
    "ngos.donate": "दान करें ❤️",
    "ngos.volunteer": "स्वयंसेवक बनें",

    "auc.title": "प्रीमियम नीलामी",
    "auc.quote": "\"मोगैंबो खुश हुआ...\"",
    "auc.quote2": "\"डेढ़ सौ रुपया देगा!\"",
    "auc.desc1": "जब उसने इन अमूल्य कलाकृतियों को देखा! मास्टर कारीगरों की दुर्लभ विरासत पर बोली लगाएं।",
    "auc.desc2": "- हेरा फेरी फिल्मों के लिए छोड़ दें। केवल गंभीर बोलियां।",
    "auc.origin": "शिल्प मूल:",
    "auc.cbid": "वर्तमान बोली",
    "auc.bmade": "बोलियां लगीं",
    "auc.closed": "नीलामी बंद",
    "auc.bid": "बोली लगाएं",
    "auc.sold": "बिक गया"
  },
  ta: {
    "comp.title": "மானியங்கள் மற்றும் போட்டிகள்",
    "comp.sub": "தேசிய விருதுகள், அரசாங்க திட்டங்கள் மற்றும் தனியார் பெல்லோஷிப் ஆகியவற்றைக் கண்டறியவும்.",
    "comp.prize": "பரிசு / மானியம்",
    "comp.apply": "விண்ணப்பிக்கவும் →",
    "comp.closed": "விண்ணப்பங்கள் முடிந்தது",

    "grants.title1": "மானியங்கள் மற்றும்",
    "grants.title2": "ஸ்பான்சர்ஷிப்",
    "grants.sub": "கைவினைஞர்களுக்காக வடிவமைக்கப்பட்ட மானியங்களை ஆராயுங்கள்.",
    "grants.prize": "விருது",
    "grants.apply": "விண்ணப்பிக்கவும் 🚀",

    "ngos.csr": "சுற்றுச்சூழல் & சமூக தாக்கம்",
    "ngos.title1": "என்ஜிஓ (NGO) உடன்",
    "ngos.title2": "கூட்டாண்மை",
    "ngos.sub": "கைவினைஞர்களை மேம்படுத்த அடிமட்ட அமைப்புகளுடன் நாங்கள் ஒத்துழைக்கிறோம்.",
    "ngos.impact": "பயனடைந்தவர்கள்",
    "ngos.est": "தொடங்கப்பட்டது",
    "ngos.donate": "நன்கொடை ❤️",
    "ngos.volunteer": "தன்னார்வலர்",

    "auc.title": "உயர்தர ஏலம்",
    "auc.quote": "\"மொகாம்போ குஷ் ஹுவா...\"",
    "auc.quote2": "\"தேத் சௌ ரூபாயா தேகா!\"",
    "auc.desc1": "இந்த விலைமதிப்பற்ற கலைப்பொருட்களைக் கண்டதும்! அரிய கலைப்பொருட்கள் மீது ஏலம் கேட்கவும்.",
    "auc.desc2": "- தீவிர ஏலதாரர்கள் மட்டும் வரவும்.",
    "auc.origin": "உற்பத்தி இடம்:",
    "auc.cbid": "தற்போதைய ஏலம்",
    "auc.bmade": "ஏலங்கள்",
    "auc.closed": "ஏலம் முடிந்தது",
    "auc.bid": "ஏலம்",
    "auc.sold": "விற்கப்பட்டது"
  }
};

['en', 'hi', 'ta'].forEach(lang => {
  const f = path.join(i18nPath, `${lang}.json`);
  let parsed = {};
  if (fs.existsSync(f)) {
    parsed = JSON.parse(fs.readFileSync(f));
  }
  Object.assign(parsed, dicts[lang]);
  fs.writeFileSync(f, JSON.stringify(parsed, null, 2));
});
