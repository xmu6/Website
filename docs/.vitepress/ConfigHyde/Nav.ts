// nav导航栏配置
export const Nav = [
    { text: "🏡首页", link: "/" },
    { text: "📚文档", items: [
        { text: "AI", link: "/categories?category=AI" },
        { text: "Python", link: "/categories?category=Python" },
        { text: "测试", link: "/categories?category=测试" },
        { text: "计算机", link: "/categories?category=计算机" },
        { text: "数据库", link: "/categories?category=数据库" },
        { text: "爬虫", link: "/categories?category=爬虫" },
    ]},
    { text: "🛠️工具", items: [
        { text: "测试工具", link: "/categories?category=测试工具" },
    ]},
    { text: "🏓生活", items: [] },
];
