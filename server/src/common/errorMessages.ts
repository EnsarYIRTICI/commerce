export const errorMessages = {
  SERVER_START_ERROR:
    '--> Sunucu başlatılamadı, lütfen yapılandırma ayarlarını kontrol edin.',

  INTERNAL_SERVER_ERROR: '--> Sunucu hatası, lütfen daha sonra tekrar deneyin.',

  DATABASE_CONNECTION_ERROR:
    'Veritabanına bağlanılamadı, lütfen veritabanı bağlantınızı kontrol edin.',

  DATABASE_SYNC_ERROR:
    'Veritabanı senkronizasyon hatası, lütfen veritabanı ayarlarını kontrol edin.',

  REDIS_CONNECTION_ERROR:
    "Redis'e bağlanılamadı, lütfen Redis bağlantınızı kontrol edin.",

  PERSON_NOT_FOUND: 'Kişi bulunamadı!',

  INVALID_TC: 'TC kimlik numarası düzgün belirtilmedi!',
  INVALID_GSM: 'GSM numarası düzgün belirtilmedi!',
  INVALID_WHERE_CLAUSE: 'Herhangi bir koşul belirtilmedi',

  CONNECTION_ABORTED: 'Bağlantı kesildi, işlem tamamlanamadı.',

  INVALID_CREDENTIALS:
    'Geçersiz kimlik bilgileri. Lütfen e-posta ve şifrenizi kontrol edin.',

  NO_TOKEN_PROVIDED:
    "Erişim token'ı sağlanmadı. Lütfen kimlik doğrulaması yapın.",
  UNAUTHORIZED: 'Yetkisiz erişim. Lütfen geçerli kimlik bilgilerini sağlayın.',
  UNAUTHORIZED_ADMIN:
    'Bu işlemi gerçekleştirmek için yönetici yetkisine sahip olmanız gerekiyor.',

  TOKEN_EXPIRED: 'Oturumunuzun süresi doldu. Lütfen yeniden giriş yapın.',
  TOKEN_INVALID: 'Token geçersiz, lütfen yeniden giriş yapın.',

  USER_NOT_FOUND: 'Kullanıcı bulunamadı. Lütfen tekrar giriş yapmayı deneyin.',
  USER_BLOCKED:
    'Hesabınız engellenmiş. Lütfen destek ekibiyle iletişime geçin.',

  USER_CREATION_FAILED: 'Kullanıcı oluşturulamadı.',

  CURRENT_PASSWORD_INCORRECT:
    'Mevcut şifre yanlış. Lütfen doğru şifreyi girin.',

  PASSWORDS_DONT_MATCH: 'Girilen şifreler eşleşmiyor. Lütfen tekrar deneyin.',
  PASSWORD_SAME_AS_OLD: 'Yeni şifre eski şifreyle aynı olamaz.',

  LOGOUT_FAILED: 'Çıkış işlemi sırasında bir hata oluştu.',
};
