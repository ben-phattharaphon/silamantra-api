import { PrismaClient } from "../src/generated/prisma/index.js"; // ปรับ path ให้ตรงกับที่เก็บไฟล์จริง
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

// 1. ตั้งค่าการเชื่อมต่อ MySQL
const databaseUrl = new URL(process.env.DATABASE_URL);
const adapter = new PrismaMariaDb({
  host: databaseUrl.hostname,
  port: parseInt(databaseUrl.port) || 3306,
  user: databaseUrl.username,
  password: databaseUrl.password,
  database: databaseUrl.pathname.substring(1),
});

const prisma = new PrismaClient({ adapter });

const stones = [
  {
    stone_name: "Garnet",
    price: "590.00",
    stock_quantity: 20,
    category: "SPIRITUAL",
    image_url:
      "https://i.etsystatic.com/23639610/r/il/ac096f/7767798829/il_1588xN.7767798829_puwb.jpg",
    description:
      "A stone of protection, strength, and vitality. Garnet is believed to boost energy, enhance passion, and promote emotional balance.",
    tags: "garnet,january,birthstone,protection,energy",
  },
  {
    stone_name: "Amethyst",
    price: "590.00",
    stock_quantity: 20,
    category: "SPIRITUAL",
    image_url:
      "https://i.etsystatic.com/20673224/r/il/7ccde8/6437427383/il_794xN.6437427383_fzsk.jpg",
    description:
      "A calming stone that enhances focus and spiritual awareness. Amethyst is known for reducing stress and promoting inner peace.",
    tags: "amethyst,february,birthstone,calm,focus,spiritual",
  },
  {
    stone_name: "Aquamarine",
    price: "590.00",
    stock_quantity: 20,
    category: "HEALTH",
    image_url:
      "https://i.etsystatic.com/15875590/r/il/2069e2/7860882965/il_794xN.7860882965_oatx.jpg",
    description:
      "A soothing stone associated with clarity and communication. Aquamarine helps calm the mind and encourages honest expression.",
    tags: "aquamarine,march,birthstone,calm,communication",
  },
  {
    stone_name: "Diamond",
    price: "590.00",
    stock_quantity: 20,
    category: "WORK",
    image_url:
      "https://i.etsystatic.com/26638479/r/il/810e8f/7493453288/il_1140xN.7493453288_ls56.jpg",
    description:
      "A symbol of strength, purity, and clarity. Diamond is believed to amplify energy, bring courage, and enhance mental clarity.",
    tags: "diamond,april,birthstone,strength,clarity",
  },
  {
    stone_name: "Emerald",
    price: "590.00",
    stock_quantity: 20,
    category: "LOVE",
    image_url:
      "https://i.etsystatic.com/20704712/r/il/5fe916/4937005218/il_794xN.4937005218_dso7.jpg",
    description:
      "A stone of love and abundance. Emerald promotes emotional healing, compassion, and growth in relationships.",
    tags: "emerald,may,birthstone,love,abundance",
  },
  {
    stone_name: "Pearl",
    price: "590.00",
    stock_quantity: 20,
    category: "HEALTH",

    image_url: "https://example.com/pearl.jpg",
    description:
      "A symbol of purity and wisdom. Pearl is associated with emotional balance, calmness, and nurturing energy.",
    tags: "pearl,june,birthstone,purity,balance",
  },
  {
    stone_name: "Ruby",
    price: "590.00",
    stock_quantity: 20,
    category: "LOVE",
    image_url: "https://example.com/ruby.jpg",
    description:
      "A powerful stone of passion and vitality. Ruby is believed to boost confidence, motivation, and love energy.",
    tags: "ruby,july,birthstone,passion,power,love",
  },
  {
    stone_name: "Peridot",
    price: "590.00",
    stock_quantity: 20,
    category: "HEALTH",
    image_url: "https://example.com/peridot.jpg",
    description:
      "A refreshing stone that brings positivity and healing. Peridot helps release negative patterns and promotes growth.",
    tags: "peridot,august,birthstone,healing,positive",
  },
  {
    stone_name: "Spinel",
    price: "590.00",
    stock_quantity: 20,
    category: "WORK",
    image_url: "https://example.com/spinel.jpg",
    description:
      "A revitalizing stone that inspires energy and renewal. Spinel is known to encourage motivation and reduce stress.",
    tags: "spinel,august,birthstone,energy,motivation",
  },
  {
    stone_name: "Sapphire",
    price: "590.00",
    stock_quantity: 20,
    category: "WORK",

    image_url: "https://example.com/sapphire.jpg",
    description:
      "A stone of wisdom and truth. Sapphire enhances focus, mental clarity, and spiritual insight.",
    tags: "sapphire,september,birthstone,wisdom,stability",
  },
  {
    stone_name: "Tourmaline",
    price: "590.00",
    stock_quantity: 20,
    category: "SPIRITUAL",

    image_url:
      "https://i.etsystatic.com/18280394/r/il/6ac895/6099747279/il_794xN.6099747279_7sgr.jpg",
    description:
      "A protective stone that balances energy and shields against negativity. Tourmaline promotes emotional stability.",
    tags: "tourmaline,october,birthstone,protection,balance",
  },
  {
    stone_name: "Golden Topaz",
    price: "590.00",
    stock_quantity: 20,
    category: "MONEY",

    image_url:
      "https://i.etsystatic.com/22658403/r/il/b9a2f5/6817328609/il_794xN.6817328609_qp5w.jpg",
    description:
      "A stone of success and confidence. Golden Topaz is believed to attract prosperity and boost personal power.",
    tags: "golden topaz,november,birthstone,wealth,success",
  },
  {
    stone_name: "Citrine",
    price: "590.00",
    stock_quantity: 20,
    category: "MONEY",
    image_url:
      "https://i.etsystatic.com/25189277/r/il/f355ef/3329476715/il_794xN.3329476715_capa.jpg",
    description:
      "A stone of wealth and positivity. Citrine attracts abundance, success, and joyful energy.",
    tags: "citrine,november,birthstone,wealth,luck",
  },
  {
    stone_name: "Blue Zircon",
    price: "590.00",
    stock_quantity: 20,
    category: "SPIRITUAL",

    image_url:
      "https://i.etsystatic.com/18473806/r/il/156a87/2189095678/il_794xN.2189095678_m9lw.jpg",
    description:
      "A stone of clarity and peace. Blue Zircon helps calm the mind and improve focus.",
    tags: "blue zircon,december,birthstone,clarity,calm",
  },
  {
    stone_name: "Blue Topaz",
    price: "590.00",
    stock_quantity: 20,
    category: "WORK",

    image_url:
      "https://i.etsystatic.com/28680479/r/il/07533d/5872849447/il_794xN.5872849447_9h31.jpg",
    description:
      "A stone of communication and clarity. Blue Topaz enhances self-expression and mental clarity.",
    tags: "blue topaz,december,birthstone,communication,focus",
  },
  {
    stone_name: "Tanzanite",
    price: "590.00",
    stock_quantity: 20,
    category: "SPIRITUAL",

    image_url:
      "https://i.etsystatic.com/38388283/r/il/b69f06/5128724166/il_794xN.5128724166_dhyz.jpg",
    description:
      "A spiritual stone that enhances intuition and awareness. Tanzanite supports transformation and inner growth.",
    tags: "tanzanite,december,birthstone,intuition,spiritual",
  },
];

async function main() {
  console.log("ล้างข้อมูลเก่า...");
  await prisma.stones.deleteMany();

  console.log("เริ่มเพิ่มข้อมูลหิน...");
  for (const stone of stones) {
    const created = await prisma.stones.create({
      data: {
        stone_name: stone.stone_name,
        price: stone.price,
        stock_quantity: stone.stock_quantity,
        description: stone.description,
        image_url: stone.image_url,
        category: stone.category,
        tags: stone.tags,
      },
    });
  }
  console.log("Seed ข้อมูลเสร็จเรียบร้อย!");
}

main()
  .catch((e) => {
    console.error("เกิดข้อผิดพลาด:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
