// Master catalog built from Shalu'z CraftHub service sheets.
// slug = used in routes: /shop/:categorySlug
// image = real product photo (falls back to a placeholder if not supplied yet)
//
// Each category has `items`: an array of groups.
// A group is: { group: string, image?: string, products: (string | { name: string, image?: string })[] }
// - group.image is used for the group's own card when `products` is empty,
//   and as a fallback for any product in that group that doesn't have its own image.
// - A product can be a plain string (uses group.image, then category.image as fallback),
//   or an object { name, image } when it has its own dedicated photo.

import resinArtImg from "../assets/categories/resin-art.png";
import resinJewelsImg from "../assets/categories/resin-jewels.jpg";
import resinDecorImg from "../assets/categories/resin-decor.jpg";
import miniatureFrameImg from "../assets/categories/miniature-frame.jpg";
import pencilCarvingImg from "../assets/categories/pencil-carving.jpg";
import castingImg from "../assets/categories/casting.jpg";
import babyCastingImg from "../assets/categories/Baby casting.jpeg";
import familyCastingImg from "../assets/categories/Family-Casting.jpeg";
import coupleCastingImg from "../assets/categories/Couple casting.jpeg";
import embroideryImg from "../assets/categories/embroidery-hoop-frame.jpg";
import stringArtImg from "../assets/categories/string-art.jpg";
import quillingImg from "../assets/categories/quilling-frame.jpg";
import plateDecorationImg from "../assets/categories/plate-decoration.jpg";
import customisedGiftsImg from "../assets/categories/customised-gifts.png";
import customisedBouquetImg from "../assets/categories/customised-bouquet.png";
import photoChocolateWrapsImg from "../assets/categories/photo-chocolate-warp.png";

import resinTableImg from "../assets/categories/Resin-Table.jpeg";
import resinMirrorFrameImg from "../assets/categories/Resin-Mirror.jpeg";
import resinWallDecorImg from "../assets/categories/Resin-wall-decor.png";
import resinWallClockImg from "../assets/categories/Resin-wall-clock.jpeg";
import preservationGiftImg from "../assets/categories/Preservation-gift.png";
import keychainsImg from "../assets/categories/Keychains.jpeg";
import resinJewelsCollectionImg from "../assets/categories/Resin-jewels.jpeg";
import eyelashHairToothImg from "../assets/categories/Eyelash,hair-and-tooth-Preservation.jpeg";
import breastmilkPreservationImg from "../assets/categories/Breastmilk-Preservation.jpeg";
import babyKeepsakePreservationImg from "../assets/categories/Baby-Keepsake-Preservation.jpeg";
import photoKeychainImg from "../assets/categories/photo-keychain.jpg";
import letterKeychainImg from "../assets/categories/Letter-keychain.jpeg";
import shakerKeychainImg from "../assets/categories/Shaker-keychain.jpeg";
import pencilBottleGuruImg from "../assets/categories/pencil-bottle-guru.jpg";
import pencilBottleAnjuImg from "../assets/categories/pencil-bottle-anju-paruu.jpg";
import pencilCarvingPradeepImg from "../assets/categories/pencil-carving-pradeep.jpg";
import pencilBottleDineshImg from "../assets/categories/pencil-bottle-dinesh-svee.jpg";
import pencilBottleSowmiImg from "../assets/categories/pencil-bottle-sowmi-lav.jpg";
import pencilBottleVivekImg from "../assets/categories/pencil-bottle-vivek-pavi.jpg";
import pencilCarvingVivekImg from "../assets/categories/pencil-carving-vivek-pavi.jpg";
import miniatureShadowBoxImg from "../assets/categories/Miniature-shadow-box=frame2.jpeg";
import miniatureBudgetGiftsImg from "../assets/categories/Miniature-Budget-gifts.png";
import miniatureImg from "../assets/categories/miniature.jpeg";
import miniature2Img from "../assets/categories/miniature2.jpeg";
import miniature3Img from "../assets/categories/miniature3.jpeg";
import miniature4Img from "../assets/categories/miniature4.jpeg";
import miniature5Img from "../assets/categories/miniature5.jpeg";
import quillingWelcomeImg from "../assets/categories/quilling-welcome-sign.jpg";
import quillingPhotoFrameImg from "../assets/categories/quilling-photo-frame-roshan.jpg";
import quillingNameBirthdayImg from "../assets/categories/quilling-name-birthday-deepsika.jpg";
import quillingGuitarNameImg from "../assets/categories/quilling-guitar-name.jpg";
import quillingCoupleTreeImg from "../assets/categories/quilling-couple-tree.jpg";
import quillingDeityPortraitImg from "../assets/categories/quilling-deity-portrait.jpg";
import petCasting1Img from "../assets/categories/Pet casting1.jpeg";
import petCasting2Img from "../assets/categories/Pet casting2.jpeg";
import friendsCastingImg from "../assets/categories/Friends casting.jpeg";
import grandparentsCastingImg from "../assets/categories/Grandparents casting.jpeg";
import resinNameboardImg from "../assets/categories/Resin-Nameboard.jpeg";
import returnGiftsImg from "../assets/categories/Return gifts.jpeg";
import resinTable2Img from "../assets/categories/Resin-table2.jpeg";
import nameplatesImg from "../assets/categories/nameplates.jpeg";

