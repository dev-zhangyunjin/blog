import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  // "/demo/",
  {
    text: "学习笔记",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      {
        text: "前端",
        icon: "pen-to-square",
        prefix: "UI/",
        children: [
          { text: "JavaScript", icon: "pen-to-square", link: "JavaScript" },
          { text: "vue3", icon: "pen-to-square", link: "vue3" },
          { text: "前端面试题", icon: "pen-to-square", link: "interview" },
        ],
      },
      {
        text: "网络技术",
        icon: "pen-to-square",
        prefix: "NET/",
        children: [
          { text: "ip 地址", icon: "pen-to-square", link: "network" },
        ],
      },
      // {
      //   text: "香蕉",
      //   icon: "pen-to-square",
      //   prefix: "banana/",
      //   children: [
      //     {
      //       text: "香蕉 1",
      //       icon: "pen-to-square",
      //       link: "1",
      //     },
      //     {
      //       text: "香蕉 2",
      //       icon: "pen-to-square",
      //       link: "2",
      //     },
      //     "3",
      //     "4",
      //   ],
      // },
      // { text: "樱桃", icon: "pen-to-square", link: "cherry" },
      // { text: "火龙果", icon: "pen-to-square", link: "dragonfruit" },
    ],
  },
  // {
  //   text: "V2 文档",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/zh/",
  // },
  {
    text: "项目仓库",
    icon: "git",
    children: [
      {
        text: "GitHub",
        icon: "github",
        link: "https://github.com/mister-hope",
      },
      {
        text: "VuePress",
        icon: "vuejs",
        link: "https://vuepress.vuejs.press/zh/",
      },
    ],
  }
]);
