export const translations = {
  en: {
    overview: "Overview",
    documentation: "Documentation",
    purchase: "Purchase",
    interactiveTeardown: "Interactive Teardown",
    precisionArch: "Precision Internal Architecture",
    heroDesc: "Explore the competition-grade engineering of the VOLTRIX 2940 Brushless Motor in signature Electric Yellow. Drag the slider to expand the assembly and click individual components to inspect their specifications.",
    assembled: "Assembled",
    explodedView: "Exploded View",
    resetView: "Reset View",
    componentIsolated: "Component Isolated",
    keySpecs: "Key Specifications",
    inspectComponents: "Inspect Components",
    inspectDesc: "Click on any component in the assembly view to isolate it and view detailed technical specifications.",
    interactionHint: "Interaction: Click background to deselect",
    dragHint: "Drag slider to explode assembly",
    techSpecs: "Technical Specifications",
    motorModel: "Motor Model",
    kv: "KV (RPM/Volt)",
    maxVoltage: "Max Voltage",
    maxCurrent: "Max Current",
    poles: "Poles",
    dimensions: "Dimensions",
    shaftDiameter: "Shaft Diameter",
    shaftLength: "Shaft Length",
    frontBearing: "Front Bearing",
    rearBearing: "Rear Bearing",
    weight: "Weight",
    completePurchase: "Complete Purchase",
    compGrade: "VOLTRIX Competition-Grade Brushless Motor",
    subtotal: "Subtotal",
    shipping: "Shipping",
    free: "Free",
    total: "Total",
    secureCheckout: "Secure order processing via official WhatsApp.",
    processing: "Redirecting to WhatsApp...",
    payRM: "Pay RM 99.00 via WhatsApp",
    orderConfirmed: "Order Confirmed!",
    thankYou: "Thank you for choosing VOLTRIX! Our sales team will connect with you via WhatsApp to finalize dispatch.",
    continueBrowsing: "Continue Browsing",
    chatGreeting: "Hi! I am the VOLTRIX AI Assistant. How can I help you with our Spark, Storm, Apex, or Black Edition brushless motors?",
    chatPlaceholder: "Ask anything about Voltrix RC motors...",
    chatThinking: "Thinking...",
    chatError: "Sorry, I encountered an issue. Please reach out via WhatsApp at +60 13-300 8217.",
    rotateHint: "Drag to rotate 3D • Scroll to zoom • Click parts to inspect",
    viewAngles: "View Angle",
    isometric: "Isometric",
    front: "Front",
    side: "Side",
    rear: "Rear",
    top: "Top",
    autoRotate: "Auto-Rotate",
    explode: "Explode",
    assemble: "Assemble",
    zoomIn: "Zoom In",
    zoomOut: "Zoom Out",
  },
  ms: {
    overview: "Gambaran Keseluruhan",
    documentation: "Dokumentasi",
    purchase: "Beli",
    interactiveTeardown: "Leraian Interaktif",
    precisionArch: "Seni Bina Kejuruteraan Persis",
    heroDesc: "Terokai komponen gred pertandingan motor tanpa berus VOLTRIX 2940 dalam warna utama Electric Yellow. Seret peluncur untuk meleraikan pemasangan dan klik komponen untuk melihat spesifikasi kejuruteraan.",
    assembled: "Dipasang",
    explodedView: "Pandangan Lerai",
    resetView: "Tetapkan Semula",
    componentIsolated: "Komponen Diasingkan",
    keySpecs: "Spesifikasi Utama",
    inspectComponents: "Periksa Komponen",
    inspectDesc: "Klik pada mana-mana komponen dalam paparan untuk mengasingkannya dan melihat spesifikasi teknikal terperinci.",
    interactionHint: "Interaksi: Klik latar belakang untuk nyahpilih",
    dragHint: "Seret peluncur untuk meleraikan motor",
    techSpecs: "Spesifikasi Teknikal",
    motorModel: "Model Motor",
    kv: "KV (RPM/Volt)",
    maxVoltage: "Voltan Maksimum",
    maxCurrent: "Arus Maksimum",
    poles: "Kutub",
    dimensions: "Dimensi",
    shaftDiameter: "Diameter Aci",
    shaftLength: "Panjang Aci",
    frontBearing: "Galas Depan",
    rearBearing: "Galas Belakang",
    weight: "Berat",
    completePurchase: "Lengkapkan Pembelian",
    compGrade: "Motor Brushless Gred Pertandingan VOLTRIX",
    subtotal: "Jumlah Kecil",
    shipping: "Penghantaran",
    free: "Percuma",
    total: "Jumlah",
    secureCheckout: "Pesanan selamat terus melalui WhatsApp rasmi.",
    processing: "Membuka WhatsApp...",
    payRM: "Bayar RM 99.00 via WhatsApp",
    orderConfirmed: "Pesanan Disahkan!",
    thankYou: "Terima kasih kerana memilih VOLTRIX! Pasukan kami akan menghubungi anda melalui WhatsApp untuk urusan penghantaran.",
    continueBrowsing: "Teruskan Melayari",
    chatGreeting: "Hai! Saya Pembantu AI VOLTRIX Malaysia. Apa yang anda ingin tahu mengenai siri motor Voltrix Spark, Storm, Apex atau Black Edition?",
    chatPlaceholder: "Tanya apa sahaja mengenai motor VOLTRIX...",
    chatThinking: "Sedang berfikir...",
    chatError: "Maaf, berlaku sedikit ralat. Sila hubungi WhatsApp kami di +60 13-300 8217.",
    rotateHint: "Seret untuk putar 3D • Skrol untuk zum • Klik komponen untuk periksa",
    viewAngles: "Sudut Pandangan",
    isometric: "Isometrik",
    front: "Depan",
    side: "Sisi",
    rear: "Belakang",
    top: "Atas",
    autoRotate: "Putaran Auto",
    explode: "Lerai",
    assemble: "Pasang",
    zoomIn: "Zum Masuk",
    zoomOut: "Zum Keluar",
  }
};