export const categories = [
  {
    slug: "resin-art",
    name: "Resin Art",
    tagline: "Preserve a moment, cast it in resin",
    image: resinArtImg,
    items: [
      {
        group: "Preservation Gifts",
        image: preservationGiftImg,
        products: [
          "Wedding Garland & Flower Preservation",
          { name: "Breast Milk Preservation", image: breastmilkPreservationImg },
          { name: "Baby Keepsake Preservation", image: babyKeepsakePreservationImg },
          { name: "Eyelash, Hair & Tooth Preservation", image: eyelashHairToothImg },
          { name: "Resin Jewels", image: resinJewelsCollectionImg }
        ]
      },
      { group: "Customised Gifts", products: [] },
      {
        group: "Keychains",
        image: keychainsImg,
        products: [
          { name: "Photo Keychain", image: photoKeychainImg },
          { name: "Letter Keychain", image: letterKeychainImg },
          "Name Keychain",
          { name: "Shaker Keychain", image: shakerKeychainImg },
          "Glow in the Dark Keychain"
        ]
      },
      { group: "Resin Wall Clock", image: resinWallClockImg, products: [] },
      { group: "Resin Wall Decor", image: resinWallDecorImg, products: [] },
      { group: "Resin Name Board", image: resinNameboardImg, products: [] },
      { group: "Resin Return Gifts", image: returnGiftsImg, products: [] },
      { group: "Resin Table", products: [
        { name: "Resin Table", image: resinTableImg },
        { name: "Resin Table Design 2", image: resinTable2Img }
      ] },
      { group: "Resin Mirror Frame", image: resinMirrorFrameImg, products: [] }
    ]
  },
  {
    slug: "miniature-frame",
    name: "Miniature Frame",
    tagline: "Tiny frames, big memories",
    image: miniatureFrameImg,
    items: [
      {
        group: "Frames & Gifts",
        products: [
          { name: "Shadow Box Frame with Lights", image: miniatureShadowBoxImg },
          { name: "Nameplates", image: nameplatesImg },
          { name: "Budget Gifts", image: miniatureBudgetGiftsImg },
          { name: "Miniature Frame 1", image: miniatureImg },
          { name: "Miniature Frame 2", image: miniature2Img },
          { name: "Miniature Frame 3", image: miniature3Img },
          { name: "Miniature Frame 4", image: miniature4Img },
          { name: "Miniature Frame 5", image: miniature5Img }
        ]
      }
    ]
  },
  {
    slug: "casting",
    name: "Impressions & Casting",
    tagline: "Hold on to a hand you love",
    image: castingImg,
    items: [
      {
        group: "Casting",
        products: [
          { name: "Baby Hand & Foot Casting", image: babyCastingImg },
          { name: "Couple Casting", image: coupleCastingImg },
          { name: "Family Casting", image: familyCastingImg },
          { name: "Siblings & Grandparents Casting", image: grandparentsCastingImg },
          { name: "Friends Casting", image: friendsCastingImg },
          { name: "Pet Casting", image: petCasting1Img }
        ]
      }
    ]
  },
  {
    slug: "pencil-carving",
    name: "Pencil Carving",
    tagline: "Miniature art, carved by hand",
    image: pencilCarvingImg,
    items: [
      {
        group: "Pencil Carving",
        products: [
          { name: "Pencil Carving Bottle", image: pencilBottleGuruImg },
          { name: "Pencil Carving Bottle with Photos", image: pencilBottleAnjuImg },
          { name: "Photo Frame with Name-Carved Pencil", image: pencilCarvingPradeepImg },
          { name: "Pencil Carving Bottle - Dinesh & Svee", image: pencilBottleDineshImg },
          { name: "Pencil Carving Bottle - Sowmi & Lav", image: pencilBottleSowmiImg },
          { name: "Pencil Carving Bottle - Vivek & Pavi", image: pencilBottleVivekImg },
          { name: "Pencil Carving - Vivek & Pavi", image: pencilCarvingVivekImg }
        ]
      }
    ]
  },
  {
    slug: "embroidery-hoop-frame",
    name: "Embroidery Hoop Frame",
    tagline: "Stitched keepsakes in a hoop",
    image: embroideryImg,
    items: [{ group: "Embroidery Hoop Frame", products: [] }]
  },
  {
    slug: "string-art",
    name: "String Art",
    tagline: "One thread, one story",
    image: stringArtImg,
    items: [
      {
        group: "String Art",
        products: ["Logo & Name String Art", "Portrait String Art"]
      }
    ]
  },
  {
    slug: "quilling-frame",
    name: "Quilling Frame",
    tagline: "Paper, rolled into art",
    image: quillingImg,
    items: [{
      group: "Quilling Frame",
      products: [
        { name: "Quilling Welcome Sign", image: quillingWelcomeImg },
        { name: "Quilling Photo Frame", image: quillingPhotoFrameImg },
        { name: "Quilling Name Birthday Frame", image: quillingNameBirthdayImg },
        { name: "Quilling Guitar Name Art", image: quillingGuitarNameImg },
        { name: "Quilling Couple Tree", image: quillingCoupleTreeImg },
        { name: "Quilling Deity Portrait", image: quillingDeityPortraitImg }
      ]
    }]
  },
  {
    slug: "photo-chocolate-wraps",
    name: "Photo Chocolate Wraps",
    tagline: "Sweet gifts, personalised",
    image: photoChocolateWrapsImg,
    items: [{ group: "Photo Chocolate Wraps", image: photoChocolateWrapsImg, products: [] }]
  },
  {
    slug: "customised-bouquet",
    name: "Customised Bouquet",
    tagline: "Bouquets that don't wilt",
    image: customisedBouquetImg,
    items: [{ group: "Customised Bouquet", products: [] }]
  },
  {
    slug: "plate-decoration",
    name: "Plate Decoration",
    tagline: "Everyday plates, made special",
    image: plateDecorationImg,
    items: [{ group: "Plate Decoration", products: [] }]
  },
  {
    slug: "customised-gifts",
    name: "Customised Gifts",
    tagline: "A family tree, made of thumbprints",
    image: customisedGiftsImg,
    items: [{ group: "Customised Gifts", image: customisedGiftsImg, products: [] }]
  },
  {
    slug: "keychain",
    name: "Keychain",
    tagline: "Personalised keepsakes to carry every day",
    image: keychainsImg,
    items: [
      {
        group: "Keychains",
        image: keychainsImg,
        products: [
          { name: "Photo Keychain", image: photoKeychainImg },
          { name: "Letter Keychain", image: letterKeychainImg },
          "Name Keychain",
          { name: "Shaker Keychain", image: shakerKeychainImg },
          "Glow in the Dark Keychain"
        ]
      }
    ]
  }
];

// Extra real photos that don't map to a single category card but work well
// in the home page's 3D ring for visual variety.
export const extraRingImages = [
  { label: "Resin Jewels", img: resinJewelsImg },
  { label: "Resin Decor", img: resinDecorImg },
  { label: "Pet Casting", img: petCasting2Img },
  { label: "Miniature Frames", img: miniatureImg },
  { label: "Return Gifts", img: returnGiftsImg }
];

export const getCategoryBySlug = (slug) =>
  categories.find((c) => c.slug === slug);
