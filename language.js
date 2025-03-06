// Language translations
const translations = {
    'en': {
        // Navigation
        'home': 'Home',
        'about': 'About',
        'data': 'Rainfall Data',
        'solutions': 'Solutions',
        'community': 'Community',
        'contact': 'Contact',
        'login': 'Login',
        
        // Hero section
        'hero-title': 'Save Every Drop, Secure Tomorrow',
        'hero-subtitle': 'Personalized rainwater harvesting solutions for a sustainable future',
        'get-started': 'Get Started',
        'learn-more': 'Learn More',
        
        // Location finder
        'location-title': 'Find Your Personalized Solution',
        'location-subtitle': 'Enter your location to get customized rainwater harvesting recommendations',
        'location-placeholder': 'Enter your city or address',
        'find-location': 'Find Solutions',
        'use-gps': 'Use GPS',
        
        // Rainfall data
        'rainfall-title': 'Real-Time Rainfall Data',
        'rainfall-subtitle': 'Analyze historical and current rainfall patterns in your area',
        'annual-rainfall': 'Annual Rainfall',
        'rainy-season': 'Rainy Season',
        'water-potential': 'Harvesting Potential',
        
        // Solutions
        'solutions-title': 'Personalized Harvesting Solutions',
        'solutions-subtitle': 'Discover the best rainwater harvesting techniques for your location',
        'rooftop': 'Rooftop Collection',
        'rooftop-desc': 'Collect rainwater from your roof and store it for later use',
        'percolation': 'Percolation Pits',
        'percolation-desc': 'Recharge groundwater by allowing rainwater to percolate into the soil',
        'rain-garden': 'Rain Gardens',
        'rain-garden-desc': 'Beautiful gardens designed to capture and filter rainwater runoff',
        'underground': 'Underground Storage',
        'underground-desc': 'Store large volumes of rainwater in underground tanks for long-term use',
        'learn-more-btn': 'Learn More',
        
        // AI Recommendations
        'ai-title': 'AI-Powered Recommendations',
        'ai-subtitle': 'Get smart predictions and personalized advice for optimal water conservation',
        'prediction': 'Rainfall Prediction',
        'prediction-desc': 'Our AI analyzes weather patterns to predict future rainfall in your area',
        'custom-design': 'Custom System Design',
        'custom-design-desc': 'Get tailored harvesting system designs based on your property and needs',
        'efficiency': 'Efficiency Analysis',
        'efficiency-desc': 'Continuous monitoring and suggestions to improve your system\'s efficiency',
        'your-recommendation': 'Your Personalized Recommendation',
        'recommendation-prompt': 'Enter your location above to get AI-powered recommendations',
        
        // Community
        'community-title': 'Join Our Water Conservation Community',
        'community-subtitle': 'Share experiences, learn from others, and make a collective impact',
        'forums': 'Community Forums',
        'forums-desc': 'Discuss ideas, ask questions, and share your success stories',
        'projects': 'Collaborative Projects',
        'projects-desc': 'Join or initiate community-wide water conservation projects',
        'rewards': 'Water Credits',
        'rewards-desc': 'Earn blockchain-based credits for your conservation efforts',
        'stories': 'Success Stories',
        
        // IoT
        'iot-title': 'Smart Monitoring with IoT',
        'iot-subtitle': 'Connect smart sensors to track your water harvesting system in real-time',
        'water-level': 'Water Level Monitoring',
        'water-level-desc': 'Track storage tank levels from anywhere using our mobile app',
        'quality': 'Water Quality Sensors',
        'quality-desc': 'Monitor water quality parameters to ensure safe usage',
        'smart-irrigation': 'Smart Irrigation',
        'smart-irrigation-desc': 'Automate your irrigation system based on rainfall and soil moisture',
        'dashboard': 'Sample IoT Dashboard',
        
        // Government
        'gov-title': 'Government Collaboration',
        'gov-subtitle': 'Working with public agencies to scale water conservation efforts',
        'policies': 'Policy Alignment',
        'policies-desc': 'Stay updated with local water conservation policies and incentives',
        'funding': 'Funding Opportunities',
        'funding-desc': 'Access information about government subsidies for rainwater harvesting',
        'projects': 'Public Projects',
        'projects-desc': 'Participate in community-wide water conservation initiatives',
        
        // Contact
        'contact-title': 'Get in Touch',
        'contact-subtitle': 'Have questions? We\'re here to help!',
        'name': 'Name',
        'email': 'Email',
        'message': 'Message',
        'send': 'Send Message',
        
        // Auth
        'login-tab': 'Login',
        'register-tab': 'Register',
        
        // Footer
        'footer-tagline': 'Smart rainwater harvesting solutions for a sustainable future',
        'quick-links': 'Quick Links',
        'home-link': 'Home',
        'about-link': 'About',
        'solutions-link': 'Solutions',
        'contact-link': 'Contact',
        'connect': 'Connect With Us'
    },
    
    'hi': {
        // Navigation
        'home': 'होम',
        'about': 'हमारे बारे में',
        'data': 'वर्षा डेटा',
        'solutions': 'समाधान',
        'community': 'समुदाय',
        'contact': 'संपर्क',
        'login': 'लॉगिन',
        
        // Hero section
        'hero-title': 'हर बूंद बचाएं, कल सुरक्षित करें',
        'hero-subtitle': 'एक स्थायी भविष्य के लिए व्यक्तिगत वर्षा जल संचयन समाधान',
        'get-started': 'शुरू करें',
        'learn-more': 'और जानें',
        
        // Location finder
        'location-title': 'अपना व्यक्तिगत समाधान खोजें',
        'location-subtitle': 'अनुकूलित वर्षा जल संचयन सिफारिशें प्राप्प करने के लिए अपना स्थान दर्ज करें',
        'location-placeholder': 'अपना शहर या पता दर्ज करें',
        'find-location': 'समाधान खोजें',
        'use-gps': 'GPS का उपयोग करें',
        
        // Rainfall data
        'rainfall-title': 'रीयल-टाइम वर्षा डेटा',
        'rainfall-subtitle': 'अपने क्षेत्र में ऐतिहासिक और वर्तमान वर्षा पैटर्न का विश्लेषण करें',
        'annual-rainfall': 'वार्षिक वर्षा',
        'rainy-season': 'बारिश का मौसम',
        'water-potential': 'संचयन क्षमता',
        
        // Solutions
        'solutions-title': 'व्यक्तिगत संचयन समाधान',
        'solutions-subtitle': 'अपने स्थान के लिए सर्वोत्तम वर्षा जल संचयन तकनीकों की खोज करें',
        'rooftop': 'छत संग्रह',
        'rooftop-desc': 'अपनी छत से बारिश का पानी इकट्ठा करें और बाद मेयोग के लिए संग्रहीत करें',
        'percolation': 'रिसाव गड्ढे',
        'percolation-desc': 'बारिश के पानी को मिट्टी में रिसने की अनुमति देकर भूजल को रिचार्ज करें',
        'rain-garden': 'वर्षा उद्यान',
        'rain-garden-desc': 'बारिश के पानी को पकड़ने और फ़िल्टर करने की लिए डिज़ाइन किए गए सुंदर बगीचे',
        'underground': 'भूमिगत भंडारण',
        'underground-desc': 'दीर्घकालिक उपयोग के लिए भूमिगत टैंकों में बारिश के पानी की बड़ी मात्रा संग्रहीत करें',
        'learn-more-btn': 'और जानें',
        
        // AI Recommendations
        'ai-title': 'AI-संचालित अनुशंसाएँ',
        'ai-subtitle': 'इष्टतम जल संरक्षण के लिए स्मार्ट भविष्यवाणियां और व्यक्तिगत सलाह प्राप्त करें',
        'prediction': 'वर्षा भविष्यवाणी',
        'prediction-desc': 'हमारा AI आपके क्षेत्र में भविष्य की वर्षा की भविष्यवाणी करने के लिए मौसम पैटर्न का विश्लेषण करता है',
        'custom-design': 'कस्टम सिस्टम डिजाइन',
        'custom-design-desc': 'अपनी संपत्ति और जरूरतों के आधार पर अनुकूलित संचयन प्रणाली डिजाइन प्राप्त करें',
        'efficiency': 'दक्षता विश्लेषण',
        'efficiency-desc': 'आपके सिस्टम की दक्षता में सुधार के लिए निरंतर निगरानी और सुझाव',
        'your-recommendation': 'आपकी व्यक्तिगत अनुशंसा',
        'recommendation-prompt': 'AI-संचालित अनुशंसाएँ प्राप्त करने के लिए ऊपर अपना स्थान दर्ज करें',
        
        // Community
        'community-title': 'हमारे जल संरक्षण समुदाय से जुड़ें',
        'community-subtitle': 'अनुभव साझा करें, दूसरों से सीखें, और सामूहिक प्रभाव डालें',
        'forums': 'सामुदायिक मंच',
        'forums-desc': 'विचारों पर चर्चा करें, प्रश्न पूछें, और अपनी सफलता की कहानियां साझा करें',
        'projects': 'सहयोगी परियोजनाएं',
        'projects-desc': 'समुदाय-व्यापी जल संरक्षण परियोजनाओं में शामिल हों या शुरू करें',
        'rewards': 'वाटर क्रेडिट',
        'rewards-desc': 'अपने संरक्षण प्रयासों के लिए ब्लॉकचेन-आधारित क्रेडिट अर्जित करें',
        'stories': 'सफलता की कहानियां',
        
        // Contact
        'contact-title': 'संपर्क करें',
        'contact-subtitle': 'प्रश्न हैं? हम मदद के लिए यहां हैं!',
        'name': 'नाम',
        'email': 'ईमेल',
        'message': 'संदेश',
        'send': 'संदेश भेजें',
        
        // Footer
        'footer-tagline': 'स्थायी भविष्य के लिए स्मार्ट वर्षा जल संचयन समाधान',
        'quick-links': 'त्वरित लिंक',
        'home-link': 'होम',
        'about-link': 'हमारे बारे में',
        'solutions-link': 'समाधान',
        'contact-link': 'संपर्क',
        'connect': 'हमसे जुड़ें'
    },
    
    'bn': {
        // Navigation
        'home': 'হোম',
        'about': 'আমাদের সম্পর্কে',
        'data': 'বৃষ্টিপাতের তথ্ୟ',
        'solutions': 'সমাধান',
        'community': 'সম্প্রদায়',
        'contact': 'যোগাযোগ',
        'login': 'লগইন',
        
        // Hero section
        'hero-title': 'প্রতিটি ফোঁটা বাঁচান, আগামীকাল নিশ্চিত করুন',
        'hero-subtitle': 'একটি টেকসই ভবিষ্যতের জন্য ব্যক্তিগতকৃত বৃষ্টির জল সংগ্রহের সমাধান',
        'get-started': 'শুরু করুন',
        'learn-more': 'আরও জানুন',
        
        // Contact
        'contact-title': 'যোগাযোগ করুন',
        'contact-subtitle': 'প্রশ্ন আছে? আমরা সাহায্য করতে এখানে আছি!',
        'name': 'নাম',
        'email': 'ইমেইল',
        'message': 'বার্তা',
        'send': 'বার্তা পাঠান',
        
        // Footer
        'footer-tagline': 'টেকসই ভবিষ্যতের জন্য স্মার্ট বৃষ্টির জল সংগ্রহের সমাধান',
        'quick-links': 'দ্রুত লিঙ্ক',
        'home-link': 'হোম',
        'about-link': 'আমাদের সম্পর্কে',
        'solutions-link': 'সমাধান',
        'contact-link': 'যোগাযোগ',
        'connect': 'আমাদের সাথে যোগাযোগ করুন'
    },
    
    'te': {
        // Navigation
        'home': 'హోమ్',
        'about': 'మా గురించి',
        'data': 'వర్షపాత డేటా',
        'solutions': 'పరిష్కారాలు',
        'community': 'సమాజం',
        'contact': 'సంప్రదించండి',
        'login': 'లాగిన్',
        
        // Hero section
        'hero-title': 'ప్రతి చుక్కను కాపాడండి, రేపటిని భద్రపరచండి',
        'hero-subtitle': 'స్థిరమైన భవిష్యత్తు కోసం వ్యక్తిగతీకరించిన వర్షపు నీటి సేకరణ పరిష్కారాలు',
        'get-started': 'ప్రారంభించండి',
        'learn-more': 'మరింత తెలుసుకోండి',
        
        // Contact
        'contact-title': 'సంప్రదించండి',
        'contact-subtitle': 'ప్రశ్నలు ఉన్నాయా? మేము సహాయం చేయడానికి ఇక్కడ ఉన్నాము!',
        'name': 'పేరు',
        'email': 'ఇమెయిల్',
        'message': 'సందేశం',
        'send': 'సందేశం పంపండి'
    },
    
    'ta': {
        // Navigation
        'home': 'முகப்பு',
        'about': 'எங்களை பற்றி',
        'data': 'மழை தரவு',
        'solutions': 'தீர்வுகள்',
        'community': 'சமூகம்',
        'contact': 'தொடர்பு',
        'login': 'உள்நுழைய',
        
        // Hero section
        'hero-title': 'ஒவ்வொரு துளியையும் சேமியுங்கள், நாளையை உறுதிப்படுத்துங்கள்',
        'hero-subtitle': 'நிலையான எதிர்காலத்திற்கான தனிப்பயனாக்கப்பட்ட மழைநீர் சேகரிப்பு தீர்வுகள்',
        'get-started': 'தொடங்குங்கள்',
        'learn-more': 'மேலும் அறிய',
        
        // Contact
        'contact-title': 'தொடர்பு கொள்ளுங்கள்',
        'contact-subtitle': 'கேள்விகள் உள்ளதா? நாங்கள் உதவ இங்கே இருக்கிறோம்!',
        'name': 'பெயர்',
        'email': 'மின்னஞ்சல்',
        'message': 'செய்தி',
        'send': 'செய்தி அனுப்பு'
    },
    
    'mr': {
        // Navigation
        'home': 'मुख्यपृष्ठ',
        'about': 'आमच्याबद्दल',
        'data': 'पावसाचा डेटा',
        'solutions': 'उपाय',
        'community': 'समुदाय',
        'contact': 'संपर्क',
        'login': 'लॉगिन',
        
        // Hero section
        'hero-title': 'प्रत्येक थेंब वाचवा, उद्याची सुरक्षितता',
        'hero-subtitle': 'शाश्वत भविष्यासाठी वैयक्तिकृत पावसाचे पाणी साठवण्याचे उपाय',
        'get-started': 'सुरू करा',
        'learn-more': 'अधिक जाणून घ्या',
        
        // Contact
        'contact-title': 'संपर्क साधा',
        'contact-subtitle': 'प्रश्न आहेत? आम्ही मदत करण्यासाठी येथे आहोत!',
        'name': 'नाव',
        'email': 'ईमेल',
        'message': 'संदेश',
        'send': 'संदेश पाठवा'
    },
    
    'gu': {
        // Navigation
        'home': 'હોમ',
        'about': 'અમારા વિશે',
        'data': 'વરસાદ ડેટા',
        'solutions': 'ઉકેલો',
        'community': 'સમુદાય',
        'contact': 'સંપર્ક',
        'login': 'લોગિન',
        
        // Hero section
        'hero-title': 'દરેક ટીપું બચાવો, આવતીકાલને સુરક્ષિત કરો',
        'hero-subtitle': 'ટકાઉ ભવિષ્ય માટે વ્યક્તિગત વરસાદી પાણી સંગ્રહના ઉકેલો',
        'get-started': 'શરૂ કરો',
        'learn-more': 'વધુ જાણો',
        
        // Contact
        'contact-title': 'સંપર્કમાં રહો',
        'contact-subtitle': 'પ્રશ્નો છે? અમે મદદ કરવા માટે અહીં છીએ!',
        'name': 'નામ',
        'email': 'ઈમેલ',
        'message': 'સંદેશ',
        'send': 'સંદેશ મોકલો'
    },
    
    'kn': {
        // Navigation
        'home': 'ಮುಖಪುಟ',
        'about': 'ನಮ್ಮ ಬಗ್ಗೆ',
        'data': 'ಮಳೆ ಡೇಟಾ',
        'solutions': 'ಪರಿಹಾರಗಳು',
        'community': 'ಸಮುದಾಯ',
        'contact': 'ಸಂಪರ್ಕ',
        'login': 'ಲಾಗಿನ್',
        
        // Hero section
        'hero-title': 'ಪ್ರತಿ ಹನಿಯನ್ನು ಉಳಿಸಿ, ನಾಳೆಯನ್ನು ಭದ್ರಪಡಿಸಿ',
        'hero-subtitle': 'ಸುಸ್ಥಿರ ಭವಿಷ್ಯಕ್ಕಾಗಿ ವೈಯಕ್ತಿಕ ಮಳೆನೀರು ಕೊಯ್ಲು ಪರಿಹಾರಗಳು',
        'get-started': 'ಪ್ರಾರಂಭಿಸಿ',
        'learn-more': 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ',
        
        // Contact
        'contact-title': 'ಸಂಪರ್ಕಿಸಿ',
        'contact-subtitle': 'ಪ್ರಶ್ನೆಗಳಿವೆಯೇ? ನಾವು ಸಹಾಯ ಮಾಡಲು ಇಲ್ಲಿದ್ದೇವೆ!',
        'name': 'ಹೆಸರು',
        'email': 'ಇಮೇಲ್',
        'message': 'ಸಂದೇಶ',
        'send': 'ಸಂದೇಶ ಕಳುಹಿಸಿ'
    },
    
    'ml': {
        // Navigation
        'home': 'ഹോം',
        'about': 'ഞങ്ങളെക്കുറിച്ച്',
        'data': 'മഴ ഡാറ്റ',
        'solutions': 'പരിഹാരങ്ങൾ',
        'community': 'കമ്മ്യൂണിറ്റി',
        'contact': 'ബന്ധപ്പെടുക',
        'login': 'ലോഗിൻ',
        
        // Hero section
        'hero-title': 'ഓരോ തുള്ളിയും സംരക്ഷിക്കുക, നാളെ സുരക്ഷിതമാക്കുക',
        'hero-subtitle': 'സുസ്ഥിര ഭാവിക്കായുള്ള വ്യക്തിഗത മഴവെള്ള സംഭരണ പരിഹാരങ്ങൾ',
        'get-started': 'ആരംഭിക്കുക',
        'learn-more': 'കൂടുതൽ അറിയുക',
        
        // Contact
        'contact-title': 'ബന്ധപ്പെടുക',
        'contact-subtitle': 'ചോദ്യങ്ങൾ ഉണ്ടോ? ഞങ്ങൾ സഹായിക്കാൻ ഇവിടെയുണ്ട്!',
        'name': 'പേര്',
        'email': 'ഇമെയിൽ',
        'message': 'സന്ദേശം',
        'send': 'സന്ദേശം അയയ്ക്കുക'
    },
    
    'pa': {
        // Navigation
        'home': 'ਹੋਮ',
        'about': 'ਸਾਡੇ ਬਾਰੇ',
        'data': 'ਮੀਂਹ ਡਾਟਾ',
        'solutions': 'ਹੱਲ',
        'community': 'ਕਮਿਊਨਿਟੀ',
        'contact': 'ਸੰਪਰਕ',
        'login': 'ਲੌਗਇਨ',
        
        // Hero section
        'hero-title': 'ਹਰ ਬੂੰਦ ਬਚਾਓ, ਕੱਲ ਨੂੰ ਸੁਰੱਖਿਅਤ ਕਰੋ',
        'hero-subtitle': 'ਟਿਕਾਊ ਭਵਿੱਖ ਲਈ ਨਿੱਜੀ ਮੀਂਹ ਦੇ ਪਾਣੀ ਦੀ ਕਟਾਈ ਦੇ ਹੱਲ',
        'get-started': 'ਸ਼ੁਰੂ ਕਰੋ',
        'learn-more': 'ਹੋਰ ਜਾਣੋ',
        
        // Contact
        'contact-title': 'ਸੰਪਰਕ ਕਰੋ',
        'contact-subtitle': 'ਸਵਾਲ ਹਨ? ਅਸੀਂ ਮਦਦ ਕਰਨ ਲਈ ਇੱਥੇ ਹਾਂ!',
        'name': 'ਨਾਮ',
        'email': 'ਈਮੇਲ',
        'message': 'ਸੁਨੇਹਾ',
        'send': 'ਸੁਨੇਹਾ ਭੇਜੋ'
    },
    
    'or': {
        // Navigation
        'home': 'ହୋମ୍',
        'about': 'ଆମ ବିଷୟରେ',
        'data': 'ବର୍ଷା ତଥ୍ୟ',
        'solutions': 'ସମାଧାନ',
        'community': 'ସମ୍ପ୍ରଦାୟ',
        'contact': 'ଯୋଗାଯୋଗ',
        'login': 'ଲଗଇନ୍',
        
        // Hero section
        'hero-title': 'ପ୍ରତ୍ୟେକ ବୁନ୍ଦା ସଞ୍ଚୟ କରନ୍ତୁ, ଆସନ୍ତାକାଲି ସୁରକ୍ଷିତ କରନ୍ତୁ',
        'hero-subtitle': 'ଏକ ସ୍ଥାୟୀ ଭବିଷ୍ୟତ ପାଇଁ ବ୍ୟକ୍ତିଗତ ବର୍ଷା ଜଳ ଅମଳ ସମାଧାନ',
        'get-started': 'ଆରମ୍ଭ କରନ୍ତୁ',
        'learn-more': 'ଅଧିକ ଜାଣନ୍ତୁ',
        
        // Contact
        'contact-title': 'ଯୋଗାଯୋଗ କରନ୍ତୁ',
        'contact-subtitle': 'ପ୍ରଶ୍ନ ତମିତ ତମିତ ସମାଧାନ କରନ୍ତୁ ପତ୍ତି ସମାଧାନ କରନ୍ତୁ',
        'name': 'ନମ୍ତ୍ତ',
        'email': 'ନମ୍ତ୍ତ',
       'message': 'ନମ୍ତ୍ତ',
       'send': 'ନମ୍ତ୍ତ'
    }
};