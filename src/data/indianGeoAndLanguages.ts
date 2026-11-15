export interface IndianRegion {
  name: string;
  code: string;
  type: 'State' | 'Union Territory';
  capital: string;
  districts: string[];
}

export const ALL_INDIAN_STATES_AND_UTS: IndianRegion[] = [
  // 28 States
  {
    name: 'Andhra Pradesh',
    code: 'AP',
    type: 'State',
    capital: 'Amaravati',
    districts: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Kurnool', 'Anantapur', 'Nellore', 'Kakinada']
  },
  {
    name: 'Arunachal Pradesh',
    code: 'AR',
    type: 'State',
    capital: 'Itanagar',
    districts: ['Papum Pare', 'Tawang', 'West Kameng', 'Changlang', 'Lower Subansiri', 'East Siang']
  },
  {
    name: 'Assam',
    code: 'AS',
    type: 'State',
    capital: 'Dispur',
    districts: ['Kamrup Metropolitan (Guwahati)', 'Dibrugarh', 'Silchar', 'Jorhat', 'Nagaon', 'Barpeta', 'Cachar']
  },
  {
    name: 'Bihar',
    code: 'BR',
    type: 'State',
    capital: 'Patna',
    districts: ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga', 'Purnia', 'Nalanda', 'Rohtas']
  },
  {
    name: 'Chhattisgarh',
    code: 'CG',
    type: 'State',
    capital: 'Raipur',
    districts: ['Raipur', 'Bilaspur', 'Durg', 'Bhilai', 'Bastar (Jagdalpur)', 'Korba', 'Rajnandgaon']
  },
  {
    name: 'Goa',
    code: 'GA',
    type: 'State',
    capital: 'Panaji',
    districts: ['North Goa', 'South Goa']
  },
  {
    name: 'Gujarat',
    code: 'GJ',
    type: 'State',
    capital: 'Gandhinagar',
    districts: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Gandhinagar', 'Kutch']
  },
  {
    name: 'Haryana',
    code: 'HR',
    type: 'State',
    capital: 'Chandigarh',
    districts: ['Gurugram', 'Faridabad', 'Ambala', 'Hisar', 'Karnal', 'Panipat', 'Rohtak', 'Sonipat']
  },
  {
    name: 'Himachal Pradesh',
    code: 'HP',
    type: 'State',
    capital: 'Shimla',
    districts: ['Shimla', 'Kangra (Dharamshala)', 'Mandi', 'Kullu', 'Solan', 'Sirmaur', 'Chamba']
  },
  {
    name: 'Jharkhand',
    code: 'JH',
    type: 'State',
    capital: 'Ranchi',
    districts: ['Ranchi', 'East Singhbhum (Jamshedpur)', 'Dhanbad', 'Bokaro', 'Hazaribagh', 'Deoghar', 'Palamu']
  },
  {
    name: 'Karnataka',
    code: 'KA',
    type: 'State',
    capital: 'Bengaluru',
    districts: ['Bengaluru Urban', 'Bengaluru Rural', 'Mysuru', 'Dharwad (Hubballi)', 'Mangaluru', 'Belagavi', 'Kalaburagi', 'Shivamogga']
  },
  {
    name: 'Kerala',
    code: 'KL',
    type: 'State',
    capital: 'Thiruvananthapuram',
    districts: ['Thiruvananthapuram', 'Ernakulam (Kochi)', 'Kozhikode', 'Thrissur', 'Kollam', 'Kannur', 'Alappuzha', 'Palakkad']
  },
  {
    name: 'Madhya Pradesh',
    code: 'MP',
    type: 'State',
    capital: 'Bhopal',
    districts: ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Rewa', 'Satna']
  },
  {
    name: 'Maharashtra',
    code: 'MH',
    type: 'State',
    capital: 'Mumbai',
    districts: ['Mumbai City', 'Mumbai Suburban', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad (Chhatrapati Sambhajinagar)', 'Solapur', 'Kolhapur']
  },
  {
    name: 'Manipur',
    code: 'MN',
    type: 'State',
    capital: 'Imphal',
    districts: ['Imphal West', 'Imphal East', 'Churachandpur', 'Thoubal', 'Bishnupur', 'Ukhrul']
  },
  {
    name: 'Meghalaya',
    code: 'ML',
    type: 'State',
    capital: 'Shillong',
    districts: ['East Khasi Hills (Shillong)', 'West Garo Hills (Tura)', 'Ri-Bhoi', 'West Jaintia Hills']
  },
  {
    name: 'Mizoram',
    code: 'MZ',
    type: 'State',
    capital: 'Aizawl',
    districts: ['Aizawl', 'Lunglei', 'Champhai', 'Kolasib', 'Serchhip']
  },
  {
    name: 'Nagaland',
    code: 'NL',
    type: 'State',
    capital: 'Kohima',
    districts: ['Kohima', 'Dimapur', 'Mokokchung', 'Tuensang', 'Mon', 'Wokha']
  },
  {
    name: 'Odisha',
    code: 'OD',
    type: 'State',
    capital: 'Bhubaneswar',
    districts: ['Khordha (Bhubaneswar)', 'Cuttack', 'Ganjam', 'Sundargarh (Rourkela)', 'Sambalpur', 'Balasore', 'Puri']
  },
  {
    name: 'Punjab',
    code: 'PB',
    type: 'State',
    capital: 'Chandigarh',
    districts: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'SAS Nagar (Mohali)', 'Hoshiarpur']
  },
  {
    name: 'Rajasthan',
    code: 'RJ',
    type: 'State',
    capital: 'Jaipur',
    districts: ['Jaipur', 'Jodhpur', 'Kota', 'Udaipur', 'Bikaner', 'Ajmer', 'Alwar', 'Bharatpur']
  },
  {
    name: 'Sikkim',
    code: 'SK',
    type: 'State',
    capital: 'Gangtok',
    districts: ['East Sikkim (Gangtok)', 'West Sikkim', 'South Sikkim', 'North Sikkim']
  },
  {
    name: 'Tamil Nadu',
    code: 'TN',
    type: 'State',
    capital: 'Chennai',
    districts: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Vellore', 'Erode']
  },
  {
    name: 'Telangana',
    code: 'TG',
    type: 'State',
    capital: 'Hyderabad',
    districts: ['Hyderabad', 'Medchal-Malkajgiri', 'Rangareddy', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam']
  },
  {
    name: 'Tripura',
    code: 'TR',
    type: 'State',
    capital: 'Agartala',
    districts: ['West Tripura (Agartala)', 'Gomati', 'South Tripura', 'North Tripura', 'Dhalai']
  },
  {
    name: 'Uttar Pradesh',
    code: 'UP',
    type: 'State',
    capital: 'Lucknow',
    districts: ['Lucknow', 'Varanasi', 'Kanpur Nagar', 'Prayagraj', 'Agra', 'Meerut', 'Ghaziabad', 'Noida (Gautam Buddha Nagar)', 'Gorakhpur', 'Bareilly', 'Aligarh']
  },
  {
    name: 'Uttarakhand',
    code: 'UK',
    type: 'State',
    capital: 'Dehradun',
    districts: ['Dehradun', 'Haridwar', 'Nainital', 'Udham Singh Nagar', 'Pauri Garhwal', 'Almora']
  },
  {
    name: 'West Bengal',
    code: 'WB',
    type: 'State',
    capital: 'Kolkata',
    districts: ['Kolkata', 'North 24 Parganas', 'South 24 Parganas', 'Howrah', 'Hooghly', 'Darjeeling', 'Paschim Bardhaman', 'Malda']
  },

  // 8 Union Territories
  {
    name: 'Andaman and Nicobar Islands',
    code: 'AN',
    type: 'Union Territory',
    capital: 'Port Blair',
    districts: ['South Andaman', 'North and Middle Andaman', 'Nicobar']
  },
  {
    name: 'Chandigarh',
    code: 'CH',
    type: 'Union Territory',
    capital: 'Chandigarh',
    districts: ['Chandigarh']
  },
  {
    name: 'Dadra and Nagar Haveli and Daman and Diu',
    code: 'DN',
    type: 'Union Territory',
    capital: 'Daman',
    districts: ['Daman', 'Diu', 'Dadra and Nagar Haveli']
  },
  {
    name: 'Delhi (NCT)',
    code: 'DL',
    type: 'Union Territory',
    capital: 'New Delhi',
    districts: ['New Delhi', 'Central Delhi', 'South Delhi', 'North Delhi', 'West Delhi', 'East Delhi', 'North East Delhi', 'South West Delhi']
  },
  {
    name: 'Jammu and Kashmir',
    code: 'JK',
    type: 'Union Territory',
    capital: 'Srinagar / Jammu',
    districts: ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Udhampur', 'Pulwama', 'Kathua']
  },
  {
    name: 'Ladakh',
    code: 'LA',
    type: 'Union Territory',
    capital: 'Leh',
    districts: ['Leh', 'Kargil']
  },
  {
    name: 'Lakshadweep',
    code: 'LD',
    type: 'Union Territory',
    capital: 'Kavaratti',
    districts: ['Lakshadweep']
  },
  {
    name: 'Puducherry',
    code: 'PY',
    type: 'Union Territory',
    capital: 'Puducherry',
    districts: ['Puducherry', 'Karaikal', 'Mahe', 'Yanam']
  }
];

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
}

