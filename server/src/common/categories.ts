export const categoriesJson = [
  {
    name: 'Elektronik',
    description: 'Elektronik ürünler',
    subcategories: [
      {
        name: 'Bilgisayarlar',
        description: 'Dizüstü, masaüstü ve bilgisayar aksesuarları',
        subcategories: [
          {
            name: 'Dizüstü Bilgisayarlar',
            description: 'Laptoplar ve aksesuarları',
          },
          { name: 'Masaüstü Bilgisayarlar', description: 'Masaüstü PC' },
          {
            name: 'Bilgisayar Aksesuarları',
            description: 'Klavye, mouse, ekran',
          },
        ],
      },
      {
        name: 'Telefonlar ve Aksesuarlar',
        description: 'Akıllı telefonlar ve ilgili aksesuarlar',
        subcategories: [
          { name: 'Akıllı Telefonlar', description: 'iPhone, Android' },
          {
            name: 'Telefon Aksesuarları',
            description: 'Kılıflar, şarj cihazları',
          },
        ],
      },
      {
        name: 'Televizyon ve Ev Sineması',
        description: 'Televizyonlar, projektörler ve aksesuarlar',
        subcategories: [
          { name: 'LED TV', description: 'LED televizyonlar' },
          { name: 'Projektörler', description: 'Ev sineması projektörleri' },
        ],
      },
    ],
  },
  {
    name: 'Moda',
    description: 'Erkek, kadın ve çocuk giyim',
    subcategories: [
      {
        name: 'Kadın Giyim',
        description: 'Elbiseler, ayakkabılar, aksesuarlar',
        subcategories: [
          { name: 'Elbiseler', description: 'Kadın elbiseleri' },
          {
            name: 'Ayakkabılar',
            description: 'Topuklu, sandalet, spor ayakkabılar',
          },
        ],
      },
      {
        name: 'Erkek Giyim',
        description: 'Erkek kıyafetleri ve aksesuarlar',
        subcategories: [
          { name: 'Takım Elbiseler', description: 'Resmi takım elbiseler' },
          { name: 'Tişörtler', description: 'Günlük ve spor tişörtler' },
        ],
      },
    ],
  },
  {
    name: 'Ev ve Mutfak',
    description: 'Ev dekorasyonu, mutfak gereçleri ve mobilyalar',
    subcategories: [
      {
        name: 'Mobilya',
        description: 'Ev için oturma, çalışma mobilyaları',
        subcategories: [
          {
            name: 'Oturma Odası Mobilyaları',
            description: 'Kanepeler, koltuklar',
          },
          {
            name: 'Yatak Odası Mobilyaları',
            description: 'Yataklar, dolaplar',
          },
        ],
      },
      {
        name: 'Mutfak Gereçleri',
        description: 'Mutfak eşyaları ve cihazları',
        subcategories: [
          {
            name: 'Küçük Mutfak Aletleri',
            description: 'Blender, kahve makinesi',
          },
          {
            name: 'Tencere ve Tavalar',
            description: 'Çeşitli tencere setleri',
          },
        ],
      },
    ],
  },
  {
    name: 'Kitaplar',
    description: 'Basılı ve dijital kitaplar',
    subcategories: [
      {
        name: 'Basılı Kitaplar',
        description: 'Fiziksel kitaplar',
        subcategories: [
          { name: 'Romanlar', description: 'Roman türündeki kitaplar' },
          { name: 'Kişisel Gelişim', description: 'Kişisel gelişim kitapları' },
        ],
      },
      {
        name: 'E-Kitaplar',
        description: 'Dijital formatta kitaplar',
        subcategories: [
          { name: 'Edebiyat', description: 'E-kitap olarak edebi eserler' },
          {
            name: 'Teknoloji',
            description: 'Dijital teknoloji üzerine kitaplar',
          },
        ],
      },
    ],
  },
];
