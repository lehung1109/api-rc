import type { RelatedPostListModel } from "@/components/related-posts/RelatedPostList";

const relatedPostList: RelatedPostListModel = {
  title: "<p>Bài viết liên quan</p>",
  links: [
    {
      label: "Bài viết liên quan mẫu",
      link: {
        url: "/bai-viet-mau",
        is_external: false,
        nofollow: false,
      },
    },
    {
      label: "Bài viết liên quan mẫu2",
      link: {
        url: "/bai-viet-mau-2",
        is_external: false,
        nofollow: false,
      },
    },
  ],
};

export { relatedPostList };
