// Translation data for Arabic and English
const translations = {
  ar: {
    // Header
    "header.appointment": "MAKE AN APPOINTMENT",
    "header.hours": "Sat - Thu 2:00pm - 10:00pm / Friday - CLOSED",

    // Navigation
    "nav.home": "الرئيسية",
    "nav.about": "من نحن",
    "nav.services": "خدماتنا",
    "nav.cases": "حالات",
    "nav.team": "فريق العمل",
    "nav.blogs": "المدونة",
    "nav.contact": "اتصل بنا",

    // Hero Section
    "hero.slide1.title": "عيادة فايد لطب الأسنان",
    "hero.slide1.subtitle": "أيقونة طب الأسنان الفاخر",
    "hero.slide1.cta": "من نحن؟",
    "hero.slide2.title": "ابتسامة مشرقة",
    "hero.slide2.subtitle": "خدمات طب الأسنان المتقدمة بأحدث التقنيات",
    "hero.slide2.cta": "خدماتنا",
    "hero.slide3.title": "رعاية صحية متميزة",
    "hero.slide3.subtitle": "خبرة سنوات في علاج وتجميل الأسنان",
    "hero.slide3.cta": "احجز موعدك",

    // Hero Service Cards
    "hero.card1.title": "احجز موعدك في العيادة",
    "hero.card1.desc": "تخلص من مشاكل أسنانك بسهولة",
    "hero.card1.btn": "احجز موعدك الآن",
    "hero.card2.title": "احجز استشارة الكترونية",
    "hero.card2.desc":
      "اعرف تفاصيل حالتك قبل زيارة العيادة من الطبيب مباشرة من خلال محادثة فيديو",
    "hero.card2.btn": "احجز الاستشارة الآن",
    "hero.card3.title": "تواصل معنا",
    "hero.card3.desc": "نحن هنا دائمًا للإجابة على أسئلتك",
    "hero.card3.btn": "اتصل بنا الآن",

    // Cases Section
    "cases.title": "نتائج من عيادتنا",
    "cases.section1": "زراعة الأسنان",
    "cases.section2": "تجميل الاسنان بالفينيرز",
    "cases.section3": "تركيبات الزيركون",
    "cases.section4": "التبييض بالليزر",
    "cases.section5": "حشو تجميلي ليزر",
    "cases.section6": "حشو عصب",
    "cases.prev": "السابق",
    "cases.next": "التالي",

    // About Clinic Section
    "about.label": "من نحن",
    "about.title": "عن فايد دينتال كلينك",
    "about.intro": "من نحن – فايد دينتال كلينيك",
    "about.p1":
      "في فايد دينتال كلينيك بنؤمن إن الابتسامة الحلوة بتبدأ من رعاية صحية سليمة ومدروسة. بخبرة أكتر من 7 سنوات في مجال طب وتجميل الأسنان، بنقدّم لمرضانا خدمات متكاملة بأعلى معايير الجودة والدقة، وباستخدام أحدث التقنيات والأجهزة الحديثة لضمان أفضل النتائج.",
    "about.p2":
      "هدفنا مش بس العلاج، لكن كمان توفير تجربة مريحة وآمنة لكل مريض، من أول لحظة دخول للعيادة لحد اكتمال خطة العلاج والمتابعة المستمرة. بنهتم بأدق التفاصيل، من التعقيم الكامل إلى اختيار أنسب خطة علاج تناسب حالة كل مريض واحتياجاته الخاصة.",
    "about.p3":
      "في فايد دينتال كلينيك بنجمع بين الخبرة، الراحة، والاحترافية… علشان نديك ابتسامة صحية تدوم.",
    "about.stat1.number": "3500",
    "about.stat1.label": "عميل راضي",
    "about.stat2.number": "2500",
    "about.stat2.label": "زراعة ناجحة",
    "about.stat3.number": "30",
    "about.stat3.label": "فريق عمل",
    "about.stat4.number": "1600",
    "about.stat4.label": "ابتسامة سعيدة",

    // Testimonials Section
    "testimonials.title": "آراء العملاء",
    "testimonials.t1.text1":
      "فريق طبي على أعلى مستوى، من أول ما بتدخل المركز بتحس أن كل الفريق مهتم بحالتك، مع أحدث تقنيات علاج وتجميل الأسنان في العالم.",
    "testimonials.t1.text2":
      "الدقة في المواعيد والمتابعة المستمرة، والنتيجة النهائية ممتازة.",
    "testimonials.t1.author": "ليلى منصور",
    "testimonials.t2.text1":
      "التجربة كانت مريحة من الحجز لحد ما خلصت الجلسات. الطاقم متعاون جداً وبيشرح كل خطوة قبل ما تحصل.",
    "testimonials.t2.text2":
      "خدمة راقية وابتسامة جديدة فرقت معايا في الشغل وفي الثقة بالنفس.",
    "testimonials.t2.author": "أحمد مصطفى",
    "testimonials.t3.text1":
      "كنت قلقان من الألم، لكن الفريق استخدم تقنيات تخدير مريحة وخففوا توتري بالكامل.",
    "testimonials.t3.text2":
      "العناية بعد الإجراء كانت ممتازة، وكل الأسئلة لقيت إجابات واضحة.",
    "testimonials.t3.author": "سارة حسن",

    // Services Section
    "services.label": "ماذا نقدم؟",
    "services.title": "تعرف على أهم خدماتنا",
    "services.subtitle":
      "نحن في مهمة لتغيير الطريقة التي ينظر بها الناس إلى خدمات صحة الأسنان",
    "services.s1.title": "زراعة الاسنان",
    "services.s1.desc":
      "الحل الأمثل لتعويض الفقد في الأسنان بإجراءات غير مؤلمة وآمنة باستخدام أحدث التقنيات العالمية. احصل على أسنان ثابتة وطبيعية المظهر تدوم للأبد على يد متخصصي زراعة الأسنان في فايد دينتال كلينك",
    "services.s2.title": "تجميل الأسنان",
    "services.s2.desc":
      "تقنية تصميم الإبتسامة بالكمبيوتر توفر لك أسنان أكثر إشراقاً وتناسقاً بدون ألم. نتائج مضمونة وسريعة مع الحفاظ على المظهر الطبيعي باستخدام أحدث التقنيات والمنتجات المستخدمة في تجميل الأسنان داخل فايد دينتال كلينك",
    "services.s3.title": "Hybrid veneers",
    "services.s3.desc":
      "احصل على ابتسامة هوليود بإجراءات مريحة وغير مؤلمة! تقنية Hybrid veneers توفر لك أسنان ناصعة البياض وأكثر إشراقاً مع دقة وسرعة تقنيات تصميم الإبتسامة بالكمبيوتر المتقدمة",
    "services.s4.title": "3N Veneers",
    "services.s4.desc":
      "تقنية 3N Veneers الألمانية المتاحة حصرياً في فايد دينتال كلينك تمنحك أسنان فائقة الإشراق والجمال بإجراءات سريعة وغير مؤلمة. أحدث وأكثر التقنيات تقدماً في عالم تجميل الأسنان لنتائج تدوم لسنوات",
    "services.learnMore": "تعرف على المزيد",
    "services.cta.question": "هل تحتاج إلى متخصص ؟",
    "services.cta.text": "احصل على الأفضل الآن! فقط قم بتحديد موعد",
    "services.cta.btn": "حجز موعد",

    // Footer
    "footer.services.title": "خدمتنا",
    "footer.services.intro":
      "Clinic - Dr. Mohamed Fayed, Oral & dental specialist",
    "footer.service1": "جراحة الوجه والفكين",
    "footer.service2": "زراعة الأسنان",
    "footer.service3": "تقويم الأسنان",
    "footer.service4": "العلاج التحفظي و الحشو",
    "footer.service5": "تجميل الأسنان",
    "footer.service6": "علاج الجذور و حشو العصب",
    "footer.contact.title": "تواصل معنا",
    "footer.address.label": ":العنوان",
    "footer.address.branch1": "فرع المهندسين",
    "footer.address.branch1.text":
      "٤٧ شارع جامعة الدول العربية - متفرع من شارع شهاب",
    "footer.address.branch2": "فرع مصر الجديدة",
    "footer.address.branch2.text":
      "١٦٥ برج عُدي ميدان الألف مسكن - شارع السويس",
    "footer.phone.label": ":رقم الهاتف",
    "footer.hours.label": ":مواعيد العمل",
    "footer.hours.text": "السبت - الخميس : 2 م حتي 10 م, الجمعة مغلق",
    "footer.copyright": "فايد دينتال كلينك. © 2022. All Rights Reserved",

    // Common
    "common.whatsapp": "واتساب",
    "common.scrollTop": "العودة للأعلى",

    // Contact Page
    "contact.title": "اتصل بنا",
    "contact.subtitle":
      "نحن هنا دائماً للإجابة على أسئلتك ومساعدتك في الحصول على ابتسامة أحلامك",
    "contact.branch1.title": "فرع المهندسين",
    "contact.branch1.address":
      "٤٧ شارع جامعة الدول العربية<br>متفرع من شارع شهاب",
    "contact.branch2.title": "فرع مصر الجديدة",
    "contact.branch2.address": "١٦٥ برج عُدي<br>ميدان الألف مسكن - شارع السويس",
    "contact.phone.title": "رقم الهاتف",
    "contact.hours.title": "مواعيد العمل",
    "contact.hours.text": "السبت - الخميس: 2 م حتى 10 م<br>الجمعة: مغلق",
    "contact.whatsapp.title": "واتساب",
    "contact.email.title": "البريد الإلكتروني",
    "contact.cta": "احجز موعدك الآن عبر واتساب",

    // Blog Page
    "blog.title": "المدونة",
    "blog.subtitle": "أحدث المقالات والنصائح حول صحة وجمال الأسنان",
    "blog.back": "العودة للمدونة",
    "blog.category.all": "الكل",
    "blog.category.care": "العناية بالأسنان",
    "blog.category.cosmetic": "تجميل الأسنان",
    "blog.category.implants": "زراعة الأسنان",
    "blog.category.tips": "نصائح عامة",
    "blog.post1.title": "٧ خطوات للعناية اليومية بالأسنان",
    "blog.post1.excerpt":
      "تعرف على أفضل الممارسات اليومية للحفاظ على أسنان صحية وابتسامة مشرقة. من تنظيف الأسنان بالفرشاة إلى استخدام الخيط الطبي.",
    "blog.post2.title": "كل ما تحتاج معرفته عن تبييض الأسنان بالليزر",
    "blog.post2.excerpt":
      "تبييض الأسنان بالليزر هو أحد أكثر الإجراءات التجميلية شيوعاً. اكتشف كيف يعمل، مميزاته، والنتائج المتوقعة.",
    "blog.post3.title": "دليلك الشامل لزراعة الأسنان: الخطوات والفوائد",
    "blog.post3.excerpt":
      "زراعة الأسنان هي الحل الأمثل لتعويض الأسنان المفقودة. تعرف على الإجراءات، المدة الزمنية، ومعدل النجاح.",
    "blog.post4.title": "الفينير والفرق بين الأنواع المختلفة",
    "blog.post4.excerpt":
      "تعرف على أنواع الفينير المختلفة: التقليدي، اللومينير، والـ 3N Veneers. اختر الأنسب لحالتك.",
    "blog.post5.title": "أطعمة تقوي أسنانك وأخرى يجب تجنبها",
    "blog.post5.excerpt":
      "نظامك الغذائي يؤثر بشكل كبير على صحة أسنانك. اكتشف الأطعمة المفيدة وتلك الضارة لأسنانك.",
    "blog.post6.title": "العناية بأسنان الأطفال: متى تبدأ؟",
    "blog.post6.excerpt":
      "العناية بأسنان الأطفال تبدأ منذ ظهور أول سن. تعرف على الخطوات الصحيحة لحماية أسنان طفلك.",
    "blog.post1.date": "١٥ يناير ٢٠٢٦",
    "blog.post1.readTime": "٥ دقائق",
    "blog.post1.tag1": "العناية اليومية",
    "blog.post1.tag2": "صحة الفم",
    "blog.post2.date": "١٢ يناير ٢٠٢٦",
    "blog.post2.readTime": "٧ دقائق",
    "blog.post2.tag1": "تبييض الأسنان",
    "blog.post2.tag2": "ليزر",
    "blog.post2.tag3": "ابتسامة",
    "blog.post3.date": "٨ يناير ٢٠٢٦",
    "blog.post3.readTime": "١٠ دقائق",
    "blog.post3.tag1": "زراعة",
    "blog.post3.tag2": "جراحة",
    "blog.post3.tag3": "تيتانيوم",
    "blog.post4.date": "٥ يناير ٢٠٢٦",
    "blog.post4.readTime": "٦ دقائق",
    "blog.post4.tag1": "فينير",
    "blog.post4.tag2": "ابتسامة هوليوود",
    "blog.post5.date": "٢ يناير ٢٠٢٦",
    "blog.post5.readTime": "٤ دقائق",
    "blog.post5.tag1": "تغذية",
    "blog.post5.tag2": "وقاية",
    "blog.post6.date": "٢٨ ديسمبر ٢٠٢٥",
    "blog.post6.readTime": "٥ دقائق",
    "blog.post6.tag1": "أطفال",
    "blog.post6.tag2": "وقاية",

    // Team Page
    "team.label": "فريق العمل",
    "team.title": "تعرف على فريقنا المتميز",
    "team.subtitle":
      "فريق من المتخصصين والخبراء في مجال طب وتجميل الأسنان، مكرسون لتقديم أفضل رعاية صحية لمرضانا",
    "team.certificates": "الشهادات والمؤهلات",

    // Team Member 1
    "team.member1.name": "د. محمد فايد",
    "team.member1.position": "مؤسس العيادة - أخصائي زراعة وتجميل الأسنان",
    "team.member1.bio":
      "خبرة تزيد عن 7 سنوات في مجال طب وتجميل الأسنان. متخصص في زراعة الأسنان وتصميم الابتسامة الرقمية.",
    "team.member1.cert1": "بكالوريوس طب وجراحة الفم والأسنان",
    "team.member1.cert2": "دبلومة زراعة الأسنان المتقدمة",
    "team.member1.cert3": "شهادة تصميم الابتسامة الرقمية (DSD)",
    "team.member1.cert4": "عضو الجمعية الأمريكية لزراعة الأسنان",

    // Team Member 2
    "team.member2.name": "د. سارة أحمد",
    "team.member2.position": "أخصائي تجميل الأسنان والفينير",
    "team.member2.bio":
      "متخصصة في تجميل الأسنان والقشور الخزفية بخبرة 5 سنوات. خبيرة في تقنيات الفينير والتبييض المتقدمة.",
    "team.member2.cert1": "بكالوريوس طب وجراحة الفم والأسنان",
    "team.member2.cert2": "ماجستير تجميل الأسنان",
    "team.member2.cert3": "شهادة Hybrid Veneers المتقدمة",
    "team.member2.cert4": "دبلومة تبييض الأسنان بالليزر",

    // Team Member 3
    "team.member3.name": "د. أحمد حسن",
    "team.member3.position": "أخصائي علاج الجذور والحشو التجميلي",
    "team.member3.bio":
      "خبير في علاج الجذور والحشو التجميلي بخبرة 6 سنوات. متخصص في العلاجات الدقيقة باستخدام المجهر الطبي.",
    "team.member3.cert1": "بكالوريوس طب وجراحة الفم والأسنان",
    "team.member3.cert2": "دبلومة علاج الجذور المتقدمة",
    "team.member3.cert3": "شهادة الحشو التجميلي بالليزر",
    "team.member3.cert4": "دورة علاج الجذور بالمجهر الطبي",

    // Team Member 4
    "team.member4.name": "د. منى إبراهيم",
    "team.member4.position": "أخصائي طب أسنان الأطفال",
    "team.member4.bio":
      "متخصصة في طب أسنان الأطفال بخبرة 4 سنوات. تتميز بأسلوبها اللطيف في التعامل مع الأطفال وتخفيف قلقهم.",
    "team.member4.cert1": "بكالوريوس طب وجراحة الفم والأسنان",
    "team.member4.cert2": "ماجستير طب أسنان الأطفال",
    "team.member4.cert3": "دبلومة التعامل النفسي مع الأطفال",
    "team.member4.cert4": "شهادة الوقاية من تسوس الأسنان لدى الأطفال",

    // Team CTA
    "team.cta.title": "احجز موعدك مع فريقنا المتميز",
    "team.cta.text":
      "فريقنا جاهز لتقديم أفضل رعاية صحية لأسنانك. احجز استشارتك المجانية الآن!",
    "team.cta.button": "احجز موعدك الآن",
  },
  en: {
    // Header
    "header.appointment": "MAKE AN APPOINTMENT",
    "header.hours": "Sat - Thu 2:00pm - 10:00pm / Friday - CLOSED",

    // Navigation
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.services": "Our Services",
    "nav.cases": "Cases",
    "nav.team": "Our Team",
    "nav.blogs": "Blog",
    "nav.contact": "Contact Us",

    // Hero Section
    "hero.slide1.title": "Fayed Dental Clinic",
    "hero.slide1.subtitle": "The Icon of Luxury Dentistry",
    "hero.slide1.cta": "About Us",
    "hero.slide2.title": "Bright Smile",
    "hero.slide2.subtitle":
      "Advanced dental care services with the latest technologies",
    "hero.slide2.cta": "Our Services",
    "hero.slide3.title": "Exceptional Healthcare",
    "hero.slide3.subtitle":
      "Years of experience in dental treatment and cosmetics",
    "hero.slide3.cta": "Book Appointment",

    // Hero Service Cards
    "hero.card1.title": "Book Your Clinic Appointment",
    "hero.card1.desc": "Get rid of your dental problems easily",
    "hero.card1.btn": "Book Now",
    "hero.card2.title": "Book Online Consultation",
    "hero.card2.desc":
      "Learn about your case details before visiting the clinic directly from the doctor through a video call",
    "hero.card2.btn": "Book Consultation Now",
    "hero.card3.title": "Contact Us",
    "hero.card3.desc": "We're always here to answer your questions",
    "hero.card3.btn": "Call Us Now",

    // Cases Section
    "cases.title": "Results From Our Clinic",
    "cases.section1": "Dental Implants",
    "cases.section2": "Cosmetic Dentistry with Veneers",
    "cases.section3": "Zirconia Crowns",
    "cases.section4": "Laser Whitening",
    "cases.section5": "Cosmetic Laser Fillings",
    "cases.section6": "Root Canal Treatment",
    "cases.prev": "Previous",
    "cases.next": "Next",

    // About Clinic Section
    "about.label": "About Us",
    "about.title": "About Fayed Dental Clinic",
    "about.intro": "About Us – Fayed Dental Clinic",
    "about.p1":
      "At Fayed Dental Clinic, we believe that a beautiful smile starts with proper and thoughtful healthcare. With over 7 years of experience in dentistry and cosmetic dentistry, we provide our patients with comprehensive services to the highest standards of quality and precision, using the latest technologies and modern equipment to ensure the best results.",
    "about.p2":
      "Our goal is not only treatment, but also to provide a comfortable and safe experience for every patient, from the first moment of entering the clinic until the completion of the treatment plan and continuous follow-up. We pay attention to the finest details, from complete sterilization to choosing the most suitable treatment plan that suits each patient's condition and special needs.",
    "about.p3":
      "At Fayed Dental Clinic, we combine experience, comfort, and professionalism... to give you a healthy smile that lasts.",
    "about.stat1.number": "3500",
    "about.stat1.label": "Satisfied Clients",
    "about.stat2.number": "2500",
    "about.stat2.label": "Successful Implants",
    "about.stat3.number": "30",
    "about.stat3.label": "Team Members",
    "about.stat4.number": "1600",
    "about.stat4.label": "Happy Smiles",

    // Testimonials Section
    "testimonials.title": "Client Reviews",
    "testimonials.t1.text1":
      "Medical team at the highest level, from the moment you enter the center you feel that the entire team is concerned about your case, with the latest dental treatment and cosmetic technologies in the world.",
    "testimonials.t1.text2":
      "Punctuality in appointments and continuous follow-up, and the final result is excellent.",
    "testimonials.t1.author": "Laila Mansour",
    "testimonials.t2.text1":
      "The experience was comfortable from booking until the sessions were completed. The staff is very cooperative and explains every step before it happens.",
    "testimonials.t2.text2":
      "Classy service and a new smile that made a difference for me at work and in self-confidence.",
    "testimonials.t2.author": "Ahmed Mostafa",
    "testimonials.t3.text1":
      "I was worried about the pain, but the team used comfortable anesthesia techniques and completely relieved my anxiety.",
    "testimonials.t3.text2":
      "Post-procedure care was excellent, and all questions found clear answers.",
    "testimonials.t3.author": "Sarah Hassan",

    // Services Section
    "services.label": "What We Offer",
    "services.title": "Discover Our Key Services",
    "services.subtitle":
      "We are on a mission to change the way people view dental health services",
    "services.s1.title": "Dental Implants",
    "services.s1.desc":
      "The optimal solution for tooth replacement with painless and safe procedures using the latest global technologies. Get permanent, natural-looking teeth that last forever by dental implant specialists at Fayed Dental Clinic",
    "services.s2.title": "Cosmetic Dentistry",
    "services.s2.desc":
      "Computer smile design technology gives you brighter and more aligned teeth without pain. Guaranteed and fast results while maintaining a natural appearance using the latest techniques and products in cosmetic dentistry at Fayed Dental Clinic",
    "services.s3.title": "Hybrid Veneers",
    "services.s3.desc":
      "Get a Hollywood smile with comfortable and painless procedures! Hybrid veneers technology provides you with brilliant white and brighter teeth with the accuracy and speed of advanced computer smile design techniques",
    "services.s4.title": "3N Veneers",
    "services.s4.desc":
      "German 3N Veneers technology, available exclusively at Fayed Dental Clinic, gives you exceptionally bright and beautiful teeth with quick and painless procedures. The latest and most advanced technology in cosmetic dentistry for results that last for years",
    "services.learnMore": "Learn More",
    "services.cta.question": "Need a Specialist?",
    "services.cta.text": "Get the best now! Just make an appointment",
    "services.cta.btn": "Book Appointment",

    // Footer
    "footer.services.title": "Our Services",
    "footer.services.intro":
      "Clinic - Dr. Mohamed Fayed, Oral & dental specialist",
    "footer.service1": "Maxillofacial Surgery",
    "footer.service2": "Dental Implants",
    "footer.service3": "Orthodontics",
    "footer.service4": "Conservative Treatment & Fillings",
    "footer.service5": "Cosmetic Dentistry",
    "footer.service6": "Root Canal & Nerve Filling",
    "footer.contact.title": "Contact Us",
    "footer.address.label": "Address:",
    "footer.address.branch1": "Mohandessin Branch",
    "footer.address.branch1.text": "47 Arab League Street - off Shehab Street",
    "footer.address.branch2": "Heliopolis Branch",
    "footer.address.branch2.text":
      "165 Oudi Tower, Alf Maskan Square - Suez Street",
    "footer.phone.label": "Phone Number:",
    "footer.hours.label": "Working Hours:",
    "footer.hours.text": "Saturday - Thursday: 2 PM to 10 PM, Friday Closed",
    "footer.copyright": "Fayed Dental Clinic. © 2022. All Rights Reserved",

    // Common
    "common.whatsapp": "WhatsApp",
    "common.scrollTop": "Back to Top",

    // Contact Page
    "contact.title": "Contact Us",
    "contact.subtitle":
      "We are always here to answer your questions and help you get your dream smile",
    "contact.branch1.title": "Mohandessin Branch",
    "contact.branch1.address": "47 Arab League Street<br>Off Shehab Street",
    "contact.branch2.title": "Heliopolis Branch",
    "contact.branch2.address":
      "165 Oudi Tower<br>Alf Maskan Square - Suez Street",
    "contact.phone.title": "Phone Number",
    "contact.hours.title": "Working Hours",
    "contact.hours.text":
      "Saturday - Thursday: 2 PM to 10 PM<br>Friday: Closed",
    "contact.whatsapp.title": "WhatsApp",
    "contact.email.title": "Email",
    "contact.cta": "Book Your Appointment Now via WhatsApp",

    // Blog Page
    "blog.title": "Blog",
    "blog.subtitle": "Latest articles and tips about dental health and beauty",
    "blog.back": "Back to Blog",
    "blog.category.all": "All",
    "blog.category.care": "Dental Care",
    "blog.category.cosmetic": "Cosmetic Dentistry",
    "blog.category.implants": "Dental Implants",
    "blog.category.tips": "General Tips",
    "blog.post1.title": "7 Steps for Daily Dental Care",
    "blog.post1.excerpt":
      "Learn the best daily practices to maintain healthy teeth and a bright smile. From brushing to flossing.",
    "blog.post2.title":
      "Everything You Need to Know About Laser Teeth Whitening",
    "blog.post2.excerpt":
      "Laser teeth whitening is one of the most popular cosmetic procedures. Discover how it works, its benefits, and expected results.",
    "blog.post3.title":
      "Your Complete Guide to Dental Implants: Steps and Benefits",
    "blog.post3.excerpt":
      "Dental implants are the optimal solution for replacing missing teeth. Learn about procedures, timeline, and success rate.",
    "blog.post4.title": "Veneers and the Difference Between Types",
    "blog.post4.excerpt":
      "Learn about different types of veneers: traditional, lumineers, and 3N Veneers. Choose the best for your case.",
    "blog.post5.title": "Foods That Strengthen Your Teeth and Others to Avoid",
    "blog.post5.excerpt":
      "Your diet greatly affects your dental health. Discover beneficial foods and those harmful to your teeth.",
    "blog.post6.title": "Children's Dental Care: When to Start?",
    "blog.post6.excerpt":
      "Children's dental care begins from the first tooth. Learn the right steps to protect your child's teeth.",
    "blog.post1.date": "January 15, 2026",
    "blog.post1.readTime": "5 min",
    "blog.post1.tag1": "Daily Care",
    "blog.post1.tag2": "Oral Health",
    "blog.post2.date": "January 12, 2026",
    "blog.post2.readTime": "7 min",
    "blog.post2.tag1": "Teeth Whitening",
    "blog.post2.tag2": "Laser",
    "blog.post2.tag3": "Smile",
    "blog.post3.date": "January 8, 2026",
    "blog.post3.readTime": "10 min",
    "blog.post3.tag1": "Implants",
    "blog.post3.tag2": "Surgery",
    "blog.post3.tag3": "Titanium",
    "blog.post4.date": "January 5, 2026",
    "blog.post4.readTime": "6 min",
    "blog.post4.tag1": "Veneers",
    "blog.post4.tag2": "Hollywood Smile",
    "blog.post5.date": "January 2, 2026",
    "blog.post5.readTime": "4 min",
    "blog.post5.tag1": "Nutrition",
    "blog.post5.tag2": "Prevention",
    "blog.post6.date": "December 28, 2025",
    "blog.post6.readTime": "5 min",
    "blog.post6.tag1": "Children",
    "blog.post6.tag2": "Prevention",

    // Team Page
    "team.label": "Our Team",
    "team.title": "Meet Our Distinguished Team",
    "team.subtitle":
      "A team of specialists and experts in dentistry and cosmetic dentistry, dedicated to providing the best healthcare for our patients",
    "team.certificates": "Certificates and Qualifications",

    // Team Member 1
    "team.member1.name": "Dr. Mohamed Fayed",
    "team.member1.position":
      "Clinic Founder - Dental Implants & Cosmetic Dentistry Specialist",
    "team.member1.bio":
      "Over 7 years of experience in dentistry and cosmetic dentistry. Specialist in dental implants and digital smile design.",
    "team.member1.cert1": "Bachelor of Dental Surgery (BDS)",
    "team.member1.cert2": "Advanced Dental Implantology Diploma",
    "team.member1.cert3": "Digital Smile Design (DSD) Certificate",
    "team.member1.cert4": "Member of American Academy of Implant Dentistry",

    // Team Member 2
    "team.member2.name": "Dr. Sarah Ahmed",
    "team.member2.position": "Cosmetic Dentistry & Veneers Specialist",
    "team.member2.bio":
      "Specialist in cosmetic dentistry and porcelain veneers with 5 years of experience. Expert in veneers and advanced whitening techniques.",
    "team.member2.cert1": "Bachelor of Dental Surgery (BDS)",
    "team.member2.cert2": "Master's in Cosmetic Dentistry",
    "team.member2.cert3": "Advanced Hybrid Veneers Certificate",
    "team.member2.cert4": "Laser Teeth Whitening Diploma",

    // Team Member 3
    "team.member3.name": "Dr. Ahmed Hassan",
    "team.member3.position": "Root Canal & Cosmetic Filling Specialist",
    "team.member3.bio":
      "Expert in root canal treatment and cosmetic fillings with 6 years of experience. Specialist in precise treatments using microscope.",
    "team.member3.cert1": "Bachelor of Dental Surgery (BDS)",
    "team.member3.cert2": "Advanced Endodontics Diploma",
    "team.member3.cert3": "Laser Cosmetic Filling Certificate",
    "team.member3.cert4": "Microscopic Root Canal Treatment Course",

    // Team Member 4
    "team.member4.name": "Dr. Mona Ibrahim",
    "team.member4.position": "Pediatric Dentistry Specialist",
    "team.member4.bio":
      "Specialist in pediatric dentistry with 4 years of experience. Distinguished by her gentle approach to children and anxiety relief.",
    "team.member4.cert1": "Bachelor of Dental Surgery (BDS)",
    "team.member4.cert2": "Master's in Pediatric Dentistry",
    "team.member4.cert3": "Child Psychology Diploma",
    "team.member4.cert4": "Dental Caries Prevention Certificate",

    // Team CTA
    "team.cta.title": "Book Your Appointment with Our Distinguished Team",
    "team.cta.text":
      "Our team is ready to provide the best dental care for you. Book your free consultation now!",
    "team.cta.button": "Book Your Appointment Now",
  },
};