export const INDIAN_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' }
];

export const UI_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    appName: 'CivicLens AI',
    appSubtitle: 'National Public Accountability Platform',
    philosophy: 'Public office is public responsibility.',
    tagline: 'We don\'t put people under surveillance. We put public responsibility under public visibility.',
    heroTitle: 'Make Every Public Rupee Accountable.',
    heroSubtitle: 'Connect public funds, government projects, delivery evidence, and institutional responsibility through one AI-powered accountability platform.',
    exploreDemo: 'Explore Live Demo',
    inspectSchoolCase: 'Inspect ₹1.2L School Anomaly',
    overview: 'Overview Dashboard',
    projects: 'Public Projects',
    moneyTrail: 'Money Trail',
    aiRisk: 'AI Risk Analysis',
    responsibility: 'Responsibility Map',
    procurement: 'Procurement & Contracts',
    delivery: 'Delivery Verification',
    complaints: 'Citizen Complaints',
    audit: 'Audit & Investigation',
    reports: 'Reports & Transparency',
    dataSources: 'Data Sources & Verification',
    settings: 'System Settings',
    submitComplaint: 'Submit Public Grievance',
    trackComplaint: 'Track Grievance Status',
    allStates: 'All States & UTs',
    allDistricts: 'All Districts',
    filterByState: 'Filter by State / UT',
    selectIssueCategory: 'Select Issue Category',
    complaintLogged: 'Grievance Registered Successfully',
    copyId: 'Copy Token ID'
  },
  hi: {
    appName: 'सिविक लेंस AI',
    appSubtitle: 'राष्ट्रीय जन जवाबदेही मंच',
    philosophy: 'लोक पद ही लोक दायित्व है।',
    tagline: 'हम लोगों पर निगरानी नहीं रखते, हम लोक दायित्व को जनता के सामने लाते हैं।',
    heroTitle: 'हर एक सार्वजनिक रुपये का पारदर्शी हिसाब।',
    heroSubtitle: 'सार्वजनिक धन, सरकारी परियोजनाओं, धरातल पर काम और प्रशासनिक उत्तरदायित्व को एक पारदर्शी प्रणाली से जोड़ें।',
    exploreDemo: 'लाइव डेमो देखें',
    inspectSchoolCase: '₹1.2 लाख स्कूल मामले की जांच करें',
    overview: 'राष्ट्रीय डैशबोर्ड',
    projects: 'सार्वजनिक परियोजनाएं',
    moneyTrail: 'धन की राह (Money Trail)',
    aiRisk: 'AI जोखिम विश्लेषण',
    responsibility: 'दायित्व मानचित्र (Responsibility)',
    procurement: 'निविदा व अनुबंध (Tenders)',
    delivery: 'धरातल पर सत्यापन (Delivery)',
    complaints: 'नागरिक शिकायत पोर्टल',
    audit: 'लेखापरीक्षा व जांच (Audit)',
    reports: 'पारदर्शिता रिपोर्ट (Reports)',
    dataSources: 'डेटा स्रोत व सत्यापन',
    settings: 'प्रणाली सेटिंग्स',
    submitComplaint: 'जन शिकायत दर्ज करें',
    trackComplaint: 'शिकायत की स्थिति जांचें',
    allStates: 'सभी 36 राज्य एवं केंद्र शासित प्रदेश',
    allDistricts: 'सभी जिले',
    filterByState: 'राज्य / केंद्र शासित प्रदेश चुनें',
    selectIssueCategory: 'मुद्दे की श्रेणी चुनें',
    complaintLogged: 'शिकायत सफलतापूर्वक दर्ज हुई',
    copyId: 'टोकन आईडी कॉपी करें'
  },
  bn: {
    appName: 'সিভিক লেন্স AI',
    appSubtitle: 'জাতীয় জন দায়বদ্ধতা প্ল্যাটফর্ম',
    philosophy: 'জন পদ মানেই জন দায়বদ্ধতা।',
    tagline: 'আমরা মানুষের ওপর নজরদারি করি না, আমরা জন দায়বদ্ধতাকে সবার সামনে আনি।',
    heroTitle: 'প্রতিটি সরকারি টাকার স্বচ্ছ হিসেব রাখুন।',
    heroSubtitle: 'সরকারি অর্থ, প্রকল্প, কাজের প্রমাণ এবং প্রশাসনিক দায়িত্বকে একটি সিস্টেমে সংযুক্ত করুন।',
    exploreDemo: 'লাইভ ডেমো দেখুন',
    inspectSchoolCase: '₹১.২ লাখ স্কুল অনিয়ম তদন্ত',
    overview: 'সারসংক্ষেপ ড্যাশবোর্ড',
    projects: 'সরকারি প্রকল্পসমূহ',
    moneyTrail: 'অর্থের গতিপথ',
    aiRisk: 'AI ঝুঁকি বিশ্লেষণ',
    responsibility: 'দায়িত্ব মানচিত্র',
    procurement: 'টেন্ডার ও চুক্তি',
    delivery: 'কাজের ডেলিভারি যাচাই',
    complaints: 'নাগরিক অভিযোগ পোর্টাল',
    audit: 'অডিট ও তদন্ত',
    reports: 'স্বচ্ছতা রিপোর্ট',
    dataSources: 'তথ্য উৎস ও যাচাই',
    settings: 'সিস্টেম সেটিংস',
    submitComplaint: 'নাগরিক অভিযোগ জমা দিন',
    trackComplaint: 'অভিযোগের স্থিতি ট্র্যাক করুন',
    allStates: 'সকল রাজ্য ও কেন্দ্রশাসিত অঞ্চল',
    allDistricts: 'সকল জেলা',
    filterByState: 'রাজ্য নির্বাচন করুন',
    selectIssueCategory: 'সমস্যার বিভাগ নির্বাচন করুন',
    complaintLogged: 'অভিযোগ সফলভাবে নথিভুক্ত হয়েছে',
    copyId: 'টোকেন আইডি কপি করুন'
  },
  te: {
    appName: 'సివిక్ లెన్స్ AI',
    appSubtitle: 'జాతీయ ప్రజా జవాబుదారీ వేదిక',
    philosophy: 'ప్రజా పదవి అంటే ప్రజా బాధ్యత.',
    tagline: 'మేము ప్రజలపై నిఘా ఉంచము. ప్రజా బాధ్యతను ప్రజల ముందుకు తెస్తాము.',
    heroTitle: 'ప్రతి ప్రజా రూపాయికి జవాబుదారీతనం కల్పించండి.',
    heroSubtitle: 'ప్రజా నిధులు, ప్రభుత్వ ప్రాజెక్టులు, పని రుజువులు మరియు అధికారుల బాధ్యతను అనుసంధానించండి.',
    exploreDemo: 'లైవ్ డెమో చూడండి',
    inspectSchoolCase: '₹1.2 లక్షల పాఠశాల కేసు తనిఖీ',
    overview: 'ముఖ్య డ్యాష్‌బోర్డ్',
    projects: 'ప్రజా ప్రాజెక్టులు',
    moneyTrail: 'నిధుల ప్రవాహం',
    aiRisk: 'AI రిస్క్ విశ్లేషణ',
    responsibility: 'బాధ్యతల పటం',
    procurement: 'టెండర్లు & ఒప్పందాలు',
    delivery: 'క్షేత్రస్థాయి ధృవీకరణ',
    complaints: 'పౌర ఫిర్యాదుల వేదిక',
    audit: 'ఆడిట్ & విచారణ',
    reports: 'పారదర్శకత నివేదికలు',
    dataSources: 'డేటా మూలాలు',
    settings: 'సిస్టమ్ సెట్టింగ్‌లు',
    submitComplaint: 'ఫిర్యాదు దాఖలు చేయండి',
    trackComplaint: 'స్థితిని ట్రాక్ చేయండి',
    allStates: 'అన్ని రాష్ట్రాలు & UTలు',
    allDistricts: 'అన్ని జిల్లాలు',
    filterByState: 'రాష్ట్రాన్ని ఎంచుకోండి',
    selectIssueCategory: 'సమస్య వర్గాన్ని ఎంచుకోండి',
    complaintLogged: 'ఫిర్యాదు విజయవంతంగా నమోదైంది',
    copyId: 'టోకెన్ కాపీ చేయండి'
  },
  ta: {
    appName: 'சிவிக் லென்ஸ் AI',
    appSubtitle: 'தேசிய பொது பொறுப்புடைமை தளம்',
    philosophy: 'பொதுப் பதவி என்பது பொதுப் பொறுப்பு.',
    tagline: 'நாங்கள் மக்கள் மீது கண்காணிப்பு வைக்கவில்லை. பொதுப் பொறுப்பை மக்கள் பார்வைக்கு கொண்டு வருகிறோம்.',
    heroTitle: 'ஒவ்வொரு பொது ரூபாய்க்கும் வெளிப்படையான கணக்கு.',
    heroSubtitle: 'பொது நிதி, அரசு திட்டங்கள், வேலைச் சான்றுகள் மற்றும் நிறுவனப் பொறுப்பை இணைக்கவும்.',
    exploreDemo: 'நேரடி டெமோ பார்க்க',
    inspectSchoolCase: '₹1.2 லட்சம் பள்ளி ஆய்வு',
    overview: 'கண்ணோட்ட பலகை',
    projects: 'பொது திட்டங்கள்',
    moneyTrail: 'நிதி பாதை (Money Trail)',
    aiRisk: 'AI இடர் பகுப்பாய்வு',
    responsibility: 'பொறுப்பு வரைபடம்',
    procurement: 'டெண்டர்கள் & ஒப்பந்தங்கள்',
    delivery: 'கள சரிபார்ப்பு',
    complaints: 'குடிமக்கள் புகார் தளம்',
    audit: 'தணிக்கை & விசாரணை',
    reports: 'வெளிப்படைத்தன்மை அறிக்கை',
    dataSources: 'தரவு மூலங்கள்',
    settings: 'அமைப்புகள்',
    submitComplaint: 'புகார் பதிவு செய்க',
    trackComplaint: 'நிலையை கண்காணிக்கவும்',
    allStates: 'அனைத்து மாநிலங்கள் & யூனியன் பிரதேசங்கள்',
    allDistricts: 'அனைத்து மாவட்டங்கள்',
    filterByState: 'மாநிலத்தைத் தேர்ந்தெடுக்கவும்',
    selectIssueCategory: 'பிரச்சனை வகையைத் தேர்ந்தெடுக்கவும்',
    complaintLogged: 'புகார் வெற்றிகரமாக பதிவானது',
    copyId: 'ஐடியை நகலெடுக்கவும்'
  },
  mr: {
    appName: 'सिव्हिक लेन्स AI',
    appSubtitle: 'राष्ट्रीय सार्वजनिक उत्तरदायित्व मंच',
    philosophy: 'सार्वजनिक पद म्हणजे सार्वजनिक जबाबदारी.',
    tagline: 'आम्ही लोकांवर पाळत ठेवत नाही, आम्ही जबाबदारी जनतेसमोर आणतो.',
    heroTitle: 'प्रत्येक सार्वजनिक रुपयाचा पारदर्शक हिशोब.',
    heroSubtitle: 'सरकारी निधी, कामे, प्रत्यक्ष पुरावे आणि प्रशासकीय उत्तरदायित्व एकत्र जोडा.',
    exploreDemo: 'थेट डेमो पहा',
    inspectSchoolCase: '₹१.२ लाख शाळा प्रकरणाची चौकशी',
    overview: 'डॅशबोर्ड',
    projects: 'सार्वजनिक प्रकल्प',
    moneyTrail: 'पैशांचा मागोवा',
    aiRisk: 'AI जोखीम विश्लेषण',
    responsibility: 'जबाबदारी नकाशा',
    procurement: 'निविदा व करार',
    delivery: 'प्रत्यक्ष काम पडताळणी',
    complaints: 'नागरिक तक्रार निवारण',
    audit: 'लेखापरीक्षण व तपास',
    reports: 'पारदर्शकता अहवाल',
    dataSources: 'डेटा स्रोत',
    settings: 'सेटिंग्ज',
    submitComplaint: 'तक्रार नोंदवा',
    trackComplaint: 'तक्रारीची स्थिती तपासा',
    allStates: 'सर्व २८ राज्ये व ८ केंद्रशासित प्रदेश',
    allDistricts: 'सर्व जिल्हे',
    filterByState: 'राज्य निवडा',
    selectIssueCategory: 'तक्रारीचा प्रकार निवडा',
    complaintLogged: 'तक्रार यशस्वीरित्या नोंदवली गेली',
    copyId: 'टोकन आयडी कॉपी करा'
  },
  gu: {
    appName: 'સિવિક લેન્સ AI',
    appSubtitle: 'રાષ્ટ્રીય જાહેર જવાબદેહી મંચ',
    philosophy: 'જાહેર પદ એ જાહેર જવાબદારી છે.',
    tagline: 'અમે લોકો પર નજર નથી રાખતા, અમે જાહેર જવાબદારીને સામે લાવીએ છીએ.',
    heroTitle: 'દરેક જાહેર રૂપિયાનો પારદર્શક હિસાબ.',
    heroSubtitle: 'જાહેર નાણાં, સરકારી પ્રોજેક્ટ્સ અને ડિલિવરી પુરાવાઓને એક મંચ પર જોડો.',
    exploreDemo: 'ડેમો જુઓ',
    inspectSchoolCase: '₹૧.૨ લાખ શાળા કેસ તપાસો',
    overview: 'ડેશબોર્ડ',
    projects: 'જાહેર પ્રોજેક્ટ્સ',
    moneyTrail: 'નાણાંનો માર્ગ',
    aiRisk: 'AI જોખમ વિશ્લેષણ',
    responsibility: 'જવાબદારી નકશો',
    procurement: 'ટેન્ડર અને કરાર',
    delivery: 'કામની ચકાસણી',
    complaints: 'નાગરિક ફરિયાદ પોર્ટલ',
    audit: 'ઓડિટ અને તપાસ',
    reports: 'પારદર્શિતા અહેવાલ',
    dataSources: 'ડેટા સ્ત્રોત',
    settings: 'સિસ્ટમ સેટિંગ્સ',
    submitComplaint: 'ફરિયાદ નોંધાવો',
    trackComplaint: 'સ્થિતિ તપાસો',
    allStates: 'બધા રાજ્યો અને કેન્દ્રશાસિત પ્રદેશો',
    allDistricts: 'બધા જિલ્લાઓ',
    filterByState: 'રાજ્ય પસંદ કરો',
    selectIssueCategory: 'કેટેગરી પસંદ કરો',
    complaintLogged: 'ફરિયાદ સફળતાપૂર્વક નોંધાઈ',
    copyId: 'ટોકન કોપી કરો'
  },
  kn: {
    appName: 'ಸಿವಿಕ್ ಲೆನ್ಸ್ AI',
    appSubtitle: 'ರಾಷ್ಟ್ರೀಯ ಸಾರ್ವಜನಿಕ ಹೊಣೆಗಾರಿಕೆ ವೇದಿಕೆ',
    philosophy: 'ಸಾರ್ವಜನಿಕ ಹುದ್ದೆಯೇ ಸಾರ್ವಜನಿಕ ಜವಾಬ್ದಾರಿ.',
    tagline: 'ನಾವು ಜನರ ಮೇಲೆ ಕಣ್ಗಾವಲು ಇಡುವುದಿಲ್ಲ, ಸಾರ್ವಜನಿಕ ಹೊಣೆಗಾರಿಕೆಯನ್ನು ಜನರ ಮುಂದೆ ತರುತ್ತೇವೆ.',
    heroTitle: 'ಪ್ರತಿ ಸಾರ್ವಜನಿಕ ರೂಪಾಯಿಗೂ ಪಾರದರ್ಶಕ ಲೆಕ್ಕ.',
    heroSubtitle: 'ಸಾರ್ವಜನಿಕ ನಿಧಿ, ಯೋಜನೆಗಳು ಮತ್ತು ಭೌತಿಕ ತಪಾಸಣೆಯನ್ನು ಒಂದೇ ವ್ಯವಸ್ಥೆಯಲ್ಲಿ ಜೋಡಿಸಿ.',
    exploreDemo: 'ಲೈವ್ ಡೆಮೊ ನೋಡಿ',
    inspectSchoolCase: '₹1.2 ಲಕ್ಷ ಶಾಲಾ ಪ್ರಕರಣ ತನಿಖೆ',
    overview: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    projects: 'ಸಾರ್ವಜನಿಕ ಯೋಜನೆಗಳು',
    moneyTrail: 'ಹಣದ ಜಾಡು',
    aiRisk: 'AI ಅಪಾಯ ವಿಶ್ಲೇಷಣೆ',
    responsibility: 'ಹೊಣೆಗಾರಿಕೆ ನಕ್ಷೆ',
    procurement: 'ಟೆಂಡರ್‌ಗಳು & ಒಪ್ಪಂದಗಳು',
    delivery: 'ಭೌತಿಕ ವಿತರಣೆ ಪರಿಶೀಲನೆ',
    complaints: 'ನಾಗರಿಕ ದೂರು ಪೋರ್ಟಲ್',
    audit: 'ಆಡಿಟ್ ಮತ್ತು ತನಿಖೆ',
    reports: 'ಪಾರದರ್ಶಕತೆ ವರದಿಗಳು',
    dataSources: 'ಡೇಟಾ ಮೂಲಗಳು',
    settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    submitComplaint: 'ದೂರು ಸಲ್ಲಿಸಿ',
    trackComplaint: 'ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ',
    allStates: 'ಎಲ್ಲಾ ರಾಜ್ಯಗಳು & ಕೇಂದ್ರಾಡಳಿತ ಪ್ರದೇಶಗಳು',
    allDistricts: 'ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳು',
    filterByState: 'ರಾಜ್ಯ ಆಯ್ಕೆಮಾಡಿ',
    selectIssueCategory: 'ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    complaintLogged: 'ದೂರು ಯಶಸ್ವಿಯಾಗಿ ದಾಖಲಾಗಿದೆ',
    copyId: 'ಟೋಕನ್ ನಕಲಿಸಿ'
  },
  ml: {
    appName: 'സിവിക് ലെൻസ് AI',
    appSubtitle: 'ദേശീയ പൊതു ഉത്തരവാദിത്ത പ്ലാറ്റ്‌ഫോം',
    philosophy: 'പൊതുപദവി എന്നാൽ പൊതു ഉത്തരവാദിത്തമാണ്.',
    tagline: 'ഞങ്ങൾ ജനങ്ങളെ നിരീക്ഷിക്കുന്നില്ല, പൊതു ഉത്തരവാദിത്തത്തെ ജനസമക്ഷം കൊണ്ടുവരുന്നു.',
    heroTitle: 'ഓരോ പൊതു രൂപയ്ക്കും സുതാര്യമായ കണക്ക്.',
    heroSubtitle: 'പൊതു ഫണ്ടുകളും സർക്കാർ പദ്ധതികളും യഥാർത്ഥ പ്രവൃത്തികളും തമ്മിൽ ബന്ധിപ്പിക്കുക.',
    exploreDemo: 'ഡെമോ കാണുക',
    inspectSchoolCase: '₹1.2 ലക്ഷം സ്കൂൾ കേസ് പരിശോധിക്കുക',
    overview: 'ഡാഷ്‌ബോർഡ്',
    projects: 'പൊതു പദ്ധതികൾ',
    moneyTrail: 'പണത്തിന്റെ വഴി',
    aiRisk: 'AI റിസ്ക് അനാലിസിസ്',
    responsibility: 'ഉത്തരവാദിത്ത മാപ്പ്',
    procurement: 'ടെൻഡറുകൾ & കരാറുകൾ',
    delivery: 'ഫീൽഡ് പരിശോധന',
    complaints: 'പരാതി പോർട്ടൽ',
    audit: 'ഓഡിറ്റും അന്വേഷണവും',
    reports: 'സുതാര്യത റിപ്പോർട്ടുകൾ',
    dataSources: 'ഡാറ്റ ഉറവിടങ്ങൾ',
    settings: 'ക്രമീകരണങ്ങൾ',
    submitComplaint: 'പരാതി നൽകുക',
    trackComplaint: 'സ്ഥിതി അറിയുക',
    allStates: 'എല്ലാ സംസ്ഥാനങ്ങളും യു.ടികളും',
    allDistricts: 'എല്ലാ ജില്ലകളും',
    filterByState: 'സംസ്ഥാനം തിരഞ്ഞെടുക്കുക',
    selectIssueCategory: 'വിഭാഗം തിരഞ്ഞെടുക്കുക',
    complaintLogged: 'പരാതി വിജയകരമായി രേഖപ്പെടുത്തി',
    copyId: 'ടോക്കൺ പകർത്തുക'
  },
  pa: {
    appName: 'ਸਿਵਿਕ ਲੈਂਸ AI',
    appSubtitle: 'ਰਾਸ਼ਟਰੀ ਜਨਤਕ ਜਵਾਬਦੇਹੀ ਪਲੇਟਫਾਰਮ',
    philosophy: 'ਜਨਤਕ ਅਹੁਦਾ ਹੀ ਜਨਤਕ ਜ਼ਿੰਮੇਵਾਰੀ ਹੈ।',
    tagline: 'ਅਸੀਂ ਲੋਕਾਂ ਦੀ ਨਿਗਰਾਨੀ ਨਹੀਂ ਕਰਦੇ, ਅਸੀਂ ਜਨਤਕ ਜ਼ਿੰਮੇਵਾਰੀ ਨੂੰ ਸਾਹਮਣੇ ਲਿਆਉਂਦੇ ਹਾਂ।',
    heroTitle: 'ਹਰ ਜਨਤਕ ਰੁਪਏ ਦਾ ਪਾਰਦਰਸ਼ੀ ਹਿਸਾਬ।',
    heroSubtitle: 'ਜਨਤਕ ਫੰਡ, ਸਰਕਾਰੀ ਪ੍ਰੋਜੈਕਟ ਅਤੇ ਜ਼ਮੀਨੀ ਸੱਚਾਈ ਨੂੰ ਇੱਕ ਮੰਚ ਨਾਲ ਜੋੜੋ।',
    exploreDemo: 'ਲਾਈਵ ਡੈਮੋ ਵੇਖੋ',
    inspectSchoolCase: '₹1.2 ਲੱਖ ਸਕੂਲ ਕੇਸ ਦੀ ਪੜਤਾਲ',
    overview: 'ਮੁੱਖ ਡੈਸ਼ਬੋਰਡ',
    projects: 'ਜਨਤਕ ਪ੍ਰੋਜੈਕਟ',
    moneyTrail: 'ਪੈਸੇ ਦਾ ਰਸਤਾ',
    aiRisk: 'AI ਜੋਖਮ ਵਿਸ਼ਲੇਸ਼ਣ',
    responsibility: 'ਜ਼ਿੰਮੇਵਾਰੀ ਦਾ ਨਕਸ਼ਾ',
    procurement: 'ਟੈਂਡਰ ਅਤੇ ਇਕਰਾਰਨਾਮੇ',
    delivery: 'ਜ਼ਮੀਨੀ ਪੜਤਾਲ',
    complaints: 'ਨਾਗਰਿਕ ਸ਼ਿਕਾਇਤ ਪੋਰਟਲ',
    audit: 'ਆਡਿਟ ਅਤੇ ਜਾਂਚ',
    reports: 'ਪਾਰਦਰਸ਼ਤਾ ਰਿਪੋਰਟਾਂ',
    dataSources: 'ਡੇਟਾ ਸਰੋਤ',
    settings: 'ਸੈਟਿੰਗਾਂ',
    submitComplaint: 'ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰੋ',
    trackComplaint: 'ਸਥਿਤੀ ਦੀ ਜਾਂਚ ਕਰੋ',
    allStates: 'ਸਾਰੇ ਰਾਜ ਅਤੇ ਕੇਂਦਰ ਸ਼ਾਸਤ ਪ੍ਰਦੇਸ਼',
    allDistricts: 'ਸਾਰੇ ਜ਼ਿਲ੍ਹੇ',
    filterByState: 'ਰਾਜ ਚੁਣੋ',
    selectIssueCategory: 'ਸ਼੍ਰੇਣੀ ਚੁਣੋ',
    complaintLogged: 'ਸ਼ਿਕਾਇਤ ਸਫਲਤਾਪੂਰਵਕ ਦਰਜ ਹੋਈ',
    copyId: 'ਟੋਕਨ ਕਾਪੀ ਕਰੋ'
  },
  or: {
    appName: 'ସିଭିକ୍ ଲେନ୍ସ AI',
    appSubtitle: 'ଜାତୀୟ ଜନ ଉତ୍ତରଦାୟିତ୍ୱ ମଞ୍ଚ',
    philosophy: 'ଲୋକ ପଦ ହିଁ ଲୋକ ଦାୟିତ୍ୱ।',
    tagline: 'ଆମେ ଲୋକଙ୍କ ଉପରେ ନଜର ରଖୁନାହୁଁ, ଜନ ଦାୟିତ୍ୱକୁ ସାମ୍ନାକୁ ଆଣୁଛୁ।',
    heroTitle: 'ପ୍ରତିଟି ସରକାରୀ ଟଙ୍କାର ସ୍ୱଚ୍ଛ ହିସାବ।',
    heroSubtitle: 'ସରକାରୀ ଟଙ୍କା, ପ୍ରକଳ୍ପ ଏବଂ କାର୍ଯ୍ୟ ଯାଞ୍ଚକୁ ଏକତ୍ର ସଂଯୋଗ କରନ୍ତୁ।',
    exploreDemo: 'ଡେମୋ ଦେଖନ୍ତୁ',
    inspectSchoolCase: '₹୧.୨ ଲକ୍ଷ ବିଦ୍ୟାଳୟ ମାମଲା ଯାଞ୍ଚ',
    overview: 'ଡ୍ୟାସବୋର୍ଡ',
    projects: 'ସରକାରୀ ପ୍ରକଳ୍ପ',
    moneyTrail: 'ଅର୍ଥ ପ୍ରବାହ',
    aiRisk: 'AI ବିପଦ ବିଶ୍ଳେଷଣ',
    responsibility: 'ଦାୟିତ୍ୱ ମାନଚିତ୍ର',
    procurement: 'ଟେଣ୍ଡର ଓ ଚୁକ୍ତି',
    delivery: 'କାର୍ଯ୍ୟ ଯାଞ୍ଚ',
    complaints: 'ନାଗରିକ ଅଭିଯୋଗ',
    audit: 'ଅଡିଟ ଓ ତଦନ୍ତ',
    reports: 'ସ୍ୱଚ୍ଛତା ରିପୋର୍ଟ',
    dataSources: 'ତଥ୍ୟ ଉତ୍ସ',
    settings: 'ସେଟିଙ୍ଗ୍ସ',
    submitComplaint: 'ଅଭିଯୋଗ ଦାଖଲ କରନ୍ତୁ',
    trackComplaint: 'ସ୍ଥିତି ଯାଞ୍ଚ କରନ୍ତୁ',
    allStates: 'ସମସ୍ତ ରାଜ୍ୟ ଓ କେନ୍ଦ୍ରଶାସିତ ଅଞ୍ଚଳ',
    allDistricts: 'ସମସ୍ତ ଜିଲ୍ଲା',
    filterByState: 'ରାଜ୍ୟ ଚୟନ କରନ୍ତୁ',
    selectIssueCategory: 'ବର୍ଗ ଚୟନ କରନ୍ତୁ',
    complaintLogged: 'ଅଭିଯୋଗ ସଫଳତାର ସହ ପଞ୍ଜୀକୃତ ହେଲା',
    copyId: 'ଟୋକନ କପି କରନ୍ତୁ'
  },
  as: {
    appName: 'চিভিক লেন্স AI',
    appSubtitle: 'ৰাষ্ট্ৰীয় জন দায়বদ্ধতা মঞ্চ',
    philosophy: 'ৰাজহুৱা পদেই ৰাজহুৱা দায়িত্ব।',
    tagline: 'আমি মানুহৰ ওপৰত নজৰ নাৰাখোঁ, ৰাজহুৱা দায়িত্বক পোহৰলৈ আনোঁ।',
    heroTitle: 'প্ৰতিটো ৰাজহুৱা টকাৰ স্বচ্ছ হিচাপ।',
    heroSubtitle: 'ৰাজহুৱা ধন, চৰকাৰী প্ৰকল্প আৰু কামৰ প্ৰমাণ এটা স্বচ্ছ ব্যৱস্থাত সংযোগ কৰক।',
    exploreDemo: 'লাইভ ডেমো চাওক',
    inspectSchoolCase: '₹১.২ লাখ বিদ্যালয় কেচ তদন্ত',
    overview: 'ডেশ্ববৰ্ড',
    projects: 'ৰাজহুৱা প্ৰকল্পসমূহ',
    moneyTrail: 'ধনৰ গতিপথ',
    aiRisk: 'AI বিপদাশংকা বিশ্লেষণ',
    responsibility: 'দায়িত্ব মানচিত্ৰ',
    procurement: 'নিবিদা আৰু চুক্তি',
    delivery: 'কামৰ প্ৰমাণীকৰণ',
    complaints: 'নাগৰিক অভিযোগ মঞ্চ',
    audit: 'হিচাপ পৰীক্ষা আৰু তদন্ত',
    reports: 'স্বচ্ছতা প্ৰতিবেদন',
    dataSources: 'তথ্যৰ উৎস',
    settings: 'ছেটিংছ',
    submitComplaint: 'অভিযোগ দাখিল কৰক',
    trackComplaint: 'স্থিতি পৰীক্ষা কৰক',
    allStates: 'সকলো ৰাজ্য আৰু কেন্দ্ৰীয় শাসিত অঞ্চল',
    allDistricts: 'সকলো জিলা',
    filterByState: 'ৰাজ্য বাছক',
    selectIssueCategory: 'শ্ৰেণী বাছক',
    complaintLogged: 'অভিযোগ সফলতাৰে পঞ্জীয়ন হ’ল',
    copyId: 'টোকেন কপি কৰক'
  }
};

