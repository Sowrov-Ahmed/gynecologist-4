/* Single source of truth for all site content. Owned by the Team Lead. DO NOT EDIT. */
window.SITE = {
  doctor: {
    name: 'Dr. Imran Chowdhury',
    initials: 'IC',
    title: 'Consultant Obstetrician & Gynecologic Surgeon',
    role: 'Obstetrics & Gynecology',
    degrees: 'MBBS, FCPS (Obs & Gynae), MRCOG',
    degreesFull: 'MBBS (Chittagong Medical College), FCPS (Obstetrics & Gynecology), MRCOG (United Kingdom)',
    bmdc: 'A-58306',
    experience: 15,
    stats: { experience: 15, patients: 22000, deliveries: 5100, surgeries: 2600, publications: 18, rating: 4.9, reviews: 1950 },
    phone: '+880 1912-558204',
    phoneHref: 'tel:+8801912558204',
    whatsapp: 'https://wa.me/8801912558204',
    email: 'appointments@drimranchowdhury.com',
    languages: ['Bangla', 'English'],
    social: {
      facebook: 'https://www.facebook.com/drimranchowdhury',
      linkedin: 'https://www.linkedin.com/in/drimranchowdhury',
      youtube: 'https://www.youtube.com/@drimranchowdhury',
      instagram: 'https://www.instagram.com/drimranchowdhury'
    },
    tagline: 'Precise, evidence-based women\'s healthcare delivered with calm and care.',
    bio: [
      'Dr. Imran Chowdhury is a consultant obstetrician and gynecologic surgeon with 15 years of experience in high-risk pregnancy, fertility and minimally invasive surgery.',
      'He has cared for more than 22,000 women across Dhaka and Chattogram, combining modern diagnostics with clear, respectful communication in Bangla or English.'
    ],
    points: ['Modern diagnostics on site', 'Clear plans backed by international guidelines', 'Complete care from first visit to follow-up'],
    experienceList: [
      { year: '2020 – Present', title: 'Consultant & Head of Unit', place: 'Obstetrics & Gynecology, Pinecrest Hospital' },
      { year: '2016 – 2020', title: 'Assistant Professor', place: 'Obstetrics & Gynecology, Meridian Medical College Hospital' },
      { year: '2012 – 2016', title: 'Registrar', place: 'Obstetrics & Gynecology, Chattogram Medical College Hospital' }
    ],
    education: [
      { year: '2015', title: 'MRCOG', place: 'Royal College of Obstetricians and Gynaecologists, United Kingdom' },
      { year: '2011', title: 'FCPS (Obstetrics & Gynecology)', place: 'Bangladesh College of Physicians and Surgeons' },
      { year: '2007', title: 'MBBS', place: 'Chittagong Medical College' }
    ],
    memberships: ['Bangladesh Medical & Dental Council (BMDC)', 'Obstetrical & Gynaecological Society of Bangladesh (OGSB)', 'Bangladesh Society of Laparoscopic Surgeons'],
    expertise: ['High-risk pregnancy', 'Delivery & caesarean care', 'Fertility treatment', 'PCOS & menstrual disorders', 'Laparoscopic surgery', 'Screening & menopause'],
    values: [
      { title: 'Precision', text: 'Accurate diagnosis first, using on-site ultrasound and focused testing.', icon: 'activity' },
      { title: 'Clarity', text: 'Every result and option explained in plain language before you decide.', icon: 'message' },
      { title: 'Continuity', text: 'Planned follow-up so nothing is left unanswered after your visit.', icon: 'calendar-check' }
    ]
  },

  photos: {
    window: { src: 'assets/images/doctor-window.webp', w: 1280, h: 714, pos: 'object-[78%_center]', alt: 'Dr. Imran Chowdhury looking out of a tall hospital window towards the city' },
    portrait: { src: 'assets/images/doctor-portrait.webp', w: 1024, h: 1024, pos: 'object-top', alt: 'Portrait of Dr. Imran Chowdhury in a white coat with a stethoscope' },
    diagnostic: { src: 'assets/images/doctor-diagnostic.webp', w: 1280, h: 714, pos: 'object-[70%_center]', alt: 'Dr. Imran Chowdhury standing in a diagnostic room with ultrasound equipment' },
    hallway: { src: 'assets/images/doctor-hallway.webp', w: 1280, h: 714, pos: 'object-[52%_center]', alt: 'Dr. Imran Chowdhury standing with arms crossed in a bright hospital corridor' },
    reception: { src: 'assets/images/doctor-reception.webp', w: 1280, h: 714, pos: 'object-[52%_center]', alt: 'Dr. Imran Chowdhury smiling at the hospital reception area' },
    tablet: { src: 'assets/images/doctor-tablet.webp', w: 1200, h: 896, pos: 'object-[55%_center]', alt: 'Dr. Imran Chowdhury reviewing patient records on a tablet at his desk' },
    listening: { src: 'assets/images/doctor-listening.webp', w: 1200, h: 896, pos: 'object-[45%_center]', alt: 'Dr. Imran Chowdhury listening attentively to a patient' },
    cutout: { src: 'assets/images/doctor-cutout.webp', w: 369, h: 506, pos: 'object-top', alt: 'Dr. Imran Chowdhury with arms crossed in a white coat' }
  },

  nav: [
    { key: 'home', label: 'Home', href: 'index.html' },
    { key: 'about', label: 'About', href: 'about.html' },
    { key: 'services', label: 'Services', href: 'services.html' },
    { key: 'chambers', label: 'Chambers', href: 'chambers.html' },
    { key: 'contact', label: 'Contact', href: 'contact.html' }
  ],

  chambers: [
    {
      id: 'banani', name: 'Pinecrest Hospital', area: 'Banani', city: 'Dhaka',
      address: 'House 9, Road 11, Banani, Dhaka 1213',
      days: ['Sat', 'Mon', 'Wed'], weekdays: [6, 1, 3],
      time: '6:00 PM – 10:00 PM', start: '18:00', end: '22:00', slotMin: 15,
      fee: { new: 2000, followup: 1000 }, phone: '+880 1912-558204',
      mapEmbed: 'https://www.google.com/maps?q=Road+11+Banani+Dhaka&output=embed',
      mapLink: 'https://www.google.com/maps/search/?api=1&query=Road+11+Banani+Dhaka',
      features: ['On-site ultrasound and lab', 'Operation theatre and birth suite', 'Valet parking'],
      note: 'Main chamber, where deliveries and surgeries take place.'
    },
    {
      id: 'mohammadpur', name: 'Meridian Medical Centre', area: 'Mohammadpur', city: 'Dhaka',
      address: 'Town Hall Road, Mohammadpur, Dhaka 1207',
      days: ['Sun', 'Tue'], weekdays: [0, 2],
      time: '4:00 PM – 8:00 PM', start: '16:00', end: '20:00', slotMin: 15,
      fee: { new: 1500, followup: 800 }, phone: '+880 1912-558204',
      mapEmbed: 'https://www.google.com/maps?q=Town+Hall+Road+Mohammadpur+Dhaka&output=embed',
      mapLink: 'https://www.google.com/maps/search/?api=1&query=Town+Hall+Road+Mohammadpur+Dhaka',
      features: ['Antenatal clinic', 'Digital imaging', 'Lift and wheelchair access'],
      note: 'Convenient for west and central Dhaka.'
    },
    {
      id: 'khulshi', name: 'Harbor Care Hospital', area: 'Khulshi', city: 'Chattogram',
      address: 'Zakir Hossain Road, Khulshi, Chattogram 4202',
      days: ['Thu', 'Fri'], weekdays: [4, 5],
      time: '10:00 AM – 2:00 PM', start: '10:00', end: '14:00', slotMin: 15,
      fee: { new: 1300, followup: 700 }, phone: '+880 1912-558204',
      mapEmbed: 'https://www.google.com/maps?q=Zakir+Hossain+Road+Khulshi+Chattogram&output=embed',
      mapLink: 'https://www.google.com/maps/search/?api=1&query=Zakir+Hossain+Road+Khulshi+Chattogram',
      features: ['Women-only waiting lounge', 'Ultrasound', 'Pharmacy'],
      note: 'Weekend clinic for patients across the Chattogram division.'
    }
  ],

  services: [
    {
      slug: 'high-risk-pregnancy-care', title: 'High-Risk Pregnancy Care', icon: 'heart', art: 'pregnancy',
      short: 'Close monitoring, scans and clear plans for pregnancies that need extra attention.',
      fee: 'From ৳1,500', feeFrom: 1500, duration: '30 min per visit',
      overview: 'Age, diabetes, high blood pressure, twins or earlier complications raise risk. Frequent, well-planned review keeps both mother and baby safe.',
      includes: ['Detailed anomaly and growth scans', 'Blood pressure and sugar management', 'Preeclampsia and preterm-birth screening', 'Birth plan built around your risks'],
      suitableFor: ['Diabetes, thyroid or high blood pressure', 'Twins or pregnancy after 35', 'Previous miscarriage or preterm birth'],
      process: [
        { t: 'Risk review', d: 'History, examination and baseline tests.' },
        { t: 'Close monitoring', d: 'Scheduled scans and checks with clear targets.' },
        { t: 'Birth plan', d: 'Timing and mode of birth agreed in advance.' }
      ]
    },
    {
      slug: 'delivery-and-caesarean-care', title: 'Delivery & Caesarean Care', icon: 'shield', art: 'delivery',
      short: 'Normal birth and planned or emergency caesarean with a full obstetric team.',
      fee: 'From ৳50,000', feeFrom: 50000, duration: 'Package, 2–4 day stay',
      overview: 'Whether birth is planned or urgent, you receive continuous monitoring, a clear plan and attentive aftercare for you and your baby.',
      includes: ['Normal birth with pain-relief options', 'Planned and emergency caesarean', 'Newborn assessment and feeding support', 'Postnatal reviews at one and six weeks'],
      suitableFor: ['Term pregnancy at 37+ weeks', 'Previous caesarean (VBAC counseling)', 'Twin or high-risk pregnancy'],
      process: [
        { t: 'Birth plan', d: 'Preferences and risks reviewed around week 32.' },
        { t: 'Birth day', d: 'Dr. Imran leads the team throughout labor.' },
        { t: 'Recovery', d: 'Hospital stay, newborn checks and follow-up.' }
      ]
    },
    {
      slug: 'fertility-evaluation-treatment', title: 'Fertility Evaluation & Treatment', icon: 'sparkles', art: 'fertility',
      short: 'Structured testing and stepwise treatment for couples hoping to conceive.',
      fee: 'From ৳2,500', feeFrom: 2500, duration: '45 min couple visit',
      overview: 'Both partners are evaluated together, so the simplest effective treatment starts first and unnecessary procedures are avoided.',
      includes: ['Couple evaluation and test planning', 'Ovulation tracking and induction', 'IUI and IVF counseling and referral', 'Recurrent miscarriage assessment'],
      suitableFor: ['12 months of trying without success', 'Women over 35 trying for 6 months', 'Irregular periods or known PCOS'],
      process: [
        { t: 'Joint consultation', d: 'History and tests for both partners.' },
        { t: 'Diagnosis', d: 'Clear causes, options and realistic chances.' },
        { t: 'Treatment', d: 'Stepwise care from medicines to assisted conception.' }
      ]
    },
    {
      slug: 'pcos-menstrual-disorders', title: 'PCOS & Menstrual Disorders', icon: 'droplet', art: 'pcos',
      short: 'Diagnosis and long-term management of irregular, heavy or painful periods and PCOS.',
      fee: 'From ৳1,500', feeFrom: 1500, duration: '40 min first visit',
      overview: 'Irregular cycles, heavy bleeding, acne or unwanted hair often share a hormonal cause. Targeted tests and a realistic plan restore balance.',
      includes: ['Hormone and thyroid evaluation', 'Pelvic ultrasound', 'Diet, activity and weight programme', 'Medicines for cycle control and symptoms'],
      suitableFor: ['Irregular or missed periods', 'Very heavy or painful periods', 'Acne, hair growth or weight gain'],
      process: [
        { t: 'Assessment', d: 'Symptoms, blood tests and ultrasound together.' },
        { t: 'Personal plan', d: 'Lifestyle and medicines matched to your goals.' },
        { t: 'Review', d: 'Progress checks every 6 to 8 weeks.' }
      ]
    },
    {
      slug: 'laparoscopic-gynecologic-surgery', title: 'Laparoscopic Gynecologic Surgery', icon: 'scissors', art: 'surgery',
      short: 'Keyhole surgery for fibroids, cysts and endometriosis with a faster recovery.',
      fee: 'From ৳70,000', feeFrom: 70000, duration: '1–2 day stay',
      overview: 'Keyhole techniques mean smaller wounds, less pain and an earlier return to daily life, planned carefully around your needs.',
      includes: ['Fibroid and ovarian cyst removal', 'Endometriosis surgery', 'Laparoscopic hysterectomy', 'Hysteroscopy for polyps and adhesions'],
      suitableFor: ['Fibroids or ovarian cysts', 'Chronic pelvic pain', 'Heavy bleeding not controlled by medicine'],
      process: [
        { t: 'Pre-surgery review', d: 'Scans, fitness checks and a clear surgical plan.' },
        { t: 'Surgery', d: 'Keyhole procedure under anesthesia, usually 45 to 90 minutes.' },
        { t: 'Recovery', d: 'Walking the same day and a review after one week.' }
      ]
    },
    {
      slug: 'screening-menopause-care', title: 'Screening & Menopause Care', icon: 'sun', art: 'wellness',
      short: 'Pap smear, HPV testing, breast checks and menopause support in one visit.',
      fee: 'From ৳1,300', feeFrom: 1300, duration: '30 min',
      overview: 'Regular screening finds cervical and breast changes early, when they are easiest to treat. Menopause care protects comfort, bones and heart.',
      includes: ['Pap smear and HPV testing', 'Clinical breast examination', 'Contraception counseling', 'Menopause and bone-health plan'],
      suitableFor: ['Women over 25 for routine screening', 'Hot flushes, poor sleep or mood changes', 'Family history of breast or cervical cancer'],
      process: [
        { t: 'Consultation', d: 'Private discussion of concerns and risk factors.' },
        { t: 'Screening', d: 'Gentle examination and any required tests.' },
        { t: 'Care plan', d: 'Results explained with a yearly check-up schedule.' }
      ]
    }
  ],

  posts: [
    {
      slug: 'high-risk-pregnancy-warning-signs', title: 'High-Risk Pregnancy: Warning Signs You Should Never Ignore',
      category: 'Pregnancy', date: '2026-11-08', readMin: 5, art: 'pregnancy', featured: true,
      excerpt: 'Know which symptoms need a call or a hospital visit the same day.',
      body: [
        'Some pregnancies need extra care from the start: mothers over 35, those with diabetes or high blood pressure, twins, or a previous preterm birth or loss. Even in a healthy pregnancy, a few symptoms should never be ignored.',
        'Seek medical help the same day for vaginal bleeding, leaking fluid, severe or persistent headache with blurred vision or sudden swelling, severe abdominal pain, fever, repeated vomiting, or a clear reduction in your baby\'s movements. Regular contractions before 37 weeks also need urgent review.',
        'Do not wait for the next scheduled visit. Keep your reports with you, note when symptoms began, and go to a hospital with obstetric care if you cannot reach your doctor quickly.'
      ],
      takeaways: ['Bleeding, fluid leak and reduced movements need same-day review', 'Headache with blurred vision or swelling can signal preeclampsia', 'Regular contractions before 37 weeks are urgent']
    },
    {
      slug: 'postpartum-care-first-six-weeks', title: 'Postpartum Care: The First Six Weeks After Birth',
      category: 'Postnatal', date: '2026-10-24', readMin: 5, art: 'delivery',
      excerpt: 'Healing, bleeding, rest and mood: what is normal and when to call.',
      body: [
        'Your body needs time to heal. Bleeding is normal for up to four to six weeks and should slowly lighten. Rest when your baby sleeps, eat regular protein-rich meals, drink plenty of fluids and accept help with chores.',
        'Call your doctor for bleeding that soaks a pad within an hour, fever, foul-smelling discharge, severe pain, a swollen painful calf, chest pain or breathlessness. Wound care instructions after a caesarean or stitches should be followed closely.',
        'Feeling tearful in the first two weeks is common. If low mood, anxiety or loss of interest lasts longer or worsens, speak to your doctor. Plan contraception and a postnatal check around six weeks.'
      ],
      takeaways: ['Bleeding should lighten steadily over 4 to 6 weeks', 'Fever, heavy bleeding or calf pain need urgent review', 'Persistent low mood deserves help, not silence']
    },
    {
      slug: 'heavy-periods-causes-and-treatment', title: 'Heavy Periods: Causes, Tests and Treatment Options',
      category: 'Periods', date: '2026-10-10', readMin: 5, art: 'pcos',
      excerpt: 'When heavy bleeding is more than an inconvenience, and how it is treated.',
      body: [
        'Periods are considered heavy when you soak a pad every one to two hours, bleed for more than seven days, pass clots larger than a coin, or feel tired and breathless from blood loss. Heavy bleeding commonly causes anemia.',
        'Causes include fibroids, polyps, adenomyosis, hormonal imbalance such as PCOS, thyroid problems, bleeding disorders and some contraceptive devices. Tests usually include a blood count, an ultrasound and sometimes a thyroid test or hysteroscopy.',
        'Treatment depends on the cause and your plans. Options include tranexamic acid, hormonal pills or a hormone-releasing coil, iron replacement, and procedures to remove fibroids or polyps when needed.'
      ],
      takeaways: ['A soaked pad every 1 to 2 hours is not normal', 'Check hemoglobin if you feel tired or breathless', 'Most causes can be treated without major surgery']
    },
    {
      slug: 'ivf-explained', title: 'IVF Explained: Who Needs It and What to Expect',
      category: 'Fertility', date: '2026-09-26', readMin: 6, art: 'fertility',
      excerpt: 'A clear walk-through of the process, success factors and questions to ask.',
      body: [
        'In vitro fertilization (IVF) means eggs are collected after hormone stimulation, fertilized in the laboratory and the resulting embryo is placed in the womb. It is usually advised for blocked tubes, severe male factor infertility, or when simpler treatments have not worked.',
        'One cycle takes about four to six weeks from the start of stimulation to the pregnancy test. Success depends mainly on the woman\'s age and the cause of infertility. Risks include ovarian overstimulation and multiple pregnancy, which careful monitoring reduces.',
        'Ask any clinic for success rates by age group, the number of embryos they transfer, the total cost including medicines and what happens if a cycle is unsuccessful. A clear plan reduces stress.'
      ],
      takeaways: ['IVF suits blocked tubes, severe male factor or failed simpler treatment', 'Age is the strongest factor in success', 'Ask for age-specific success rates and the full cost']
    },
    {
      slug: 'hysterectomy-and-alternatives', title: 'Hysterectomy: When It Is Needed and Safer Alternatives',
      category: 'Surgery', date: '2026-09-09', readMin: 5, art: 'surgery',
      excerpt: 'Understand the reasons for surgery and the options to consider first.',
      body: [
        'A hysterectomy removes the uterus. It is advised for conditions such as fibroids with heavy bleeding, adenomyosis, uterine prolapse, severe endometriosis or cancer. After it, periods stop and pregnancy is no longer possible.',
        'Many women can try other treatments first: medicines, a hormone-releasing coil, endometrial ablation, removal of fibroids only (myomectomy) or embolization of the uterine arteries. The right choice depends on your symptoms, age and plans for children.',
        'When surgery is chosen, the laparoscopic (keyhole) route usually means a shorter stay and a return to normal activity in two to four weeks, compared with six to eight weeks after open surgery. Whether the ovaries stay is decided together.'
      ],
      takeaways: ['Alternatives exist for many conditions', 'Keyhole surgery recovers faster than open surgery', 'Decide about the ovaries before surgery']
    },
    {
      slug: 'menopause-and-heart-health', title: 'Menopause and Heart Health: What Every Woman Should Know',
      category: 'Menopause', date: '2026-08-21', readMin: 5, art: 'wellness',
      excerpt: 'Why risk rises after menopause and the habits that protect you.',
      body: [
        'Before menopause, estrogen helps protect the heart. After it, blood pressure, cholesterol and sugar tend to rise, so cardiovascular risk increases. Bone strength also falls, making this an important time for prevention.',
        'Check blood pressure, cholesterol and blood sugar every year. Aim for about 150 minutes of brisk walking or similar activity each week, a diet rich in vegetables, pulses and fish, no tobacco, and a healthy weight.',
        'Hormone therapy suits some women with troublesome symptoms but not everyone, and the decision should be personal. Seek urgent help for chest pain, breathlessness or sudden weakness.'
      ],
      takeaways: ['Heart and bone risk rise after menopause', 'Yearly checks of blood pressure, cholesterol and sugar', 'Hormone therapy is a personal decision']
    }
  ],

  testimonials: [
    { name: 'Nusrat Karim', area: 'Banani, Dhaka', service: 'High-Risk Pregnancy', rating: 5, initials: 'NK', text: 'With my diabetes I was anxious. Dr. Imran planned every visit and every scan, and my daughter was born healthy.' },
    { name: 'Salma Akter', area: 'Mohammadpur, Dhaka', service: 'PCOS Care', rating: 5, initials: 'SA', text: 'He explained my hormone report line by line. Six months later my cycle is regular and I finally feel in control.' },
    { name: 'Farzana Yeasmin', area: 'Khulshi, Chattogram', service: 'Fertility Care', rating: 5, initials: 'FY', text: 'We were honest with each other and with him. He tested both of us and never pushed us toward expensive options.' },
    { name: 'Rubina Haque', area: 'Gulshan, Dhaka', service: 'Laparoscopic Surgery', rating: 5, initials: 'RH', text: 'The surgery was through tiny cuts. I walked that evening and was home the next day, with almost no pain.' },
    { name: 'Tahmida Rahman', area: 'Dhanmondi, Dhaka', service: 'Delivery Care', rating: 5, initials: 'TR', text: 'When my labor needed a caesarean, he was calm and clear. I never felt rushed or afraid.' },
    { name: 'Mahbuba Alam', area: 'Agrabad, Chattogram', service: 'Screening', rating: 5, initials: 'MA', text: 'My screening was quick and respectful. He gave me my results and a reminder date for the next test.' },
    { name: 'Hosne Ara', area: 'Uttara, Dhaka', service: 'Menopause Care', rating: 5, initials: 'HA', text: 'My sleep and hot flushes improved within weeks. He listened to every worry without hurrying me.' },
    { name: 'Jesmin Sultana', area: 'Banasree, Dhaka', service: 'Heavy Periods', rating: 4, initials: 'JS', text: 'My anemia finally had an explanation. Treatment was simple and the follow-ups were always on time.' },
    { name: 'Afrin Chowdhury', area: 'Panchlaish, Chattogram', service: 'High-Risk Pregnancy', rating: 5, initials: 'AC', text: 'Twins can be scary. His team monitored us closely and explained each step. Both babies are doing great.' }
  ],

  faqs: [
    { cat: 'Appointments', q: 'How can I book an appointment?', a: 'Book online through the appointment page, call +880 1912-558204 or message on WhatsApp. You will receive an SMS confirmation within two hours.' },
    { cat: 'Appointments', q: 'What should I bring to my first visit?', a: 'Bring previous prescriptions, reports and scans, and note the first day of your last period.' },
    { cat: 'Appointments', q: 'Can I change or cancel my appointment?', a: 'Yes. Please let us know at least 12 hours ahead so the slot can be offered to another patient.' },
    { cat: 'Appointments', q: 'Are walk-in patients seen?', a: 'Walk-ins are seen after booked patients, so waiting can be long. Booking ahead is strongly recommended.' },
    { cat: 'Appointments', q: 'Is online consultation available?', a: 'Existing patients can request video follow-ups. First visits are in person so that a proper examination can be done.' },
    { cat: 'Pregnancy', q: 'When should my first antenatal visit be?', a: 'As soon as the pregnancy test is positive, ideally by 8 to 10 weeks, so tests and vitamins can start early.' },
    { cat: 'Pregnancy', q: 'How often are antenatal visits needed?', a: 'Monthly until week 28, every two weeks until week 36 and weekly after that, unless your doctor advises a different schedule.' },
    { cat: 'Pregnancy', q: 'Is travel safe during pregnancy?', a: 'Travel is generally safe in the second trimester. Discuss long journeys with your doctor, especially after week 34 or with any complication.' },
    { cat: 'Treatments', q: 'Is keyhole surgery safe?', a: 'Yes. It is a well-established technique with smaller wounds, less pain and quicker recovery. Your suitability is checked before surgery.' },
    { cat: 'Treatments', q: 'Does every PCOS patient need medicines?', a: 'No. Many women improve with diet and exercise alone. Medicines are added only when tests and symptoms require them.' },
    { cat: 'Payments', q: 'What are the consultation fees?', a: 'New patients pay ৳1,300 to ৳2,000 depending on the chamber. Follow-up visits within 30 days are ৳700 to ৳1,000.' },
    { cat: 'Payments', q: 'Which payment methods are accepted?', a: 'Cash, bKash, Nagad and major debit or credit cards are accepted at the hospital counters.' }
  ]
};