export type TranslationKey = keyof typeof translations.en;

export const partsTranslations = {
  en: {
    'back-cover': {
      name: 'Back Cover (Electric Yellow)',
      description: 'Precision-machined 6061-T6 aluminum back cover in signature Voltrix Electric Yellow. Features optimized cooling fins and standard M3 mounting patterns.',
      features: ['6061-T6 Billet Aluminum', 'CNC Machined', 'Electric Yellow Anodized']
    },
    'bearing-back': {
      name: 'Rear Bearing (F684ZZ)',
      description: 'High-speed F684ZZ flanged bearing (Φ4 x Φ10.3 x 4mm). Ensures ultra-low friction and long-lasting smooth rotation under extreme RPMs.',
      features: ['ABEC-5 Rating', 'Flanged Design', 'Pre-lubricated High-RPM']
    },
    'shell': {
      name: 'Voltrix Stator Shell',
      description: 'CNC machined heatsink can finished in stealth graphite with laser-etched Voltrix speedlines, lightning bolt logo, and dual yellow CNC rim accents.',
      features: ['Stealth Graphite Finish', 'Voltrix Laser Etched', 'Active Heat Venting']
    },
    'coil': {
      name: 'Vortex Hand-Wound Coil',
      description: 'High-purity oxygen-free copper windings maximizing electrical conductivity and efficiency under intense competition loads.',
      features: ['High-Purity Copper', '200°C High-Temp Rating', 'Hand-Wound Precision']
    },
    'gasket': {
      name: 'Precision Spacer Gasket',
      description: 'High-tolerance spacer ring to maintain optimal magnetic clearance and prevent axial play in the rotor assembly.',
      features: ['Brass Alloy', 'Micrometer Tolerance', 'Anti-Vibration']
    },
    'rotor': {
      name: 'Kevlar Explosion-Proof Rotor',
      description: 'Dynamic balanced 4-pole Neodymium rotor reinforced with high-modulus Kevlar wrap to resist expansion past 60,000 RPM.',
      features: ['4-Pole Neodymium', 'Kevlar Wrapped', 'Dynamic Balance Tested']
    },
    'fan': {
      name: 'Turbine Cooling Fan',
      description: 'Integrated internal aluminum turbine fan that forces fresh air directly across the stator coils to keep operating temperatures low.',
      features: ['Lightweight Aluminum', 'High-CFM Turbine', 'RPM Synchronized']
    },
    'bearing-front': {
      name: 'Front Bearing (F684ZZ)',
      description: 'High-speed F684ZZ flanged bearing (Φ4 x Φ10.3 x 4mm). Supports the output shaft under heavy pinion gear loads.',
      features: ['ABEC-5 Rating', 'Heavy Load Capacity', 'Dust Sealed']
    },
    'front-cover': {
      name: 'Front Cover (Electric Yellow)',
      description: 'Voltrix Electric Yellow anodized aluminum front bell with calibrated vortex ventilation ports for superior thermal exhaust.',
      features: ['6061-T6 Aluminum', 'Vortex Ventilated', 'Electric Yellow Anodized']
    },
    'shaft': {
      name: 'Output Shaft (Φ4mm)',
      description: 'Precision ground Φ4mm stainless steel output shaft. Engineered for perfect concentricity and maximum power transfer to the pinion gear.',
      features: ['Stainless Steel', 'Φ4.0mm Diameter', 'Precision Ground']
    }
  },
  ms: {
    'back-cover': {
      name: 'Penutup Belakang (Electric Yellow)',
      description: 'Penutup belakang aluminium 6061-T6 dimesin ketepatan dengan kemasan ikonik Voltrix Electric Yellow. Dilengkapi sirip pelesapan haba dan corak pelekap M3 standard.',
      features: ['Aluminium 6061-T6', 'Dimesin CNC', 'Anodized Electric Yellow']
    },
    'bearing-back': {
      name: 'Galas Belakang (F684ZZ)',
      description: 'Galas bebibir kelajuan tinggi F684ZZ (Φ4 x Φ10.3 x 4mm). Memastikan geseran ultra-rendah dan putaran lancar tahan lama pada RPM ekstrem.',
      features: ['Penarafan ABEC-5', 'Reka Bentuk Bebibir', 'Prapelincir Kelajuan Tinggi']
    },
    'shell': {
      name: 'Cangkerang Pemegun Voltrix',
      description: 'Tong heatsink aluminium bilet dimesin CNC dengan kemasan stealth graphite, ukiran laser Voltrix, logo kilat V, dan kemasan cincin kuning CNC berganda.',
      features: ['Kemasan Stealth Graphite', 'Ukiran Laser Voltrix', 'Pelesapan Haba Aktif']
    },
    'coil': {
      name: 'Gegelung Vorteks Gulungan Tangan',
      description: 'Belitan tembaga bebas-oksigen ketulenan tinggi memaksimumkan kekonduksian dan kecekapan elektrik walaupun di bawah bebanan perlumbaan sengit.',
      features: ['Tembaga Ketulenan Tinggi', 'Penarafan Suhu 200°C', 'Ketepatan Gulungan Tangan']
    },
    'gasket': {
      name: 'Gasket Ketepatan',
      description: 'Cincin pengatur jarak toleransi tinggi untuk mengekalkan kelegaan magnet optimum dan mengelakkan mainan paksi pada pemasangan rotor.',
      features: ['Aloi Tembaga', 'Toleransi Mikrometer', 'Anti-Getaran']
    },
    'rotor': {
      name: 'Rotor Kalis Letupan Kevlar',
      description: 'Rotor 4-kutub Neodymium seimbang dinamik yang dibalut gentian Kevlar berkekuatan tinggi bagi menghalang pengembangan pada kelajuan melebihi 60,000 RPM.',
      features: ['Neodymium 4-Kutub', 'Balutan Kevlar', 'Ujian Imbangan Dinamik']
    },
    'fan': {
      name: 'Kipas Penyejuk Turbin',
      description: 'Kipas turbin aluminium dalaman bersepadu yang mengalirkan udara sejuk terus merentasi gegelung pemegun untuk merendahkan suhu operasi secara mendadak.',
      features: ['Aluminium Ringan', 'Reka Bentuk CFM Tinggi', 'Disegerakkan Putaran RPM']
    },
    'bearing-front': {
      name: 'Galas Depan (F684ZZ)',
      description: 'Galas bebibir kelajuan tinggi F684ZZ (Φ4 x Φ10.3 x 4mm). Menyokong aci keluaran di bawah beban gear pinan yang berat.',
      features: ['Penarafan ABEC-5', 'Kapasiti Beban Berat', 'Kedap Habuk']
    },
    'front-cover': {
      name: 'Penutup Depan (Electric Yellow)',
      description: 'Penutup depan aluminium anodized Electric Yellow Voltrix dengan liang pengudaraan vorteks untuk kecekapan pelepasan haba yang optimum.',
      features: ['Aluminium 6061-T6', 'Pengudaraan Vorteks', 'Anodized Electric Yellow']
    },
    'shaft': {
      name: 'Aci Keluaran (Φ4mm)',
      description: 'Aci keluaran keluli tahan karat Φ4mm yang dikisar dengan ketepatan mikron. Direka untuk konsentrisiti sempurna dan pemindahan daya maksima ke gear pinan.',
      features: ['Keluli Tahan Karat', 'Diameter Φ4.0mm', 'Dikisar Ketepatan']
    }
  }
};