export interface CitizenIssueSector {
  id: string;
  name: string;
  iconName: string;
  description: string;
  commonIssues: string[];
}

export const CITIZEN_ISSUE_SECTORS: CitizenIssueSector[] = [
  {
    id: 'education',
    name: 'School Infrastructure & Education Supplies',
    iconName: 'School',
    description: 'Classroom sheds, student benches, ceiling fans, mid-day meal kitchens, textbooks, laboratory equipment.',
    commonIssues: [
      'Missing ceiling fans or electrical equipment (Billed vs actual installed)',
      'Inflated dining canteen civil construction costs',
      'Textbooks billed but not distributed to students',
      'Defective desk and bench quality / missing furniture',
      'Unfinished school toilet or boundary wall construction'
    ]
  },
  {
    id: 'roads',
    name: 'Road Construction, PWD & Highway Resurfacing',
    iconName: 'Road',
    description: 'Village connectivity roads, PMGSY stretches, bituminous surfacing, roadside stormwater culverts.',
    commonIssues: [
      'Substandard bitumen thickness peeling within months',
      'Road reported completed on paper but impassable on ground',
      'Drainage culverts missing causing monsoon flooding',
      'Inflated measurement sheet (M-Book) entries'
    ]
  },
  {
    id: 'health',
    name: 'Primary Health Centres & District Hospitals',
    iconName: 'Hospital',
    description: 'Diagnostic equipment, biochemical analysers, medicines, emergency oxygen pipelines, ambulances.',
    commonIssues: [
      'Diagnostic equipment delivered but locked in storage / uncalibrated',
      'Essential medicine stockout despite active procurement releases',
      'Overbilling on medical machine procurement vs GeM rate',
      'Non-functional emergency oxygen pipeline ports'
    ]
  },
  {
    id: 'water',
    name: 'Drinking Water, Pipelines & Jal Jeevan',
    iconName: 'Droplets',
    description: 'Potable tap water pipelines, overhead reservoir tanks, water purification plants, borewells.',
    commonIssues: [
      'Pipeline laid on paper but zero tap water connection to households',
      'Overhead tank incomplete despite 80% payment release',
      'Broken or leaking ductile iron pipes left unrepaired',
      'Water pump motor installed with substandard electrical rating'
    ]
  },
  {
    id: 'energy',
    name: 'Public Streetlights & Renewable Solar Grids',
    iconName: 'Lightbulb',
    description: 'LED streetlights, smart solar poles, battery banks, rural feeder electrification.',
    commonIssues: [
      'Streetlight poles erected without solar panels or batteries',
      'Dark streets at night despite maintenance bills claimed',
      'Substandard LED fixtures burning out within weeks',
      'Uncertified electrical safety inspection releases'
    ]
  },
  {
    id: 'ration',
    name: 'Food Security, Public Distribution (PDS) & Ration',
    iconName: 'Wheat',
    description: 'Fair price shops, electronic weighing integration, grain allocation quotas.',
    commonIssues: [
      'Shortage or adulteration in subsidized grain allocations',
      'E-PoS biometric machine refusal or diversion of stock',
      'Warehouse storage leakage without accountability'
    ]
  },
  {
    id: 'sanitation',
    name: 'Municipal Sanitation, Waste & Drainage',
    iconName: 'Trash',
    description: 'Community solid waste plants, open drainage brickwork, public sanitation facilities.',
    commonIssues: [
      'Open drains overflowing into residential clusters',
      'Community sanitary block locked and without running water',
      'Ghost municipal cleaning contracts awarded without staff'
    ]
  },
  {
    id: 'tenders',
    name: 'Procurement Corruption, Split Bids & Bribery',
    iconName: 'ShieldAlert',
    description: 'Single-bid cartelization, repetitive contractor awards, demand for illegal gratification.',
    commonIssues: [
      'Suspected bid rigging and collusive contractor cartels',
      'Split purchase orders designed to bypass e-tender thresholds',
      'Bribery demanded for issuing legitimate completion certificates'
    ]
  }
];
