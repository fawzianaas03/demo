// Single source of truth for every piece of academy copy shown on screen.
// Edit here, not inside scenes.

export const ACADEMY = {
  name: "الأكاديمية الليبية للقرآن وعلومه",
  /** The name broken into two lines for the 9:16 layout. */
  nameLines: ["الأكاديمية الليبية", "للقرآن وعلومه"],
  leadership: "تحت قيادة الأستاذة كريمة النعاس",
  tagline: "تعليم القرآن الكريم وعلومه",
  slogan: "مع القرآن… تبدأ رحلتك، ويزهر أثرك.",
  cta: "انضموا إلينا الآن",
  ctaFeatures: ["مجاني", "عن بُعد", "عبر تيليجرام"],
  logo: "assets/academy-logo.jpg",
  /**
   * The academy's official Telegram link, e.g. "https://t.me/<official-handle>".
   * Leave empty until the academy supplies it: the end screen then omits the
   * link and QR code instead of showing an invented address.
   */
  telegramUrl: "https://t.me/+ctoiWdJG_zNkM2Nk",
  /** Optional short label printed under the QR code, e.g. "@handle" or "t.me/handle". */
  telegramLabel: "",
  /**
   * Alternative to telegramUrl: a QR image supplied by the academy, cropped to
   * the code itself (square, no frame), e.g. "assets/telegram-qr.png".
   * telegramUrl wins when both are set, because a generated code stays sharp at 4K.
   */
  qrImage: "",
} as const;

export const OPENING_LINE = {
  first: "حين يكون القرآن رفيقًا…",
  second: "تصبح كل خطوة في طلب العلم نورًا.",
};

export const HUB_LABEL = "ليبيا";

export const LEARNING_TITLES = [
  "تعليم القرآن الكريم",
  "تحفيظ القرآن الكريم",
  "أحكام التلاوة والتجويد",
] as const;

export type ProgramIconName = "letters" | "tajweed" | "children" | "manuscript" | "lamp";

export const PROGRAMS: { name: string; icon: ProgramIconName }[] = [
  { name: "القاعدة النورانية", icon: "letters" },
  { name: "أحكام التجويد", icon: "tajweed" },
  { name: "تحفة الأطفال", icon: "children" },
  { name: "الشاطبية", icon: "manuscript" },
  { name: "التبيان", icon: "lamp" },
];

export const PROGRAMS_TITLE = "البرامج التعليمية";

export const PROGRAMS_FOOTER = "وغيرها من علوم القرآن الكريم والمتون العلمية";

export const GENERATIONS = {
  first: "للنساء والرجال والأطفال",
  second: "ولجميع الأعمار",
};

export const ONLINE = {
  first: "التعلم عن بُعد",
  second: "عبر منصة تيليجرام",
  freeLead: "جميع البرامج التعليمية",
  free: "مجانًا بالكامل",
};

export const CLOSING_LINE = {
  first: "فالعلم نور…",
  second: "وخير ما نتعلمه ونعلمه كتاب الله.",
};
