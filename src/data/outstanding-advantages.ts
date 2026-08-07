import type { OutstandingAdvantagesModel } from "@/components/outstanding-advantages/OutstandingAdvantages";

const outstandingAdvantages: OutstandingAdvantagesModel = {
  items: [
    {
      backgroundMobileImage: {
        url: "https://placehold.co/384x480/1a2b4a/png?text=BG+Mobile+1",
        alt: "",
        display_dimensions: { width: 384, height: 480 },
      },
      backgroundDesktopImage: {
        url: "https://placehold.co/384x480/1a2b4a/png?text=BG+Desktop+1",
        alt: "",
        display_dimensions: { width: 384, height: 480 },
      },
      image: {
        url: "https://placehold.co/229x137/png?text=Top+1",
        alt: "Chuyên gia giàu kinh nghiệm",
        display_dimensions: { width: 229, height: 137 },
      },
      subtitle: "Ưu điểm vượt trội",
      title: "Chuyên gia giàu kinh nghiệm",
      description:
        "Đội ngũ ICHOUSE gồm các kiến trúc sư, kỹ sư và chuyên gia nội thất giàu kinh nghiệm, đồng hành cùng khách hàng từ tư vấn đến hoàn thiện công trình.",
    },
    {
      backgroundMobileImage: {
        url: "https://placehold.co/384x480/243b55/png?text=BG+Mobile+2",
        alt: "",
        display_dimensions: { width: 384, height: 480 },
      },
      backgroundDesktopImage: {
        url: "https://placehold.co/384x480/243b55/png?text=BG+Desktop+2",
        alt: "",
        display_dimensions: { width: 384, height: 480 },
      },
      image: {
        url: "https://placehold.co/229x137/png?text=Top+2",
        alt: "Quy trình làm việc khoa học",
        display_dimensions: { width: 229, height: 137 },
      },
      subtitle: "Ưu điểm vượt trội",
      title: "Quy trình làm việc khoa học",
      description:
        "ICHOUSE có quy trình làm việc khoa học, rõ ràng từng giai đoạn — từ khảo sát, thiết kế, thi công đến bàn giao và bảo hành — đảm bảo tiến độ và chất lượng.",
    },
    {
      backgroundMobileImage: {
        url: "https://placehold.co/384x480/2c3e50/png?text=BG+Mobile+3",
        alt: "",
        display_dimensions: { width: 384, height: 480 },
      },
      backgroundDesktopImage: {
        url: "https://placehold.co/384x480/2c3e50/png?text=BG+Desktop+3",
        alt: "",
        display_dimensions: { width: 384, height: 480 },
      },
      image: {
        url: "https://placehold.co/229x137/png?text=Top+3",
        alt: "Bảo hành, bảo trì tới 10 năm",
        display_dimensions: { width: 229, height: 137 },
      },
      subtitle: "Ưu điểm vượt trội",
      title: "Bảo hành, bảo trì tới 10 năm",
      description:
        "Cam kết bảo hành và bảo trì dài hạn tới 10 năm, hỗ trợ khách hàng yên tâm sử dụng và giữ công trình bền đẹp theo thời gian.",
    },
  ],
  scrollReveal: {
    targetId: "outstanding-advantages",
  },
};

export default outstandingAdvantages;
export { outstandingAdvantages };
